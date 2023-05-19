//*********************************************––>  
//********  VIDEO DE ACUERDO AL CLIMA  ********––>  
//*********************************************––>  
var videoCli = []; 
videoCli["Thunderstorm"] = "Ex0WOrI8"; //tormenta
videoCli["Drizzle"] = "_aH4N8KyL38"; //llovizna
videoCli["Rain"] = "cX4dL4qgJrU"; //lluvia
videoCli["Snow"] = "Kz1wHw16GyA"; //nieve 
videoCli["Mist"] = "L5G_lAt4Ybc"; //neblina 
videoCli["Smoke"] = "e6hMpgmFcOQ"; //humo
videoCli["Haze"] = "Mhtk7Ghv-uY"; //bruma
videoCli["Dust"] = "wPk7AkSd-mM"; //remolino de polvo
videoCli["Fog"] = "uZAN-MKXpuM"; //niebla
videoCli["Sand"] = "plojTq8Ea9k"; //arena
videoCli["Ash"] = "6s_xqmaT0s0"; //ceniza
videoCli["Squall"] = "VZ7HDZXVBpc"; //chubascos
videoCli["Clear"] = "Tga2aaYE2PU"; //cielo limpio
videoCli["Clouds"] = "Y8ACyHYsb6Q"; //nubes

/// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady(codigoVid) {
    player = new YT.Player('player', {
   /*      height: '150%',
        width: '100%', */
        videoId: `${videoCli[codigoVid]}`,        
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}

function stopVideo() {
    player.stopVideo();
}