

document.addEventListener('deviceready', onDeviceReady);
function onDeviceReady(){
    // my game
    AdMob.createBanner({
        adId: "ca-app-pub-6362858486849834/5867906107", // AdMob banner ID
        position: AdMob.AD_POSITION.BOTTOM_CENTER, // position
        autoShow: true, // show it once it's ready
        overlap:true, // overlap the game, so it won't steal space to canvas
        isTesting: true // show a demo ad
    });
}
