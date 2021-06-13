const GC = require('../index');
const vars = require('./vars');

const sessionId = vars.sessionId;
const tournamentId = '4719';
const matchId = '321410';

const gc = new GC(sessionId);
gc.initBrowser().then( () => {
    const match = gc.getMatch(tournamentId, matchId).then( (responseMatch) => {

        console.log(responseMatch);

    }).catch( (errorMatch) => {
        console.log("Error get match: " + errorMatch.message);
    });
});



