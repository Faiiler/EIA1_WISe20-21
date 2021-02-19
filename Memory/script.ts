//Erstellen von Interfaces

interface Sentence { // Layout eines Satzes, bestehend aus zwei Teilen
    a: string;
    b: string;
}

interface CardType { //Karte besteht aus einem Namen, einem Symbol und einer Karte
    name: string;
    symbol: string;
    color: string;
}

interface Card { //Die Karte beinhaltet beide Satzteile und den oben genannten CardType
    sentence: Sentence;
    type: CardType;
}

interface PartialCard { //Ein Kartenteil eines Paares
    type: CardType;
    sentence?: string; // ? = Optional, muss kein Satz haben
}

//Deklarierungen von Variablen welche die Quellen im HTML haben

const splashscreen: HTMLElement = document.querySelector("#splashscreen");
const gameTypeSelect: HTMLSelectElement = document.querySelector("#gametype-select");
const winscreen: HTMLElement = document.querySelector("#winscreen");
const winMessage: HTMLElement = document.querySelector("#winmessage");
const cardsContainer: HTMLDivElement = document.querySelector("#cards-container");
const cardTemplate: HTMLDivElement = document.querySelector("#card-template");
const playerIndicator: HTMLElement = document.querySelector("#player-indicator");


//Erstellen von Variablen, welchen in TS erstellt wurden

const CARDS_PER_DIFFICULTY = { //Aufteilung der Anzahl an Kartenpaaren nach Schwierigkeit
    "easy": 4,
    "medium": 8,
    "hard": 16
};

