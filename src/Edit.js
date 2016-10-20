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

    this.tileSize = 48;
    this.w = 7;
    this.h = 7;
    this.tiles = [];
    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

Associate.Game.prototype = {

    create: function () {
        this.game.stage.backgroundColor = '#96ceb4';
        var group = this.game.add.group();

        for (var i = 0; i < this.w; i++) {
            this.tiles[i] = [];
            for (var j = 0; j < this.h; j++) {
                this.tiles[i][j] = group.create(i * this.tileSize, j * this.tileSize, 'red');
                this.tiles[i][j].anchor.x = 0.5;

            }
        }

        group.setAll('inputEnabled', true);
        group.callAll('events.onInputDown.add', 'events.onInputDown', this.onTileClick(this));

        this.flip(this, 'yellow', this.tiles[1][1]);
        this.flip(this, 'blue', this.tiles[6][3]);
        this.flip(this, 'grey', this.tiles[5][5]);
        this.flip(this, 'green', this.tiles[1][2]);

        group.x = 100;
        group.y = 100;
    },

    onTileClick: function (context) {
        return function (item) {
            var x = Math.floor(item.x / context.tileSize);
            var y = Math.floor(item.y / context.tileSize);
            context.getNeighbors(x, y).forEach(function (a, i, arr) {
                context.flip(context, item.key, context.tiles[a[0]][a[1]], i * 50);
            }, context);
        }
    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        //this.state.start('MainMenu');

    }

};