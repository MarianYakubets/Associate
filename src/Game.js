Associate.Game = function(game) {

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
    this.spacing = 8;
    this.bigTileSize = 56;


    this.w = 7;
    this.h = 7;
    this.tiles = [];
    this.sprites = [];

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

Associate.Game.prototype = {

    create: function() {
        this.game.stage.backgroundColor = '#96ceb4';

        var groupBcg = this.game.add.group();
        groupBcg.x = 100;
        groupBcg.y = 100;

        var group = this.game.add.group();
        group.x = 100;
        group.y = 100;


        for (var i = 0; i < this.w; i++) {
            for (var j = 0; j < this.h; j++) {
                var sprite = groupBcg.create(i * (this.bigTileSize), j * (this.bigTileSize), Color.BLUE);
                sprite.anchor.x = 0.5;
                sprite.anchor.y = 0.5;
                sprite.width = this.bigTileSize;
                sprite.height = this.bigTileSize;
            }
        }



        for (var i = 0; i < this.w; i++) {
            this.sprites[i] = [];
            this.tiles[i] = [];
            for (var j = 0; j < this.h; j++) {
                this.sprites[i][j] = group.create(i * (this.bigTileSize), j * (this.bigTileSize), Color.RED);
                this.sprites[i][j].anchor.x = 0.5;
                this.sprites[i][j].anchor.y = 0.5;
                this.tiles[i][j] = new Tile(i, j);
            }
        }

        group.setAll('inputEnabled', true);
        group.callAll('events.onInputDown.add', 'events.onInputDown', this.onTileClick(this));

        this.flip(this, Color.YELLOW, this.sprites[1][1]);
        this.flip(this, Color.BLUE, this.sprites[6][3]);
        this.flip(this, Color.GREY, this.sprites[5][5]);
        this.flip(this, Color.GREEN, this.sprites[1][2]);

        this.tiles[3][3].mutable = false;
    },

    onTileClick: function(context) {
        return function(item) {
            var x = Math.floor(item.x / (context.bigTileSize));
            var y = Math.floor(item.y / (context.bigTileSize));
            context.getNeighbors(x, y, context.tiles).forEach(function(a, i, arr) {
                context.flip(context, item.key, context.sprites[a[0]][a[1]], i * 50);
            }, context);
        }
    },

    flip: function(context, type, item, delay) {
        if (item.key == type) {
            return;
        }
        var flip = context.game.add.tween(item.scale).to({
            x: 0,
            y: 1
        }, 200, Phaser.Easing.None, true, delay);
        flip.onComplete.add(function() {
            item.loadTexture(type);
            context.game.add.tween(item.scale).to({
                x: 1,
                y: 1
            }, 150, Phaser.Easing.None, true);
        }, this);
    },

    getNeighbors: function(x, y, tiles) {
        var n = [];

        var i = x - 1;
        while (i >= 0) {
            if (!tiles[i][y].mutable) {
                break;
            }
            n.push([i, y]);
            i--;
        }

        i = x + 1;
        while (i < this.w) {
            if (!tiles[i][y].mutable) {
                break;
            }
            n.push([i, y]);
            i++;
        }

        i = y - 1;
        while (i >= 0) {
            if (!tiles[x][i].mutable) {
                break;
            }
            n.push([x, i]);
            i--;
        }

        i = y + 1;
        while (i < this.h) {
            if (!tiles[x][i].mutable) {
                break;
            }
            n.push([x, i]);
            i++;
        }

        return n;
    },

    update: function() {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

    },

    quitGame: function(pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        //this.state.start('MainMenu');

    }

};