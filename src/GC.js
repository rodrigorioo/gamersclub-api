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

    responseData(url, selector, evaluateFunction) {

        return new Promise( async (success ,failure) => {

            const finalUrl = this._url + url;

            const browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
            const page = await browser.newPage();
            await page.setExtraHTTPHeaders({
                'Cookie': "gclubsess=" + this._sessionId,
            });
            await page.goto(finalUrl, {waitUntil: 'load', timeout: 10000}).then( async () => {

                await page.waitForSelector(selector);

                const data = await page.evaluate(evaluateFunction).catch( async (errEvaluate) => {
                    await browser.close();
                    return failure(errEvaluate);
                });

                await browser.close();

                success(data);

            }).catch( async (errGoto) => {

                await browser.close();
                
                failure(errGoto);
            });

        });
    }

    getMatch(tournamentId, matchId) {

        return new Promise( (success, failure) => {

            this.responseData('campeonatos/csgo/' + tournamentId + '/partida/' + matchId, '#matchscore1', PageEvaluate.match).then( (responseData) => {

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
}

module.exports = GC;
