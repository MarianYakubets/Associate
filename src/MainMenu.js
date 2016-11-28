Associate.MainMenu = function (game) {

    this.music = null;
    this.playButton = null;

};

Associate.MainMenu.prototype = {

    create: function () {
        LevelManager.syncLevels();
        this.drawLeavesBgr();
        //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
        //	Here all we're doing is playing some music and adding a picture and button
        //	Naturally I expect you to do something significantly better :)
        /*this.music = this.add.audio('titleMusic');
         this.music.play();
         this.add.sprite(0, 0, 'titlepage');
         this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');*/
        var play = this.game.add.button(this.game.world.centerX, this.game.world.centerY * 1.3, 'playLong', this.onBtnClick('Game'), this, 0, 0);
        play.anchor.set(.5, .5);
        play.scale.setTo(.8, .8);

        this.game.add.button(this.game.world.width - 80, this.game.world.height - 80, 'option', this.onBtnClick('Editor'), this, 1, 0).alpha = 0;
    },

    drawLeavesBgr: function () {
        this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "tileLeave");
    },


    update: function () {

        //	Do some nice funky main menu effect here

    },

    onBtnClick: function (state) {
        return function () {
            this.state.start('LevelMenu', true, false, state);
        }
    }


};