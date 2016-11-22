var ScreenMetrics = {
    windowWidth: 0,
    windowHeight: 0,

    defaultGameWidth: 0,
    defaultGameHeight: 0,
    maxGameWidth: 0,
    maxGameHeight: 0,

    gameWidth: 0,
    gameHeight: 0,
    scaleX: 0,
    scaleY: 0,
    offsetX: 0,
    offsetY: 0
};

var Orientation = {
    PORTRAIT: "portrait",
    LANDSCAPE: "landscape"
};

var ScreenUtils = {
    screenMetrics: null,
    // -------------------------------------------------------------------------
    calculateScreenMetrics: function(aDefaultWidth, aDefaultHeight, aOrientation, aMaxGameWidth, aMaxGameHeight) {
        // get dimension of window
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;


        // swap if window dimensions do not match orientation
        if ((windowWidth < windowHeight && aOrientation === Orientation.LANDSCAPE) ||
            (windowHeight < windowWidth && aOrientation === Orientation.PORTRAIT)) {
            var tmp = windowWidth;
            windowWidth = windowHeight;
            windowHeight = tmp;
        }


        // calculate max game dimension. The bounds are iPad and iPhone 
        if (typeof aMaxGameWidth === "undefined" || typeof aMaxGameHeight === "undefined") {
            if (aOrientation === Orientation.LANDSCAPE) {
                aMaxGameWidth = Math.round(aDefaultWidth * 1420 / 1280);
                aMaxGameHeight = Math.round(aDefaultHeight * 960 / 800);
            } else {
                aMaxGameWidth = Math.round(aDefaultWidth * 960 / 800);
                aMaxGameHeight = Math.round(aDefaultHeight * 1420 / 1280);
            }
        };


        // default aspect and current window aspect
        var defaultAspect = (aOrientation === Orientation.LANDSCAPE) ? 1280 / 800 : 800 / 1280;
        var windowAspect = windowWidth / windowHeight;

        var offsetX = 0;
        var offsetY = 0;
        var gameWidth = 0;
        var gameHeight = 0;

        // if (aOrientation === Orientation.LANDSCAPE) {
        // "iPhone" landscape ... and "iPad" portrait
        if (windowAspect > defaultAspect) {
            gameHeight = aDefaultHeight;
            gameWidth = Math.ceil((gameHeight * windowAspect) / 2.0) * 2;
            gameWidth = Math.min(gameWidth, aMaxGameWidth);
            offsetX = (gameWidth - aDefaultWidth) / 2;
            offsetY = 0;
        } else { // "iPad" landscpae ... and "iPhone" portrait
            gameWidth = aDefaultWidth;
            gameHeight = Math.ceil((gameWidth / windowAspect) / 2.0) * 2;
            gameHeight = Math.min(gameHeight, aMaxGameHeight);
            offsetX = 0;
            offsetY = (gameHeight - aDefaultHeight) / 2;
        }
        /* } else {    // "iPhone" portrait
            if (windowAspect < defaultAspect) {
                gameWidth = aDefaultWidth;
                gameHeight = gameWidth / windowAspect;
                gameHeight = Math.min(gameHeight, aMaxGameHeight);
                offsetX = 0;
                offsetY = (gameHeight - aDefaultHeight) / 2;
            } else {    // "iPad" portrait
                gameHeight = aDefaultHeight;
                gameWidth = gameHeight = windowAspect;
                gameWidth = Math.min(gameWidth, aMaxGameWidth);
                offsetX = (gameWidth - aDefaultWidth) / 2;
                offsetY = 0;
            }
        }
        */


        // calculate scale
        var scaleX = windowWidth / gameWidth;
        var scaleY = windowHeight / gameHeight;


        // store values
        ScreenMetrics.windowWidth = windowWidth;
        ScreenMetrics.windowHeight = windowHeight;

        ScreenMetrics.defaultGameWidth = aDefaultWidth;
        ScreenMetrics.defaultGameHeight = aDefaultHeight;
        ScreenMetrics.maxGameWidth = aMaxGameWidth;
        ScreenMetrics.maxGameHeight = aMaxGameHeight;

        ScreenMetrics.gameWidth = gameWidth;
        ScreenMetrics.gameHeight = gameHeight;
        ScreenMetrics.scaleX = scaleX;
        ScreenMetrics.scaleY = scaleY;
        ScreenMetrics.offsetX = offsetX;
        ScreenMetrics.offsetY = offsetY;

        return ScreenMetrics;
    }
}