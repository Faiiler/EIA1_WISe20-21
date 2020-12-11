// Übersicht der Audio Dateien //

let audio: string[] = ["A", "C", "F", "G", "hihat", "kick", "laugh-1", "laugh-2", "snare"];

function playSample(audio: string, record: boolean = true) {
    console.log("play " + audio);
    var sound: HTMLAudioElement = new Audio("./assets/audios/" + audio + ".mp3");
    sound.play();

    if (record && recording) {
        beat.push(audio);
        console.log(beat);
    }
}

for (let i = 0; i < audio.length; i++) {
    let button = document.querySelector("#Button" + i);
    button.setAttribute("style", "background-color:" + randomHSL() + ";");
    button.addEventListener("click", function () {
        playSample(audio[i], true);
    });
}

document.querySelector("h1").setAttribute("style", "color:" + randomHSL() + ";");

// Play-, record- and delete button

let beat: string [] = ["kick", "snare", "kick", "snare", "hihat"];

let button = document.querySelector("#PlayButton");
let deleteButton = document.querySelector("#DeleteButton");
let recordButton = document.querySelector("#RecordButton");

let recording = false;
let playing = false;
let playTimer;

function playOrPause() { //play button
    if (playing) {
        stop();
    } else {
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

    let pos = 0;
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

function minus() { //delete button
    stop();
    beat = [];
}

function recordPauseOrPlay() { //record button
    if (recording) {
        recordStop();
    } else {
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


// Key Down Event // yoinked from https://javascript.info/keyboard-events

document.addEventListener('keydown', function (event) {
    console.log(event.key)

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
            console.log("Press a button from 1-9 to trigger sound events")
    }
});


// Color change Drum Pad

// https://stackoverflow.com/questions/5850590/random-color-generator-with-hue-saturation-and-more-controls
function randomHSL() {
    let h = rand(1, 360);
    let s = 100;
    let l = 80;
    return 'hsl(' + h + ',' + s + '%,' + l + '%)'
}

function rand(min, max) {
    return min + Math.random() * (max - min);
}