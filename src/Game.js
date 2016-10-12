Associate.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game; //   a reference to the currently running game
    this.add; //    used to add sprites, text, groups, etc
    this.camera; // a reference to the game camera
    this.cache; //  the game cache
    this.input; //  the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load; //   for preload assets
    this.math; //   lots of useful common math operations
    this.sound; //  the sound manager - add a sound, play one, set-up markers, etc
    this.stage; //  the game stage
    this.time; //   the clock
    this.tweens; // the tween manager
    this.world; //  the game world
    this.particles; //  the particle manager
    this.physics; //    the physics manager
    this.rnd; //    the repeatable random number generator

    this.tileSize = 48;

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

Associate.Game.prototype = {

    create: function () {
        this.game.stage.backgroundColor = '#96ceb4';

        var group = this.game.add.group();

        group.create(3, 3, 'green');
        group.createMultiple(23, "grey", [0], true);
        group.createMultiple(26, "blue", [0], true);
        group.createMultiple(24, "yellow", [0], true);
        group.createMultiple(5, "red", [0], true);
        group.create(16, 3, 'green');

        group.setAll('inputEnabled', true);
        group.callAll('events.onInputDown.add', 'events.onInputDown', this.flip(this, 'green'));

        group.align(12, -1, 48, 48);

        group.create(16, 3, 'green');

        group.x = 100;
        group.y = 100;
    },


    flip: function (context, type) {
        return function (item) {
            item.anchor.x = 0.5;
            item.x = item.x + item.width / 2;
            var name = item.key;
            var flip = context.game.add.tween(item.scale).to({
                x: 0,
                y: 1
            }, 200, Phaser.Easing.None, true);
            flip.onComplete.add(function () {
                item.loadTexture(type);
                context.game.add.tween(item.scale).to({
                    x: 1,
                    y: 1
                }, 200, Phaser.Easing.None, true).onComplete.add(function () {
                    item.anchor.x = 0;
                    item.x = item.x - item.width / 2;
                }, this);
            }, this);
        }
    },

    update: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        //this.state.start('MainMenu');

    }

};