var Music = {
    music: null,
    storage: null,
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
    },

    mute: function (option) {
        if (option === null || option === undefined) {
            option = false;
        }
        this.music.mute = option;
        this.storage.setItem("musicOn", option)
    },

    isMuted: function () {
        return this.music.mute;
    }
};