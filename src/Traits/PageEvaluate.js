function match () {

    const tournamentName = document.querySelector('.header-event-match .box-event-match .event-cover img').getAttribute('alt');

    const htmlLive = document.querySelector('.header-event-match .box-event-match .live span.label-live');
    const live = !!(htmlLive);

    const htmlTeamNames = document.querySelectorAll('.header-event-match .box-event-match h4.team-name');
    htmlTeamNames[0].removeChild(htmlTeamNames[0].querySelector('small'));
    htmlTeamNames[1].removeChild(htmlTeamNames[1].querySelector('small'));

    const team1 = htmlTeamNames[0].innerText.replace(/\s\s+/g, '');
    const team2 = htmlTeamNames[1].innerText.replace(/\s\s+/g, '');

    const score1 = parseInt(document.querySelector('.header-event-match .box-event-match #matchscore1').innerText);
    const score2 = parseInt(document.querySelector('.header-event-match .box-event-match #matchscore2').innerText);

    const finished = (!(!score1 && !score2 && !live));

    const htmlBestOf = document.querySelector('.header-event-match .box-event-match .event-match-info .best-of');
    htmlBestOf.removeChild(htmlBestOf.querySelector('i'));
    const bestOf = htmlBestOf.innerText;

    const htmlDate = document.querySelector('.header-event-match .box-event-match .event-match-info .date');
    htmlDate.removeChild(htmlDate.querySelector('i'));
    const date = htmlDate.innerText;

    const htmlTime = document.querySelector('.header-event-match .box-event-match .event-match-info .time');
    htmlTime.removeChild(htmlTime.querySelector('i'));
    const hour = htmlTime.innerText;

    const htmlMaps = document.querySelector('.header-event-match .box-event-match .event-match-info .map');
    htmlMaps.removeChild(htmlMaps.querySelector('i'));
    const maps = htmlMaps.innerText;

    return {
        tournamentName,
        live,
        team1,
        team2,
        score1,
        score2,
        finished,
        bestOf,
        date,
        hour,
        maps,
    };
}

function team() {

    const logo = document.querySelector('.TeamProfile .TeamProfile__header .TeamProfile__container .TeamProfile__meta .TeamProfile__avatar img').getAttribute('src');

    const name = document.querySelector('.TeamProfile .TeamProfile__header .TeamProfile__container .TeamProfile__meta h1.TeamProfile__name span').innerText;

    const tag = document.querySelector('.TeamProfile .TeamProfile__header .TeamProfile__container .TeamProfile__meta h2.TeamProfile__tag').innerText;

    const players = [];
    const htmlPlayers = document.querySelectorAll('.TeamProfile .TeamProfile__header .TeamProfile__container .TeamProfile__roster .TeamProfile__roster__player');
    htmlPlayers.forEach( (htmlPlayer, iHtmlPlayer) => {

        const playerCardAvatar = htmlPlayer.querySelector('.PlayerCard__avatar');
        const playerCardMetas = htmlPlayer.querySelectorAll('.PlayerCard__meta .PlayerCard__meta__item');

        const id = playerCardAvatar.querySelector('a').getAttribute('href').split('/')[2];
        const avatar = playerCardAvatar.querySelector('img').getAttribute('src');
        const name = htmlPlayer.querySelector('h3.PlayerCard__nick span').innerText;
        const level = playerCardMetas[0].getAttribute('title');
        const role = playerCardMetas[2].getAttribute('title');

        players.push({
            id,
            avatar,
            name,
            level,
            role,
        });
    });

    return {
        logo,
        name,
        tag,

        players,
    };
}

function teamMatches () {

    const logo = document.querySelector('.team-custom-header-container .team-custom-header-container-content .team-custom-header-image-container img').getAttribute('src');

    const nameHtml = document.querySelector('.team-custom-header-container .team-custom-header-container-content h1.team-name');
    const tag = nameHtml.querySelector('small.team-tag').innerText;
    nameHtml.removeChild(nameHtml.querySelector('img'));
    nameHtml.removeChild(nameHtml.querySelector('small'));
    const name = nameHtml.innerText;

    const matches = [];
    const htmlMatches = document.querySelectorAll('.team-management .team-content-panel table tbody tr');
    htmlMatches.forEach( (htmlMatch, iHtmlMatch) => {

        const tds = htmlMatch.querySelectorAll('td');
        const td0a = tds[0].querySelector('a');
        const td5 = tds[5];

        const id = td0a.getAttribute('href').split('/')[5];

        const tournamentId = td5.querySelector('a').getAttribute('href').split('/')[3];
        const tournamentName = td5.getAttribute('title');

        const htmlDate = td0a.innerText;
        let live = false;
        let date = "";
        let hour = "";
        if(htmlDate.includes('HOJE')) { // THE MATCH IS TODAY

            const dateToday = new Date();

            date = dateToday.getDate() + '/' + dateToday.getMonth() + '/' + dateToday.getFullYear();
            hour = htmlDate.split(' ')[1];
        } else if(htmlDate.includes('LIVE')) { // THE MATCH IS NOW

            const dateToday = new Date();

            date = dateToday.getDate() + '/' + dateToday.getMonth() + '/' + dateToday.getFullYear();
            hour = htmlDate.split(' ')[1];

            live = true;

        } else if (htmlDate.includes('TBA')) { // THE MATCH IS TBA

            //

        } else { // THE MATCH IS OTHER DAY

            date = htmlDate.split(' ')[0];
            hour = htmlDate.split(' ')[1];
        }

        const team1 = tds[1].querySelector('a').innerText;
        const team2 = tds[4].querySelector('a').innerText;

        const score1 = tds[2].querySelector('span').innerText;
        const score2 = tds[3].querySelector('span').innerText;

        const finished = td0a.classList.contains('finished');

        matches.push({
            id,
            tournament: {
                tournamentId,
                tournamentName,
            },
            live,
            team1,
            team2,
            score1,
            score2,
            finished,
            date,
            hour,
        });
    });

    return {
        logo,
        name,
        tag,

        matches,
    };
}

function tournament () {

    const name = document.querySelector('.main-wrap h2.title').innerText;

    return {
        name,
    };
}

module.exports.match = match;
module.exports.team = team;
module.exports.teamMatches = teamMatches;
module.exports.tournament = tournament;
