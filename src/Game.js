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

    this.tilesTopDistance = 280;

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
    this.selectedGroup;
    this.noClickSprites;


    this.level;
    this.clicked = false;
    this.selectedTile = null;

    this.moves = 0;
    this.movesText;

    this.bar
    this.starOne;
    this.starTwo;
    this.starThree;

};

Associate.Game.prototype = {

    init: function (level) {
        this.tiles = new TileMap();
        this.legendTiles = new TileMap();
        this.sprites = new TileMap();
        this.noClickSprites = new TileMap();
        this.selectedTile = null;

        this.level = level;
        this.w = level.w;
        this.h = level.h;

        this.calculateTileSize();

        this.legendTiles = new TileMap();
        this.level.legend.forEach(function (tile) {
            this.legendTiles.set(new Pair(tile.x, tile.y), new Tile(tile.x, tile.y, tile.color, tile.lock));
        }, this);

        this.tiles = new TileMap();
        this.level.tiles.forEach(function (tile) {
            this.tiles.set(new Pair(tile.x, tile.y), new Tile(tile.x, tile.y, tile.color, tile.lock, tile.egg, tile.grass));
        }, this);
    },

    anyDown: function (context) {
        return function () {
            if (context.selectedTile != null) {
                context.selectedTile.width = context.selectedTile.width / 1.1;
                context.selectedTile.height = context.selectedTile.height / 1.1;
                context.deselectNeighbors();
                context.selectedTile = null;
            }
        }
    },

    addQuake: function (sprite) {
        var rumbleOffset = 4;
        var properties = {
            y: sprite.y - rumbleOffset
        };
        var duration = 100;
        var repeat = 2;
        var ease = Phaser.Easing.Bounce.Out;
        var autoStart = false;
        var delay = 10;
        var yoyo = true;
        var quake = this.game.add.tween(sprite)
            .to(properties, duration, ease, autoStart, delay, 4, yoyo);
        quake.start();
    },

    create: function () {
        this.menu = null;
        this.moves = 0;
        this.drawTilesBcgr();

        var frameTop = this.game.add.sprite(0, 0, 'frameTop');
        frameTop.width = this.game.world.width;
        frameTop.height = 200;

        var shadow = this.game.add.sprite(0, 200, 'boardShadow');
        shadow.width = this.game.world.width;
        shadow.height = 65;

        var frameBottom = this.game.add.sprite(0, 1820, 'frameTop');
        frameBottom.width = this.game.world.width;
        frameBottom.height = 100;

        var pause = this.game.add.button(this.game.width - 160, 20, 'pause', this.onPauseClick, this, 0, 0, 1, 0);
        pause.scale.setTo(2, 2);

        var style = {
            'font': '70px Dosis',
            'fill': 'white',
            'fontWeight': 'bold'
        };
        this.movesText = this.game.add.text(pause.x - pause.width, pause.y, this.moves, style);

        var track = this.game.add.image(pause.x - pause.width * 2.1, pause.y + pause.height * .8, 'preloaderTrack');
        track.width = 270;
        track.height = 17;
        this.bar = this.game.add.image(pause.x - pause.width * 2.1, pause.y + pause.height * .8, 'preloaderBar');
        this.bar.width = 270;
        this.bar.height = 14;

        var difference = track.width / this.level.star.one;
        this.starThree = this.game.add.image(track.x + 30 + difference * (this.level.star.one - this.level.star.three), track.y, 'starSmall');
        this.starThree.scale.setTo(2, 2);
        this.starThree.anchor.setTo(.5, .5);

        this.starTwo = this.game.add.image(track.x + 30 + difference * (this.level.star.one - this.level.star.two), track.y, 'starSmall');
        this.starTwo.scale.setTo(2, 2);
        this.starTwo.anchor.setTo(.5, .5);

        this.starOne = this.game.add.image(track.x + 30, track.y, 'starSmall');
        this.starOne.scale.setTo(2, 2);
        this.starOne.anchor.setTo(.5, .5);

        this.drawTiles(this.legendTiles, this.game.add.group(), this.tileDistance, 'legend');

        this.tilesGroup = this.game.add.group();
        this.drawTiles(this.tiles, this.tilesGroup, this.tileSize, 'monster');

        this.selectedGroup = this.game.add.group();
        this.selectedGroup.x = this.tileDistance / 2;
        this.selectedGroup.y = this.tilesTopDistance + this.tileDistance / 2;

        this.sprites.entities.forEach(function (sprite) {
            sprite.inputEnabled = true;
            sprite.events.onInputDown.add(this.onTileClick(this), this);
        }, this);

        this.game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);
    },

    updateCounter: function () {
        var x = this.game.rnd.integerInRange(0, this.sprites.entities.length - 1);
        var tile = this.sprites.entities[x];
        this.addQuake(tile);
    },

    drawTilesBcgr: function () {
        this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "backTile");
        var back = this.game.add.group();
        var leaveSize = this.tileDistance;
        var w = Math.ceil(this.game.world.width / leaveSize);
        var h = Math.ceil(this.game.world.height / leaveSize);

        for (var i = 0; i < w; i++) {
            for (var j = 0; j < h; j++) {
                if ((i % 2 == 1 && j % 2 == 0) || (i % 2 == 0 && j % 2 == 1)) {
                    if ((w == 4)) {
                        if (j < 5) {
                            var tile = back.create(i * leaveSize, j * leaveSize, 'backTileRound');
                            tile.width = leaveSize;
                            tile.height = leaveSize;
                        }
                    } else {
                        if (j < 10) {
                            var tile = back.create(i * leaveSize, j * leaveSize, 'backTileRound');
                            tile.width = leaveSize;
                            tile.height = leaveSize;
                        }
                    }
                }
            }
        }
        back.x = 0;
        back.y = this.tilesTopDistance;
        back.setAll('inputEnabled', true);
        back.callAll('events.onInputDown.add', 'events.onInputDown', this.anyDown(this));

        back.setAll('input.priorityID', 0);
    },

    drawTiles: function (tiles, group, size, type) {
        tiles.entities.forEach(function (tile) {
            if (tile.grass) {
                var sprite = group.create(tile.x * this.tileDistance, tile.y * this.tileDistance, 'tiles');
                sprite.frame = 2;

                sprite.tileX = tile.x;
                sprite.tileY = tile.y;

                sprite.anchor.x = 0.5;
                sprite.anchor.y = 0.5;

                sprite.width = size * 1.15;
                sprite.height = size * 1.15;
            }
            if (tile.color != Color.NONE) {
                if (type == 'legend') {
                    var sprite = group.create(tile.x * this.tileDistance, tile.y * this.tileDistance, 'frame');
                    sprite.frame = ColorToFrame[tile.color] / 2;

                    sprite.width = size * .85;
                    sprite.height = size * .85;

                    sprite.alpha = .6;
                } else {
                    var shadow = group.create(tile.x * this.tileDistance, tile.y * this.tileDistance, 'shadow');
                    var scaleFactor = size * .65 / shadow.width;
                    shadow.scale.setTo(scaleFactor, scaleFactor);
                    shadow.anchor.x = 0.5;
                    shadow.anchor.y = 0.5;
                    shadow.y = shadow.y + size * .4;

                    sprite = group.create(tile.x * this.tileDistance, tile.y * this.tileDistance, 'monster');

                    var legend = this.legendTiles.get(new Pair(tile.x, tile.y));
                    if (legend.color == tile.color) {
                        sprite.frame = ColorToFrame[tile.color] /*+ 1*/;
                    } else {
                        sprite.frame = ColorToFrame[tile.color];
                    }

                    sprite.width = size;
                    sprite.height = size;

                    if (tile.egg) {
                        sprite.alpha = 0;
                    }

                    this.sprites.set(new Pair(tile.x, tile.y), sprite);
                }

                sprite.tileX = tile.x;
                sprite.tileY = tile.y;

                sprite.anchor.x = 0.5;
                sprite.anchor.y = 0.5;


                if (tile.lock || tile.egg) {
                    if (tile.egg) {
                        var sprite = group.create(tile.x * this.tileDistance, tile.y * this.tileDistance, 'tiles');
                        sprite.frame = 1;
                    } else {
                        var sprite = group.create(tile.x * this.tileDistance, tile.y * this.tileDistance, 'monster');
                        sprite.frame = 12;
                    }

                    sprite.tileX = tile.x;
                    sprite.tileY = tile.y;

                    sprite.anchor.x = 0.5;
                    sprite.anchor.y = 0.5;

                    sprite.width = size;
                    sprite.height = size;

                    this.noClickSprites.set(new Pair(tile.x, tile.y), sprite);
                }
            }

        }, this);
        group.x = this.tileDistance / 2;
        group.y = this.tilesTopDistance + this.tileDistance / 2;
        return group;
    },

    onTilesMove: function () {
        this.moves = this.moves + 1;
        this.movesText.text = this.moves;
        this.bar.width = 10 + 250 * (this.level.star.one - this.moves * .8) / this.level.star.one;
        if (this.bar.width < 10) {
            this.bar.width = 10;
        }
        if (this.level.star.three < this.moves) {
            this.starThree.loadTexture('starSmallOff');
        }
        if (this.level.star.two < this.moves) {
            this.starTwo.loadTexture('starSmallOff');
        }
        if (this.level.star.one < this.moves) {
            this.starOne.loadTexture('starSmallOff');
        }
    },

    checkWin: function () {
        this.onTilesMove();
        var victory = true;
        this.legendTiles.entities.forEach(function (tile) {
            if (tile.color == Color.NONE) {

            }
            else if (this.tiles.get(new Pair(tile.x, tile.y)).color != tile.color) {
                victory = false;
            }
        }, this);

        if (victory) {
            var timer = this.game.time.create(false);
            timer.add(750, this.setOnVictory, this);
            timer.start();
            this.saveLevelInformation();
        }
        this.clicked = false;
        return victory;
    },

    onTileClick: function (context) {
        return function (item) {
            if (this.menu != null) {
                return;
            }
            if (context.clicked || context.tiles.get(new Pair(item.tileX, item.tileY)).lock ||
                context.tiles.get(new Pair(item.tileX, item.tileY)).egg) {
                return;
            }
            if (context.selectedTile == null) {
                context.selectedTile = item;
                context.selectedTile.width = context.selectedTile.width * 1.1;
                context.selectedTile.height = context.selectedTile.height * 1.1;
                context.selectNeighbors();
                return;
            }
            context.selectedTile.width = context.selectedTile.width / 1.1;
            context.selectedTile.height = context.selectedTile.height / 1.1;
            if (context.selectedTile != item) {
                this.deselectNeighbors();
                context.selectedTile = null;
                return;
            }
            this.deselectNeighbors();
            context.selectedTile = null;

            context.clicked = true;
            var x = item.tileX;
            var y = item.tileY;
            var nearTiles = context.getNeighbors(x, y, context.tiles);
            var baseTile = context.tiles.get(new Pair(x, y));
            nearTiles.forEach(function (a, i) {
                var tile = context.tiles.get(new Pair(a[0], a[1]));
                if (tile.lock || tile.egg) {
                    var ice = context.noClickSprites.get(new Pair(a[0], a[1]));
                    ice.loadTexture('explosionIce', 0);
                    ice.height = item.height * .7;
                    ice.width = item.width * .7;
                    var anim = ice.animations.add('boom');
                    anim.onComplete.add(function () {
                        ice.destroy();
                    }, this);
                    ice.animations.play('boom', 20, false);
                    if (tile.lock) {
                        tile.lock = false;
                    }
                    if (tile.egg) {
                        tile.egg = false;
                        context.sprites.get(new Pair(tile.x, tile.y)).alpha = 1;

                    }
                } else if (tile.color != baseTile.color) {
                    if (!tile.grass) {
                        context.flip(context, baseTile.color, context.sprites.get(new Pair(a[0], a[1])), i * 50);
                        tile.color = baseTile.color;
                    }
                }
            }, context);
            var timer = context.game.time.create(false);
            timer.add(nearTiles.length * 50 + 550, context.checkWin, this);
            timer.start();
        }
    },

    flip: function (context, type, item) {
        item.alpha = 0;
        var tile = this.tiles.get(new Pair(item.tileX, item.tileY));
        var boom = this.game.add.sprite(item.world.x, item.world.y, 'explosion' + tile.color, 0);
        boom.anchor.x = .5;
        boom.anchor.y = .5;
        var anim = boom.animations.add('boom', [0, 1, 2, 3, 4, 5]);
        anim.onComplete.add(function () {
            boom.loadTexture('explosion' + type, 0);
            var reverse = boom.animations.add('reverse', [0, 1, 2, 3, 4, 5]).reverse();
            reverse.onComplete.add(function () {
                boom.destroy();

                this.legendTiles.get(new Pair(item.tileX, item.tileY));
                item.frame = ColorToFrame[type];
                item.alpha = 1;
            }, this);
            boom.animations.play('reverse', 20, false);
        }, this);
        boom.animations.play('boom', 20, false);
    },

    deselectNeighbors: function () {
        this.selectedGroup.removeAll();
        if (this.selectedTile == null) {
            return;
        }
        var tile = this.selectedTile;
        tile.frame = tile.frame - 1;

        var nearTiles = this.getNeighbors(tile.tileX, tile.tileY, this.tiles);
        nearTiles.forEach(function (tile) {
            var sprite = this.sprites.get(new Pair(tile[0], tile[1]));
            sprite.frame = sprite.frame - 1;
        }, this);
    },

    selectNeighbors: function () {
        var tile = this.selectedTile;

        var circle = this.selectedGroup.create(tile.x, tile.y, 'tiles', 0);
        circle.anchor.set(.5, .5);
        circle.width = tile.width;
        circle.height = tile.height;

        tile.frame = tile.frame + 1;

        var nearTiles = this.getNeighbors(tile.tileX, tile.tileY, this.tiles);
        nearTiles.forEach(function (tile) {
            var sprite = this.sprites.get(new Pair(tile[0], tile[1]));
            sprite.frame = sprite.frame + 1;
        }, this);
    },

    getNeighbors: function (x, y, tiles) {
        var n = [];

        var i = x - 1;
        while (i >= 0) {
            if ((tiles.get(new Pair(i, y)).color == Color.NONE)) {
                break;
            }
            n.push([i, y]);
            if (tiles.get(new Pair(i, y)).lock || tiles.get(new Pair(i, y)).egg) {
                break;
            }
            i--;
        }

        i = x + 1;
        while (i < this.w) {
            if ((tiles.get(new Pair(i, y)).color == Color.NONE)) {
                break;
            }
            n.push([i, y]);
            if (tiles.get(new Pair(i, y)).lock || tiles.get(new Pair(i, y)).egg) {
                break;
            }
            i++;
        }

        i = y - 1;
        while (i >= 0) {
            if ((tiles.get(new Pair(x, i)).color == Color.NONE)) {
                break;
            }
            n.push([x, i]);
            if (tiles.get(new Pair(x, i)).lock || tiles.get(new Pair(x, i)).egg) {
                break;
            }
            i--;
        }

        i = y + 1;
        while (i < this.h) {
            if ((tiles.get(new Pair(x, i)).color == Color.NONE)) {
                break;
            }
            n.push([x, i]);
            if (tiles.get(new Pair(x, i)).lock || tiles.get(new Pair(x, i)).egg) {
                break;
            }
            i++;
        }

        return n;
    },

    onPauseClick: function () {
        this.setOnPause();
    },

    calculateTileSize: function () {
        if (this.w <= 4) {
            this.tileDistance = this.game.world.width / 4;
        } else {
            this.tileDistance = this.game.world.width / 8;
        }

        this.tileSize = this.tileDistance * .8;
        this.spacing = this.tileSize / 5;
    },

    update: function () {
    },

    quitGame: function (pointer) {
    },


    setOnVictory: function () {
        this.menu = this.game.add.group();

        var back = this.menu.create(0, 0, 'menu');
        back.width = this.game.world.width * .8;
        back.height = this.game.world.height * .8;

        var style = {
            'font': '120px Dosis',
            'fill': 'white',
            'fontWeight': 'bold'
        };
        var label = this.game.add.text(back.centerX, 130, 'Level Completed', style);
        label.anchor.setTo(0.5, 0.5);
        this.menu.add(label);

        var starName = this.moves < this.level.star.one ? 'starOn' : 'starOff';
        var star1 = this.menu.create(back.centerX - 100, 300, starName);
        star1.anchor.setTo(0.5, 0.5);
        star1.scale.setTo(2, 2);

        starName = this.moves < this.level.star.two ? 'starOn' : 'starOff';
        var star2 = this.menu.create(back.centerX, 300, starName);
        star2.anchor.setTo(0.5, 0.5);
        star2.scale.setTo(2, 2);

        starName = this.moves < this.level.star.three ? 'starOn' : 'starOff';
        var star3 = this.menu.create(back.centerX + 100, 300, starName);
        star3.anchor.setTo(0.5, 0.5);
        star3.scale.setTo(2, 2);


        var line = this.menu.create(this.menu.centerX, this.menu.centerY, 'lineHorz');
        line.anchor.setTo(.5, .5);
        line.width = this.menu.width * .8;
        line.height = 20;

        var retry = this.game.add.button(back.centerX - 330, this.menu.height - 300, 'retry', function () {
            this.game.state.restart(true, false, this.level);
        }, this, 0, 0, 1, 0);
        retry.anchor.x = .5;
        retry.scale.setTo(2, 2);
        this.menu.add(retry);

        var next = this.game.add.button(back.centerX, this.menu.height - 300, 'next', function () {
            this.state.start('Game', Phaser.Plugin.StateTransition.Out.SlideLeft,
                Phaser.Plugin.StateTransition.In.ScaleUp, true, false, LevelManager.getLevel(++this.level.number));
        }, this, 0, 0, 1, 0);
        next.anchor.x = .5;
        next.scale.setTo(2, 2);
        this.menu.add(next);

        var home = this.game.add.button(back.centerX + 330, this.menu.height - 300, 'homeBig', this.onBtnClick('LevelMenu'), this, 0, 0, 1, 0);
        home.anchor.x = .5;
        home.scale.setTo(2, 2);
        this.menu.add(home);

        this.menu.x = this.game.world.centerX - back.width / 2;
        this.menu.y = this.game.world.centerY - back.height / 2;

        this.game.add.tween(this.menu).from({
            y: -600
        }, 1000, Phaser.Easing.Bounce.Out, true);
    },

    setOnPause: function () {
        if (this.menu != null) {
            return;
        }
        this.menu = this.game.add.group();


        var back = this.menu.create(0, 0, 'menu');
        back.width = this.game.world.width * .8;
        back.height = this.game.world.height * .8;

        var style = {
            'font': '120px Dosis',
            'fill': 'white',
            'fontWeight': 'bold'
        };
        var label = this.game.add.text(back.centerX, 110, 'Game Paused', style);
        label.anchor.setTo(0.5, 0.5);
        this.menu.add(label);

        var style = {
            'font': '60px Dosis',
            'fill': 'white',
            'fontWeight': 'normal'
        };


        this.menu.create(back.centerX / 4, 250, 'starSmall').scale.set(3, 3);
        this.menu.create(back.centerX / 4 + 50, 250, 'starSmall').scale.set(3, 3);
        this.menu.create(back.centerX / 4 + 100, 250, 'starSmall').scale.set(3, 3);
        var label = this.game.add.text(back.centerX, 250, '< ' + this.level.star.three + ' moves', style);
        this.menu.add(label);

        this.menu.create(back.centerX / 4, 350, 'starSmall').scale.set(3, 3);
        this.menu.create(back.centerX / 4 + 50, 350, 'starSmall').scale.set(3, 3);
        var label = this.game.add.text(back.centerX, 350, '< ' + this.level.star.two + ' moves', style);
        this.menu.add(label);

        this.menu.create(back.centerX / 4, 450, 'starSmall').scale.set(3, 3);
        var label = this.game.add.text(back.centerX, 450, '< ' + this.level.star.one + ' moves', style);
        this.menu.add(label);


        var retry = this.game.add.button(back.centerX - 330, this.menu.height - 300, 'retry', function () {
            this.game.state.restart(true, false, this.level);
        }, this, 0, 0, 1, 0);
        retry.anchor.x = .5;
        retry.scale.setTo(2, 2);
        this.menu.add(retry);

        var play = this.game.add.button(back.centerX, this.menu.height - 350, 'playBig', this.onCloseClick, this, 0, 0, 1, 0);
        play.anchor.x = .5;
        play.scale.setTo(2, 2);
        this.menu.add(play);

        var home = this.game.add.button(back.centerX + 330, this.menu.height - 300, 'homeBig', this.onBtnClick('LevelMenu'), this, 0, 0, 1, 0);
        home.anchor.x = .5;
        home.scale.setTo(2, 2);
        this.menu.add(home);


        this.menu.x = this.game.world.centerX - back.width / 2;
        this.menu.y = this.game.world.centerY - back.height / 2;

        this.game.add.tween(this.menu).from({
            y: -600
        }, 1000, Phaser.Easing.Bounce.Out, true);
    },

    onBtnClick: function (name) {
        return function () {
            this.state.start(name, Phaser.Plugin.StateTransition.Out.SlideTop,
                Phaser.Plugin.StateTransition.In.ScaleUp,
                true, false, 'Game');
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

    saveLevelInformation: function () {
        var oldMax = localStorage.getItem("reached-level");
        var currentMax = 1 + parseInt(this.level.number);
        if (currentMax > oldMax) {
            localStorage.setItem("reached-level", currentMax);
        }
        var maxMoves = localStorage.getItem("level-" + this.level.number);
        var currentMaxMoves = parseInt(this.moves);
        if (!maxMoves || currentMaxMoves < maxMoves) {
            localStorage.setItem("level-" + this.level.number, currentMaxMoves);
        }
    }
};