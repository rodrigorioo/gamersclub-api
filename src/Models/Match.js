const Tournament = require('./Tournament');

class Match {

    constructor() {

        this._id = "";
        this._tournament = new Tournament();
        this._live = false;
        this._team1 = "";
        this._team2 = "";
        this._score1 = null;
        this._score2 = null;
        this._finished = false;
        this._best_of = "";
        this._date = "";
        this._hour = "";
        this._maps = "";
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get tournament() {
        return this._tournament;
    }

    set tournament(value) {
        this._tournament = value;
    }

    get live() {
        return this._live;
    }

    set live(value) {
        this._live = value;
    }

    get team1() {
        return this._team1;
    }

    set team1(value) {
        this._team1 = value;
    }

    get team2() {
        return this._team2;
    }

    set team2(value) {
        this._team2 = value;
    }

    get score1() {
        return this._score1;
    }

    set score1(value) {
        this._score1 = value;
    }

    get score2() {
        return this._score2;
    }

    set score2(value) {
        this._score2 = value;
    }

    get finished() {
        return this._finished;
    }

    set finished(value) {
        this._finished = value;
    }

    get best_of() {
        return this._best_of;
    }

    set best_of(value) {
        this._best_of = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get hour() {
        return this._hour;
    }

    set hour(value) {
        this._hour = value;
    }

    get maps() {
        return this._maps;
    }

    set maps(value) {
        this._maps = value;
    }
}

module.exports = Match;