const ROWS_COLS = { //Aufteilung der Karten in Reihen und Spalten (rows/columns)
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

const TEXT_SIZES = { //Angabe der Schriftgrößen in Abhängigkeit der Schwierigkeit
    "easy": "1.6em", //https://www.w3schools.com/cssref/css_units.asp
    "medium": "1,4em",
    "hard": "0.87em"
}

const SYMBOL_SIZES = { // Angabe der Größe der Symbole
    "easy": "4vw", //https://www.w3schools.com/cssref/css_units.asp
    "medium": "2.5vw",
    "hard": "2vw"
}

const CARD_NAMES = [ //Angabe der Kartennamen
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
const CARD_SYMBOLS = [ //Angabe der Kartensymbole
    "club",
    "diamond",
    "heart",
    "spade"
];

const CARD_COLORS = [ //Angabe der 16 verschiedenen Farben für die Kartenpaare
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

const CARD_IMAGES = { //Erstellen der Icons Source: https://www.flaticon.com/download/icon/landing/3141794?format=svg&size=512
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

const SENTENCES: Sentence[] = [ //Angabe der Sätze
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

const SHOW_CARD_DURATION = 3000; //Wie lange bleiben die Karten aufgedeckt, nachdem beide aufgedeckt wurden

//Beginn der Logik


function getAllCardTypes(): CardType[] { //Erstellen von allen Symbolen- bzw Namenskombinationen und einer zufälligen Farbe
    const allCardTypes: CardType[] = [];
    for (let symbol of CARD_SYMBOLS) {
        for (let name of CARD_NAMES) {
            allCardTypes.push({
                symbol: symbol,
                name: name,
                color: CARD_COLORS[Math.floor(Math.random() * CARD_COLORS.length)]
            });
        }
    }
    //  console.log(`All card types: `); Überprüfen von was erstellt wird
    //  console.log(allCardTypes);
    return allCardTypes;
}

function selectCards(): Card[] { // Wir wählen die Karten aus, die plaziert werden
    const cardsToGenerate = CARDS_PER_DIFFICULTY[difficulty]; //Wieviel Karten wollen wir auf welcher Schwierigkeit erstellen?
    console.debug(`Generating ${cardsToGenerate} ${difficulty} card pairs`); //Angabe, was wird erstellt mit welcher Schwierigkeitsstfue

    const allCardTypes: CardType[] = getAllCardTypes();
    const sentences: Sentence[] = SENTENCES.slice(0, SENTENCES.length); // Kopieren das Array, damit wir später etwas löschen können
    const cards: Card[] = [];
    for (let i = 0; i < cardsToGenerate; i++) {
        // https://stackoverflow.com/a/5915122
        // Kopieren Elemente von CardType und Sentence, nehmen eins raus und löschen dieses Element aus allCardTypes bzw. sentences, sodass wir dies nicht erneut auswählen
        let cardType: CardType = allCardTypes.splice(Math.floor(Math.random() * allCardTypes.length), 1)[0];
        let sentence: Sentence = sentences.splice(Math.floor(Math.random() * sentences.length), 1)[0];

        cards.push({
            type: cardType,
            sentence: sentence
        });
    }
    return cards; //Geben die Karte aus, die wir eben ausgewählt haben
}

const cardStorage: { [key: string]: PartialCard } = {}; // Card Element ID -> Partial Card || Inline Interface

function placeCards(cards: Card[]): void { //Aufteilung der Karten in zwei Teile
    const partialCards: PartialCard[] = [];
    for (let card of cards) { //Alternativ auch for(let i = 0;i<cards.length;i++) { let card = cards[i];
        partialCards.push({ //Wir pushen die zwei Kartenteile, die unten aufgeteilt werden
            type: card.type,
            sentence: card.sentence.a
        });
        partialCards.push({
            type: card.type,
            sentence: card.sentence.b
        });
    }
    shuffle(partialCards); // Zufälliges sortieren der Karten, sodass die zusammengehörenden Karten nicht direkt nebeneinander liegen

    let cardCounter = 0;
    for (let card of partialCards) {
        let cardElement: HTMLDivElement = cardTemplate.cloneNode(true) as HTMLDivElement; //Klonen der HTML ID "Card Template". Durch setzen von deep auf true klonen wir auch die Inneren Elemente mit
        cardElement.id = "card" + cardCounter++; //Dient zur besseren übersicht, wenn wir ein bestimmtes Element untersuchen wollen
        cardElement.classList.add("card"); //Zuweisen einer Klasse zur Karte
        cardElement.classList.add(difficulty); //Zuweisen einer bestimmten Schwierigkeit zur Karte

        cardStorage[cardElement.id] = card; // Speichern des Karteninhalts dieser ID

        if (difficulty !== "hard") {
            cardElement.querySelector(".card-icon-wrapper").innerHTML = CARD_IMAGES[card.type.symbol]; //Einfügen der SVG Datei
            (cardElement.querySelector(".card-icon-wrapper>svg>path") as HTMLElement).style.fill = card.type.color; //Einfärben des Icons
        }
        cardElement.querySelector(".card-name").innerHTML = card.type.name; //Zuweisen des Namens
        (cardElement.querySelector(".card-name") as HTMLElement).style.color = card.type.color; //Einfärben des Namens
        if (difficulty !== "easy") {
            cardElement.querySelector(".card-text").innerHTML = card.sentence; //Einfügen des Satzes
        }

        cardElement.addEventListener("click", function () {
            onCardClick(cardElement, false); // Klicken des Card-Elements möglich
        });

        cardsContainer.appendChild(cardElement); //Einfügen des Card Elements in den Cards Container
    }
}

function selectAndPlaceCards(): void {
    const cards = selectCards();

    let rootStyle = (document.querySelector(":root") as HTMLElement).style; //Bezieht sich auf den CSS Style Root

    let rc = ROWS_COLS[difficulty]; //Erstellen von rows/columns je nach Schwierigkeit
    rootStyle.setProperty("--card-columns", rc.c); //setProperty passt CSS an (je nach Schwierigkeit wird die card columns in CSS geändert)
    rootStyle.setProperty("--card-rows", rc.r);

    let textSize = TEXT_SIZES[difficulty]; //Anpassen von Textgröße je nach Schwierigkeit
    rootStyle.setProperty("--text-size", textSize);

    let symbolSize = SYMBOL_SIZES[difficulty]; //Anpassen von Symbolgröße je nach Schwierigkeit
    rootStyle.setProperty("--symbol-size", symbolSize);

    placeCards(cards);
}

let difficulty: string = "easy";
let gameType: string = "solo";

let activePlayer: number = 0;
let scores: number[] = [0, 0];

let inputLocked: boolean = false;
let lastFlippedCard: PartialCard;
let lastFlippedCardElement: HTMLDivElement;

function onCardClick(cardElement: HTMLDivElement, isAiClick: boolean) {
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

    let card = cardStorage[cardElement.id]; // Wir suchen die Karte raus, die wir vorhin auf der ID gespeichert haben
    console.log("Card " + cardElement.id + " flipped by player " + activePlayer + "!");
    console.log(card);

    cardElement.classList.add("flipped"); // Weisen der Karte die Klasse flipped zu

    if (lastFlippedCard) { //Klick auf zweite Karte
        inputLocked = true; //Verhindert klicken

        if (areCardsEqual(lastFlippedCard, card)) { //Sofern die letzte und die momentane Karte gleich sind...
            console.log("Matching cards!")
            scores[activePlayer]++; // ...wird der Score um 1 erhöht

            let lastFlippedCardElementCopy = lastFlippedCardElement; //Erstellen einer Kopie der letzten Karte
            setTimeout(function () {
                cardElement.classList.add("hidden"); //Ausblenden der zusammengehörigen Kartenpaare
                lastFlippedCardElementCopy.classList.add("hidden");
            }, 800);

            lastFlippedCard = undefined; //Löschen der zusammengehörigen Kartenpaare, damit wir wieder neue bestimmen können
            lastFlippedCardElement = undefined;


            setTimeout(function () { //Nach 500ms kann man wieder klicken
                inputLocked = false;
            }, 500);


        } else { //Falls die Karten kein Paar sind
            console.log("Wrong cards!")
            setTimeout(function () {

                unflipCard(cardElement); //Umdrehen beider Karten
                unflipCard(lastFlippedCardElement);
                lastFlippedCard = undefined; //Löschen der ausgewählten Kartenpaare, damit wir wieder neue bestimmen können
                lastFlippedCardElement = undefined;


                setTimeout(function () { //Nach 500 ms kann man wieder klicken
                    inputLocked = false;
                }, 500);

            }, SHOW_CARD_DURATION); //Nach 3000 ms wird der obige Code ausgeführt

            if (gameType !== "solo") { //Sofern der Spielmodus nicht solo ist, kommt der nächste Spieler dran
                if (activePlayer === 0) {
                    activePlayer = 1;
                } else {
                    activePlayer = 0;
                }
            }
        }

        setTimeout(function () { //Timeout, nach 500 ms wird der Spieler gewechselt
            switchPlayer();
        }, 500);
    } else {
        lastFlippedCard = card;
        lastFlippedCardElement = cardElement;
    }

    updateScore();
}

function areCardsEqual(a: PartialCard, b: PartialCard) { //Überprüfen ob die Kartenpaare miteinander übereinstimmen
    return a.type.color === b.type.color && a.type.symbol === b.type.symbol && a.type.name === b.type.name;
}

function unflipCard(cardElement: HTMLDivElement) {
    cardElement.classList.remove("flipped"); //Beim umdrehen, wird die Klasse flipped entfernt
}

function updateScore() {
    console.log("Scores: " + scores);
    for (let i = 0; i < scores.length; i++) {
        document.querySelector("#score" + i).innerHTML = "" + scores[i]; //Score wird im HTML aktualisiert
    }

    let availableCards = document.querySelectorAll(".card:not(.flipped)") as NodeListOf<HTMLDivElement>; //Wir suchen alle Karten die nicht flipped sind
    if (availableCards.length === 0) { //falls keine karte nicht geflipped ist, dann sind wir fertig
        console.log("I found no cards, I guess we're done!");

        if (scores[0] > scores[1]) { //Falls Score 0 größer als Score 1 ist...
            if (gameType === "ai" || gameType === "solo") {
                winMessage.innerHTML = "You win!" //... gewinnt man im Typ Ai/Solo
            } else if (gameType === "multi") {
                winMessage.innerHTML = "Player 1 wins!" //... gewinnt Spieler 1
            }
        } else if (scores[0] < scores[1]) { //Falls Score 1 größer als Score 0 ist....
            if (gameType === "ai") {
                winMessage.innerHTML = "You lose"; //... verliert man gegen die Ai
            } else if (gameType === "multi") {
                winMessage.innerHTML = "Player 2 wins!" //... gewinnt Spieler 2
            }
        } else {
            winMessage.innerHTML = "Draw!"; //Falls der Score gleich ist, gibt es ein Unentschieden
        }

        setTimeout(function () { //Nach 500 ms wird der winscreen angezeigt
            winscreen.classList.add("visible");
            winscreen.style.display = "";
        }, 500);
    }
}

function switchPlayer() {
    if (gameType === "solo") return; // Es gibt keinen anderen Spieler
    if (gameType === "ai") {
        if (activePlayer === 0) { // Spieler ist dran
            playerIndicator.innerHTML = "Player's turn";
        } else { // Ai ist dran
            playerIndicator.innerHTML = "Computer's turn";

            setTimeout(function () {
                // Ausführen des Ai-Zuges
                makeAiTurn(true);
            }, SHOW_CARD_DURATION + 1000);
        }
    } else if (gameType === "multi") {
        // Spieler 1/2 ist dran
        playerIndicator.innerHTML = "Player " + (activePlayer + 1) + "'s turn";
    }
}

function makeAiTurn(flipAgain: boolean) { //Zug der Ai
    let availableCards = document.querySelectorAll(".card:not(.flipped)") as NodeListOf<HTMLDivElement>; //Wir suchen alle Karten die nicht flipped sind
    if (availableCards.length === 0) { //Falls es keine gibt wird abgebrochen
        return;
    }
    let cardElement = availableCards.item(Math.floor(Math.random() * availableCards.length)); //Aussuchen einer zufälligen Karte

    onCardClick(cardElement, true); //Karte wird geklickt

    if (flipAgain) { //Sofern die Ai noch einmal flippen darf, dreht er die nächste Karte nach 800 ms um. Danach darf er nicht nochmal eine umdrehen
        setTimeout(function () {
            makeAiTurn(false);
        }, 800);
    }
}


function start(diff: string, type: string): void {
    (document.querySelector("#top-container") as HTMLElement).style.display = ""; //einblenden Top Container
    (document.querySelector("#bottom-container") as HTMLElement).style.display = ""; //einblenden Bottom Container

    console.log("Starting " + diff + " " + type + " game"); //Auf welcher Schwierigkeitsstufe wird welcher Spieltyp gestartet?
    difficulty = diff;
    gameType = type;

    (document.querySelector(".splashscreen-button-container") as HTMLElement).style.display = "none"; //vermeiden von klicks, wenn splashscreen sich ausblendet
    splashscreen.classList.add("hidden"); // Starten der ausblend-animation

    setTimeout(function () { //Ausblenden + entfernen des Splashscreens (siehe CSS)
        splashscreen.style.display = "none";
    }, 800);

    selectAndPlaceCards();

    if (type === "solo") { //Wenn Einzelspieler, passiert nichts
        (document.querySelector("#score1container") as HTMLElement).style.display = "none";
    } else if (type === "ai") {
        // Beim Spielen gegen den Computer, darf die Ai zuerst spielen
        activePlayer = 1;
        switchPlayer();
    }
}


document.querySelectorAll(".difficulty-button").forEach(function (el: HTMLElement) {
    el.addEventListener("click", function () {
        //Das Spiel wird gestartet und die Schwierigkeit ist abhängig von dem geklickten Button
        start(el.dataset["difficulty"], gameTypeSelect.value);
    }) //Aussuchen der Schwierigkeit auf den HTML Difficulty Buttons
});

document.querySelector("#play-again-button").addEventListener("click", function () {
    window.location.reload(); // Seite wird neu geladen bei klick auf play again Button
})

// Quelle: https://stackoverflow.com/a/6274381
// Mischen der Karten
function shuffle(a: any[]): any[] { //Normalerweise sollte man any nicht verwenden, ich hoffe jedoch, dass man hier eine Ausnahme machen kann!
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}