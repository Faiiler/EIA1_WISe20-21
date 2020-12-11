// Übersicht der Audio Dateien //

let audio: string[] = ["A", "C", "F", "G", "hihat", "kick", "laugh-1", "laugh-2", "snare"];

function playSample(audio: string) {
    var sound: HTMLAudioElement = new Audio("./assets/audios/"+audio+".mp3");
    sound.play();
}

for (let i = 0; i < audio.length; i++) {
    let button = document.querySelector("#Button" + i);
    button.setAttribute("style", "background-color:"+randomHSL()+";");
    button.addEventListener("click", function () {
        playSample(audio[i]);
    }); 
}

document.querySelector("h1").setAttribute("style", "color:"+randomHSL()+";");

// bearbeitet mit Hilfe c:


let beat: string [] = ["kick", "snare", "kick", "snare", "hihat"];

function playB () {
    let pos = 0;
    setInterval(function(){
        playSample(beat[pos]);
        pos++;
        if(pos>beat.length){
            pos = 0;
        }
    },500);
}
document.querySelector("#PlayButton").addEventListener("click", playB);



// https://stackoverflow.com/questions/5850590/random-color-generator-with-hue-saturation-and-more-controls
function randomHSL() {
    let h = rand(1,360);
    let s = 100;
    let l = 80;
    return 'hsl('+h+','+s+'%,'+l+'%)'
}

function rand(min, max) {
    return min + Math.random() * (max - min);
}