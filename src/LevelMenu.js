Associate.LevelMenu = function(game) {
    this.music = null;
    this.playButton = null;
    this.stateName;
};

Associate.LevelMenu.prototype = {

    init: function(state) {
        this.stateName = state;
    },

    create: function() {
        this.drawLeavesBgr();
        this.game.add.button(5, this.game.world.height - 100, 'homeBig', this.onBackClick, this, 1, 0);
        //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
        //	Here all we're doing is playing some music and adding a picture and button
        //	Naturally I expect you to do something significantly better :)

        /*this.music = this.add.audio('titleMusic');
         this.music.play();

         this.add.sprite(0, 0, 'titlepage');

         this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');*/
        var distX = 70;
        var distY = 70;
        var border = 150;
        var size = 50;
        var rowSize = Math.floor((this.game.world.width - border) / (size + distX));

        var highestLevel = localStorage.getItem("reached-level");
        if (highestLevel == null) {
            highestLevel = 1;
            localStorage.setItem("reached-level", highestLevel);
        }

        for (var i = 0; i <= 16; i++) {
            var y = Math.floor(i / rowSize);
            var x = i - y * rowSize;
            var num = i + 1 + "";

            x = border + x * (distX + size);
            y = border + y * (distY + size);

            var btn = new LabelButton(this.game, x, y, "level", num, null, this.onLevelClick(num), this, 0);
            btn.width = size * 2;
            btn.height = size * 2;


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

    drawLeavesBgr: function() {
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

    update: function() {
        //	Do some nice funky main menu effect here

    },

    onLevelClick: function(levelNumber) {
        return function() {
            this.state.start(this.stateName, true, false, LevelManager.getLevel(levelNumber));
        }
    },

    onBackClick: function() {
        this.state.start('MainMenu', true, false);
    }
};