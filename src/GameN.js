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

    this.tiles = new TileMap();
    this.selected = new TileMap();

    this.clicked = null;
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
                tile.tileX = i;
                tile.tileY = j;

                this.tiles.set(new Phaser.Point(i, j), tile);
            }
        }

        spaceGroup.setAll('inputEnabled', true);
        spaceGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.onTileDown.bind(this));
        spaceGroup.callAll('events.onInputUp.add', 'events.onInputUp', this.onTileUp.bind(this));

        this.input.addMoveCallback(this.move.bind(this), this);
    },

    onTileDown: function (tile) {
        console.log("DOWN");

        this.clicked = new Phaser.Point(tile.x, tile.y);

        var key = tile.key;
        this.floodFill(new Phaser.Point(tile.tileX, tile.tileY), key);
        if (key == 'white') {
            key = 'blue'
        } else {
            key = 'white'
        }

        this.selected.entities.forEach(function (tile) {
            //tile.loadTexture(key);
        }, this);
    },

    onTileUp: function () {
        console.log("UP");
        this.clicked = null;
        this.selected = new TileMap();
    },

    floodFill: function (p, n) {
        if (p.x < 0 || p.y < 0 || p.x >= this.mapWidth || p.y >= this.mapHeight) {
            return;
        }
        if (this.tiles.get(p).key == n && !this.selected.hasKey(p)) {
            this.selected.set(p, this.tiles.get(p));
            this.floodFill(new Phaser.Point(p.x + 1, p.y), n);
            this.floodFill(new Phaser.Point(p.x - 1, p.y), n);
            this.floodFill(new Phaser.Point(p.x, p.y + 1), n);
            this.floodFill(new Phaser.Point(p.x, p.y - 1), n);
        }
    },

    canMove: function (moveX, moveY) {
        var can = true;
        this.selected.entities.forEach(function (tile) {
            var nextPoint = new Phaser.Point(tile.tileX + moveX, tile.tileY + moveY);
            if (nextPoint.x < 0 || nextPoint.y < 0 || nextPoint.x >= this.mapWidth || nextPoint.y >= this.mapHeight) {
                can = false;
                return;
            }
            if (this.selected.hasKey(nextPoint)) {
                return;
            }
            var nextTile = this.tiles.get(nextPoint);
            if (nextTile.key == tile.key) {
                can = false;
            }
        }, this);
        console.log("can move : " + can);
        return can;
    },

    move: function (pointer, x, y) {
        if (this.clicked) {
            var margX = x - this.clicked.x;
            var margY = y - this.clicked.y;
            if (Math.abs(margX) > Math.abs(margY)) {
                if (margX > 0) {
                    this.canMove(1, 0);
                } else {
                    this.canMove(-1, 0);

                }
            } else {
                if (margY > 0) {
                    this.canMove(0, 1);

                } else {
                    this.canMove(0, -1);

                }
            }
        }
    }
};