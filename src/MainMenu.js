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
        this.add.button(350, 200, 'start', this.onBtnClick('Game'), this);
        this.add.button(350, 300, 'select', this.onBtnClick('Editor'), this);
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