class Player {

    constructor() {
        this._id = '';
        this._name = '';
        this._level = '';
        this._avatar = null;
        this._role = null;
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
    get level() {
        return this._level;
    }

    set level(value) {
        this._level = value;
    }
    get avatar() {
        return this._avatar;
    }

    set avatar(value) {
        this._avatar = value;
    }
    get role() {
        return this._role;
    }

    set role(value) {
        this._role = value;
    }
}

module.exports = Player;
