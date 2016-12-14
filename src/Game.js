Associate.Game = function (game) {
    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    this.game; //   a reference to the currently running game
    this.add; //    used to add sprites, text, groups, etc
    this.camera; // a reference to the game camera
    this.cache; //  the game cache
    this.input; //  the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load; //   for preload assets
    this.math; //   lots of useful common math operations
    this.sound; //  the sound manager - add a sound, play one, set-up markers, etc
    this.stage; //  the game stage
    this.time; //   the clock
    this.tweens; // the tween manager
    this.world; //  the game world
    this.particles; //  the particle manager
    this.physics; //    the physics manager
    this.rnd; //    the repeatable random number generator

    this.mapHeight = 12;
    this.mapWidth = 7;

    this.tileSize = 150;

};

Associate.Game.prototype = {

    init: function (level) {
    },

    create: function () {
        this.drawSpace();
    },


    drawSpace: function () {
        var spaceGroup = this.game.add.group();
        for (var i = 0; i < this.mapWidth; i++) {
            for (var j = 0; j < this.mapHeight; j++) {
                var key = 'white';
                if (j == 3) {
                    key = 'blue';
                }
                var tile = spaceGroup.create(i * this.tileSize, j * this.tileSize, key);
                tile.width = this.tileSize;
                tile.height = this.tileSize;
            }
        }

        spaceGroup.setAll('inputEnabled', true);
        spaceGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.onTileDown.bind(this));
    },

    onTileDown: function (tile) {
        var key = tile.key;
        if (key == 'white') {
            key = 'blue'
        } else {
            key = 'white'
        }
        tile.loadTexture(key);
    }

};