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

    this.selectedColor = null;
    this.squareMask;

    this.number;
    this.level;
    this.w;
    this.h;
    this.tiles = new TileMap();
    this.legendTiles = new TileMap();
    this.sprites = new TileMap();

    this.tilesGroup;
    this.layer1Active = true;
    this.legendGroup;
    this.layer2Active = true;

    this.l1Btn;
    this.l2Btn;

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

Associate.Editor.prototype = {

    init: function(level) {
        this.number = level.number;
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

        this.game.add.button(5, 1, 'back', this.onBackClick, this, 2, 1, 0).scale.setTo(0.7, 0.7);
        this.game.add.button(70, 1, 'save', this.onSaveClick, this, 2, 1, 0).scale.setTo(0.7, 0.7);

        this.game.add.button(150, 1, 'left', this.onLeftBtnClick, this, 2, 1, 0).scale.setTo(0.7, 0.7);
        this.game.add.button(220, 1, 'right', this.onRightBtnClick, this, 2, 1, 0).scale.setTo(0.7, 0.7);
        this.game.add.button(290, 1, 'up', this.onUpBtnClick, this, 2, 1, 0).scale.setTo(0.7, 0.7);
        this.game.add.button(360, 1, 'down', this.onDownBtnClick, this, 2, 1, 0).scale.setTo(0.7, 0.7);
        this.l1Btn = this.game.add.button(450, 1, 'l1', this.onLayer1Click, this, 2, 1, 0).scale.setTo(0.7, 0.7);
        this.l2Btn = this.game.add.button(550, 1, 'l2', this.onLayer2Click, this, 2, 1, 0).scale.setTo(0.7, 0.7);

        var palette = this.game.add.group();
        palette.x = this.game.world.width - this.tileSize;
        palette.y = 0;

        palette.create(0, 0 * this.tileSize, 'squareWhite');
        palette.create(0, 0 * this.tileSize, 'none');
        palette.create(0, 1 * this.tileSize, 'blue');
        palette.create(0, 2 * this.tileSize, 'green');
        palette.create(0, 3 * this.tileSize, 'grey');
        palette.create(0, 4 * this.tileSize, 'red');
        palette.create(0, 5 * this.tileSize, 'yellow');

        this.squareMask = palette.create(0, (-2) * this.tileSize, 'squareBlack');

        palette.setAll('inputEnabled', true);
        palette.callAll('events.onInputDown.add', 'events.onInputDown', this.onPaletteClick(this));
        this.squareMask.input.enabled = false;

        this.drawLegendTiles();
        this.drawLevelTiles();
    },

    drawLegendTiles: function() {
        if (this.legendGroup) {
            this.legendGroup.destroy();
        }
        this.legendGroup = this.game.add.group();
        this.drawTiles(this.legendTiles, this.legendGroup, this.tileDistance);
        this.legendGroup.setAll('inputEnabled', true);
        this.legendGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.onTileClick(this, this.legendTiles));
    },


    drawLevelTiles: function() {
        if (this.tilesGroup) {
            this.tilesGroup.destroy();
        }
        this.tilesGroup = this.game.add.group();
        this.drawTiles(this.tiles, this.tilesGroup, this.tileSize);
        this.tilesGroup.setAll('inputEnabled', true);
        this.tilesGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.onTileClick(this, this.tiles));
        this.showLevels();
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

    showLevels: function() {
        if (this.layer1Active) {
            this.tilesGroup.alpha = 1;
            this.tilesGroup.setAll('inputEnabled', true);
            this.l1Btn.tint = 0xffffff;
        } else {
            this.tilesGroup.alpha = 0;
            this.tilesGroup.setAll('inputEnabled', false);
            this.l1Btn.tint = 0x000000;
        }
        if (this.layer2Active) {
            this.legendGroup.alpha = 1;
            this.legendGroup.setAll('inputEnabled', true);
            this.l2Btn.tint = 0xffffff;
        } else {
            this.legendGroup.alpha = 0;
            this.legendGroup.setAll('inputEnabled', false);
            this.l2Btn.tint = 0x000000;
        }
    },

    loadLevel: function() {
        this.tilesGroup.setAll('inputEnabled', false);
        this.game.world.removeAll();
        this.create();
    },

    onTileClick: function(context, tiles) {
        return function(item) {
            if (context.selectedColor != null) {
                var x = Math.floor(item.x / (context.tileDistance));
                var y = Math.floor(item.y / (context.tileDistance));
                if (context.selectedColor == Color.NONE) {
                    context.tiles.get(new Pair(x, y)).color = context.selectedColor;
                    context.legendTiles.get(new Pair(x, y)).color = context.selectedColor;
                } else {
                    tiles.get(new Pair(x, y)).color = context.selectedColor;
                }
                context.drawLegendTiles();
                context.drawLevelTiles();
            }
        }
    },

    onPaletteClick: function(context) {
        return function(item) {
            if (item.key != context.selectedColor) {
                context.selectedColor = item.key;
                context.squareMask.y = item.y;
            } else {
                context.selectedColor = null;
                context.squareMask.y = context.tileSize * (-2);
            }
        }
    },


    onBackClick: function() {
        this.state.start('LevelMenu', true, false, 'Editor');
    },

    onLoadClick: function() {
        this.init(this.level);
        this.loadLevel();
    },

    onSaveClick: function() {
        var json = JSON.stringify(new Level(this.number, this.w, this.h, this.tiles.entities, this.legendTiles.entities));
        firebase.database().ref('levels/' + this.number).set(json);
    },


    onLeftBtnClick: function() {
        this.w -= 1;
        for (var i = 0; i < this.h; i++) {
            this.tiles.delete(new Pair(this.w, i));
            this.legendTiles.delete(new Pair(this.w, i));
        }
        this.loadLevel();
    },

    onRightBtnClick: function() {
        for (var i = 0; i < this.h; i++) {
            this.tiles.set(new Pair(this.w, i), new Tile(this.w, i, Color.GREY));
            this.legendTiles.set(new Pair(this.w, i), new Tile(this.w, i, Color.GREY));
        }
        this.w += 1;
        this.loadLevel();
    },

    onUpBtnClick: function() {
        this.h -= 1;
        for (var i = 0; i < this.w; i++) {
            this.tiles.delete(new Pair(i, this.h));
            this.legendTiles.delete(new Pair(i, this.h));
        }
        this.loadLevel();
    },

    onDownBtnClick: function() {
        for (var i = 0; i < this.w; i++) {
            this.tiles.set(new Pair(i, this.h), new Tile(i, this.h, Color.GREY));
            this.legendTiles.set(new Pair(i, this.h), new Tile(i, this.h, Color.GREY));
        }
        this.h += 1;
        this.loadLevel();
    },

    onLayer1Click: function(item) {
        this.layer1Active = !this.layer1Active;
        this.showLevels();
    },

    onLayer2Click: function(item) {
        this.layer2Active = !this.layer2Active;
        this.showLevels();
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