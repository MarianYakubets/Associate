Associate.MainMenu = function (game) {

    this.music = null;
    this.playButton = null;

};

Associate.MainMenu.prototype = {

    create: function () {
        this.game.stage.backgroundColor = '#96ceb4';

        //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
        //	Here all we're doing is playing some music and adding a picture and button
        //	Naturally I expect you to do something significantly better :)
        /*this.music = this.add.audio('titleMusic');
         this.music.play();
         this.add.sprite(0, 0, 'titlepage');
         this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');*/

        new LabelButton(this.game, this.game.world.centerX, 300, "long", "Game", null, this.onBtnClick('Game'), this, 1, 0, 2, 3);
        new LabelButton(this.game, this.game.world.centerX, 500, "long", "Editor", null, this.onBtnClick('Editor'), this, 1, 0, 2, 3);
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