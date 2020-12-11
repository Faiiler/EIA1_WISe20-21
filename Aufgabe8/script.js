// Übersicht der Audio Dateien //
var audio = ["A", "C", "F", "G", "hihat", "kick", "laugh-1", "laugh-2", "snare"];
function playSample(audio, record) {
    if (record === void 0) { record = true; }
    console.log("play " + audio);
    var sound = new Audio("./assets/audios/" + audio + ".mp3");
    sound.play();
    if (record && recording) {
        beat.push(audio);
        console.log(beat);
    }
}
var _loop_1 = function (i) {
    var button_1 = document.querySelector("#Button" + i);
    button_1.setAttribute("style", "background-color:" + randomHSL() + ";");
    button_1.addEventListener("click", function () {
        playSample(audio[i], true);
    });
};
for (var i = 0; i < audio.length; i++) {
    _loop_1(i);
}
document.querySelector("h1").setAttribute("style", "color:" + randomHSL() + ";");
// Playbutton
//if playbutton = active -> Switch to pause icon and play sounds. else -> switch to play button and stop sounds
var beat = ["kick", "snare", "kick", "snare", "hihat"];
var button = document.querySelector("#PlayButton");
var deleteButton = document.querySelector("#DeleteButton");
var recordButton = document.querySelector("#RecordButton");
var recording = false;
var playing = false;
var playTimer;
function playOrPause() {
    if (playing) {
        stop();
    }
    else {
        play();
    }
}
function stop() {
    clearInterval(playTimer);
    button.innerHTML = "<i class=\"fas fa-play-circle\"></i>";
    playing = false;
}
function play() {
    if (beat.length == 0) {
        console.log("Que empty, please record some buttons presses to add a new sample");
        return;
    }
    var pos = 0;
    playTimer = setInterval(function () {
        playSample(beat[pos], false);
        pos++;
        if (pos >= beat.length) {
            pos = 0;
        }
    }, 500);
    button.innerHTML = "<i class=\"fas fa-pause-circle\"></i>";
    playing = true;
}
function minus() {
    stop();
    beat = [];
}
function recordPauseOrPlay() {
    if (recording) {
        recordStop();
    }
    else {
        record();
    }
}
function recordStop() {
    recording = false;
    recordButton.setAttribute("style", "color: white");
}
function record() {
    stop();
    recording = true;
    recordButton.setAttribute("style", "color: red");
}
button.addEventListener("click", playOrPause);
recordButton.addEventListener("click", recordPauseOrPlay);
deleteButton.addEventListener('click', minus);
// Key Down Event
document.addEventListener('keydown', function (event) {
    console.log(event.key);
    switch (event.key) {
        case "1":
            playSample("laugh-1");
            break;
        case "2":
            playSample("laugh-2");
            break;
        case "3":
            playSample("snare");
            break;
        case "4":
            playSample("G");
            break;
        case "5":
            playSample("hihat");
            break;
        case "6":
            playSample("kick");
            break;
        case "7":
            playSample("A");
            break;
        case "8":
            playSample("C");
            break;
        case "9":
            playSample("F");
            break;
        case "0":
            recordPauseOrPlay();
            break;
        case ",":
            minus();
            break;
        case "Enter":
            playOrPause();
            break;
        default:
            console.log("Press a button from 1-9 to trigger sound events");
    }
});
// Color change Drum Pad
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