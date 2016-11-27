Associate.LevelMenu = function (game) {
    this.music = null;
    this.playButton = null;
    this.stateName;
};

Associate.LevelMenu.prototype = {

    init: function (state) {
        this.stateName = state;
    },

    create: function () {
        this.drawLeavesBgr();
        var home = this.game.add.button(30, this.game.world.height - 230, 'homeBig', this.onBackClick, this, 1, 0);
        home.scale.setTo(2, 2);

        var style = {
            'font': '120px Dosis',
            'fill': 'white',
            'fontWeight': 'bold'
        };
        var label = this.game.add.text(0, 100, 'Select Level', style);
        label.anchor.setTo(0.5, 0.5);
        label.x = this.game.world.centerX;


        //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
        //	Here all we're doing is playing some music and adding a picture and button
        //	Naturally I expect you to do something significantly better :)

        /*this.music = this.add.audio('titleMusic');
         this.music.play();

         this.add.sprite(0, 0, 'titlepage');

         this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');*/
        var distX = 150;
        var distY = 150;
        var border = 180;
        var size = 110;
        var rowSize = Math.floor((this.game.world.width - border) / (size + distX));

        var highestLevel = localStorage.getItem("reached-level");
        if (highestLevel == null) {
            highestLevel = 1;
            localStorage.setItem("reached-level", highestLevel);
        }

        for (var i = 0; i <= 19; i++) {
            var y = Math.floor(i / rowSize);
            var x = i - y * rowSize;
            var num = i + 1 + "";

            x = border + x * (distX + size);
            y = border + y * (distY + size) + 200;

            var btn = new LabelButton(this.game, x, y, "level", num, null, this.onLevelClick(num), this, 0);
            btn.width = size * 2;
            btn.height = size * 2;
            btn.frame = this.game.rnd.integerInRange(0, 3);


            if (this.stateName != 'Editor' && i + 1 > highestLevel) {
                btn.destroy();
                btn = this.game.add.sprite(btn.x, btn.y, 'level');
                btn.anchor.set(.5, .5);
                btn.width = size * 2;
                btn.height = size * 2;
                btn.frame = 4;
            }
        }
    },

    drawLeavesBgr: function () {
        var back = this.game.add.group();
        var leaveSize = 415;
        var w = Math.ceil(this.game.world.width / leaveSize);
        var h = Math.ceil(this.game.world.height / leaveSize);
        for (var i = 0; i < w; i++) {
            for (var j = 0; j < h; j++) {
                back.create(i * leaveSize, j * leaveSize, 'tileLeave');
            }
        }
    },

    update: function () {
        //	Do some nice funky main menu effect here

    },

    onLevelClick: function (levelNumber) {
        return function () {
            this.state.start(this.stateName, true, false, LevelManager.getLevel(levelNumber));
        }
    },

    onBackClick: function () {
        this.state.start('MainMenu', true, false);
    }
};