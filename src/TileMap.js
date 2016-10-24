var TileMap = function (tiles) {
    this.keys = [];
    this.entities = [];
    this.size = 0;
};

TileMap.prototype = {

    init: function (tiles) {

    },

    get: function (key) {
        if (this.hasKey(key)) {
            return null;
        }
        return this.entities[this.keys.indexOf(key)];
    },

    set: function (key, entity) {
        if (!this.hasKey(key)) {
            this.keys.push(key);
            this.updateSize();
        }
        this.entities[this.keys.indexOf(key)] = entity;
    },

    delete: function (key) {
        var index = this.keys.indexOf(key);
        this.keys.splice(index);
        this.entities.splice(index);
        this.updateSize();
    },

    hasKey: function (key) {
        return this.keys.indexOf(key) != (-1);
    },

    hasEntity: function (entity) {
        return this.entities.indexOf(entity) != (-1);
    },

    updateSize: function () {
        this.size = this.keys.length;
    }
};
