const GC = require('../index');
const vars = require('./vars');

const sessionId = vars.sessionId;
const tournamentId = '5642';

const gc = new GC(sessionId);
gc.initBrowser().then( () => {
    const match = gc.getTournament(tournamentId).then( (responseTournament) => {

        console.log(responseTournament);

    }).catch( (errorMatch) => {
        console.log("Error get tournament: " + errorMatch.message);
    });
});



