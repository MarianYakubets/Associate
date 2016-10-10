Associate.Game = function (game) {

    //	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game; //	a reference to the currently running game
    this.add; //	used to add sprites, text, groups, etc
    this.camera; //	a reference to the game camera
    this.cache; //	the game cache
    this.input; //	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load; //	for preloading assets
    this.math; //	lots of useful common math operations
    this.sound; //	the sound manager - add a sound, play one, set-up markers, etc
    this.stage; //	the game stage
    this.time; //	the clock
    this.tweens; //	the tween manager
    this.world; //	the game world
    this.particles; //	the particle manager
    this.physics; //	the physics manager
    this.rnd; //	the repeatable random number generator

    this.tileSize = 48;

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

Associate.Game.prototype = {

    create: function () {
        this.game.stage.backgroundColor = '#96ceb4';
/*        this.game.add.sprite(100, 100, "blue");
        this.game.add.sprite(200, 100, "green");
        this.game.add.sprite(300, 100, "grey");
        this.game.add.sprite(400, 100, "red");
        this.game.add.sprite(500, 100, "yellow");*/

        var startX = 100;
        var startY = 100;

        var width = 10;
        var height = 10;

        for (var i = 0; i < width; i++) {
            for (var j = 0; j < height; j++) {
                this.game.add.sprite(startX + i * this.tileSize, startY + j * this.tileSize, "grey");
            }
        }
    },

    update: function () {

        //	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

    },

    quitGame: function (pointer) {

        //	Here you should destroy anything you no longer need.
        //	Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //	Then let's go back to the main menu.
        //this.state.start('MainMenu');

    }

};