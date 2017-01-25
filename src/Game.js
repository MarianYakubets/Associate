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

    this.fpsText;
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
                //context.selectedTile.width = context.selectedTile.width / 1.1;
                //context.selectedTile.height = context.selectedTile.height / 1.1;
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
        this.time.advancedTiming = true;
        this.menu = null;
        this.moves = 0;
        this.drawTilesBcgr();

        var frameTop = this.game.add.sprite(0, 0, 'frameTop');
        frameTop.width = this.game.world.width;
        frameTop.height = 250;

        var shadow = this.game.add.sprite(0, 250, 'boardShadow');
        shadow.width = this.game.world.width;
        shadow.height = 65;

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

        this.selectedGroup = this.game.add.group();
        this.selectedGroup.x = this.tileDistance / 2;
        this.selectedGroup.y = this.tilesTopDistance + this.tileDistance / 2;

        this.tilesGroup = this.game.add.group();
        this.drawTiles(this.tiles, this.tilesGroup, this.tileSize, 'monster');
        this.sprites.entities.forEach(function (sprite) {
            sprite.inputEnabled = true;
            sprite.events.onInputDown.add(this.onTileClick(this), this);
        }, this);
        //this.game.time.events.loop(Phaser.Timer.SECOND, this.updateCounter, this);

        //this.fpsText = this.game.add.text(100, pause.y, '', style);
        if (this.level.number == 1) {
            this.showTutorialBase();
        }
        else if (this.level.number == 2) {
            this.showTutorialIce();
        }
        else if (this.level.number == 4) {
            this.showTutorialGrass();
        }
        else if (this.level.number == 3) {
            this.showTutorialEgg();
        }
    },

    updateCounter: function () {
        var x = this.game.rnd.integerInRange(0, this.sprites.entities.length - 1);
        var tile = this.sprites.entities[x];
        this.addQuake(tile);
    },

    drawTilesBcgr: function () {
        this.game.stage.backgroundColor = "#56433C";
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
                        if (j < 7) {
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
            if (Music.isPlaySound())
                this.game.sound.play('victory');

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
                    if (Music.isPlaySound())
                        this.game.sound.play('ice');

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
        if (Music.isPlaySound())
            this.game.sound.play('flip');
        item.alpha = 0;
        var tile = this.tiles.get(new Pair(item.tileX, item.tileY));
        var boom = this.game.add.sprite(item.world.x, item.world.y, 'explosion' + tile.color, 0);
        boom.anchor.x = .5;
        boom.anchor.y = .5;
        var anim = boom.animations.add('boom', [0, 1, 2, 3, 4, 5]);
        if (Music.isPlaySound())
            this.game.sound.play('flip');

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
        if (Music.isPlaySound())
            this.game.sound.play('flip');

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
            sprite.tint = 0xFFFFFF;
        }, this);
    },

    selectNeighbors: function () {
        var baseTile = this.selectedTile;
        var color = this.tiles.get(new Pair(this.selectedTile.tileX, this.selectedTile.tileY)).color;

        if (Music.isPlaySound()) {
            this.game.sound.play('swip', .3);
            this.game.sound.play('swip', .3);
        }


        if (!this.tiles.get(new Pair(baseTile.tileX, baseTile.tileY)).grass) {
            var circle = this.selectedGroup.create(baseTile.x, baseTile.y, 'hiliteCircle');
            circle.anchor.set(.5, .5);
            circle.width = baseTile.width;
            circle.height = baseTile.height;
            circle.tint = ColorToTint[color];
            circle.alpha = 0;

            this.game.add.tween(circle).to({alpha: 1}, 700, Phaser.Easing.Linear.None, true, 0, 1000, true);
        }


        baseTile.frame = baseTile.frame + 1;


        var nearTiles = this.getNeighbors(baseTile.tileX, baseTile.tileY, this.tiles);
        nearTiles.forEach(function (tile) {
            var diff = 0;
            if (tile[0] == baseTile.tileX) {
                diff = Math.abs(baseTile.tileY - tile[1]);
            } else {
                diff = Math.abs(baseTile.tileX - tile[0]);
            }


            var sprite = this.sprites.get(new Pair(tile[0], tile[1]));
            sprite.frame = sprite.frame + 1;

            if (!this.tiles.get(new Pair(tile[0], tile[1])).grass) {
                var circle = this.selectedGroup.create(sprite.x, sprite.y, 'hiliteCircle');
                circle.anchor.set(.5, .5);
                circle.width = sprite.width;
                circle.height = sprite.height;
                circle.tint = ColorToTint[color];
                circle.alpha = 0;

                this.game.add.tween(circle).to({alpha: 1}, 700, Phaser.Easing.Linear.None, true, 250 * diff, 1000, true);

            }
        }, this);


        var round = this.selectedGroup.create(baseTile.x, baseTile.y, 'tiles', 0);
        round.anchor.set(.5, .5);
        round.width = baseTile.width;
        round.height = baseTile.height;
    },

    getNeighbors: function (x, y, tiles) {
        if (Music.isPlaySound()) {
            this.game.sound.play('tap', .3);
            this.game.sound.play('tap', .3);
        }
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
        if (Music.isPlaySound())
            this.game.sound.play('click');
        this.setOnPause();
    },

    calculateTileSize: function () {
        if (this.w <= 4) {
            this.tileDistance = this.game.world.width / 4;
        } else {
            this.tileDistance = this.game.world.width / 6;
        }

        this.tileSize = this.tileDistance * .8;
        this.spacing = this.tileSize / 5;
    },

    update: function () {
        //this.fpsText.setText("FPS: " + this.game.time.fps);
    },

    showTutorialBase: function () {
        if (this.menu != null) {
            return;
        }
        this.menu = this.game.add.group();
        var back = this.menu.create(0, 0, 'menu');
        back.width = this.game.world.width * .8;
        back.height = this.game.world.height * .8;
        //YES NO CELLS
        var w = back.width / 5;
        var cell = this.menu.create(w / 2, 10, 'frame', 1);
        cell.width = w;
        cell.height = w;
        var m = this.menu.create(w / 2, 10, 'monster', 2);
        m.width = w;
        m.height = w;
        this.menu.create(w * 1.25, w - 50, 'true');
        cell = this.menu.create(w * 2, 10, 'frame', 1);
        cell.width = w;
        cell.height = w;
        m = this.menu.create(w * 2, 10, 'monster', 4);
        m.width = w;
        m.height = w;
        this.menu.create(m.x + w * .75, w - 50, 'false');
        cell = this.menu.create(w * 3.5, 10, 'frame', 2);
        cell.width = w;
        cell.height = w;
        m = this.menu.create(w * 3.5, 10, 'monster', 4);
        m.width = w;
        m.height = w;
        this.menu.create(m.x + w * .75, w - 50, 'true');

        var line = this.menu.create(back.width / 2, w + 30, 'hiliteH');
        line.anchor.setTo(0.5, 0.5);
        line.height = line.height / 10;
        line.width = back.width * .95;
        //STEP CELLS
        //         1
        var startX = 0;
        var startY = 0;
        w = back.width / 7;
        cell = this.menu.create(startX + 20, back.height / 4 + startY, 'frame', 1);
        cell.width = w;
        cell.height = w;
        m = this.menu.create(startX + 20, back.height / 4 + startY, 'monster', 0);
        m.width = w;
        m.height = w;
        cell = this.menu.create(startX + 20 + w, back.height / 4 + startY, 'frame', 1);
        cell.width = w;
        cell.height = w;
        m = this.menu.create(startX + 20 + w, back.height / 4 + startY, 'monster', 2);
        m.width = w;
        m.height = w;
        cell = this.menu.create(startX + 20 + w, back.height / 4 + w + startY, 'frame', 1);
        cell.width = w;
        cell.height = w;
        m = this.menu.create(startX + 20 + w, back.height / 4 + w + startY, 'monster', 6);
        m.width = w;
        m.height = w;
        cell = this.menu.create(startX + 20 + w, back.height / 4 - w + startY, 'frame', 1);
        cell.width = w;
        cell.height = w;
        m = this.menu.create(startX + 20 + w, back.height / 4 - w + startY, 'monster', 8);
        m.width = w;
        m.height = w;
        cell = this.menu.create(startX + 20 + 2 * w, back.height / 4 + startY, 'frame', 1);
        cell.width = w;
        cell.height = w;
        m = this.menu.create(startX + 20 + 2 * w, back.height / 4 + startY, 'monster', 4);
        m.width = w;
        m.height = w;
        var arrow = this.menu.create(startX + 20 + 3.7 * w, back.height / 4 + startY + 0.8 * w, 'arrowRight');
        arrow.width = w;
        arrow.height = w;
        arrow.anchor.setTo(.5, .5);
        arrow.rotation = .9;
        var hand = this.menu.create(startX + 20 + w, back.height / 4 + startY + w, 'hand');
        hand.width = w;
        hand.height = w;
        hand.anchor.setTo(0.5, 0.5);
        hand.rotation = 45;
        //         2
        startX = 30 + w * 3;
        startY = back.height / 4 + 1.5 * w;
        cell = this.menu.create(startX + 20, startY, 'frame', 1);
        cell.width = w;
        cell.height = w;
        var circle = this.menu.create(startX + 20, startY, 'hiliteCircle');
        circle.width = m.width;
        circle.height = m.height;
        circle.tint = ColorToTint[Color.BLUE];
        m = this.menu.create(startX + 20, startY, 'monster', 1);
        m.width = w;
        m.height = w;
        cell = this.menu.create(startX + 20 + w, startY, 'frame', 1);
        cell.width = w;
        cell.height = w;
        var round = this.menu.create(startX + 20 + w, startY, 'tiles', 0);
        round.width = w;
        round.height = w;
        m = this.menu.create(startX + 20 + w, startY, 'monster', 3);
        m.width = w;
        m.height = w;
        cell = this.menu.create(startX + 20 + w, w + startY, 'frame', 1);
        cell.width = w;
        cell.height = w;
        circle = this.menu.create(startX + 20 + w, w + startY, 'hiliteCircle');
        circle.width = m.width;
        circle.height = m.height;
        circle.tint = ColorToTint[Color.BLUE];
        m = this.menu.create(startX + 20 + w, w + startY, 'monster', 7);
        m.width = w;
        m.height = w;
        cell = this.menu.create(startX + 20 + w, startY - w, 'frame', 1);
        cell.width = w;
        cell.height = w;
        circle = this.menu.create(startX + 20 + w, startY - w, 'hiliteCircle');
        circle.width = m.width;
        circle.height = m.height;
        circle.tint = ColorToTint[Color.BLUE];
        m = this.menu.create(startX + 20 + w, startY - w, 'monster', 9);
        m.width = w;
        m.height = w;
        cell = this.menu.create(startX + 20 + 2 * w, startY, 'frame', 1);
        cell.width = w;
        cell.height = w;
        circle = this.menu.create(startX + 20 + 2 * w, startY, 'hiliteCircle');
        circle.width = m.width;
        circle.height = m.height;
        circle.tint = ColorToTint[Color.BLUE];
        m = this.menu.create(startX + 20 + 2 * w, startY, 'monster', 5);
        m.width = w;
        m.height = w;
        arrow = this.menu.create(startX, startY + 1.7 * w, 'arrowDown');
        arrow.width = w;
        arrow.height = w;
        arrow.anchor.setTo(.5, .5);
        arrow.rotation = .9;
        hand = this.menu.create(startX + 20 + w, startY + w, 'hand');
        hand.width = w;
        hand.height = w;
        hand.anchor.setTo(0.5, 0.5);
        hand.rotation = 45;
        //         3
        startX = 30;
        startY = back.height / 4 + 4 * w;
        cell = this.menu.create(startX + 20, startY, 'frame', 1);
        cell.width = w;
        cell.height = w;
        m = this.menu.create(startX + 20, startY, 'monster', 2);
        m.width = w;
        m.height = w;
        cell = this.menu.create(startX + 20 + w, startY, 'frame', 1);
        cell.width = w;
        cell.height = w;
        m = this.menu.create(startX + 20 + w, startY, 'monster', 2);
        m.width = w;
        m.height = w;
        cell = this.menu.create(startX + 20 + w, w + startY, 'frame', 1);
        cell.width = w;
        cell.height = w;
        m = this.menu.create(startX + 20 + w, w + startY, 'monster', 2);
        m.width = w;
        m.height = w;
        cell = this.menu.create(startX + 20 + w, startY - w, 'frame', 1);
        cell.width = w;
        cell.height = w;
        m = this.menu.create(startX + 20 + w, startY - w, 'monster', 2);
        m.width = w;
        m.height = w;
        cell = this.menu.create(startX + 20 + 2 * w, startY, 'frame', 1);
        cell.width = w;
        cell.height = w;
        m = this.menu.create(startX + 20 + 2 * w, startY, 'monster', 2);
        m.width = w;
        m.height = w;


        var play = this.game.add.button(back.centerX, this.menu.height - 250, 'playBig', this.onCloseClick, this, 0, 0, 1, 0);
        play.anchor.x = .5;
        this.menu.add(play);
        this.menu.x = this.game.world.centerX - back.width / 2;
        this.menu.y = this.game.world.centerY - back.height / 2;
        this.game.add.tween(this.menu).from({
            y: -600
        }, 1000, Phaser.Easing.Bounce.Out, true);
    },

    showTutorialIce: function () {
        if (this.menu != null) {
            return;
        }
        this.menu = this.game.add.group();
        var back = this.menu.create(0, 0, 'menu');
        back.width = this.game.world.width * .8;
        back.height = this.game.world.height * .8;

        //STEP CELLS
        //         1
        var startX = 50;
        var startY = back.height / 8;
        var w = back.width / 6;
        var m = this.menu.create(startX + 20, startY, 'monster', 0);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + w, startY, 'monster', 2);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 2 * w, startY, 'monster', 4);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 3 * w, startY, 'monster', 6);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 4 * w, startY, 'monster', 6);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 4 * w, startY, 'monster', 12);
        m.width = w;
        m.height = w;
        var arrow = this.menu.create(startX + 20 + 2 * w, startY + w, 'arrowDown');
        arrow.width = w;
        arrow.height = w;
        var hand = this.menu.create(startX + 20 + w, startY + w, 'hand');
        hand.width = w;
        hand.height = w;
        hand.anchor.setTo(0.5, 0.5);
        hand.rotation = 45;
        //         2
        startX = 50;
        startY = back.height / 8 + w * 2;
        w = back.width / 6;
        var circle = this.menu.create(startX + 20, startY, 'hiliteCircle');
        circle.width = m.width;
        circle.height = m.height;
        circle.tint = ColorToTint[Color.BLUE];
        m = this.menu.create(startX + 20, startY, 'monster', 1);
        m.width = w;
        m.height = w;
        var round = this.menu.create(startX + 20 + w, startY, 'tiles', 0);
        round.width = w;
        round.height = w;
        m = this.menu.create(startX + 20 + w, startY, 'monster', 3);
        m.width = w;
        m.height = w;
        circle = this.menu.create(startX + 20 + 2 * w, startY, 'hiliteCircle');
        circle.width = m.width;
        circle.height = m.height;
        circle.tint = ColorToTint[Color.BLUE];
        m = this.menu.create(startX + 20 + 2 * w, startY, 'monster', 5);
        m.width = w;
        m.height = w;
        circle = this.menu.create(startX + 20 + 3 * w, startY, 'hiliteCircle');
        circle.width = m.width;
        circle.height = m.height;
        circle.tint = ColorToTint[Color.BLUE];
        m = this.menu.create(startX + 20 + 3 * w, startY, 'monster', 7);
        m.width = w;
        m.height = w;
        circle = this.menu.create(startX + 20 + 4 * w, startY, 'hiliteCircle');
        circle.width = m.width;
        circle.height = m.height;
        circle.tint = ColorToTint[Color.BLUE];
        m = this.menu.create(startX + 20 + 4 * w, startY, 'monster', 7);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 4 * w, startY, 'monster', 12);
        m.width = w;
        m.height = w;
        arrow = this.menu.create(startX + 20 + 2 * w, startY + w, 'arrowDown');
        arrow.width = w;
        arrow.height = w;
        hand = this.menu.create(startX + 20 + w, startY + w, 'hand');
        hand.width = w;
        hand.height = w;
        hand.anchor.setTo(0.5, 0.5);
        hand.rotation = 45;
        //         3
        startX = 50;
        startY = back.height / 8 + 4 * w;
        m = this.menu.create(startX + 20, startY, 'monster', 2);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + w, startY, 'monster', 2);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 2 * w, startY, 'monster', 2);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 3 * w, startY, 'monster', 2);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 4 * w, startY, 'monster', 6);
        m.width = w;
        m.height = w;


        var play = this.game.add.button(back.centerX, this.menu.height - 250, 'playBig', this.onCloseClick, this, 0, 0, 1, 0);
        play.anchor.x = .5;
        this.menu.add(play);
        this.menu.x = this.game.world.centerX - back.width / 2;
        this.menu.y = this.game.world.centerY - back.height / 2;
        this.game.add.tween(this.menu).from({
            y: -600
        }, 1000, Phaser.Easing.Bounce.Out, true);
    },

    showTutorialGrass: function () {
        if (this.menu != null) {
            return;
        }
        this.menu = this.game.add.group();
        var back = this.menu.create(0, 0, 'menu');
        back.width = this.game.world.width * .8;
        back.height = this.game.world.height * .8;

        //STEP CELLS
        //         1
        var startX = 50;
        var startY = back.height / 8;
        var w = back.width / 6;
        var m = this.menu.create(startX + 20, startY, 'monster', 0);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + w, startY, 'monster', 2);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 2 * w, startY, 'monster', 4);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 3 * w, startY, 'tiles', 2);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 3 * w, startY, 'monster', 6);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 4 * w, startY, 'monster', 6);
        m.width = w;
        m.height = w;
        var arrow = this.menu.create(startX + 20 + 2 * w, startY + w, 'arrowDown');
        arrow.width = w;
        arrow.height = w;
        var hand = this.menu.create(startX + 20 + w, startY + w, 'hand');
        hand.width = w;
        hand.height = w;
        hand.anchor.setTo(0.5, 0.5);
        hand.rotation = 45;
        //         2
        startX = 50;
        startY = back.height / 8 + w * 2;
        w = back.width / 6;
        var circle = this.menu.create(startX + 20, startY, 'hiliteCircle');
        circle.width = m.width;
        circle.height = m.height;
        circle.tint = ColorToTint[Color.BLUE];
        m = this.menu.create(startX + 20, startY, 'monster', 1);
        m.width = w;
        m.height = w;
        var round = this.menu.create(startX + 20 + w, startY, 'tiles', 0);
        round.width = w;
        round.height = w;
        m = this.menu.create(startX + 20 + w, startY, 'monster', 3);
        m.width = w;
        m.height = w;
        circle = this.menu.create(startX + 20 + 2 * w, startY, 'hiliteCircle');
        circle.width = m.width;
        circle.height = m.height;
        circle.tint = ColorToTint[Color.BLUE];
        m = this.menu.create(startX + 20 + 2 * w, startY, 'monster', 5);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 3 * w, startY, 'tiles', 2);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 3 * w, startY, 'monster', 7);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 4 * w, startY, 'monster', 6);
        m.width = w;
        m.height = w;
        arrow = this.menu.create(startX + 20 + 2 * w, startY + w, 'arrowDown');
        arrow.width = w;
        arrow.height = w;
        hand = this.menu.create(startX + 20 + w, startY + w, 'hand');
        hand.width = w;
        hand.height = w;
        hand.anchor.setTo(0.5, 0.5);
        hand.rotation = 45;
        //         3
        startX = 50;
        startY = back.height / 8 + 4 * w;
        m = this.menu.create(startX + 20, startY, 'monster', 2);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + w, startY, 'monster', 2);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 2 * w, startY, 'monster', 2);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 3 * w, startY, 'tiles', 2);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 3 * w, startY, 'monster', 6);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 4 * w, startY, 'monster', 6);
        m.width = w;
        m.height = w;


        var play = this.game.add.button(back.centerX, this.menu.height - 250, 'playBig', this.onCloseClick, this, 0, 0, 1, 0);
        play.anchor.x = .5;
        this.menu.add(play);
        this.menu.x = this.game.world.centerX - back.width / 2;
        this.menu.y = this.game.world.centerY - back.height / 2;
        this.game.add.tween(this.menu).from({
            y: -600
        }, 1000, Phaser.Easing.Bounce.Out, true);
    },

    showTutorialEgg: function () {
        if (this.menu != null) {
            return;
        }
        this.menu = this.game.add.group();
        var back = this.menu.create(0, 0, 'menu');
        back.width = this.game.world.width * .8;
        back.height = this.game.world.height * .8;

        //STEP CELLS
        //         1
        var startX = 50;
        var startY = back.height / 8;
        var w = back.width / 6;
        var m = this.menu.create(startX + 20, startY, 'monster', 0);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + w, startY, 'monster', 2);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 2 * w, startY, 'monster', 4);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 3 * w, startY, 'tiles', 1);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 4 * w, startY, 'monster', 6);
        m.width = w;
        m.height = w;
        var arrow = this.menu.create(startX + 20 + 2 * w, startY + w, 'arrowDown');
        arrow.width = w;
        arrow.height = w;
        var hand = this.menu.create(startX + 20 + w, startY + w, 'hand');
        hand.width = w;
        hand.height = w;
        hand.anchor.setTo(0.5, 0.5);
        hand.rotation = 45;
        //         2
        startX = 50;
        startY = back.height / 8 + w * 2;
        w = back.width / 6;
        var circle = this.menu.create(startX + 20, startY, 'hiliteCircle');
        circle.width = m.width;
        circle.height = m.height;
        circle.tint = ColorToTint[Color.BLUE];
        m = this.menu.create(startX + 20, startY, 'monster', 1);
        m.width = w;
        m.height = w;
        var round = this.menu.create(startX + 20 + w, startY, 'tiles', 0);
        round.width = w;
        round.height = w;
        m = this.menu.create(startX + 20 + w, startY, 'monster', 3);
        m.width = w;
        m.height = w;
        circle = this.menu.create(startX + 20 + 2 * w, startY, 'hiliteCircle');
        circle.width = m.width;
        circle.height = m.height;
        circle.tint = ColorToTint[Color.BLUE];
        m = this.menu.create(startX + 20 + 2 * w, startY, 'monster', 5);
        m.width = w;
        m.height = w;
        circle = this.menu.create(startX + 20 + 3 * w, startY, 'hiliteCircle');
        circle.width = m.width;
        circle.height = m.height;
        circle.tint = ColorToTint[Color.BLUE];
        m = this.menu.create(startX + 20 + 3 * w, startY, 'tiles', 1);
        m.width = w;
        m.height = w;
        circle = this.menu.create(startX + 20 + 4 * w, startY, 'hiliteCircle');
        circle.width = m.width;
        circle.height = m.height;
        circle.tint = ColorToTint[Color.BLUE];
        m = this.menu.create(startX + 20 + 4 * w, startY, 'monster', 7);
        m.width = w;
        m.height = w;
        arrow = this.menu.create(startX + 20 + 2 * w, startY + w, 'arrowDown');
        arrow.width = w;
        arrow.height = w;
        hand = this.menu.create(startX + 20 + w, startY + w, 'hand');
        hand.width = w;
        hand.height = w;
        hand.anchor.setTo(0.5, 0.5);
        hand.rotation = 45;
        //         3
        startX = 50;
        startY = back.height / 8 + 4 * w;
        m = this.menu.create(startX + 20, startY, 'monster', 2);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + w, startY, 'monster', 2);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 2 * w, startY, 'monster', 2);
        m.width = w;
        m.height = w;
        m = this.menu.create(startX + 20 + 4 * w, startY, 'monster', 2);
        m.width = w;
        m.height = w;


        var play = this.game.add.button(back.centerX, this.menu.height - 250, 'playBig', this.onCloseClick, this, 0, 0, 1, 0);
        play.anchor.x = .5;
        this.menu.add(play);
        this.menu.x = this.game.world.centerX - back.width / 2;
        this.menu.y = this.game.world.centerY - back.height / 2;
        this.game.add.tween(this.menu).from({
            y: -600
        }, 1000, Phaser.Easing.Bounce.Out, true);
    },

    setOnVictory: function () {
        this.menu = this.game.add.group();

        var back = this.menu.create(0, 0, 'menu');
        back.width = this.game.world.width * .8;
        back.height = this.game.world.height * .8;

        var style = {
            'font': '100px Dosis',
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

        var retry = this.game.add.button(back.centerX - 300, this.menu.height - 300, 'retry', function () {
            if (Music.isPlaySound())
                this.game.sound.play('click');
            this.game.state.restart(true, false, this.level);
        }, this, 0, 0, 1, 0);
        retry.anchor.x = .5;
        retry.scale.setTo(1.5, 1.5);
        this.menu.add(retry);

        var next = this.game.add.button(back.centerX, this.menu.height - 300, 'next', function () {
            if (Music.isPlaySound())
                this.game.sound.play('click');
            this.state.start('Game', Phaser.Plugin.StateTransition.Out.SlideLeft,
                Phaser.Plugin.StateTransition.In.ScaleUp, true, false, LevelManager.getLevel(++this.level.number));
        }, this, 0, 0, 1, 0);
        next.anchor.x = .5;
        next.scale.setTo(1.5, 1.5);
        this.menu.add(next);

        var home = this.game.add.button(back.centerX + 300, this.menu.height - 300, 'homeBig', this.onBtnClick('LevelMenu'), this, 0, 0, 1, 0);
        home.anchor.x = .5;
        home.scale.setTo(1.5, 1.5);
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
            'font': '100px Dosis',
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


        var retry = this.game.add.button(back.centerX - 300, this.menu.height - 300, 'retry', function () {
            if (Music.isPlaySound())
                this.game.sound.play('click');
            this.game.state.restart(true, false, this.level);
        }, this, 0, 0, 1, 0);
        retry.anchor.x = .5;
        retry.scale.setTo(1.5, 1.5);
        this.menu.add(retry);

        var play = this.game.add.button(back.centerX, this.menu.height - 350, 'playBig', this.onCloseClick, this, 0, 0, 1, 0);
        play.anchor.x = .5;
        play.scale.setTo(1.5, 1.5);
        this.menu.add(play);

        var home = this.game.add.button(back.centerX + 300, this.menu.height - 300, 'homeBig', this.onBtnClick('LevelMenu'), this, 0, 0, 1, 0);
        home.anchor.x = .5;
        home.scale.setTo(1.5, 1.5);
        this.menu.add(home);


        this.menu.x = this.game.world.centerX - back.width / 2;
        this.menu.y = this.game.world.centerY - back.height / 2;

        this.game.add.tween(this.menu).from({
            y: -600
        }, 1000, Phaser.Easing.Bounce.Out, true);
    },

    onBtnClick: function (name) {
        return function () {
            if (Music.isPlaySound())
                this.game.sound.play('click');
            this.state.start(name, Phaser.Plugin.StateTransition.Out.SlideTop,
                Phaser.Plugin.StateTransition.In.ScaleUp,
                true, false, 'Game');
        }
    },

    onCloseClick: function () {
        if (Music.isPlaySound())
            this.game.sound.play('click');
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