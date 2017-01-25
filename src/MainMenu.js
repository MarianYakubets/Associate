Associate.MainMenu = function (game) {

    this.music = null;
    this.playButton = null;
    this.soundBtn = null;
    this.musicBtn = null;
};

Associate.MainMenu.prototype = {

    onMusicClick: function () {
        Music.mute(!Music.isMuted());
        this.setMusicFrames();
    },

    setMusicFrames: function () {
        if (Music.isMuted()) {
            this.musicBtn.setFrames(0, 0, 1);
        } else {
            this.musicBtn.setFrames(2, 2, 3);
        }
    },

    setSoundFrames: function () {
        if (!Music.isPlaySound()) {
            this.soundBtn.setFrames(0, 0, 1);
        } else {
            this.soundBtn.setFrames(2, 2, 3);
        }
    },

    onSoundClick: function () {
        Music.playSound(!Music.isPlaySound());
        this.setSoundFrames();
    },


    create: function () {
        Music.initMusic(this.game, localStorage);

        LevelManager.syncLevels();
        this.drawLeavesBgr();

        // var top = this.game.add.image(this.game.width / 2, -50, 'titleTop');
        // top.scale.set(1.3, 1.3);
        // top.anchor.set(0.5, 1);

        var mid = this.game.add.image(this.game.width / 2, this.game.height * .7, 'titleMid');
        mid.anchor.set(0.5, 0);

        var bot = this.game.add.image(this.game.width / 2, this.game.height + 50, 'titleBottom');
        bot.scale.set(1.3, 1.3);
        bot.anchor.set(0.5, 1);


        //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
        //	Here all we're doing is playing some music and adding a picture and button
        //	Naturally I expect you to do something significantly better :)
        /*this.music = this.add.audio('titleMusic');
         this.music.play();
         this.add.sprite(0, 0, 'titlepage');
         this.playButton = this.add.button(400, 600, 'playButton', this.startGame, this, 'buttonOver', 'buttonOut', 'buttonOver');*/
        this.musicBtn = this.game.add.button(50, this.game.world.centerY + 100, 'musicBtn', this.onMusicClick, this, 2, 2, 3);
        this.musicBtn.scale.set(2, 2);
        this.setMusicFrames();

        this.soundBtn = this.game.add.button(50, this.game.world.centerY + 300, 'soundBtn', this.onSoundClick, this, 2, 2, 3);
        this.soundBtn.scale.set(2, 2);
        this.setSoundFrames();


        var play = this.game.add.button(this.game.world.centerX, this.game.world.centerY * .7, 'playBig', this.onBtnClick('Game'), this, 1, 0);
        play.anchor.set(.5, .5);
        play.scale.setTo(1.8, 1.8);

        this.game.add.button(this.game.world.width - 80, this.game.world.height - 80, 'option', this.onBtnClick('Editor'), this, 1, 0).alpha = 0;
    },

    drawLeavesBgr: function () {
        this.game.stage.backgroundColor = "#56433C";
    },


    update: function () {

        //	Do some nice funky main menu effect here

    },

    onBtnClick: function (state) {
        return function () {
            if (Music.isPlaySound())
                this.game.sound.play('click');

            this.state.start('LevelMenu',
                Phaser.Plugin.StateTransition.Out.SlideBottom,
                Phaser.Plugin.StateTransition.In.ScaleUp,
                true, false, state);
        }
    }


};