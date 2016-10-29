var TileMap = function (tiles) {
    this.keys = [];
    this.entities = [];
    this.size = 0;
};

TileMap.prototype = {

    init: function (tiles) {

    },

    get: function (key) {
        if (this.hasKey(this.simplify(key))) {
            return null;
        }
        return this.entities[this.keys.indexOf(this.simplify(key))];
    },

    set: function (key, entity) {
        if (!this.hasKey(this.simplify(key))) {
            this.keys.push(this.simplify(key));
            this.updateSize();
        }
        this.entities[this.keys.indexOf(this.simplify(key))] = entity;
    },

    delete: function (key) {
        var index = this.keys.indexOf(this.simplify(key));
        this.keys.splice(index, 1);
        this.entities.splice(index, 1);
        this.updateSize();
    },

    hasKey: function (key) {
        return this.keys.indexOf(this.simplify(key)) != (-1);
    },

    updateSize: function () {
        this.size = this.keys.length;
    },

    simplify: function (key) {
        return "" + key.x + key.y;
    }
};
