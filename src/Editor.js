Associate.Editor = function(game) {

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
    this.tileDistance = 56;

    this.w = 3;
    this.h = 3;
    this.tiles = new TileMap();
    this.legendTiles = new TileMap();
    this.sprites = new TileMap();

    this.tilesGroup;

    this.level;
    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

Associate.Editor.prototype = {

    init: function(level) {
        this.level = level;
        this.w = level.w;
        this.h = level.h;
        this.legendTiles = new TileMap();
        this.level.legend.forEach(function(tile) {
            this.legendTiles.set(new Pair(tile.x, tile.y), tile);
        }, this);

        this.tiles = new TileMap();
        this.level.tiles.forEach(function(tile) {
            this.tiles.set(new Pair(tile.x, tile.y), tile);
        }, this);
    },

    create: function() {
        this.game.stage.backgroundColor = '#96ceb4';

        this.game.add.button(5, 5, 'back', this.onBackClick, this, 2, 1, 0);
        this.game.add.button(50, 5, 'save', this.onSaveClick, this, 2, 1, 0);
        this.game.add.button(100, 5, 'load', this.onLoadClick, this, 2, 1, 0);

        this.game.add.button(150, 5, 'left', this.onLeftBtnClick, this, 2, 1, 0);
        this.game.add.button(200, 5, 'right', this.onRightBtnClick, this, 2, 1, 0);
        this.game.add.button(250, 5, 'up', this.onUpBtnClick, this, 2, 1, 0);
        this.game.add.button(300, 5, 'down', this.onDownBtnClick, this, 2, 1, 0);

        //this.drawTiles(this.legendTiles, this.game.add.group(), this.tileDistance);

        this.tilesGroup = this.game.add.group();
        this.drawTiles(this.tiles, this.tilesGroup, this.tileSize);
        this.tilesGroup.setAll('inputEnabled', true);
        this.tilesGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.onTileClick(this));
    },


    drawTiles: function(tiles, group, size) {
        tiles.entities.forEach(function(tile) {
            var sprite = group.create(tile.x * this.tileDistance, tile.y * this.tileDistance, tile.color);
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            sprite.width = size;
            sprite.height = size;
            this.sprites.set(new Pair(tile.x, tile.y), sprite);
        }, this);
        group.x = this.game.world.centerX - this.w * this.tileDistance / 2;
        group.y = this.game.world.centerY - this.h * this.tileDistance / 2;
    },

    loadLevel: function() {
        this.game.world.removeAll();
        this.create();
    },

    onTileClick: function(context) {
        return function(item) {

        }
    },

    onBackClick: function() {
        this.state.start('MainMenu', true, false);
    },

    onLoadClick: function() {
        this.loadLevel();
    },

    onLeftBtnClick: function() {
        this.w -= 1;
        for (var i = 0; i < this.h; i++) {
            this.tiles.delete(new Pair(this.w, i));
        }
        this.loadLevel();
    },

    onRightBtnClick: function() {
        for (var i = 0; i < this.h; i++) {
            this.tiles.set(new Pair(this.w, i), new Tile(this.w, i, Color.GREY));
        }
        this.w += 1;
        this.loadLevel();
    },

    onUpBtnClick: function() {
        this.h -= 1;
        for (var i = 0; i < this.w; i++) {
            this.tiles.delete(new Pair(i, this.h));
        }
        this.loadLevel();
    },

    onDownBtnClick: function() {
        for (var i = 0; i < this.w; i++) {
            this.tiles.set(new Pair(i, this.h), new Tile(i, this.h, Color.GREY));
        }
        this.h += 1;
        this.loadLevel();
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