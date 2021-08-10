class Tournament {

    constructor() {

        this._id = "";
        this._name = "";
        this._beginning = "";
        this._ending = "";
        this._prize = "";
        this._groups = "";
        this._table = "";
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get beginning() {
        return this._beginning;
    }

    set beginning(value) {
        this._beginning = value;
    }

    get ending() {
        return this._ending;
    }

    set ending(value) {
        this._ending = value;
    }

    get prize() {
        return this._prize;
    }

    set prize(value) {
        this._prize = value;
    }

    get groups() {
        return this._groups;
    }

    set groups(value) {
        this._groups = value;
    }

    get table() {
        return this._table;
    }

    set table(value) {
        this._table = value;
    }
}

module.exports = Tournament;
