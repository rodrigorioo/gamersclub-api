const GC = require('../index');
const vars = require('./vars');

const sessionId = vars.sessionId;
const page = '1';

const gc = new GC(sessionId);
gc.initBrowser().then( () => {
    const endedTournaments = gc.getEndedTournaments(page).then( (responseEndedTournaments) => {

        console.log(responseEndedTournaments);

    }).catch( (errorMatch) => {
        console.log("Error get ended tournaments: " + errorMatch.message);
    });
});



