const puppeteer = require('puppeteer');

const PageEvaluate = require('./Traits/PageEvaluate');
const Match = require('./Models/Match');
const Team = require('./Models/Team');
const Player = require('./Models/Player');
const Tournament = require('./Models/Tournament');

class GC {

    constructor(sessionId, url = 'https://csgo.gamersclub.gg/') {

        this._sessionId = sessionId;
        this._url = url;
    }

    checkBrowserClose () {
        return new Promise( (success, failure) => {

            if(this.browser) {
                success();
            } else {
                failure("Browser closed");
            }
        });
    }

    launchBrowser () {
        return new Promise( async (success, failure) => {

            this._browser = await puppeteer.launch({
                headless: true,
                args: [
                    '--single-process',
                    '--no-zygote',
                    '--no-sandbox',
                ],
            });

            await this.browser.on('disconnect', () => {
                this._browser = null;
            });

            success();
        });

    }

    initBrowser (browser = null) {

        return new Promise( async (success, failure) => {

            this._browser = browser;
            this._browser_sended = true;

            if(!browser) {

                await this.launchBrowser();

                this._browser_sended = false;
            }

            success();
        });
    }

    closeBrowser () {

        return new Promise( async (success, failure) => {

            const pages = await this.browser.pages();
            await Promise.all(pages.map((page) => page.close()));

            if(!this.browser_sended) {
                await this.browser.close();
            }

            success();

        });
    }

    responseData(url, selector, evaluateFunction) {

        return new Promise( async (success ,failure) => {

            const finalUrl = this._url + url;

            try {

                await this.checkBrowserClose().catch( (errBrowser) => {
                    return failure(errBrowser);
                });

                const page = await this.browser.newPage();

                await this.checkBrowserClose().catch( (errBrowser) => {
                    return failure(errBrowser);
                });

                await page.setExtraHTTPHeaders({
                    'Cookie': "gclubsess=" + this._sessionId,
                });

                await this.checkBrowserClose().catch( (errBrowser) => {
                    return failure(errBrowser);
                });

                await page.goto(finalUrl, {waitUntil: 'load', timeout: 10000}).then(async () => {

                    await this.checkBrowserClose().catch( (errBrowser) => {
                        return failure(errBrowser);
                    });

                    await page.waitForSelector(selector, {
                        timeout: 10000,
                    }).catch( (errWaitForSelector) => {
                        return failure(errWaitForSelector);
                    });

                    await this.checkBrowserClose().catch( (errBrowser) => {
                        return failure(errBrowser);
                    });

                    const data = await page.evaluate(evaluateFunction).catch(async (errEvaluate) => {

                        await this.closeBrowser();

                        return failure(errEvaluate);
                    });

                    await this.checkBrowserClose().catch( (errBrowser) => {
                        return failure(errBrowser);
                    });

                    await this.closeBrowser();

                    success(data);

                }).catch(async (errGoto) => {

                    await this.closeBrowser();

                    failure(errGoto);
                });

            } catch (err) {

                await this.closeBrowser();

                failure(err);

            } finally {

                await this.closeBrowser();

            }

        });
    }

    getMatch(tournamentId, matchId) {

        return new Promise( (success, failure) => {

            this.responseData('campeonatos/csgo/' + tournamentId + '/partida/' + matchId, '.internal-page', PageEvaluate.match).then( (responseData) => {

                const match = new Match();
                match.id = matchId;
                match.tournament.name = responseData.tournamentName;
                match.live = responseData.live;
                match.team1 = responseData.team1;
                match.team2 = responseData.team2;
                match.score1 = responseData.score1;
                match.score2 = responseData.score2;
                match.finished = responseData.finished;
                match.best_of = responseData.bestOf;
                match.date = responseData.date;
                match.hour = responseData.hour;
                match.maps = responseData.maps;

                success(match);

            }).catch( (errResponseData) => failure(errResponseData));
        });
    }

    getTeam (teamId) {
        return new Promise( (success, failure) => {

            this.responseData('time/' + teamId, '.TeamProfile', PageEvaluate.team).then( (responseData) => {

                const team = new Team();
                team.id = teamId;
                team.logo = responseData.logo;
                team.name = responseData.name;
                team.tag = responseData.tag;

                responseData.players.forEach( (player, iPlayer) => {

                    const newPlayer = new Player();
                    newPlayer.id = player.id;
                    newPlayer.name = player.name;
                    newPlayer.level = player.level;
                    newPlayer.avatar = player.avatar;
                    newPlayer.role = player.role;

                    team.players.push(newPlayer);
                });

                success(team);

            }).catch( (errResponseData) => failure(errResponseData));
        });
    }

    getTeamMatches (teamId) {
        return new Promise( (success, failure) => {

            this.responseData('team/matches/' + teamId, '.team-management', PageEvaluate.teamMatches).then( (responseData) => {

                const team = new Team();
                team.id = teamId;
                team.logo = responseData.logo;
                team.name = responseData.name;
                team.tag = responseData.tag;

                responseData.matches.forEach( (match, iMatch) => {

                    const newMatch = new Match();
                    newMatch.id = match.id;

                    const tournament = new Tournament();
                    tournament.id = match.tournament.tournamentId;
                    tournament.name = match.tournament.tournamentName;
                    newMatch.tournament = tournament;

                    newMatch.live = match.live;
                    newMatch.team1 = match.team1;
                    newMatch.team2 = match.team2;
                    newMatch.score1 = match.score1;
                    newMatch.score2 = match.role;
                    newMatch.finished = match.finished;
                    newMatch.date = match.date;
                    newMatch.hour = match.hour;

                    team.matches.push(newMatch);
                });

                success(team);

            }).catch( (errResponseData) => failure(errResponseData));
        });
    }

    getTournament(tournamentId) {
        return new Promise( (success, failure) => {

            this.responseData('campeonatos/csgo/' + tournamentId, '.main-wrap', PageEvaluate.tournament).then( (responseData) => {

                const tournament = new Tournament();
                tournament.id = tournamentId;
                tournament.name = responseData.name;

                success(tournament);

            }).catch( (errResponseData) => failure(errResponseData));
        });
    }

    get url() {
        return this._url;
    }

    set url(value) {
        this._url = value;
    }

    get sessionId() {
        return this._sessionId;
    }

    set sessionId(value) {
        this._sessionId = value;
    }

    get browser() {
        return this._browser;
    }

    set browser(value) {
        this._browser = value;
    }

    get browser_sended() {
        return this._browser_sended;
    }

    set browser_sended(value) {
        this._browser_sended = value;
    }
}

module.exports = GC;
