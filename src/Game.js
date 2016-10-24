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
    this.spacing = 8;
    this.bigTileSize = 56;

    this.w = 3;
    this.h = 3;
    this.tiles = new TileMap();
    this.legendTiles = new TileMap();
    this.sprites = new TileMap();

    this.tilesGroup;

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

Associate.Game.prototype = {

    init: function (levelNumber) {
        console.log(levelNumber);
    },

    create: function () {
        this.game.stage.backgroundColor = '#96ceb4';

        var groupBcg = this.game.add.group();
        groupBcg.x = 200;
        groupBcg.y = 400;

        this.tilesGroup = this.game.add.group();
        this.tilesGroup.x = 200;
        this.tilesGroup.y = 400;

        for (var i = 0; i < this.w; i++) {
            for (var j = 0; j < this.h; j++) {
                var sprite = groupBcg.create(i * (this.bigTileSize), j * (this.bigTileSize), Color.BLUE);
                sprite.anchor.x = 0.5;
                sprite.anchor.y = 0.5;
                sprite.width = this.bigTileSize;
                sprite.height = this.bigTileSize;
                this.legendTiles.set(new Pair(i, j), new Tile(i, j, Color.BLUE));
            }
        }
        this.game.add.button(this.game.world.width - 95, 10, 'save', this.onSaveClick, this, 2, 1, 0);
        this.game.add.button(this.game.world.width - 95, 100, 'load', this.onLoadClick, this, 2, 1, 0);
    },


    drawTiles: function (array) {
        this.tiles = new TileMap();
        array.forEach(function (tile) {
            this.tiles.set(new Pair(tile.x, tile.y), tile);
        }, this);

        if (this.tilesGroup != null) {
            this.tilesGroup.destroy();
        }

        this.tilesGroup = this.game.add.group();
        this.tilesGroup.x = 200;
        this.tilesGroup.y = 400;

        this.tiles.entities.forEach(function (tile) {
            var sprite = this.tilesGroup.create(tile.x * (this.bigTileSize), tile.y * (this.bigTileSize), tile.color);
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            this.sprites.set(new Pair(tile.x, tile.y), sprite);
        }, this);

        this.tilesGroup.setAll('inputEnabled', true);
        this.tilesGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.onTileClick(this));
    },


    loadLevel: function (json) {
        //var legend = JSON.parse(legendJson);
        var tiles = JSON.parse(json);
        this.drawTiles(tiles);
    },

    checkWin: function () {
        var victory = true;
        this.legendTiles.entities.forEach(function (tile) {
            if (this.tiles.get(new Pair(tile.x, tile.y)).color != tile.color) {
                victory = false;
                return;
            }
        }, this);
        return victory;
    },

    onTileClick: function (context) {
        return function (item) {
            var x = Math.floor(item.x / (context.bigTileSize));
            var y = Math.floor(item.y / (context.bigTileSize));
            context.getNeighbors(x, y, context.tiles).forEach(function (a, i) {
                context.tiles.get(new Pair(a[0], a[1])).color = item.key;
                context.flip(context, item.key, context.sprites.get(new Pair(a[0], a[1])), i * 50);
            }, context);
            console.log("Victory : " + context.checkWin());
        }
    },

    flip: function (context, type, item, delay) {
        if (item.key == type) {
            return;
        }
        var flip = context.game.add.tween(item.scale).to({
            x: 0,
            y: 1
        }, 200, Phaser.Easing.None, true, delay);
        flip.onComplete.add(function () {
            item.loadTexture(type);
            context.game.add.tween(item.scale).to({
                x: 1,
                y: 1
            }, 150, Phaser.Easing.None, true);
        }, this);
    },

    getNeighbors: function (x, y, tiles) {
        var n = [];

        var i = x - 1;
        while (i >= 0) {
            if (!tiles.get(new Pair(i, y)).mutable) {
                break;
            }
            n.push([i, y]);
            i--;
        }

        i = x + 1;
        while (i < this.w) {
            if (!tiles.get(new Pair(i, y)).mutable) {
                break;
            }
            n.push([i, y]);
            i++;
        }

        i = y - 1;
        while (i >= 0) {
            if (!tiles.get(new Pair(x, i)).mutable) {
                break;
            }
            n.push([x, i]);
            i--;
        }

        i = y + 1;
        while (i < this.h) {
            if (!tiles.get(new Pair(x, i)).mutable) {
                break;
            }
            n.push([x, i]);
            i++;
        }

        return n;
    },

    onSaveClick: function () {
        var json = JSON.stringify(this.tiles);
        console.log(json);
    },


    onLoadClick: function () {
        this.loadLevel('[{"x":0,"y":0,"color":"red","mutable":true},{"x":0,"y":1,"color":"red","mutable":true},{"x":0,"y":2,"color":"red","mutable":true},{"x":1,"y":0,"color":"red","mutable":true},{"x":1,"y":1,"color":"blue","mutable":false},{"x":1,"y":2,"color":"red","mutable":true},{"x":2,"y":0,"color":"red","mutable":true},{"x":2,"y":1,"color":"red","mutable":true},{"x":2,"y":2,"color":"red","mutable":true}]');
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