Associate.Preloader = function(game) {

    this.background = null;
    this.preloadBar = null;

    this.ready = false;

};

Associate.Preloader.prototype = {

    preload: function() {

        //	These are the assets we loaded in Boot.js
        //	A nice sparkly background and a loading progress bar
        //this.background = this.add.sprite(0, 0, 'preloaderBackground');
        //this.preloadBar = this.add.sprite(300, 400, 'preloaderBar');

        //	This sets the preloadBar sprite as a loader sprite.
        //	What that does is automatically crop the sprite from 0 to full-width
        //	as the files below are loaded in.
        //this.load.setPreloadSprite(this.preloadBar);

        //	Here we load the rest of the assets our game needs.
        //	As this is just a Project Template I've not provided these assets, the lines below won't work as the files themselves will 404, they are just an example of use.
        /*this.load.image('titlepage', 'images/title.jpg');
        this.load.atlas('playButton', 'images/play_button.png', 'images/play_button.json');
        this.load.audio('titleMusic', ['audio/main_menu.mp3']);
        this.load.bitmapFont('caslon', 'fonts/caslon.png', 'fonts/caslon.xml');*/
        //	+ lots of other required assets here
        this.load.image('squareBlack', 'images/tiles/squareBlack.png');
        this.load.image('squareWhite', 'images/tiles/squareWhite.png');

        this.load.image('blue', 'images/tiles/blue.png');
        this.load.image('green', 'images/tiles/green.png');
        this.load.image('grey', 'images/tiles/grey.png');
        this.load.image('red', 'images/tiles/red.png');
        this.load.image('yellow', 'images/tiles/yellow.png');
        this.load.image('none', 'images/tiles/none.png');
        this.load.image('lock', 'images/btn/locked.png');


        this.load.image('start', 'images/btn/buttonStart.png');
        this.load.image('select', 'images/btn/buttonSelect.png');
        this.load.image('l1', 'images/btn/buttonL1.png');
        this.load.image('l2', 'images/btn/buttonL2.png');

        this.load.image('flat_red_btn_1', 'images/btn/red_button00.png');
        this.load.image('flat_red_btn_2', 'images/btn/red_button01.png');
        this.load.image('flat_red_btn_3', 'images/btn/red_button02.png');
        this.load.image('red_circle', 'images/btn/red_button09.png');


        this.load.image('save', 'images/btn/import.png');
        this.load.image('load', 'images/btn/export.png');
        this.load.image('back', 'images/btn/exitLeft.png');
        this.load.image('btn1', 'images/btn/button1.png');
        this.load.image('btn2', 'images/btn/button2.png');
        this.load.image('btn3', 'images/btn/button3.png');

        this.load.image('left', 'images/btn/left.png');
        this.load.image('right', 'images/btn/right.png');
        this.load.image('up', 'images/btn/up.png');
        this.load.image('down', 'images/btn/down.png');


        this.load.image('0', 'images/numbers/0.png');
        this.load.image('1', 'images/numbers/1.png');
        this.load.image('2', 'images/numbers/2.png');
        this.load.image('3', 'images/numbers/3.png');
        this.load.image('4', 'images/numbers/4.png');
        this.load.image('5', 'images/numbers/5.png');
        this.load.image('6', 'images/numbers/6.png');
        this.load.image('7', 'images/numbers/7.png');
        this.load.image('8', 'images/numbers/8.png');
        this.load.image('9', 'images/numbers/9.png');
    },

    create: function() {

        //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        //this.preloadBar.cropEnabled = false;
        this.state.start('MainMenu');


    },

    update: function() {

        //	You don't actually need to do this, but I find it gives a much smoother game experience.
        //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
        //	You can jump right into the menu if you want and still play the music, but you'll have a few
        //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
        //	it's best to wait for it to decode here first, then carry on.

        //	If you don't have any music in your game then put the game.state.start line into the create function and delete
        //	the update function completely.
        /*if (this.cache.isSoundDecoded('titleMusic') && this.ready == false) {
            this.ready = true;
            this.state.start('MainMenu');
        }*/

    }

};