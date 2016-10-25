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
        this.game.stage.backgroundColor = '#96ceb4';

        //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
        //	Here all we're doing is playing some music and adding a picture and button
        //	Naturally I expect you to do something significantly better :)

        /*this.music = this.add.audio('titleMusic');
         this.music.play();

         this.add.sprite(0, 0, 'titlepage');

         this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');*/
        this.add.button(250, 200, 'btn1', this.onLevelClick(1), this);
        this.add.button(350, 200, 'btn2', this.onLevelClick(2), this);
        this.add.button(450, 200, 'btn3', this.onLevelClick(3), this);
    },
    update: function() {


        //	Do some nice funky main menu effect here

    },

    onLevelClick: function(levelNumber) {
        return function() {
            this.state.start(this.stateName, true, false, JSON.parse(LevelManager.getLevel(levelNumber)));
        }
    }


};