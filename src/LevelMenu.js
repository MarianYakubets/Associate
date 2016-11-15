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
        this.game.add.tileSprite(-2, -2, this.game.world.width + 2, this.game.world.height + 2, 'paper');
        var bcgr = this.game.add.sprite(0, 0, 'sakura');
        bcgr.width = this.game.world.width;
        bcgr.height = this.game.world.height;
        bcgr.alpha = 0.3;
        this.game.add.button(20, 10, 'exit', this.onBackClick, this, 1, 0, 2).scale.setTo(0.5, 0.5);
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


        for (var i = 0; i <= 16; i++) {
            var y = Math.floor(i / rowSize);
            var x = i - y * rowSize;
            var num = i + 1 + "";
            var btn = new LabelButton(this.game, border + x * (distX + size), border + y * (distY + size), "circle", num, null, this.onLevelClick(num), this, 1, 0, 2, 3);
            btn.width = size * 2;
            btn.height = size * 2;
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