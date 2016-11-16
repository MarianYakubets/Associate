Associate.Preloader = function (game) {

    this.background = null;
    this.preloadBar = null;

    this.ready = false;

};

Associate.Preloader.prototype = {

    preload: function () {

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
        this.load.image('lock', 'images/tiles/locked.png');


        this.load.spritesheet('long', 'images/btn/long.png', 316, 140);
        this.load.spritesheet('circle', 'images/btn/circle.png', 173, 173);
        this.load.spritesheet('exit', 'images/btn/exit.png', 173, 173);
        this.load.spritesheet('save', 'images/btn/save.png', 173, 173);
        this.load.spritesheet('bottom', 'images/btn/bottom.png', 173, 173);
        this.load.spritesheet('top', 'images/btn/top.png', 173, 173);
        this.load.image('locker', 'images/btn/lock.png');
        this.load.spritesheet('close', 'images/btn/close.png', 173, 173);
        this.load.spritesheet('pause', 'images/btn/pause.png', 173, 173);


        this.load.spritesheet('left', 'images/btn/left.png', 173, 173);
        this.load.spritesheet('right', 'images/btn/right.png', 173, 173);
        this.load.spritesheet('up', 'images/btn/up.png', 173, 173);
        this.load.spritesheet('down', 'images/btn/down.png', 173, 173);

        this.load.image('paper', 'images/bgr/paper.png');
        this.load.image('sakura', 'images/bgr/sakura.jpg');
        this.load.image('leaves', 'images/bgr/leaves.jpg');


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

    create: function () {

        //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        //this.preloadBar.cropEnabled = false;
        this.state.start('MainMenu');


    },

    update: function () {

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