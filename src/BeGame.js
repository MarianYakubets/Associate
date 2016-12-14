Associate.BeGame = function (game) {
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



    this.fieldSize = 7;
    this.orbColors = 6;
    this.orbSize = 100;

    this.swapSpeed = 200;
    this.fallSpeed = 500;
    this.destroySpeed = 200;
    this.fastFall = true;

    this.gameArray = [];
    this.removeMap = [];
    this.orbGroup;
    this.selectedOrb;
    this.canPick = true;

    this.hand;
    this.handTween;
};

Associate.BeGame.prototype = {

    init: function (level) {
    },

    create: function () {
        this.drawField();
        this.showSuggestion();
        this.canPick = true;
        this.input.onDown.add(this.orbSelect.bind(this));
        this.input.onUp.add(this.orbDeselect.bind(this));
    },

    drawField: function () {
        this.orbGroup = this.game.add.group();
        for (var i = 0; i < this.fieldSize; i++) {
            this.gameArray[i] = [];
            for (var j = 0; j < this.fieldSize; j++) {
                var orb = this.game.add.sprite(this.orbSize * j + this.orbSize / 2, this.orbSize * i + this.orbSize / 2, "monster");
                orb.anchor.set(0.5);
                this.orbGroup.add(orb);
                do {
                    var randomColor = this.game.rnd.between(0, this.orbColors - 1);
                    orb.frame = randomColor;
                    this.gameArray[i][j] = {
                        orbColor: randomColor,
                        orbSprite: orb
                    }
                } while (this.isMatch(i, j));
            }
        }
        this.selectedOrb = null;
        this.hand = this.game.add.sprite(0, 0, "hand");
        this.hand.anchor.set(0.5);
        this.hand.visible = false;
        this.orbGroup.pivot.set(350, 350);
        this.orbGroup.position.set(350, 350);
    },

    showSuggestion: function () {
        var matchFound = false;
        for (var i = 0; i < this.fieldSize - 1; i++) {
            for (var j = 0; j < this.fieldSize - 1; j++) {
                this.tmpSwap(i, j, i + 1, j);
                if (this.matchInBoard()) {
                    this.hand.visible = true;
                    this.hand.x = this.gameArray[i + 1][j].orbSprite.x + 16;
                    this.hand.y = this.gameArray[i + 1][j].orbSprite.y + 70;
                    this.handTween = this.game.add.tween(this.hand).to({
                        y: this.hand.y + 100
                    }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);
                    matchFound = true;
                }
                this.tmpSwap(i, j, i + 1, j);
                if (matchFound) {
                    return;
                }
                this.tmpSwap(i, j, i, j + 1);
                if (this.matchInBoard()) {
                    this.hand.visible = true;
                    this.hand.x = this.gameArray[i][j + 1].orbSprite.x + 16;
                    this.hand.y = this.gameArray[i][j + 1].orbSprite.y + 70;
                    this.handTween = this.game.add.tween(this.hand).to({
                        x: this.hand.x + 100
                    }, 500, Phaser.Easing.Linear.None, true, 0, -1, true);
                    matchFound = true;
                }
                this.tmpSwap(i, j, i, j + 1);
                if (matchFound) {
                    return;
                }
            }
        }
        console.log("no match");
    },

    tmpSwap: function (row1, col1, row2, col2) {
        var tmp = this.gameArray[row1][col1];
        this.gameArray[row1][col1] = this.gameArray[row2][col2];
        this.gameArray[row2][col2] = tmp;
    },

    orbSelect: function (e) {
        if (this.canPick) {
            this.hand.visible = false;
            this.handTween.stop();
            var row = Math.floor(e.worldY / this.orbSize);
            var col = Math.floor(e.worldX / this.orbSize);
            var pickedOrb = this.gemAt(row, col);
            if (pickedOrb != -1) {
                if (this.selectedOrb == null) {
                    pickedOrb.orbSprite.scale.setTo(1.2);
                    pickedOrb.orbSprite.bringToTop();
                    this.selectedOrb = pickedOrb;
                    this.game.input.addMoveCallback(this.orbMove.bind(this));
                }
                else {
                    if (this.areTheSame(pickedOrb, this.selectedOrb)) {
                        this.selectedOrb.orbSprite.scale.setTo(1);
                        this.selectedOrb = null;
                    }
                    else {
                        if (this.areNext(pickedOrb, this.selectedOrb)) {
                            this.selectedOrb.orbSprite.scale.setTo(1);
                            this.swapOrbs(this.selectedOrb, pickedOrb, true);
                        }
                        else {
                            this.selectedOrb.orbSprite.scale.setTo(1);
                            pickedOrb.orbSprite.scale.setTo(1.2);
                            this.selectedOrb = pickedOrb;
                            this.game.input.addMoveCallback(this.orbMove.bind(this));
                        }
                    }
                }
            }
        }
    },

    orbDeselect: function (e) {
        this.input.deleteMoveCallback(this.orbMove.bind(this));
    },

    orbMove: function (event, pX, pY) {
        if (event.id == 0) {
            var distX = pX - this.selectedOrb.orbSprite.x;
            var distY = pY - this.selectedOrb.orbSprite.y;
            var deltaRow = 0;
            var deltaCol = 0;
            if (Math.abs(distX) > this.orbSize / 2) {
                if (distX > 0) {
                    deltaCol = 1;
                }
                else {
                    deltaCol = -1;
                }
            }
            else {
                if (Math.abs(distY) > this.orbSize / 2) {
                    if (distY > 0) {
                        deltaRow = 1;
                    }
                    else {
                        deltaRow = -1;
                    }
                }
            }
            if (deltaRow + deltaCol != 0) {
                var pickedOrb = this.gemAt(this.getOrbRow(this.selectedOrb) + deltaRow, this.getOrbCol(this.selectedOrb) + deltaCol);
                if (pickedOrb != -1) {
                    this.selectedOrb.orbSprite.scale.setTo(1);
                    this.swapOrbs(this.selectedOrb, pickedOrb, true);
                    this.game.input.deleteMoveCallback(this.orbMove.bind(this));
                }
            }
        }
    },

    swapOrbs: function (orb1, orb2, swapBack) {
        this.canPick = false;
        var fromColor = orb1.orbColor;
        var fromSprite = orb1.orbSprite;
        var toColor = orb2.orbColor;
        var toSprite = orb2.orbSprite;
        this.gameArray[this.getOrbRow(orb1)][this.getOrbCol(orb1)].orbColor = toColor;
        this.gameArray[this.getOrbRow(orb1)][this.getOrbCol(orb1)].orbSprite = toSprite;
        this.gameArray[this.getOrbRow(orb2)][this.getOrbCol(orb2)].orbColor = fromColor;
        this.gameArray[this.getOrbRow(orb2)][this.getOrbCol(orb2)].orbSprite = fromSprite;
        var orb1Tween = this.game.add.tween(this.gameArray[this.getOrbRow(orb1)][this.getOrbCol(orb1)].orbSprite).to({
            x: this.getOrbCol(orb1) * this.orbSize + this.orbSize / 2,
            y: this.getOrbRow(orb1) * this.orbSize + this.orbSize / 2
        }, this.swapSpeed, Phaser.Easing.Linear.None, true);
        var orb2Tween = this.game.add.tween(this.gameArray[this.getOrbRow(orb2)][this.getOrbCol(orb2)].orbSprite).to({
            x: this.getOrbCol(orb2) * this.orbSize + this.orbSize / 2,
            y: this.getOrbRow(orb2) * this.orbSize + this.orbSize / 2
        }, this.swapSpeed, Phaser.Easing.Linear.None, true);
        orb2Tween.onComplete.add(function () {
            if (!this.matchInBoard() && swapBack) {
                this.swapOrbs(orb1, orb2, false);
            }
            else {
                if (this.matchInBoard()) {
                    this.handleMatches();
                }
                else {
                    this.canPick = true;
                    this.selectedOrb = null;
                }
            }
        }, this);
    },

    areNext: function (orb1, orb2) {
        return Math.abs(this.getOrbRow(orb1) - this.getOrbRow(orb2)) + Math.abs(this.getOrbCol(orb1) - this.getOrbCol(orb2)) == 1;
    },

    areTheSame: function (orb1, orb2) {
        return this.getOrbRow(orb1) == this.getOrbRow(orb2) && this.getOrbCol(orb1) == this.getOrbCol(orb2);
    },

    gemAt: function (row, col) {
        if (row < 0 || row >= this.fieldSize || col < 0 || col >= this.fieldSize) {
            return -1;
        }
        return this.gameArray[row][col];
    },

    getOrbRow: function (orb) {
        return Math.floor(orb.orbSprite.y / this.orbSize);
    },

    getOrbCol: function (orb) {
        return Math.floor(orb.orbSprite.x / this.orbSize);
    },

    isHorizontalMatch: function (row, col) {
        return this.gemAt(row, col).orbColor == this.gemAt(row, col - 1).orbColor && this.gemAt(row, col).orbColor == this.gemAt(row, col - 2).orbColor;
    },

    isVerticalMatch: function (row, col) {
        return this.gemAt(row, col).orbColor == this.gemAt(row - 1, col).orbColor && this.gemAt(row, col).orbColor == this.gemAt(row - 2, col).orbColor;
    },

    isMatch: function (row, col) {
        return this.isHorizontalMatch(row, col) || this.isVerticalMatch(row, col);
    },

    matchInBoard: function () {
        for (var i = 0; i < this.fieldSize; i++) {
            for (var j = 0; j < this.fieldSize; j++) {
                if (this.isMatch(i, j)) {
                    return true;
                }
            }
        }
        return false;
    },

    handleMatches: function () {
        this.removeMap = [];
        for (var i = 0; i < this.fieldSize; i++) {
            this.removeMap[i] = [];
            for (var j = 0; j < this.fieldSize; j++) {
                this.removeMap[i].push(0);
            }
        }
        this.handleHorizontalMatches();
        this.handleVerticalMatches();
        this.destroyOrbs();
    },

    handleVerticalMatches: function () {
        for (var i = 0; i < this.fieldSize; i++) {
            var colorStreak = 1;
            var currentColor = -1;
            var startStreak = 0;
            for (var j = 0; j < this.fieldSize; j++) {
                if (this.gemAt(j, i).orbColor == currentColor) {
                    colorStreak++;
                }
                if (this.gemAt(j, i).orbColor != currentColor || j == this.fieldSize - 1) {
                    if (colorStreak >= 3) {
                        console.log("VERTICAL :: Length = " + colorStreak + " :: Start = (" + startStreak + "," + i + ") :: Color = " + currentColor);
                        switch (colorStreak) {
                            case 3:
                                for (var k = 0; k < colorStreak; k++) {
                                    this.removeMap[startStreak + k][i]++;
                                }
                                break;
                            case 4:
                                for (var k = 0; k < this.fieldSize; k++) {
                                    this.removeMap[k][i]++;
                                }
                                break;
                            default:
                                for (var k = 0; k < this.fieldSize; k++) {
                                    for (var l = 0; l < this.fieldSize; l++) {
                                        if (this.gemAt(k, l).orbColor == currentColor) {
                                            this.removeMap[k][l]++;
                                        }
                                    }
                                }
                                break;
                        }
                    }
                    startStreak = j;
                    colorStreak = 1;
                    currentColor = this.gemAt(j, i).orbColor;
                }
            }
        }
    },

    handleHorizontalMatches: function () {
        for (var i = 0; i < this.fieldSize; i++) {
            var colorStreak = 1;
            var currentColor = -1;
            var startStreak = 0;
            for (var j = 0; j < this.fieldSize; j++) {
                if (this.gemAt(i, j).orbColor == currentColor) {
                    colorStreak++;
                }
                if (this.gemAt(i, j).orbColor != currentColor || j == this.fieldSize - 1) {
                    if (colorStreak >= 3) {
                        console.log("HORIZONTAL :: Length = " + colorStreak + " :: Start = (" + i + "," + startStreak + ") :: Color = " + currentColor);
                        switch (colorStreak) {
                            case 3:
                                for (var k = 0; k < colorStreak; k++) {
                                    this.removeMap[i][startStreak + k]++;
                                }
                                break;
                            case 4:
                                for (var k = 0; k < this.fieldSize; k++) {
                                    this.removeMap[i][k]++;
                                }
                                break;
                            default:
                                for (var k = 0; k < this.fieldSize; k++) {
                                    for (var l = 0; l < this.fieldSize; l++) {
                                        if (this.gemAt(k, l).orbColor == currentColor) {
                                            this.removeMap[k][l]++;
                                        }
                                    }
                                }
                                break;
                        }
                    }
                    startStreak = j;
                    colorStreak = 1;
                    currentColor = this.gemAt(i, j).orbColor;
                }
            }
        }
    },

    destroyOrbs: function () {
        var destroyed = 0;
        for (var i = 0; i < this.fieldSize; i++) {
            for (var j = 0; j < this.fieldSize; j++) {
                if (this.removeMap[i][j] > 0) {
                    var destroyTween = this.game.add.tween(this.gameArray[i][j].orbSprite).to({
                        alpha: 0
                    }, this.destroySpeed, Phaser.Easing.Linear.None, true);
                    destroyed++;
                    destroyTween.onComplete.add(function (orb) {
                        orb.destroy();
                        destroyed--;
                        if (destroyed == 0) {
                            this.makeOrbsFall();
                            if (this.fastFall) {
                                this.replenishField();
                            }
                        }
                    }, this);
                    this.gameArray[i][j] = null;
                }
            }
        }
    },

    makeOrbsFall: function () {
        var fallen = 0;
        var restart = false;
        for (var i = this.fieldSize - 2; i >= 0; i--) {
            for (var j = 0; j < this.fieldSize; j++) {
                if (this.gameArray[i][j] != null) {
                    var fallTiles = this.holesBelow(i, j);
                    if (fallTiles > 0) {
                        if (!this.fastFall && fallTiles > 1) {
                            fallTiles = 1;
                            restart = true;
                        }
                        var orb2Tween = this.game.add.tween(this.gameArray[i][j].orbSprite).to({
                            y: this.gameArray[i][j].orbSprite.y + fallTiles * this.orbSize
                        }, this.fallSpeed, Phaser.Easing.Linear.None, true);
                        fallen++;
                        orb2Tween.onComplete.add(function () {
                            fallen--;
                            if (fallen == 0) {
                                if (restart) {
                                    this.makeOrbsFall();
                                }
                                else {
                                    if (!this.fastFall) {
                                        this.replenishField();
                                    }
                                }
                            }
                        }, this);
                        this.gameArray[i + fallTiles][j] = {
                            orbSprite: this.gameArray[i][j].orbSprite,
                            orbColor: this.gameArray[i][j].orbColor
                        };
                        this.gameArray[i][j] = null;
                    }
                }
            }
        }
        if (fallen == 0) {
            this.replenishField();
        }
    },

    replenishField: function () {
        var replenished = 0;
        var restart = false;
        for (var j = 0; j < this.fieldSize; j++) {
            var emptySpots = this.holesInCol(j);
            if (emptySpots > 0) {
                if (!this.fastFall && emptySpots > 1) {
                    emptySpots = 1;
                    restart = true;
                }
                for (var i = 0; i < emptySpots; i++) {
                    var orb = this.game.add.sprite(this.orbSize * j + this.orbSize / 2, -(this.orbSize * (emptySpots - 1 - i) + this.orbSize / 2), "monster");
                    orb.anchor.set(0.5);
                    this.orbGroup.add(orb);
                    var randomColor = this.game.rnd.between(0, this.orbColors - 1);
                    orb.frame = randomColor;
                    this.gameArray[i][j] = {
                        orbColor: randomColor,
                        orbSprite: orb
                    };
                    var orb2Tween = this.game.add.tween(this.gameArray[i][j].orbSprite).to({
                        y: this.orbSize * i + this.orbSize / 2
                    }, this.fallSpeed, Phaser.Easing.Linear.None, true);
                    replenished++;
                    orb2Tween.onComplete.add(function () {
                        replenished--;
                        if (replenished == 0) {
                            if (restart) {
                                this.makeOrbsFall();
                            }
                            else {
                                if (this.matchInBoard()) {
                                    this.game.time.events.add(250, this.handleMatches.bind(this));
                                }
                                else {
                                    var rotateBoard = this.game.add.tween(this.orbGroup).to({
                                        angle: 90
                                    }, 1000, Phaser.Easing.Bounce.Out, true);
                                    rotateBoard.onComplete.add(function () {
                                        this.gameArray = Phaser.ArrayUtils.rotateMatrix(this.gameArray, -90);
                                        for (var i = 0; i < this.fieldSize; i++) {
                                            for (var j = 0; j < this.fieldSize; j++) {
                                                this.gameArray[i][j].orbSprite.angle += 90;
                                                this.gameArray[i][j].orbSprite.x = j * this.orbSize + this.orbSize / 2;
                                                this.gameArray[i][j].orbSprite.y = i * this.orbSize + this.orbSize / 2;
                                            }
                                        }
                                        this.orbGroup.angle = 0;
                                        this.canPick = true;
                                        this.selectedOrb = null;
                                        this.showSuggestion();
                                    }, this)
                                }
                            }
                        }
                    }, this)
                }
            }
        }
    },

    holesBelow: function (row, col) {
        var result = 0;
        for (var i = row + 1; i < this.fieldSize; i++) {
            if (this.gameArray[i][col] == null) {
                result++;
            }
        }
        return result;
    },

    holesInCol: function (col) {
        var result = 0;
        for (var i = 0; i < this.fieldSize; i++) {
            if (this.gameArray[i][col] == null) {
                result++;
            }
        }
        return result;
    }
};

