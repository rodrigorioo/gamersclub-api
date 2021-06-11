class Team {

    constructor() {

        this._id = "";
        this._logo = null;
        this._name = "";
        this._tag = "";

        this._players = [];
        this._matches = [];
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get logo() {
        return this._logo;
    }

    set logo(value) {
        this._logo = value;
    }
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }
    get tag() {
        return this._tag;
    }

    set tag(value) {
        this._tag = value;
    }
    get players() {
        return this._players;
    }

    set players(value) {
        this._players = value;
    }
    get matches() {
        return this._matches;
    }

    set matches(value) {
        this._matches = value;
    }

}

module.exports = Team;
