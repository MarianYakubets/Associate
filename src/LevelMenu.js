Associate.LevelMenu = function (game) {
    this.music = null;
    this.playButton = null;
    this.stateName;
    this.totalStars;
};

Associate.LevelMenu.prototype = {

    init: function (state) {
        this.stateName = state;
    },

    create: function () {
        var game = this.game;
        var highestLevel = localStorage.getItem("reached-level");
        if (highestLevel == null) {
            highestLevel = 1;
            localStorage.setItem("reached-level", highestLevel);
        }

        var colors = ["0xffffff", "0x02ff55"];
        var columns = 3;
        var rows = 4;
        var thumbWidth = 120;
        var thumbHeight = 120;
        var spacing = 60;
        this.currentPage = 0;
        this.pageSelectors = [];
        var rowLength = thumbWidth * columns + spacing * (columns - 1);
        var leftMargin = (game.width - rowLength) / 2;
        var colHeight = thumbHeight * rows + spacing * (rows - 1);
        var topMargin = (game.height - colHeight) / 3;

        this.game.stage.backgroundColor = "#56433C";
        this.scrollingMap = game.add.tileSprite(0, 0, colors.length * game.width, game.height, "tileLeave");
        this.scrollingMap.inputEnabled = true;
        this.scrollingMap.input.enableDrag(false);
        this.scrollingMap.input.allowVerticalDrag = false;
        this.scrollingMap.input.boundsRect = new Phaser.Rectangle(game.width - this.scrollingMap.width, game.height - this.scrollingMap.height, this.scrollingMap.width * 2 - game.width, this.scrollingMap.height * 2 - game.height);

        var home = this.game.add.button(30, this.game.world.height - 150, 'homeBig', this.onBackClick, this, 1, 0);
        home.scale.setTo(2, 2);

        this.game.add.image(this.game.width * .85 - 30, 20, 'starOn');
        var style = {
            'font': '40px Dosis',
            'fill': 'white',
            'fontWeight': 'Bold'
        };
        this.totalStars = this.game.add.text(this.game.width * .92, 30, 0, style);

        for (var k = 0; k < colors.length; k++) {
            for (var i = 0; i < columns; i++) {
                for (var j = 0; j < rows; j++) {
                    var num = k * (rows * columns) + j * columns + i + 1;
                    var frame = this.getStarFrame(num);
                    var btn = new LabelButton(this.game, k * game.width + leftMargin + i * (thumbWidth + spacing) + thumbWidth / 2, topMargin + j * (thumbHeight + spacing) + thumbHeight / 2, "level", num, null, this.onLevelClick(num), this, frame, frame, frame, frame);
                    btn.tint = colors[k];
                    btn.scale.setTo(1.4,1.4);
                    if (this.stateName != 'Editor' && num > highestLevel /*|| num > 16*/) {
                        btn.destroy();
                        btn = this.game.add.sprite(btn.x - btn.width / 2, btn.y - btn.height / 2, 'level');
                        btn.frame = 4;
                            btn.scale.setTo(1.5,1.5);
                    }
                    this.scrollingMap.addChild(btn);
                }
            }
            this.pageSelectors[k] = game.add.button(game.width / 2 + (k - Math.floor(colors.length / 2) + 0.5 * (1 - colors.length % 2)) * 110, this.game.world.height - 150, "plashka", function (e) {
                var difference = e.pageIndex - this.currentPage;
                this.changePage(difference);
            }, this);
            this.pageSelectors[k].pageIndex = k;
            this.pageSelectors[k].tint = colors[k];
            this.pageSelectors[k].width = 85;
            if (k == this.currentPage) {
                this.pageSelectors[k].height = this.pageSelectors[k].width * .8;
            } else {
                this.pageSelectors[k].height = this.pageSelectors[k].width;

            }
        }
        this.scrollingMap.events.onDragStart.add(function (sprite, pointer) {
            this.scrollingMap.startPosition = this.scrollingMap.x;
        }, this);
        this.scrollingMap.events.onDragStop.add(function (sprite, pointer) {
            if (this.scrollingMap.startPosition == this.scrollingMap.x) {
                for (i = 0; i < this.scrollingMap.children.length; i++) {
                    var bounds = this.scrollingMap.children[i].getBounds();
                    if (bounds.contains(pointer.x, pointer.y)) {
                        break;
                    }
                }
            } else {
                if (this.scrollingMap.startPosition - this.scrollingMap.x > game.width / 8) {
                    this.changePage(1);
                } else {
                    if (this.scrollingMap.startPosition - this.scrollingMap.x < -game.width / 8) {
                        this.changePage(-1);
                    } else {
                        this.changePage(0);
                    }
                }
            }
        }, this);

        this.colors = colors;
    },

    getStarFrame: function (number) {
        var moves = localStorage.getItem("level-" + number);
        var level = LevelManager.getLevel(number);
        moves = parseInt(moves);
        var stars = parseInt(this.totalStars.text);
        if (moves == null || level == null || level.star == null) {
            return 0;
        }
        if (level.star.three >= moves) {
            stars += 3;
            this.totalStars.text = stars;
            return 3;
        }
        if (level.star.two >= moves) {
            stars += 2;
            this.totalStars.text = stars;
            return 2;
        }
        if (level.star.one >= moves) {
            stars += 1;
            this.totalStars.text = stars;
            return 1;
        }
    },

    changePage: function (page) {
        this.currentPage += page;
        for (var k = 0; k < this.colors.length; k++) {
            if (k == this.currentPage) {
                this.pageSelectors[k].height = this.pageSelectors[k].width * .8;
            } else {
                this.pageSelectors[k].height = this.pageSelectors[k].width;

            }
        }
        var tween = this.game.add.tween(this.scrollingMap).to({
            x: this.currentPage * (-this.game.width)
        }, 300, Phaser.Easing.Cubic.Out, true);
    },

    update: function () {

    },

    onLevelClick: function (levelNumber) {
        return function () {
            if (Music.isPlaySound())
                this.game.sound.play('click');

            this.state.start(this.stateName,
                Phaser.Plugin.StateTransition.Out.SlideBottom,
                Phaser.Plugin.StateTransition.In.ScaleUp, true, false,
                LevelManager.getLevel(levelNumber));
        }
    },

    onBackClick: function () {
        if (Music.isPlaySound())
            this.game.sound.play('click');

        this.state.start('MainMenu',
            Phaser.Plugin.StateTransition.Out.SlideTop,
            Phaser.Plugin.StateTransition.In.ScaleUp, true, false);
    }
};