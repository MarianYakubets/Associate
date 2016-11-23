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

    this.tileSize;
    this.spacing;
    this.tileDistance;
    this.menu;

    this.w = 3;
    this.h = 3;

    this.tiles;
    this.legendTiles;
    this.sprites;
    this.tilesGroup;

    this.level;
    this.clicked = false;
};

Associate.Game.prototype = {

    init: function(level) {
        this.tiles = new TileMap();
        this.legendTiles = new TileMap();
        this.sprites = new TileMap();

        this.level = level;
        this.w = level.w;
        this.h = level.h;

        this.calculateTileSize();

        this.legendTiles = new TileMap();
        this.level.legend.forEach(function(tile) {
            this.legendTiles.set(new Pair(tile.x, tile.y), new Tile(tile.x, tile.y, tile.color, tile.lock));
        }, this);

        this.tiles = new TileMap();
        this.level.tiles.forEach(function(tile) {
            this.tiles.set(new Pair(tile.x, tile.y), new Tile(tile.x, tile.y, tile.color, tile.lock));
        }, this);
    },

    create: function() {
        this.menu = null;
        this.drawTilesBcgr();

        var frameTop = this.game.add.sprite(0, 0, 'frameTop');
        var frameScale = this.game.world.width / frameTop.width;
        frameTop.scale.setTo(frameScale, frameScale);

        this.game.add.button(0, 0, 'pause', this.onPauseClick, this, 0, 0, 1, 0).scale.setTo(frameScale, frameScale);

        var legendGroup = this.drawTiles(this.legendTiles, this.game.add.group(), this.tileDistance, 'legend');
        legendGroup.alpha = 0.0;


        this.tilesGroup = this.game.add.group();
        this.drawTiles(this.tiles, this.tilesGroup, this.tileSize, 'monster');

        this.sprites.entities.forEach(function(sprite) {
            sprite.inputEnabled = true;
            sprite.events.onInputDown.add(this.onTileClick(this), this);
        }, this);
    },

    drawTilesBcgr: function() {
        var back = this.game.add.group();
        var leaveSize = this.tileDistance;
        var w = Math.ceil(this.game.world.width / leaveSize);
        var h = Math.ceil(this.game.world.height / leaveSize);
        for (var i = 0; i < w; i++) {
            for (var j = 0; j < h; j++) {
                var tile = back.create(i * leaveSize, j * leaveSize, 'backTile');
                tile.width = leaveSize + 10;
                tile.height = leaveSize + 10;
                if (i % 2 == 1 || j % 2 == 1) {
                    var tile = back.create(i * leaveSize, j * leaveSize, 'backTileRound');
                    tile.width = leaveSize + 2;
                    tile.height = leaveSize + 2;
                }
            }
        }
        back.x = 0;
        back.y = 250 - this.tileDistance / 2;
    },

    drawTiles: function(tiles, group, size, type) {
        tiles.entities.forEach(function(tile) {
            if (tile.color != Color.NONE) {
                if (type == 'legend') {
                    var sprite = group.create(tile.x * this.tileDistance, tile.y * this.tileDistance, tile.color);
                } else {
                    var sprite = group.create(tile.x * this.tileDistance, tile.y * this.tileDistance, 'monster');
                    sprite.frame = ColorToFrame[tile.color];
                }

                sprite.tileX = tile.x;
                sprite.tileY = tile.y;

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
            }

        }, this);
        group.x = this.tileDistance / 2;
        group.y = 250;
        return group;
    },

    checkWin: function() {
        var victory = true;
        this.legendTiles.entities.forEach(function(tile) {
            if (this.tiles.get(new Pair(tile.x, tile.y)).color != tile.color) {
                victory = false;
                return;
            }
        }, this);

        if (victory) {
            this.setOnVictory();
            this.saveHighestLevel();
        }
        this.clicked = false;
        return victory;
    },

    onTileClick: function(context) {
        return function(item) {
            if (context.clicked) {
                return;
            }
            context.clicked = true;
            var x = item.tileX;
            var y = item.tileY;
            var nearTiles = context.getNeighbors(x, y, context.tiles);
            var baseTile = context.tiles.get(new Pair(x, y));
            nearTiles.forEach(function(a, i) {
                var tile = context.tiles.get(new Pair(a[0], a[1]));
                if (tile.color != baseTile.color) {
                    context.flip(context, baseTile.color, context.sprites.get(new Pair(a[0], a[1])), i * 50);
                    this.tiles.get(new Pair(a[0], a[1])).color = baseTile.color;
                }
            }, context);
            var timer = context.game.time.create(false);
            timer.add(nearTiles.length * 50 + 750, context.checkWin, this);
            timer.start();
        }
    },

    flip: function(context, type, item, delay) {
        var scale = item.scale.x;
        var flip = context.game.add.tween(item.scale).to({
            x: 0,
            y: scale
        }, 200, Phaser.Easing.None, true, delay);
        flip.onComplete.add(function() {
            item.frame = ColorToFrame[type];
            context.game.add.tween(item.scale).to({
                x: scale,
                y: scale
            }, 150, Phaser.Easing.None, true);
        }, this);
    },

    getNeighbors: function(x, y, tiles) {
        var n = [];

        var i = x - 1;
        while (i >= 0) {
            if (tiles.get(new Pair(i, y)).lock || (tiles.get(new Pair(i, y)).color == Color.NONE)) {
                break;
            }
            n.push([i, y]);
            i--;
        }

        i = x + 1;
        while (i < this.w) {
            if (tiles.get(new Pair(i, y)).lock || (tiles.get(new Pair(i, y)).color == Color.NONE)) {
                break;
            }
            n.push([i, y]);
            i++;
        }

        i = y - 1;
        while (i >= 0) {
            if (tiles.get(new Pair(x, i)).lock || (tiles.get(new Pair(x, i)).color == Color.NONE)) {
                break;
            }
            n.push([x, i]);
            i--;
        }

        i = y + 1;
        while (i < this.h) {
            if (tiles.get(new Pair(x, i)).lock || (tiles.get(new Pair(x, i)).color == Color.NONE)) {
                break;
            }
            n.push([x, i]);
            i++;
        }

        return n;
    },

    onPauseClick: function() {
        this.setOnPause();
    },

    calculateTileSize: function() {
        if (this.w <= 4) {
            this.tileDistance = this.game.world.width / 4;
        } else {
            this.tileDistance = this.game.world.width / 8;
        }

        this.tileSize = this.tileDistance * .8;
        this.spacing = this.tileSize / 5;
    },

    update: function() {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
    },

    quitGame: function(pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        //this.state.start('MainMenu');

    },


    setOnVictory: function() {
        this.menu = this.game.add.group();

        var back = this.menu.create(0, 0, 'menu');
        back.width = this.game.world.width * .8;
        back.height = this.game.world.height * .8;
        back.tint = 0xDAA520;

        var h = back.height / 7;

        var retry = this.game.add.button(back.centerX - 277, this.menu.height - 200, 'retry', function() {
            this.game.state.restart(true, false, this.level);
        }, this, 0, 0, 1, 0);
        this.menu.add(retry);

        var play = this.game.add.button(back.centerX - 77, this.menu.height - 200, 'next', function() {
            this.state.start('Game', true, false, LevelManager.getLevel(++this.level.number));
        }, this, 0, 0, 1, 0);
        this.menu.add(play);

        var home = this.game.add.button(back.centerX + 200, this.menu.height - 200, 'homeBig', this.onBtnClick('LevelMenu'), this, 0, 0, 1, 0);
        this.menu.add(home);

        this.menu.x = this.game.world.centerX - back.width / 2;
        this.menu.y = this.game.world.centerY - back.height / 2;

        this.game.add.tween(this.menu).from({
            y: -600
        }, 1000, Phaser.Easing.Bounce.Out, true);
    },

    setOnPause: function() {
        if (this.menu != null) {
            return;
        }
        this.menu = this.game.add.group();

        var back = this.menu.create(0, 0, 'menu');
        back.width = this.game.world.width * .8;
        back.height = this.game.world.height * .8;

        var h = back.height / 7;

        var retry = this.game.add.button(back.centerX - 277, this.menu.height - 200, 'retry', function() {
            this.game.state.restart(true, false, this.level);
        }, this, 0, 0, 1, 0);
        this.menu.add(retry);

        var play = this.game.add.button(back.centerX - 77, this.menu.height - 200, 'playBig', this.onCloseClick, this, 0, 0, 1, 0);
        this.menu.add(play);

        var home = this.game.add.button(back.centerX + 200, this.menu.height - 200, 'homeBig', this.onBtnClick('LevelMenu'), this, 0, 0, 1, 0);
        this.menu.add(home);



        this.menu.x = this.game.world.centerX - back.width / 2;
        this.menu.y = this.game.world.centerY - back.height / 2;

        this.game.add.tween(this.menu).from({
            y: -600
        }, 1000, Phaser.Easing.Bounce.Out, true);


    },

    onBtnClick: function(name) {
        return function() {
            this.state.start(name, true, false, 'Game');
        }
    },

    onCloseClick: function() {
        this.unPause();
    },

    unPause: function() {
        this.menu.removeAll();
        this.menu = null;
        this.game.paused = false;
    },

    saveHighestLevel: function() {
        var oldMax = localStorage.getItem("reached-level");
        var currentMax = 1 + parseInt(this.level.number);
        if (currentMax > oldMax) {
            localStorage.setItem("reached-level", currentMax);
        }
    }

};