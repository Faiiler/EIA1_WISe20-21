// Übersicht der Audio Dateien //
var audio = ["A", "C", "F", "G", "hihat", "kick", "laugh-1", "laugh-2", "snare"];
function playSample(audio) {
    var sound = new Audio("./assets/audios/" + audio + ".mp3");
    sound.play();
}
var _loop_1 = function (i) {
    var button = document.querySelector("#Button" + i);
    button.setAttribute("style", "background-color:" + randomHSL() + ";");
    button.addEventListener("click", function () {
        playSample(audio[i]);
    });
};
for (var i = 0; i < audio.length; i++) {
    _loop_1(i);
}
document.querySelector("h1").setAttribute("style", "color:" + randomHSL() + ";");
// bearbeitet mit Hilfe c:
var beat = ["kick", "snare", "kick", "snare", "hihat"];
function playB() {
    var pos = 0;
    setInterval(function () {
        playSample(beat[pos]);
        pos++;
        if (pos > beat.length) {
            pos = 0;
        }
    }, 500);
}
document.querySelector("#PlayButton").addEventListener("click", playB);
// https://stackoverflow.com/questions/5850590/random-color-generator-with-hue-saturation-and-more-controls
function randomHSL() {
    var h = rand(1, 360);
    var s = 100;
    var l = 80;
    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}
function rand(min, max) {
    return min + Math.random() * (max - min);
}
//# sourceMappingURL=script.js.map