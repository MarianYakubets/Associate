

document.addEventListener('deviceready', onDeviceReady);
function onDeviceReady(){
    // my game
    AdMob.createBanner({
        adId: "ca-app-pub-2062493463858889/7200177030", // AdMob banner ID
        position: AdMob.AD_POSITION.BOTTOM_CENTER, // position
        autoShow: true, // show it once it's ready
        overlap:true, // overlap the game, so it won't steal space to canvas
        isTesting: true // show a demo ad
    });
}
