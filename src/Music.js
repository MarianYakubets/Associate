var Music = {
    music: null,
    storage: null,
    playSounds: true,

    initMusic: function (game, storage) {
        if (this.music != null) {
            return;
        }
        this.music = game.add.audio('titleMusic');
        this.music.play();
        this.music.loopFull(.1);
        this.music.volume = .6;
        this.storage = storage;
        this.mute(storage.getItem("musicOn"));
        this.playSound(storage.getItem("playSound"))
    },

    mute: function (option) {
        if (option === null || option === undefined) {
            option = false;
        }
        this.music.mute = (option.toString() == 'true');
        this.storage.setItem("musicOn", option);
    },

    playSound: function (option) {
        if (option === null || option === undefined) {
            option = false;
        }
        this.playSounds = (option.toString() == 'true');
        this.storage.setItem("playSound", option);
    },

    isPlaySound: function () {
        return this.playSounds;
    },

    isMuted: function () {
        return this.music.mute;
    }
};