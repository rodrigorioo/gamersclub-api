const GC = require('../index');

const sessionId = '';
const tournamentId = '';
const matchId = '';

const gc = new GC(sessionId);
const match = gc.getMatch(tournamentId, matchId).then( (responseMatch) => {

    console.log(responseMatch);

}).catch( (errorMatch) => {
    console.log(errorMatch);
});


