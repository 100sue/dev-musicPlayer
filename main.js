/* Fonctionnement des boutons: Play - Forward - Backward */

var audio = document.getElementById('audio');
var playBtn = document.getElementById('play');
var forward = document.getElementById('forward');
var backward = document.getElementById('backward');


/* Fonctionnement bouton: Play - Pause : */

playBtn.onclick = function() {
    if(audio.getAttribute("data-condition") == 'pause'){
        audio.play();
        audio.setAttribute("data-condition", "play");
        playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="white"><path d="M15 19q-.825 0-1.412-.587Q13 17.825 13 17V7q0-.825.588-1.412Q14.175 5 15 5h2q.825 0 1.413.588Q19 6.175 19 7v10q0 .825-.587 1.413Q17.825 19 17 19Zm-8 0q-.825 0-1.412-.587Q5 17.825 5 17V7q0-.825.588-1.412Q6.175 5 7 5h2q.825 0 1.413.588Q11 6.175 11 7v10q0 .825-.587 1.413Q9.825 19 9 19Z"/></svg>';
        document.querySelector(".player-album img").className = 'rotate';
    }else {
        audio.pause();
        audio.setAttribute("data-condition", "pause");
        playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="white"><path d="M9.525 18.025q-.5.325-1.013.037Q8 17.775 8 17.175V6.825q0-.6.512-.888.513-.287 1.013.038l8.15 5.175q.45.3.45.85t-.45.85Z"/></svg>';
        document.querySelector(".player-album img").className = '';
    }
}


/* Fonctionnement bouton: Forward - Backward : */

forward.onclick = function() {
    audio.currentTime += 5
}
backward.onclick = function() {
    audio.currentTime -= 5
}


/* Fonctionnement de la durée de la chanson : */

var min = 0;
var sec = 0;
var duration = audio.duration;
var firstMult = duration/60;
/* arrondi à la virgule superieur  */
min = firstMult.toString().split('.')[0];
var firstMultRem = "."+firstMult.toString().split('.')[1];

var secondMult = Number(firstMultRem)*60;
sec = secondMult.toString().split('.')[0];
if(sec.lenght < 2 ) {
    sec = "0"+sec;
}
document.getElementsByClassName('end')[0].innerHTML = min + ':' + sec;

audio.ontimeupdate = function(){
var min = 0;
var sec = 0;
var current = audio.currentTime;
var firstMult = current/60;
min = firstMult.toString().split('.')[0];
var firstMultRem = "."+firstMult.toString().split('.')[1];
var secondMult = Number(firstMultRem)*60;
sec = secondMult.toString().split('.')[0];
if(sec.lenght < 2 ) {
    sec = "0"+sec;
}
if(sec == 'NaN') {
    sec = "00";
}
document.getElementsByClassName('start')[0].innerHTML = min + ":" + sec;
document.getElementById("range").value = (audio.currentTime/audio.duration)*100;
}
const range = document.getElementById("range");
range.oninput = function() {
    if(range.value !=0) {
        audio.currentTime = (range.value*audio.duration)/100;
    }
}
audio.onended = function() {
    playBtn.click();
    audio.currentTime = 0;
}