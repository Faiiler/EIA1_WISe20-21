interface Sentence {
    a: string;
    b: string;
}

interface CardType {
    name: string;
    symbol: string;
}


/** The entire card, containing both sentence parts **/
interface Card {
    sentence: Sentence;
    type: CardType;
}

/** One of two cards in a pair **/
interface PartialCard {
    sentence: string;
    type: CardType;
}

/////////////

const cardsContainer: HTMLDivElement = document.querySelector("#cards-container");
const cardTemplate: HTMLDivElement = document.querySelector("#card-template");

///////////

const CARDS_PER_DIFFICULTY = {
    "easy": 4,
    "medium": 8,
    "hard": 16
};

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
    "clubs",
    "diamonds",
    "hearts",
    "spades"
];
const CARD_SYMBOL_FA_MAP = {
    "clubs": "fa-cubes", //TODO
    "diamonds": "fa-gem",
    "hearts": "fa-heart",
    "spades": "fa-spider" //TODO
};

// TODO: add sentences
const SENTENCES: Sentence[] = [
    {
        a: "idk",
        b: "idc"
    },
    {
        a: "idk",
        b: "idc"
    },
    {
        a: "idk",
        b: "idc"
    },
    {
        a: "idk",
        b: "idc"
    },
    {
        a: "idk",
        b: "idc"
    },
    {
        a: "idk",
        b: "idc"
    }
];


function getAllCardTypes(): CardType[] {
    const allCardTypes: CardType[] = [];
    for (let symbol of CARD_SYMBOLS) {
        for (let name of CARD_NAMES) {
            allCardTypes.push({
                symbol: symbol,
                name: name
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


function placeCards(cards: Card[]): void {
    // Convert the merged cards into partial ones with separate sentence parts
    const partialCards: PartialCard[] = [];
    for(let card of cards ) {
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
        cardElement.id = `card-${cardCounter++}`;

        //TODO: remove if you don't want cheaters
        cardElement.dataset["name"] = card.type.name;
        cardElement.dataset["symbol"] = card.type.symbol;
        cardElement.dataset["sentence"] = card.sentence;

       cardElement.querySelector(".card-icon").classList.add(CARD_SYMBOL_FA_MAP[card.type.symbol]);
       cardElement.querySelector(".card-name").innerHTML = card.type.name;
       cardElement.querySelector(".card-text").innerHTML = card.sentence;


        cardsContainer.appendChild(cardElement);
    }
}

function generateAndPlaceCards(difficulty: string): void {
    const cards = generateCards(difficulty);
    placeCards(cards);
}


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