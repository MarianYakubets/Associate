Associate.Preloader = function (game) {

    this.background = null;
    this.preloadBar = null;

    this.ready = false;

};

Associate.Preloader.prototype = {

    preload: function () {
        google: {
            families: ['Dosis']
        }
        this.game.add.tileSprite(0, 0, this.game.width, this.game.height, "backTile");

        var track = this.game.add.image(this.game.world.centerX, this.game.height * .8, 'preloaderTrack');
        track.anchor.setTo(0.5, 0.5);
        track.width = this.game.width * .7;
        track.height = 30;

        var bar = this.game.add.image(this.game.world.centerX - this.game.width * .35, this.game.height * .8, 'preloaderBar');
        bar.anchor.setTo(0, 0.5);
        bar.width = this.game.width * .7;
        bar.height = 30;

        this.load.setPreloadSprite(bar);


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

        this.load.audio('titleMusic', ['sound/sappy.mp3']);

        this.load.image('squareBlack', 'images/tiles/squareBlack.png');
        this.load.image('squareWhite', 'images/tiles/squareWhite.png');
        this.load.image('blue', 'images/tiles/blue.png');
        this.load.image('green', 'images/tiles/green.png');
        this.load.image('grey', 'images/tiles/grey.png');
        this.load.image('red', 'images/tiles/red.png');
        this.load.image('yellow', 'images/tiles/yellow.png');
        this.load.image('white', 'images/tiles/white.png');
        this.load.image('orange', 'images/tiles/orange.png');
        this.load.image('none', 'images/tiles/none.png');
        this.load.image('lock', 'images/tiles/locked.png');

        this.load.spritesheet('exit', 'images/btn/exit.png', 173, 173);
        this.load.spritesheet('save', 'images/btn/save.png', 173, 173);
        this.load.spritesheet('bottom', 'images/btn/bottom.png', 173, 173);
        this.load.spritesheet('top', 'images/btn/top.png', 173, 173);


        this.load.spritesheet('left', 'images/btn/left.png', 173, 173);
        this.load.spritesheet('right', 'images/btn/right.png', 173, 173);
        this.load.spritesheet('up', 'images/btn/up.png', 173, 173);
        this.load.spritesheet('down', 'images/btn/down.png', 173, 173);

        this.load.spritesheet('retry', 'images/btn/retry.png', 50.5, 50.5);
        this.load.spritesheet('next', 'images/btn/next.png', 80.5, 50.5);
        this.load.spritesheet('playBig', 'images/btn/playBig.png', 79, 79);
        this.load.spritesheet('playLong', 'images/btn/playLong.png', 334, 214);
        this.load.spritesheet('option', 'images/btn/option.png', 73, 73);
        this.load.spritesheet('homeBig', 'images/btn/homeBig.png', 50.5, 50.5);
        this.load.spritesheet('plashka', 'images/btn/plashka.png', 50.5, 50.5);
        this.load.spritesheet('home', 'images/btn/home.png', 73, 73);
        this.load.spritesheet('pause', 'images/btn/pause.png', 34.5, 34.5);
        this.load.image('sliderHandle', 'images/btn/sliderHandle.png');


        this.load.image('frameTop', 'images/btn/frameTop.png');
        this.load.image('frameBottom', 'images/btn/frameBottom.png');
        this.load.image('lineHorz', 'images/btn/lineHorz.png');
        this.load.image('boardShadow', 'images/btn/boardShadow.png');

        this.load.image('true', 'images/btn/checkTrue.png');
        this.load.image('false', 'images/btn/checkFalse.png');

        this.load.spritesheet('explosionred', 'images/explosion/explosionRed.png', 54, 56);
        this.load.spritesheet('explosionblue', 'images/explosion/explosionBlue.png', 54, 56);
        this.load.spritesheet('explosiongreen', 'images/explosion/explosionGreen.png', 54, 56);
        this.load.spritesheet('explosiongrey', 'images/explosion/explosionGrey.png', 54, 56);
        this.load.spritesheet('explosionorange', 'images/explosion/explosionOrange.png', 54, 56);
        this.load.spritesheet('explosionpurple', 'images/explosion/explosionPurple.png', 54, 56);
        this.load.spritesheet('explosionyellow', 'images/explosion/explosionYellow.png', 54, 56);
        this.load.spritesheet('explosionIce', 'images/explosion/explosionIce.png', 43.5, 43.5, 10);


        this.load.image('menu', 'images/bgr/menu.png');
        this.load.image('tileLeave', 'images/bgr/tileLeave.png');
        //this.load.image('backTile', 'images/bgr/backTile.png');
        this.load.image('backTileRound', 'images/bgr/backTileRound.png');

        //this.load.image('titleTop', 'images/bgr/titleTop.png');
        this.load.image('titleBottom', 'images/bgr/titleBottom.png');
        this.load.image('titleMid', 'images/bgr/titleMid.png');


        this.load.spritesheet('level', 'images/btn/level.png', 104, 114.5);
        this.load.spritesheet('musicBtn', 'images/btn/musicBtn.png', 73, 73);
        this.load.spritesheet('soundBtn', 'images/btn/soundBtn.png', 73, 73);

        this.load.spritesheet('monster', 'images/tiles/tiles.png', 63.5, 63);
        this.load.spritesheet('tiles', 'images/tiles/moreTiles.png', 63, 63);
        this.load.spritesheet('frame', 'images/tiles/frame.png', 77.15, 76);


        this.load.spritesheet('star', 'images/tiles/star.png', 79, 84);
        this.load.image('starOn', 'images/btn/starOn.png');
        this.load.image('starOff', 'images/btn/starOff.png');
        this.load.image('starSmall', 'images/btn/starSmall.png');
        this.load.image('starSmallOff', 'images/btn/starSmallOff.png');

        this.load.image('shadow', 'images/tiles/shadow.png');
        this.load.image('hiliteCircle', 'images/tiles/hiliteCircle.png');

        this.load.image('arrowDown', 'images/tiles/arrowDown.png');
        this.load.image('arrowLeft', 'images/tiles/arrowLeft.png');
        this.load.image('arrowRight', 'images/tiles/arrowRight.png');
        this.load.image('arrowUp', 'images/tiles/arrowUp.png');


        this.load.spritesheet('down', 'images/btn/down.png', 173, 173);


        this.load.image("hand", "images/sprites/hand.png");

        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');


        this.load.audio('click', 'sound/click.mp3');
        this.load.audio('flip', 'sound/flip.mp3');
        this.load.audio('ice', 'sound/ice.mp3');
        this.load.audio('tap', 'sound/tap.mp3');
        this.load.audio('victory', 'sound/victory.mp3');
        this.load.audio('boop', 'sound/boop.mp3');
        this.load.audio('stone', 'sound/stone.mp3');
        this.load.audio('swip', 'sound/swip.mp3');
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