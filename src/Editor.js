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

    this.palleteSize = 48 * 2;
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

    this.menu = null;
    this.threeStar = 4;
    this.twoStar = 6;
    this.oneStar = 8;

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
            this.legendTiles.set(new Pair(tile.x, tile.y), new Tile(tile.x, tile.y, tile.color, tile.lock));
        }, this);

        this.tiles = new TileMap();
        this.level.tiles.forEach(function (tile) {
            this.tiles.set(new Pair(tile.x, tile.y), new Tile(tile.x, tile.y, tile.color, tile.lock, tile.egg, tile.grass));
        }, this);
    },

    create: function () {
        this.menu = null;
        this.tileSize = this.calculateTileSize();
        this.spacing = this.tileSize / 5;
        this.tileDistance = this.tileSize + this.spacing;

        this.game.stage.backgroundColor = 0x7e7657;

        var scaleBtn = .8;
        var btnSize = 137;

        this.game.add.button(0, 1, 'exit', this.onBackClick, this, 1, 0, 2).scale.setTo(scaleBtn, scaleBtn);
        this.game.add.button(btnSize, 1, 'save', this.onSaveClick, this, 1, 0, 2).scale.setTo(scaleBtn, scaleBtn);

        this.game.add.button(btnSize * 2, 1, 'left', this.onLeftBtnClick, this, 1, 0, 2).scale.setTo(scaleBtn, scaleBtn);
        this.game.add.button(btnSize * 3, 1, 'right', this.onRightBtnClick, this, 1, 0, 2).scale.setTo(scaleBtn, scaleBtn);

        var style = {
            'font': '60px Dosis',
            'fill': 'white',
            'fontWeight': 'bold'
        };
        this.game.add.text(btnSize * 4.4, 1, 'Level ' + this.level.number, style);

        this.l1Btn = this.game.add.button(btnSize * 6, 1, 'top', this.onLayer1Click, this, 1, 0, 2).scale.setTo(scaleBtn, scaleBtn);
        this.l2Btn = this.game.add.button(btnSize * 7, 1, 'bottom', this.onLayer2Click, this, 1, 0, 2).scale.setTo(scaleBtn, scaleBtn);

        var palette = this.game.add.group();

        scaleBtn = 2;
        var palleteY = this.game.world.height - this.palleteSize;
        palette.create(0, palleteY, 'squareWhite').scale.setTo(scaleBtn, scaleBtn);
        palette.create(0, palleteY, 'none').scale.setTo(scaleBtn, scaleBtn);
        palette.create(1 * this.palleteSize, palleteY, 'blue').scale.setTo(scaleBtn, scaleBtn);
        palette.create(2 * this.palleteSize, palleteY, 'green').scale.setTo(scaleBtn, scaleBtn);
        palette.create(3 * this.palleteSize, palleteY, 'grey').scale.setTo(scaleBtn, scaleBtn);
        palette.create(4 * this.palleteSize, palleteY, 'red').scale.setTo(scaleBtn, scaleBtn);
        palette.create(5 * this.palleteSize, palleteY, 'yellow').scale.setTo(scaleBtn, scaleBtn);
        palette.create(6 * this.palleteSize, palleteY, 'orange').scale.setTo(scaleBtn, scaleBtn);

        var lock = palette.create(7 * this.palleteSize, palleteY, 'lock');
        lock.width = this.palleteSize;
        lock.height = this.palleteSize;

        var egg = palette.create(8 * this.palleteSize, palleteY, 'tiles', 1);
        egg.width = this.palleteSize;
        egg.height = this.palleteSize;
        egg.key = 'egg';


        var grass = palette.create(9 * this.palleteSize, palleteY, 'tiles', 2);
        grass.width = this.palleteSize;
        grass.height = this.palleteSize;
        grass.key = 'grass';


        this.squareMask = palette.create(0, (-2) * this.palleteSize, 'squareBlack');
        this.squareMask.scale.setTo(scaleBtn, scaleBtn);

        palette.setAll('inputEnabled', true);
        palette.callAll('events.onInputDown.add', 'events.onInputDown', this.onPaletteClick(this));

        this.game.add.button(this.game.width - 160, this.game.height - 160, 'pause', this.setOnPause, this, 0, 0, 1, 0).scale.setTo(2, 2);

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
            if (tile.grass) {
                var sprite = group.create(tile.x * this.tileDistance, tile.y * this.tileDistance, 'tiles', 2);
                sprite.anchor.x = 0.5;
                sprite.anchor.y = 0.5;
                sprite.width = size;
                sprite.height = size;
            }

            var sprite = group.create(tile.x * this.tileDistance, tile.y * this.tileDistance, tile.color);
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            sprite.width = size;
            sprite.height = size;
            sprite.tileX = tile.x;
            sprite.tileY = tile.y;
            this.sprites.set(new Pair(tile.x, tile.y), sprite);


            if (tile.lock) {
                sprite = group.create(tile.x * this.tileDistance, tile.y * this.tileDistance, 'lock');
                sprite.anchor.x = 0.5;
                sprite.anchor.y = 0.5;
                sprite.width = size;
                sprite.height = size;
            }

            if (tile.egg) {
                sprite = group.create(tile.x * this.tileDistance, tile.y * this.tileDistance, 'tiles', 1);
                sprite.anchor.x = 0.5;
                sprite.anchor.y = 0.5;
                sprite.width = size * .6;
                sprite.height = size * .6;
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
        this.tilesGroup.setAll('inputEnabled', false);
        this.game.world.removeAll();
        this.create();
    },

    onTileClick: function (context, tiles) {
        return function (item) {
            if (context.selectedColor != null) {
                var x = item.tileX;
                var y = item.tileY;
                if (context.selectedColor == Color.NONE) {
                    context.tiles.get(new Pair(x, y)).color = context.selectedColor;
                    context.legendTiles.get(new Pair(x, y)).color = context.selectedColor;
                } else if (context.selectedColor == 'lock') {
                    tiles.get(new Pair(x, y)).lock = !tiles.get(new Pair(x, y)).lock;
                } else if (context.selectedColor == 'egg') {
                    context.tiles.get(new Pair(x, y)).egg = !context.tiles.get(new Pair(x, y)).egg;
                    context.legendTiles.get(new Pair(x, y)).color = Color.NONE;
                } else if (context.selectedColor == 'grass') {
                    context.tiles.get(new Pair(x, y)).grass = !context.tiles.get(new Pair(x, y)).grass;
                    context.legendTiles.get(new Pair(x, y)).color = Color.NONE;
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
                context.squareMask.x = item.x;
            } else {
                context.selectedColor = null;
                context.squareMask.y = context.tileSize * (-2);
                context.squareMask.x = context.tileSize * (-2);
            }
        }
    },


    onBackClick: function () {
        this.state.start('LevelMenu', Phaser.Plugin.StateTransition.Out.SlideTop,
            Phaser.Plugin.StateTransition.In.ScaleUp, true, false, 'Editor');
    },

    onLoadClick: function () {
        this.init(this.level);
        this.loadLevel();
    },

    onSaveClick: function () {
        var json = JSON.stringify(new Level(this.number, this.w, this.h, this.tiles.entities, this.legendTiles.entities, new Stars(this.threeStar, this.twoStar, this.oneStar)));
        firebase.database().ref('levels/' + this.number).set(json);
        alert('Level saved');
    },

    onLeftBtnClick: function () {
        this.w = 4;
        this.h = 5;
        this.tiles = new TileMap();
        this.legendTiles = new TileMap();
        for (var i = 0; i < this.w; i++) {
            for (var j = 0; j < this.h; j++) {
                this.tiles.set(new Pair(i, j), new Tile(i, j, Color.NONE));
                this.legendTiles.set(new Pair(i, j), new Tile(i, j, Color.NONE));
            }
        }
        this.loadLevel();
    },

    onRightBtnClick: function () {
        this.w = 6;
        this.h = 7;
        this.tiles = new TileMap();
        this.legendTiles = new TileMap();
        for (var i = 0; i < this.w; i++) {
            for (var j = 0; j < this.h; j++) {
                this.tiles.set(new Pair(i, j), new Tile(i, j, Color.NONE));
                this.legendTiles.set(new Pair(i, j), new Tile(i, j, Color.NONE));
            }
        }
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

    calculateTileSize: function () {
        var h = this.game.world.height - Screen.PADDING_HEIGHT;
        var distanceH = Math.floor(h / this.h);
        var tileW = Math.floor(distanceH * .8);

        var w = this.game.world.width;
        var distanceW = Math.floor(w / this.w);
        var tileH = Math.floor(distanceW * .8);
        var tileSize = tileW < tileH ? tileW : tileH;

        if (tileSize > Screen.MAX_TILE_SIZE) {
            tileSize = Screen.MAX_TILE_SIZE;
        }

        return tileSize;
    },

    setOnPause: function () {
        if (this.menu != null) {
            return;
        }
        this.menu = this.game.add.group();
        var scaleBtn = .6;


        var back = this.menu.create(0, 0, 'menu');
        back.width = this.game.world.width * .8;
        back.height = this.game.world.height * .8;

        var style = {
            'font': '80px Dosis',
            'fill': 'white',
            'fontWeight': 'bold'
        };

        var label = this.game.add.text(back.centerX, 60, 'Edit Level', style);
        label.anchor.setTo(0.5, 0.5);
        this.menu.add(label);


        // 3 stars
        var lineY = 200;
        var star1 = this.menu.create((back.centerX - 100) / 2.5, lineY, 'starOn');
        star1.anchor.setTo(0.5, 0.5);
        var star2 = this.menu.create(back.centerX / 2.5, lineY, 'starOn');
        star2.anchor.setTo(0.5, 0.5);
        var star3 = this.menu.create((back.centerX + 100) / 2.5, lineY, 'starOn');
        star3.anchor.setTo(0.5, 0.5);

        var label = this.game.add.text(back.centerX, lineY, this.threeStar, style);
        label.anchor.setTo(0.5, 0.5);
        this.menu.add(label);

        var left = this.game.add.button(back.width * .7, lineY, 'left', this.onStarLeft('threeStar', label), this, 1, 0, 2);
        left.anchor.set(.5, .5);
        left.scale.setTo(scaleBtn, scaleBtn);
        this.menu.add(left);
        var right = this.game.add.button(back.width * .7 + 100, lineY, 'right', this.onStarRight('threeStar', label), this, 1, 0, 2);
        right.anchor.set(.5, .5);
        right.scale.setTo(scaleBtn, scaleBtn);
        this.menu.add(right);


        // 2 stars
        lineY = 400;
        var star1 = this.menu.create((back.centerX - 100) / 2.5, lineY, 'starOn');
        star1.anchor.setTo(0.5, 0.5);
        var star2 = this.menu.create(back.centerX / 2.5, lineY, 'starOn');
        star2.anchor.setTo(0.5, 0.5);
        var star3 = this.menu.create((back.centerX + 100) / 2.5, lineY, 'starOff');
        star3.anchor.setTo(0.5, 0.5);
        var label = this.game.add.text(back.centerX, lineY, this.twoStar, style);
        label.anchor.setTo(0.5, 0.5);
        this.menu.add(label);

        var left = this.game.add.button(back.width * .7, lineY, 'left', this.onStarLeft('twoStar', label), this, 1, 0, 2);
        left.anchor.set(.5, .5);
        left.scale.setTo(scaleBtn, scaleBtn);
        this.menu.add(left);
        var right = this.game.add.button(back.width * .7 + 100, lineY, 'right', this.onStarRight('twoStar', label), this, 1, 0, 2);
        right.anchor.set(.5, .5);
        right.scale.setTo(scaleBtn, scaleBtn);
        this.menu.add(right);


        // 1 star
        lineY = 600;
        var star1 = this.menu.create((back.centerX - 100) / 2.5, lineY, 'starOn');
        star1.anchor.setTo(0.5, 0.5);
        var star2 = this.menu.create(back.centerX / 2.5, lineY, 'starOff');
        star2.anchor.setTo(0.5, 0.5);
        var star3 = this.menu.create((back.centerX + 100) / 2.5, lineY, 'starOff');
        star3.anchor.setTo(0.5, 0.5);
        var label = this.game.add.text(back.centerX, lineY, this.oneStar, style);
        label.anchor.setTo(0.5, 0.5);
        this.menu.add(label);

        var left = this.game.add.button(back.width * .7, lineY, 'left', this.onStarLeft('oneStar', label), this, 1, 0, 2);
        left.anchor.set(.5, .5);
        left.scale.setTo(scaleBtn, scaleBtn);
        this.menu.add(left);
        var right = this.game.add.button(back.width * .7 + 100, lineY, 'right', this.onStarRight('oneStar', label), this, 1, 0, 2);
        right.anchor.set(.5, .5);
        right.scale.setTo(scaleBtn, scaleBtn);
        this.menu.add(right);


        var play = this.game.add.button(back.centerX, this.menu.height - 150, 'playBig', this.unPause, this, 0, 0, 1, 0);
        play.anchor.x = .5;
        play.scale.setTo(.7, .7);
        this.menu.add(play);

        this.menu.x = this.game.world.centerX - back.width / 2;
        this.menu.y = this.game.world.centerY - back.height / 2;

        this.game.add.tween(this.menu).from({
            y: -600
        }, 1000, Phaser.Easing.Bounce.Out, true);
    },

    onStarLeft: function (star, label) {
        return function () {
            this[star] = this[star] - 1;
            label.text = this[star];
        }
    },

    onStarRight: function (star, label) {
        return function () {
            this[star] = this[star] + 1;
            label.text = this[star];
        }
    },

    unPause: function () {
        this.menu.removeAll();
        this.menu = null;
        this.game.paused = false;
    },


    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        //this.state.start('MainMenu');

    }

};