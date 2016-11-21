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
};

Associate.Game.prototype = {

    init: function (level) {
        this.tiles = new TileMap();
        this.legendTiles = new TileMap();
        this.sprites = new TileMap();

        this.level = level;
        this.w = level.w;
        this.h = level.h;

        var size1 = this.calculateTileSize(this.game.world.width, Math.floor(this.game.world.width / 30), this.w);
        var size2 = this.calculateTileSize(this.game.world.height, Math.floor(this.game.world.height / 30), this.h);

        this.tileSize = size2 < size1 ? size2 : size1;
        this.spacing = this.tileSize / 5;
        this.tileDistance = this.tileSize + this.spacing;

        this.legendTiles = new TileMap();
        this.level.legend.forEach(function (tile) {
            this.legendTiles.set(new Pair(tile.x, tile.y), new Tile(tile.x, tile.y, tile.color, tile.lock));
        }, this);

        this.tiles = new TileMap();
        this.level.tiles.forEach(function (tile) {
            this.tiles.set(new Pair(tile.x, tile.y), new Tile(tile.x, tile.y, tile.color, tile.lock));
        }, this);
    },

    create: function () {
        this.menu = null;
        var bcgr = this.game.add.sprite(0, 0, 'BG');
        bcgr.width = this.game.world.width;
        bcgr.height = this.game.world.height;

        this.game.add.button(0, 0, 'pause', this.onPauseClick, this, 2, 2, 1).scale.setTo(0.5, 0.5);

        this.drawTiles(this.legendTiles, this.game.add.group(), this.tileDistance, 'legend');

        this.tilesGroup = this.game.add.group();
        this.drawTiles(this.tiles, this.tilesGroup, this.tileSize, 'monster');

        this.sprites.entities.forEach(function (sprite) {
            sprite.inputEnabled = true;
            sprite.events.onInputDown.add(this.onTileClick(this), this);
        }, this);
    },

    drawTiles: function (tiles, group, size, type) {
        tiles.entities.forEach(function (tile) {
            if (tile.color != Color.NONE) {
                if (type == 'legend') {
                    var sprite = group.create(tile.x * this.tileDistance, tile.y * this.tileDistance, tile.color);
                } else {
                    var sprite = group.create(tile.x * this.tileDistance, tile.y * this.tileDistance, 'monster');
                    sprite.frame = ColorToFrame[tile.color];
                }

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
        group.x = this.game.world.centerX - (this.w - 1) * this.tileDistance / 2;
        group.y = this.game.world.centerY - (this.h - 1) * this.tileDistance / 2;
    },

    checkWin: function () {
        var victory = true;
        this.legendTiles.entities.forEach(function (tile) {
            if (this.tiles.get(new Pair(tile.x, tile.y)).color != tile.color) {
                victory = false;
                return;
            }
        }, this);

        if (victory) {
            this.setOnVictory();
            this.saveHighestLevel();
        }

        return victory;
    },

    onTileClick: function (context) {
        return function (item) {
            var x = Math.floor(item.x / (context.tileDistance));
            var y = Math.floor(item.y / (context.tileDistance));
            var nearTiles = context.getNeighbors(x, y, context.tiles);
            var baseTile = context.tiles.get(new Pair(x, y));
            nearTiles.forEach(function (a, i) {
                var tile = context.tiles.get(new Pair(a[0], a[1]));
                //if (tile.color != baseTile.color) {
                    context.flip(context, baseTile.color, context.sprites.get(new Pair(a[0], a[1])), i * 50);
                    this.tiles.get(new Pair(a[0], a[1])).color = baseTile.color;
                //}
            }, context);
            var timer = context.game.time.create(false);
            timer.add(nearTiles.length * 50 + 750, context.checkWin, this);
            timer.start();
        }
    },

    tileByPoint: function (x, y) {
        x = Math.floor(x / (this.tileDistance));
        y = Math.floor(y / (this.tileDistance));
        return this.tiles.get(new Pair(x, y));
    },

    flip: function (context, type, item, delay) {
        var scale = item.scale.x;
        var flip = context.game.add.tween(item.width).to({
            width: 0
        }, 200, Phaser.Easing.None, true, delay);
        flip.onComplete.add(function () {
            item.frame = ColorToFrame[type];
            context.game.add.tween(item.scale).to({
                x: scale,
                y: scale
            }, 150, Phaser.Easing.None, true);
        }, this);
    },

    getNeighbors: function (x, y, tiles) {
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

    onPauseClick: function () {
        this.setOnPause();
    },

    calculateTileSize: function (width, border, rows) {
        var w = width - 2 * border;
        var distance = Math.floor(w / rows);
        return Math.floor(distance * .8);
    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        //this.state.start('MainMenu');

    },


    setOnVictory: function () {
        this.menu = this.game.add.group();

        var back = this.menu.create(0, 0, 'menu');
        back.width = this.game.world.width * .8;
        back.height = this.game.world.height * .8;
        back.tint = 0xDAA520;

        var h = back.height / 7;

        var rtr = new LabelButton(this.game, (back.width) / 2, h, "long", "Next", null, function () {
            this.state.start('Game', true, false, LevelManager.getLevel(++this.level.number));
        }, this, 0, 1, 2, 3);
        this.menu.add(rtr);

        var lvl = new LabelButton(this.game, (back.width) / 2, h * 3, "long", "Levels", null, this.onBtnClick('LevelMenu'), this, 0, 1, 2, 3);
        this.menu.add(lvl);

        var mn = new LabelButton(this.game, (back.width) / 2, h * 5, "long", "Menu", null, this.onBtnClick('MainMenu'), this, 0, 1, 2, 3);
        this.menu.add(mn);

        this.menu.x = this.game.world.centerX - back.width / 2;
        this.menu.y = this.game.world.centerY - back.height / 2;
    },

    setOnPause: function () {
        if (this.menu != null) {
            return;
        }
        this.menu = this.game.add.group();

        var back = this.menu.create(0, 0, 'menu');
        back.width = this.game.world.width * .8;
        back.height = this.game.world.height * .8;
        back.tint = 0xDAA520;

        var h = back.height / 7;

        var rtr = new LabelButton(this.game, (back.width) / 2, h, "long", "Retry", null, function () {
            this.game.state.restart(true, false, this.level);
        }, this, 0, 1, 2, 3);
        this.menu.add(rtr);

        var lvl = new LabelButton(this.game, (back.width) / 2, h * 3, "long", "Levels", null, this.onBtnClick('LevelMenu'), this, 0, 1, 2, 3);
        this.menu.add(lvl);

        var mn = new LabelButton(this.game, (back.width) / 2, h * 5, "long", "Menu", null, this.onBtnClick('MainMenu'), this, 0, 1, 2, 3);
        this.menu.add(mn);

        var closeBtn = this.game.add.button(back.width, this.menu.y, 'close', this.onCloseClick, this, 0, 2, 1);
        closeBtn.scale.setTo(0.5, 0.5);
        closeBtn.anchor.setTo(0.5, 0.5);
        this.menu.add(closeBtn);


        this.menu.x = this.game.world.centerX - back.width / 2;
        this.menu.y = this.game.world.centerY - back.height / 2;

    },

    onBtnClick: function (name) {
        return function () {
            this.state.start(name, true, false, 'Game');
        }
    },

    onCloseClick: function () {
        this.unPause();
    },

    unPause: function () {
        this.menu.removeAll();
        this.menu = null;
        this.game.paused = false;
    },

    saveHighestLevel: function () {
        var oldMax = localStorage.getItem("reached-level");
        var currentMax = 1 + parseInt(this.level.number);
        if (currentMax > oldMax) {
            localStorage.setItem("reached-level", currentMax);
        }
    }

};