Associate.Editor = function (game) {

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

    this.palleteSize = 48;
    this.tileSize = 60;
    this.spacing = this.tileSize / 6;
    this.tileDistance = this.tileSize + this.spacing;

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

    init: function (level) {
        this.number = level.number;
        this.level = level;
        this.w = level.w;
        this.h = level.h;

        this.legendTiles = new TileMap();
        this.level.legend.forEach(function (tile) {
            this.legendTiles.set(new Pair(tile.x, tile.y), tile);
        }, this);

        this.tiles = new TileMap();
        this.level.tiles.forEach(function (tile) {
            this.tiles.set(new Pair(tile.x, tile.y), tile);
        }, this);
    },

    create: function () {
        this.game.add.tileSprite(-2, -2, this.game.world.width + 2, this.game.world.height + 2, 'paper');
        var bcgr = this.game.add.sprite(0, 0, 'sakura');
        bcgr.width = this.game.world.width;
        bcgr.height = this.game.world.height;
        bcgr.alpha = 0.3;

        this.game.add.button(5, 1, 'exit', this.onBackClick, this, 1, 0, 2).scale.setTo(0.4, 0.4);
        this.game.add.button(80, 1, 'save', this.onSaveClick, this, 1, 0, 2).scale.setTo(0.4, 0.4);

        this.game.add.button(200, 1, 'left', this.onLeftBtnClick, this, 1, 0, 2).scale.setTo(0.4, 0.4);
        this.game.add.button(270, 1, 'right', this.onRightBtnClick, this, 1, 0, 2).scale.setTo(0.4, 0.4);
        this.game.add.button(340, 1, 'up', this.onUpBtnClick, this, 1, 0, 2).scale.setTo(0.4, 0.4);
        this.game.add.button(410, 1, 'down', this.onDownBtnClick, this, 1, 0, 2).scale.setTo(0.4, 0.4);
        this.l1Btn = this.game.add.button(500, 1, 'top', this.onLayer1Click, this, 1, 0, 2).scale.setTo(0.4, 0.4);
        this.l2Btn = this.game.add.button(570, 1, 'bottom', this.onLayer2Click, this, 1, 0, 2).scale.setTo(0.4, 0.4);

        var palette = this.game.add.group();
        palette.x = this.game.world.width - this.palleteSize;
        palette.y = 0;

        palette.create(0, 0 * this.palleteSize, 'squareWhite');
        palette.create(0, 0 * this.palleteSize, 'none');
        palette.create(0, 1 * this.palleteSize, 'blue');
        palette.create(0, 2 * this.palleteSize, 'green');
        palette.create(0, 3 * this.palleteSize, 'grey');
        palette.create(0, 4 * this.palleteSize, 'red');
        palette.create(0, 5 * this.palleteSize, 'yellow');
        var lock = palette.create(0, 6 * this.palleteSize, 'lock');
        lock.width = this.palleteSize;
        lock.height = this.palleteSize;
        this.squareMask = palette.create(0, (-2) * this.palleteSize, 'squareBlack');

        palette.setAll('inputEnabled', true);
        palette.callAll('events.onInputDown.add', 'events.onInputDown', this.onPaletteClick(this));


        this.squareMask.input.enabled = false;
        this.drawLegendTiles();
        this.drawLevelTiles();
    },

    drawLegendTiles: function () {
        if (this.legendGroup) {
            this.legendGroup.destroy();
        }
        this.legendGroup = this.game.add.group();
        this.drawTiles(this.legendTiles, this.legendGroup, this.tileDistance);
        this.legendGroup.setAll('inputEnabled', true);
        this.legendGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.onTileClick(this, this.legendTiles));
    },


    drawLevelTiles: function () {
        if (this.tilesGroup) {
            this.tilesGroup.destroy();
        }
        this.tilesGroup = this.game.add.group();
        this.drawTiles(this.tiles, this.tilesGroup, this.tileSize);
        this.tilesGroup.setAll('inputEnabled', true);
        this.tilesGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.onTileClick(this, this.tiles));
        this.showLevels();
    },


    drawTiles: function (tiles, group, size) {
        tiles.entities.forEach(function (tile) {
            var sprite = group.create(tile.x * this.tileDistance, tile.y * this.tileDistance, tile.color);
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            sprite.width = size;
            sprite.height = size;
            this.sprites.set(new Pair(tile.x, tile.y), sprite);

            if (tile.lock) {
                var sprite = group.create(tile.x * this.tileDistance, tile.y * this.tileDistance, 'lock');
                sprite.anchor.x = 0.5;
                sprite.anchor.y = 0.5;
                sprite.width = size;
                sprite.height = size;
            }
        }, this);
        group.x = this.game.world.centerX - (this.w - 1) * this.tileDistance / 2;
        group.y = this.game.world.centerY - (this.h - 1) * this.tileDistance / 2;
    },

    showLevels: function () {
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

    loadLevel: function () {
        this.tileSize = this.calculateTileSize(this.game.world.width, Math.floor(this.game.world.width / 30), this.w);
        this.spacing = this.tileSize / 5;
        this.tileDistance = this.tileSize + this.spacing;

        this.tilesGroup.setAll('inputEnabled', false);
        this.game.world.removeAll();
        this.create();
    },

    onTileClick: function (context, tiles) {
        return function (item) {
            if (context.selectedColor != null) {
                var x = Math.floor(item.x / (context.tileDistance));
                var y = Math.floor(item.y / (context.tileDistance));
                if (context.selectedColor == Color.NONE) {
                    context.tiles.get(new Pair(x, y)).color = context.selectedColor;
                    context.legendTiles.get(new Pair(x, y)).color = context.selectedColor;
                } else if (context.selectedColor == 'lock') {
                    tiles.get(new Pair(x, y)).lock = !tiles.get(new Pair(x, y)).lock;
                    context.legendTiles.get(new Pair(x, y)).color = tiles.get(new Pair(x, y)).color;
                } else {
                    tiles.get(new Pair(x, y)).color = context.selectedColor;
                }
                context.drawLegendTiles();
                context.drawLevelTiles();
            }
        }
    },


    onPaletteClick: function (context) {
        return function (item) {
            if (item.key != context.selectedColor) {
                context.selectedColor = item.key;
                context.squareMask.y = item.y;
            } else {
                context.selectedColor = null;
                context.squareMask.y = context.tileSize * (-2);
            }
        }
    },


    onBackClick: function () {
        this.state.start('LevelMenu', true, false, 'Editor');
    },

    onLoadClick: function () {
        this.init(this.level);
        this.loadLevel();
    },

    onSaveClick: function () {
        var json = JSON.stringify(new Level(this.number, this.w, this.h, this.tiles.entities, this.legendTiles.entities));
        firebase.database().ref('levels/' + this.number).set(json);
    },


    onLeftBtnClick: function () {
        this.w -= 1;
        for (var i = 0; i < this.h; i++) {
            this.tiles.delete(new Pair(this.w, i));
            this.legendTiles.delete(new Pair(this.w, i));
        }
        this.loadLevel();
    },

    onRightBtnClick: function () {
        for (var i = 0; i < this.h; i++) {
            this.tiles.set(new Pair(this.w, i), new Tile(this.w, i, Color.GREY));
            this.legendTiles.set(new Pair(this.w, i), new Tile(this.w, i, Color.GREY));
        }
        this.w += 1;
        this.loadLevel();
    },

    onUpBtnClick: function () {
        this.h -= 1;
        for (var i = 0; i < this.w; i++) {
            this.tiles.delete(new Pair(i, this.h));
            this.legendTiles.delete(new Pair(i, this.h));
        }
        this.loadLevel();
    },

    onDownBtnClick: function () {
        for (var i = 0; i < this.w; i++) {
            this.tiles.set(new Pair(i, this.h), new Tile(i, this.h, Color.GREY));
            this.legendTiles.set(new Pair(i, this.h), new Tile(i, this.h, Color.GREY));
        }
        this.h += 1;
        this.loadLevel();
    },

    onLayer1Click: function (item) {
        this.layer1Active = !this.layer1Active;
        /*if (this.layer1Active) {
            this.l1Btn.setFrames(1, 0, 2);
        } else {
            this.l1Btn.setFrames(2, 0, 1);
        }*/
        this.showLevels();
    },

    onLayer2Click: function (item) {
        this.layer2Active = !this.layer2Active;
      /*  if (this.layer2Active) {
            this.l2Btn.setFrames(1, 0, 2);
        } else {
            this.l2Btn.setFrames(2, 0, 1);
        }*/
        this.showLevels();
    },

    update: function () {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
    },

    calculateTileSize: function(width, border, rows) {
        var w = width - 2 * border;
        var distance = Math.floor(w / rows);
        var size = Math.floor(distance * .8);
        return size;
    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        //this.state.start('MainMenu');

    }

};