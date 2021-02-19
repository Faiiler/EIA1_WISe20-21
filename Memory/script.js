//Erstellen von Interfaces
//Deklarierungen von Variablen welche die Quellen im HTML haben
var splashscreen = document.querySelector("#splashscreen");
var gameTypeSelect = document.querySelector("#gametype-select");
var winscreen = document.querySelector("#winscreen");
var winMessage = document.querySelector("#winmessage");
var cardsContainer = document.querySelector("#cards-container");
var cardTemplate = document.querySelector("#card-template");
var playerIndicator = document.querySelector("#player-indicator");
//Erstellen von Variablen, welchen in TS erstellt wurden
var CARDS_PER_DIFFICULTY = {
    "easy": 4,
    "medium": 8,
    "hard": 16
};
var ROWS_COLS = {
    "easy": {
        r: 2,
        c: 4
    },
    "medium": {
        r: 4,
        c: 4
    },
    "hard": {
        r: 4,
        c: 8
    }
};
var TEXT_SIZES = {
    "easy": "1.6em",
    "medium": "1,4em",
    "hard": "0.87em"
};
var SYMBOL_SIZES = {
    "easy": "4vw",
    "medium": "2.5vw",
    "hard": "2vw"
};
var CARD_NAMES = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
];
var CARD_SYMBOLS = [
    "club",
    "diamond",
    "heart",
    "spade"
];
var CARD_COLORS = [
    "#540D6E",
    "#AA4596",
    "#EE4266",
    "#3BCEAC",
    "#0EAD69",
    "#6E9887",
    "#216869",
    "#123294",
    "#4C4C47",
    "#848FA5",
    "#F564A9",
    "#40531B",
    "#690375",
    "#DAA89B",
    "#CB429F",
    "#4A6C6F"
];
var CARD_IMAGES = {
    "club": '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 240">\n' +
        '  <title>club</title>\n' +
        '  <path d="M645,374a60,60,0,0,0,15-118.11,60,60,0,1,0-119.94,0,60,60,0,1,0,45,110V404H570a15,15,0,0,0,0,30h60a15,15,0,0,0,0-30H615V365.93A59.64,59.64,0,0,0,645,374Z" transform="translate(-495 -194)"/>\n' +
        '</svg>\n',
    "diamond": '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 204.1 224">\n' +
        '  <title>diamond</title>\n' +
        '  <path d="M609.07,206.88a15,15,0,0,0-22.33.21l-85.37,97a15,15,0,0,0,0,19.82l85.37,97a15,15,0,0,0,22.33.22l88.73-97a15,15,0,0,0,0-20.25Z" transform="translate(-497.64 -202)"/>\n' +
        '</svg>\n',
    "heart": '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 187.5">\n' +
        '  <title>heart</title>\n' +
        '  <path d="M555,219c-34.76,0-60,29-60,64.32,0,44.77,41.36,72.43,95.12,119.47a15,15,0,0,0,19.76,0C663.64,355.74,705,328.08,705,283.32,705,248,679.75,219,645,219c-17.74,0-33.22,7.79-45,22.6-11.78-14.81-27.26-22.6-45-22.6Z" transform="translate(-495 -219)"/>\n' +
        '</svg>\n',
    "spade": '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 243.75">\n' +
        '  <title>spade</title>\n' +
        '  <path d="M609.88,196a15,15,0,0,0-19.76,0C536.36,243,495,270.67,495,315.43c0,35.31,25.25,64.32,60,64.32A54.21,54.21,0,0,0,585,371v35H570a15,15,0,0,0,0,30h60a15,15,0,0,0,0-30H615V371a54.21,54.21,0,0,0,30,8.78c34.75,0,60-29,60-64.32C705,270.66,663.64,243,609.88,196Z" transform="translate(-495 -192.25)"/>\n' +
        '</svg>\n'
};
var SENTENCES = [
    {
        a: "Die let Variable ist eine lokale Variable, während eine var Variable...",
        b: "... in jeder Stelle des Codes aufgerufen werden kann (globale Variable)."
    },
    {
        a: "Funktionen haben folgenden Aufbau:...",
        b: "... Funktionsname (Parameter): Typ { <br/>" +
            "   Codeinhalt <br/>    " +
            "};"
    },
    {
        a: "Events haben folgenden Aufbau:...",
        b: "...window.addEventListener('type', function (): void, {<br/>" +
            "   document.querySelector (selector).addEventListener('type', function (): void {<br/>" +
            "    Codeihalt; <br/>" +
            "   }) <br/>" +
            "})"
    },
    {
        a: "Zuweisungen von ID's und Klassen sehen wie folgt aus:...",
        b: "... #ID und .Klasse"
    },
    {
        a: "If-Schleifen...",
        b: "...existieren nicht, nur Abfragen! (if-Schleife.de)"
    },
    {
        a: "Die Vorgaben in einem Interface...",
        b: "...können bei einer Anwendung nicht verändert werden. Diese müssen eingehalten werden (-> bei einer number als Vorlage können nur Zahlen verwendet werden!)"
    },
    {
        a: "Vergleichsoperatoren für Zahlen sind:...",
        b: "... Größer als: >, kleiner als: <, größer gleich: >=, kleiner gleich: <="
    },
    {
        a: "Wichtige Operatoren wie 'und' bzw. 'oder' schreibt man wie folgt:...",
        b: "...und: &&, oder: ||"
    },
    {
        a: "In CSS wird das RGB Farbsystem wie folgt angegebenen:...",
        b: "...color: RGB (red, green, blue). Für red, green und blue muss ein Zahlenwert zwischen 0 und 255 angegeben werden."
    },
    {
        a: "In CSS wird der Hexadezimal Farbcode wie folgt ausgegeben:...",
        b: "... color: #AA00BB. Zu beachten ist, dass nur Zahlen von 0 bis 9 und Buchstaben von A bis F genutzt werden können."
    },
    {
        a: "In HTML ist Inline Style möglich...",
        b: "... jedoch auf keinen Fall empfehlenswert. Es ist übersichtlicher ein extra Stylesheet zu erstellen."
    },
    {
        a: "Mathematische Operatoren sind:...",
        b: "... Addition: +, Subtraktion: -, Multiplikation: *, Division: /, Incrementor: ++, Deccrementor: --"
    },
    {
        a: "Zuweisungsoperatoren sind:...",
        b: "... +=, -=, *=, /="
    },
    {
        a: "Das Zählen in Typescript...",
        b: "... beginnt immer mit der Zahl 0!"
    },
    {
        a: "Um in einem Loop auf die nächste Stelle zuzugreifen...",
        b: "...kann man den Index der Funktion um 1 erhöhen oder verringern (++ || --)."
    },
    {
        a: "Das Script kann entweder am Ende des HTML eingefügt werden oder...",
        b: "... bereits zu beginn im Header. Hier muss man jedoch 'defer' bei der Verlinkung einfügen, sodass das Script bereits beim laden der Seite ausgeführt wird."
    },
];
var SHOW_CARD_DURATION = 3000; //Wie lange bleiben die Karten aufgedeckt, nachdem beide aufgedeckt wurden
//Beginn der Logik
function getAllCardTypes() {
    var allCardTypes = [];
    for (var _i = 0, CARD_SYMBOLS_1 = CARD_SYMBOLS; _i < CARD_SYMBOLS_1.length; _i++) {
        var symbol = CARD_SYMBOLS_1[_i];
        for (var _a = 0, CARD_NAMES_1 = CARD_NAMES; _a < CARD_NAMES_1.length; _a++) {
            var name_1 = CARD_NAMES_1[_a];
            allCardTypes.push({
                symbol: symbol,
                name: name_1,
                color: CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)]
            });
        }
    }
    //  console.log(`All card types: `); Überprüfen von was erstellt wird
    //  console.log(allCardTypes);
    return allCardTypes;
}
function selectCards() {
    var cardsToGenerate = CARDS_PER_DIFFICULTY[difficulty]; //Wieviel Karten wollen wir auf welcher Schwierigkeit erstellen?
    console.debug("Generating " + cardsToGenerate + " " + difficulty + " card pairs"); //Angabe, was wird erstellt mit welcher Schwierigkeitsstfue
    var allCardTypes = getAllCardTypes();
    var sentences = SENTENCES.slice(0, SENTENCES.length); // Kopieren das Array, damit wir später etwas löschen können
    var cards = [];
    for (var i = 0; i < cardsToGenerate; i++) {
        // https://stackoverflow.com/a/5915122
        // Kopieren Elemente von CardType und Sentence, nehmen eins raus und löschen dieses Element aus allCardTypes bzw. sentences, sodass wir dies nicht erneut auswählen
        var cardType = allCardTypes.splice(Math.floor(Math.random() * allCardTypes.length), 1)[0];
        var sentence = sentences.splice(Math.floor(Math.random() * sentences.length), 1)[0];
        cards.push({
            type: cardType,
            sentence: sentence
        });
    }
    return cards; //Geben die Karte aus, die wir eben ausgewählt haben
}
var cardStorage = {}; // Card Element ID -> Partial Card || Inline Interface
function placeCards(cards) {
    var partialCards = [];
    for (var _i = 0, cards_1 = cards; _i < cards_1.length; _i++) { //Alternativ auch for(let i = 0;i<cards.length;i++) { let card = cards[i];
        var card = cards_1[_i];
        partialCards.push({
            type: card.type,
            sentence: card.sentence.a
        });
        partialCards.push({
            type: card.type,
            sentence: card.sentence.b
        });
    }
    shuffle(partialCards); // Zufälliges sortieren der Karten, sodass die zusammengehörenden Karten nicht direkt nebeneinander liegen
    var cardCounter = 0;
    var _loop_1 = function (card) {
        var cardElement = cardTemplate.cloneNode(true); //Klonen der HTML ID "Card Template". Durch setzen von deep auf true klonen wir auch die Inneren Elemente mit
        cardElement.id = "card" + cardCounter++; //Dient zur besseren übersicht, wenn wir ein bestimmtes Element untersuchen wollen
        cardElement.classList.add("card"); //Zuweisen einer Klasse zur Karte
        cardElement.classList.add(difficulty); //Zuweisen einer bestimmten Schwierigkeit zur Karte
        cardStorage[cardElement.id] = card; // Speichern des Karteninhalts dieser ID
        if (difficulty !== "hard") {
            cardElement.querySelector(".card-icon-wrapper").innerHTML = CARD_IMAGES[card.type.symbol]; //Einfügen der SVG Datei
            cardElement.querySelector(".card-icon-wrapper>svg>path").style.fill = card.type.color; //Einfärben des Icons
        }
        cardElement.querySelector(".card-name").innerHTML = card.type.name; //Zuweisen des Namens
        cardElement.querySelector(".card-name").style.color = card.type.color; //Einfärben des Namens
        if (difficulty !== "easy") {
            cardElement.querySelector(".card-text").innerHTML = card.sentence; //Einfügen des Satzes
        }
        cardElement.addEventListener("click", function () {
            onCardClick(cardElement, false); // Klicken des Card-Elements möglich
        });
        cardsContainer.appendChild(cardElement); //Einfügen des Card Elements in den Cards Container
    };
    for (var _a = 0, partialCards_1 = partialCards; _a < partialCards_1.length; _a++) {
        var card = partialCards_1[_a];
        _loop_1(card);
    }
}
function selectAndPlaceCards() {
    var cards = selectCards();
    var rootStyle = document.querySelector(":root").style; //Bezieht sich auf den CSS Style Root
    var rc = ROWS_COLS[difficulty]; //Erstellen von rows/columns je nach Schwierigkeit
    rootStyle.setProperty("--card-columns", rc.c); //setProperty passt CSS an (je nach Schwierigkeit wird die card columns in CSS geändert)
    rootStyle.setProperty("--card-rows", rc.r);
    var textSize = TEXT_SIZES[difficulty]; //Anpassen von Textgröße je nach Schwierigkeit
    rootStyle.setProperty("--text-size", textSize);
    var symbolSize = SYMBOL_SIZES[difficulty]; //Anpassen von Symbolgröße je nach Schwierigkeit
    rootStyle.setProperty("--symbol-size", symbolSize);
    placeCards(cards);
}
var difficulty = "easy";
var gameType = "solo";
var activePlayer = 0;
var scores = [0, 0];
var inputLocked = false;
var lastFlippedCard;
var lastFlippedCardElement;
function onCardClick(cardElement, isAiClick) {
    if (inputLocked) {
        // Wir schalten die Möglichkeit aus, dass man während der Card Flip Animation eine andere Karte klicken kann
        return;
    }
    if (gameType === "ai" && activePlayer !== 0 && !isAiClick) {
        // Wir schalten die Möglichkeit aus, dass ein Spieler während des Zuges der AI klicken kann
        return;
    }
    if (cardElement.classList.contains("flipped")) {
        return; //Wir schalten die Möglichkeit aus, bereits geflippte Karten erneut umzudrehen
    }
    var card = cardStorage[cardElement.id]; // Wir suchen die Karte raus, die wir vorhin auf der ID gespeichert haben
    console.log("Card " + cardElement.id + " flipped by player " + activePlayer + "!");
    console.log(card);
    cardElement.classList.add("flipped"); // Weisen der Karte die Klasse flipped zu
    if (lastFlippedCard) { //Klick auf zweite Karte
        inputLocked = true; //Verhindert klicken
        if (areCardsEqual(lastFlippedCard, card)) { //Sofern die letzte und die momentane Karte gleich sind...
            console.log("Matching cards!");
            scores[activePlayer]++; // ...wird der Score um 1 erhöht
            var lastFlippedCardElementCopy_1 = lastFlippedCardElement; //Erstellen einer Kopie der letzten Karte
            setTimeout(function () {
                cardElement.classList.add("hidden"); //Ausblenden der zusammengehörigen Kartenpaare
                lastFlippedCardElementCopy_1.classList.add("hidden");
            }, 800);
            lastFlippedCard = undefined; //Löschen der zusammengehörigen Kartenpaare, damit wir wieder neue bestimmen können
            lastFlippedCardElement = undefined;
            setTimeout(function () {
                inputLocked = false;
            }, 500);
        }
        else { //Falls die Karten kein Paar sind
            console.log("Wrong cards!");
            setTimeout(function () {
                unflipCard(cardElement); //Umdrehen beider Karten
                unflipCard(lastFlippedCardElement);
                lastFlippedCard = undefined; //Löschen der ausgewählten Kartenpaare, damit wir wieder neue bestimmen können
                lastFlippedCardElement = undefined;
                setTimeout(function () {
                    inputLocked = false;
                }, 500);
            }, SHOW_CARD_DURATION); //Nach 3000 ms wird der obige Code ausgeführt
            if (gameType !== "solo") { //Sofern der Spielmodus nicht solo ist, kommt der nächste Spieler dran
                if (activePlayer === 0) {
                    activePlayer = 1;
                }
                else {
                    activePlayer = 0;
                }
            }
        }
        setTimeout(function () {
            switchPlayer();
        }, 500);
    }
    else {
        lastFlippedCard = card;
        lastFlippedCardElement = cardElement;
    }
    updateScore();
}
function areCardsEqual(a, b) {
    return a.type.color === b.type.color && a.type.symbol === b.type.symbol && a.type.name === b.type.name;
}
function unflipCard(cardElement) {
    cardElement.classList.remove("flipped"); //Beim umdrehen, wird die Klasse flipped entfernt
}
function updateScore() {
    console.log("Scores: " + scores);
    for (var i = 0; i < scores.length; i++) {
        document.querySelector("#score" + i).innerHTML = "" + scores[i]; //Score wird im HTML aktualisiert
    }
    var availableCards = document.querySelectorAll(".card:not(.flipped)"); //Wir suchen alle Karten die nicht flipped sind
    if (availableCards.length === 0) { //falls keine karte nicht geflipped ist, dann sind wir fertig
        console.log("I found no cards, I guess we're done!");
        if (scores[0] > scores[1]) { //Falls Score 0 größer als Score 1 ist...
            if (gameType === "ai" || gameType === "solo") {
                winMessage.innerHTML = "You win!"; //... gewinnt man im Typ Ai/Solo
            }
            else if (gameType === "multi") {
                winMessage.innerHTML = "Player 1 wins!"; //... gewinnt Spieler 1
            }
        }
        else if (scores[0] < scores[1]) { //Falls Score 1 größer als Score 0 ist....
            if (gameType === "ai") {
                winMessage.innerHTML = "You lose"; //... verliert man gegen die Ai
            }
            else if (gameType === "multi") {
                winMessage.innerHTML = "Player 2 wins!"; //... gewinnt Spieler 2
            }
        }
        else {
            winMessage.innerHTML = "Draw!"; //Falls der Score gleich ist, gibt es ein Unentschieden
        }
        setTimeout(function () {
            winscreen.classList.add("visible");
            winscreen.style.display = "";
        }, 500);
    }
}
function switchPlayer() {
    if (gameType === "solo")
        return; // Es gibt keinen anderen Spieler
    if (gameType === "ai") {
        if (activePlayer === 0) { // Spieler ist dran
            playerIndicator.innerHTML = "Player's turn";
        }
        else { // Ai ist dran
            playerIndicator.innerHTML = "Computer's turn";
            setTimeout(function () {
                // Ausführen des Ai-Zuges
                makeAiTurn(true);
            }, SHOW_CARD_DURATION + 1000);
        }
    }
    else if (gameType === "multi") {
        // Spieler 1/2 ist dran
        playerIndicator.innerHTML = "Player " + (activePlayer + 1) + "'s turn";
    }
}
function makeAiTurn(flipAgain) {
    var availableCards = document.querySelectorAll(".card:not(.flipped)"); //Wir suchen alle Karten die nicht flipped sind
    if (availableCards.length === 0) { //Falls es keine gibt wird abgebrochen
        return;
    }
    var cardElement = availableCards.item(Math.floor(Math.random() * availableCards.length)); //Aussuchen einer zufälligen Karte
    onCardClick(cardElement, true); //Karte wird geklickt
    if (flipAgain) { //Sofern die Ai noch einmal flippen darf, dreht er die nächste Karte nach 800 ms um. Danach darf er nicht nochmal eine umdrehen
        setTimeout(function () {
            makeAiTurn(false);
        }, 800);
    }
}
function start(diff, type) {
    document.querySelector("#top-container").style.display = ""; //einblenden Top Container
    document.querySelector("#bottom-container").style.display = ""; //einblenden Bottom Container
    console.log("Starting " + diff + " " + type + " game"); //Auf welcher Schwierigkeitsstufe wird welcher Spieltyp gestartet?
    difficulty = diff;
    gameType = type;
    document.querySelector(".splashscreen-button-container").style.display = "none"; //vermeiden von klicks, wenn splashscreen sich ausblendet
    splashscreen.classList.add("hidden"); // Starten der ausblend-animation
    setTimeout(function () {
        splashscreen.style.display = "none";
    }, 800);
    selectAndPlaceCards();
    if (type === "solo") { //Wenn Einzelspieler, passiert nichts
        document.querySelector("#score1container").style.display = "none";
    }
    else if (type === "ai") {
        // Beim Spielen gegen den Computer, darf die Ai zuerst spielen
        activePlayer = 1;
        switchPlayer();
    }
}
document.querySelectorAll(".difficulty-button").forEach(function (el) {
    el.addEventListener("click", function () {
        //Das Spiel wird gestartet und die Schwierigkeit ist abhängig von dem geklickten Button
        start(el.dataset["difficulty"], gameTypeSelect.value);
    }); //Aussuchen der Schwierigkeit auf den HTML Difficulty Buttons
});
document.querySelector("#play-again-button").addEventListener("click", function () {
    window.location.reload(); // Seite wird neu geladen bei klick auf play again Button
});
// Quelle: https://stackoverflow.com/a/6274381
// Mischen der Karten
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
//# sourceMappingURL=script.js.map