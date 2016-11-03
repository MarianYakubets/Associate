Associate = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    /* If the music in your game needs to play through-out a few State swaps, then you could reference it here */
    music: null,

    /* Your game can check Associate.orientated in internal loops to know if it should pause or not */
    orientated: false

};

Associate.Boot = function(game) {};

Associate.Boot.prototype = {

    init: function() {

        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = true;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setMinMax(768, 1024, 1536, 2048);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        if (!this.game.device.desktop) {
            this.scale.forceOrientation(true, true);
            this.scale.setResizeCallback(this.gameResized, this);
            //this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            //this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }
        
        LevelManager.syncLevels();
    },

    preload: function() {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        /*this.load.image('preloaderBackground', 'images/preloader_background.jpg');
         this.load.image('preloaderBar', 'images/preloader_bar.png');*/

    },

    create: function() {

        this.state.start('Preloader');

    },

    gameResized: function(width, height) {

        //  This could be handy if you need to do any extra processing if the game resizes.
        //  A resize could happen if for example swapping orientation on a device or resizing the browser window.
        //  Note that this callback is only really useful if you use a ScaleMode of RESIZE and place it inside your main game state.

    },

    enterIncorrectOrientation: function() {

        Associate.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function() {

        Associate.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    }

};