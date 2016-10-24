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
        this.add.button(100, 300, '1', this.onLevelClick(1), this);
        this.add.button(200, 300, '2', this.onLevelClick(2), this);
        this.add.button(300, 300, '3', this.onLevelClick(3), this);
        this.add.button(400, 300, '4', this.onLevelClick(4), this);
        this.add.button(500, 300, '5', this.onLevelClick(5), this);
    },
    update: function () {

        //	Do some nice funky main menu effect here

    },

    onLevelClick: function (levelNumber) {
        return function () {
            //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
            //this.music.stop();
            //	And start the actual game
            this.state.start('Game', true, false, levelNumber);
        }
    }


};