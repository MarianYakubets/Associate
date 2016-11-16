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
    this.tiles = new TileMap();
    this.legendTiles = new TileMap();
    this.sprites = new TileMap();

    this.tilesGroup;

    this.level;
    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

Associate.Game.prototype = {

    init: function(level) {
        this.level = level;
        this.w = level.w;
        this.h = level.h;

        this.tileSize = this.calculateTileSize(this.game.world.width, Math.floor(this.game.world.width / 30), level.w);
        this.spacing = this.tileSize / 5;
        this.tileDistance = this.tileSize + this.spacing;

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
        this.game.add.tileSprite(-2, -2, this.game.world.width + 2, this.game.world.height + 2, 'paper');
        var bcgr = this.game.add.sprite(0, 0, 'sakura');
        bcgr.width = this.game.world.width;
        bcgr.height = this.game.world.height;
        bcgr.alpha = 0.3;

        this.game.add.button(0, 0, 'exit', this.onBackClick, this, 1, 0, 2).scale.setTo(0.5, 0.5);

        this.drawTiles(this.legendTiles, this.game.add.group(), this.tileDistance);

        this.tilesGroup = this.game.add.group();
        this.drawTiles(this.tiles, this.tilesGroup, this.tileSize);

        this.sprites.entities.forEach(function(sprite) {
            sprite.inputEnabled = true;
            sprite.events.onInputDown.add(this.onTileClick(this), this);
        }, this);
    },


    drawTiles: function(tiles, group, size) {
        tiles.entities.forEach(function(tile) {
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


    loadLevel: function() {},

    checkWin: function() {
        var victory = true;
        this.legendTiles.entities.forEach(function(tile) {
            if (this.tiles.get(new Pair(tile.x, tile.y)).color != tile.color) {
                victory = false;
                return;
            }
        }, this);
        return victory;
    },

    onTileClick: function(context) {
        return function(item) {
            var x = Math.floor(item.x / (context.tileDistance));
            var y = Math.floor(item.y / (context.tileDistance));
            context.getNeighbors(x, y, context.tiles).forEach(function(a, i) {
                context.tiles.get(new Pair(a[0], a[1])).color = item.key;
                context.flip(context, item.key, context.sprites.get(new Pair(a[0], a[1])), i * 50);
            }, context);
            console.log("Victory : " + context.checkWin());
        }
    },

    flip: function(context, type, item, delay) {
        if (item.key == type) {
            return;
        }
        var scale = item.scale.x;
        var flip = context.game.add.tween(item.scale).to({
            x: 0,
            y: scale
        }, 200, Phaser.Easing.None, true, delay);
        flip.onComplete.add(function() {
            item.loadTexture(type);
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

    onBackClick: function() {
        //this.state.start('LevelMenu', true, false, 'Game');
        this.setOnPause();
    },

    calculateTileSize: function(width, border, rows) {
        var w = width - 2 * border;
        var distance = Math.floor(w / rows);
        var size = Math.floor(distance * .8);
        return size;
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

    setOnPause: function() {
        this.game.paused = true;

        this.menu = this.game.add.group();

        var back = this.menu.create(0, 0, 'paper');
        //var front = this.menu.create(0, 0, 'leaves');
        back.width = this.game.world.width * .8;
        back.height = this.game.world.height * .8;
        back.tint = 0xDAA520;
        //front.alpha = 0.1;
        //front.width = this.game.world.width * .8;
        //front.height = this.game.world.height * .8;

        this.menu.x = this.game.world.centerX - back.width / 2;
        this.menu.y = this.game.world.centerY - back.height / 2;

        this.game.input.onDown.add(this.unPause, this);
    },

    unPause: function(event) {
        if (this.game.paused) {
            if (event.x > this.menu.x && this.menu.x < this.menu.x + this.menu.width &&
                event.y > this.menu.y && this.menu.y < this.menu.y + this.menu.height) {
                //Click inside menu
            } else {
                this.menu.removeAll();
                this.game.paused = false;
            }
        }
    }

};