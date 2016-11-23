Associate.MainMenu = function(game) {

    this.music = null;
    this.playButton = null;

};

Associate.MainMenu.prototype = {

    create: function() {
        this.drawLeavesBgr();
        //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
        //	Here all we're doing is playing some music and adding a picture and button
        //	Naturally I expect you to do something significantly better :)
        /*this.music = this.add.audio('titleMusic');
         this.music.play();
         this.add.sprite(0, 0, 'titlepage');
         this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');*/
        this.game.add.button(this.game.world.centerX - 75, this.game.world.centerY * 1.3, 'playBig', this.onBtnClick('Game'), this, 1, 0);
        this.game.add.button(this.game.world.width - 80, this.game.world.height - 80, 'option', this.onBtnClick('Editor'), this, 1, 0);
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

    onBtnClick: function(state) {
        return function() {
            this.state.start('LevelMenu', true, false, state);
        }
    }


};