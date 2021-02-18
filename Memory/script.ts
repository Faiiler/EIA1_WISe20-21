interface Sentence {
    a: string;
    b: string;
}

interface CardType {
    name: string;
    symbol: string;
    color: string;
}


/** The entire card, containing both sentence parts **/
interface Card {
    sentence: Sentence;
    type: CardType;
}

/** One of two cards in a pair **/
interface PartialCard {
    type: CardType;
    sentence?: string; // ? = Optional, muss kein Satz haben
    flipped?: boolean;
}

/////////////

const splashscreen: HTMLElement = document.querySelector("#splashscreen");
const cardsContainer: HTMLDivElement = document.querySelector("#cards-container");
const cardTemplate: HTMLDivElement = document.querySelector("#card-template");


///////////

const CARDS_PER_DIFFICULTY = {
    "easy": 4,
    "medium": 8,
    "hard": 16
};

const ROWS_COLS = {
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

const TEXT_SIZES = {
    "easy": "1.6em",
    "medium": "1,4em",
    "hard": "0.87em"
}

const SYMBOL_SIZES = {
    "easy": "4vw",
    "medium": "2.5vw",
    "hard": "2vw"
}

const CARD_NAMES = [
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
const CARD_SYMBOLS = [
    "club",
    "diamond",
    "heart",
    "spade"
];

const CARD_COLORS = [
    "#540D6E",
    "#EE4266",
    "#EE4266",
    "#3BCEAC",
    "#0EAD69",
    "#6E9887",
    "#216869",
    "#49A078",
    "#4C4C47",
    "#848FA5",
    "#F564A9",
    "#40531B",
    "#690375",
    "#DAA89B",
    "#CB429F",
    "#4A6C6F"
];

const CARD_IMAGES = {
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

const SENTENCES: Sentence[] = [
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

const SHOW_CARD_DURATION = 3000;


function getAllCardTypes(): CardType[] {
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
    console.log(`All card types: `);
    console.log(allCardTypes);
    return allCardTypes;
}

function generateCards(difficulty: string): Card[] {
    const cardsToGenerate = CARDS_PER_DIFFICULTY[difficulty];
    console.log(`Generating ${cardsToGenerate} ${difficulty} card pairs`);

    const allCardTypes: CardType[] = getAllCardTypes();
    const sentences: Sentence[] = SENTENCES.slice(0, SENTENCES.length); // copy sentences so we can delete stuff
    const cards: Card[] = [];
    for (let i = 0; i < cardsToGenerate; i++) {
        // https://stackoverflow.com/a/5915122
        // get random  elements from both arrays & delete them so we don't select any twice
        let cardType: CardType = allCardTypes.splice(Math.floor(Math.random() * allCardTypes.length), 1)[0];
        let sentence: Sentence = sentences.splice(Math.floor(Math.random() * sentences.length), 1)[0];

        cards.push({
            type: cardType,
            sentence: sentence
        });
    }
    return cards;
}


function placeCards(cards: Card[], difficulty: string): void {
    // Convert the merged cards into partial ones with separate sentence parts
    const partialCards: PartialCard[] = [];
    for (let card of cards) {
        partialCards.push({
            type: card.type,
            sentence: card.sentence.a
        });
        partialCards.push({
            type: card.type,
            sentence: card.sentence.b
        });
    }
    shuffle(partialCards); // Randomize card placement (don't want the matching ones next to each other)

    let cardCounter = 0;
    for (let card of partialCards) {
        let cardElement: HTMLDivElement = cardTemplate.cloneNode(true) as HTMLDivElement;
        cardElement.id = `card${cardCounter++}`;
        cardElement.classList.add(difficulty);

        //TODO: remove if you don't want cheaters
        cardElement.dataset["name"] = card.type.name;
        cardElement.dataset["symbol"] = card.type.symbol;
        cardElement.dataset["sentence"] = card.sentence;

        if (difficulty !== "hard") {
            cardElement.querySelector(".card-icon-wrapper").innerHTML = CARD_IMAGES[card.type.symbol];
            (cardElement.querySelector(".card-icon-wrapper>svg>path") as HTMLLIElement).style.fill = card.type.color;
        }
        cardElement.querySelector(".card-name").innerHTML = card.type.name;
        (cardElement.querySelector(".card-name") as HTMLElement).style.color = card.type.color;
        if (difficulty !== "easy") {
            cardElement.querySelector(".card-text").innerHTML = card.sentence;
        }

        cardElement.addEventListener("click", e => onCardClick(e, cardElement, card));

        cardsContainer.appendChild(cardElement);
    }
}

function generateAndPlaceCards(difficulty: string): void {
    const cards = generateCards(difficulty);

    let rootStyle = (document.querySelector(":root") as HTMLElement).style;

    let rc = ROWS_COLS[difficulty];
    rootStyle.setProperty("--card-columns", rc.c);
    rootStyle.setProperty("--card-rows", rc.r);

    let textSize = TEXT_SIZES[difficulty];
    rootStyle.setProperty("--text-size", textSize);

    let symbolSize = SYMBOL_SIZES[difficulty];
    rootStyle.setProperty("--symbol-size", symbolSize);

    placeCards(cards, difficulty);
}


let score: number = 0;

let inputLocked: boolean = false;
let lastFlippedCard: PartialCard;
let lastFlippedCardElement: HTMLDivElement;

function onCardClick(event: MouseEvent, cardElement: HTMLDivElement, card: PartialCard) {
    if (inputLocked) {
        return;
    }
    if (card.flipped) {
        return;
    }
    console.log("Card flipped!");
    console.log(card);

    card.flipped = true;
    cardElement.classList.add("flipped");

    if (lastFlippedCard) {
        // Allow fast clicks for selecting the second card,
        // but prevent another click while the flip-back animations are still playing
        inputLocked = true;

        if (lastFlippedCard.type === card.type) { // matching cards!
            console.log("Matching cards!")
            score++;

            lastFlippedCard = undefined;
            lastFlippedCardElement = undefined;

            // Allow inputs again
            setTimeout(() => {
                inputLocked = false;
            }, 500);
        } else { // don't match :c
            console.log("Wrong cards!")
            setTimeout(() => {
                unflipCard(cardElement, card);
                unflipCard(lastFlippedCardElement, lastFlippedCard);
                lastFlippedCard = undefined;
                lastFlippedCardElement = undefined;

                // Allow inputs again
                setTimeout(() => {
                    inputLocked = false;
                }, 500)
            }, SHOW_CARD_DURATION);
        }

    } else {
        lastFlippedCard = card;
        lastFlippedCardElement = cardElement;
    }

    updateScore();
}

function unflipCard(cardElement: HTMLDivElement, card: PartialCard) {
    cardElement.classList.remove("flipped");
    card.flipped = false;
}

//TODO: sounds n stuff

function updateScore() {
    console.log("Score: " + score);
    document.querySelector("#score").innerHTML = `${score}`;
}

// Hides the splashscreen + starts the game with selected difficulty
function start(difficulty: string): void {
    (document.querySelector(".splashscreen-button-container") as HTMLElement).style.display = "none";
    splashscreen.classList.add("hidden");
    setTimeout(() => {
        splashscreen.style.display = "none";
    }, 800);
    generateAndPlaceCards(difficulty);
}

document.querySelectorAll(".difficulty-button").forEach((el: HTMLElement) => {
    el.addEventListener("click", e => {
        start(el.dataset["difficulty"]);
    })
})

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

// https://stackoverflow.com/a/6274381
/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}