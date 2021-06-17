// =================================================
// ============ VARIABLES

const _NB_TO_WIN = 8;
const _NB_PER_LINE = 4;
let NB_CLICK = 0; let NB_FOUND = 0;
let LIST_CARDS = get(".memoryCard"); let DISPLAY_CARDS = []; let PLAYED_CARDS = [];
const PICTURES = ["cute", "cute", "glasses", "glasses", "love", "love", "sad", "sad", "shocked", "shocked", "smile", "smile", "tongue", "tongue", "wink", "wink"];

// =================================================
// ============ MAIN

/**
 * Initialize the game : display score and add events on buttons
 **/

 get("~header").innerHTML = "Gam'z ~ " + _CONTENT.memory;
get("#reload").addEventListener("click", () => { location.reload() });
get("#play").addEventListener("click", createGame);
get("#cheat").addEventListener("click", cheat);

/**
 * The main game function : check the number of played cards, check if the cards are identical and check the victory
 * @param {int} card the number of played card
 **/

function play(card) {
    let face = 0; // Hidden
    let timeout = 2000;

    // If there are less than two played cards and if the card is not visible
    if (PLAYED_CARDS.length < 2 && DISPLAY_CARDS[card] == 0) {
        get("#flip").play();
        NB_CLICK++;
        
        DISPLAY_CARDS[card] = 1;
        PLAYED_CARDS.push(card);
        turn(card);
   
        // If two cards are already played
        if (PLAYED_CARDS.length == 2) {
            // And if they are identical
            if (LIST_CARDS[PLAYED_CARDS[0]].data == LIST_CARDS[PLAYED_CARDS[1]].data) {
                timeout = 0; // If found, no timeout needed
                face = 2; // Founded
                NB_FOUND++;
                
                // And if all the cards are found
                if (NB_FOUND == _NB_TO_WIN) endGame();
            }

            // In any case, we turn the cards
            DISPLAY_CARDS[PLAYED_CARDS[0]] = face;
            DISPLAY_CARDS[PLAYED_CARDS[1]] = face;

            setTimeout(() => {
                turn(PLAYED_CARDS[0]);
                turn(PLAYED_CARDS[1]);
                PLAYED_CARDS = [];
            }, timeout);
        }
    }
}

/**
 * Turn the card hidden, visible or found according the value of DISPLAY_CARDS[card]
 * @param {int} card the number of played card
 **/

function turn(card) {
    switch (DISPLAY_CARDS[card]) {
        case 0: // face cachée
            LIST_CARDS[card].src = "assets/images/memory/recto.png";
            break;

        case 1: // face visible
        LIST_CARDS[card].src = "assets/images/memory/" + LIST_CARDS[card].data + ".png";
            break;

        case 2: // paire trouvée
        LIST_CARDS[card].classList.add("memoryFound");
            break;
    }
}

/**
 * Create a new game, randomize the cards and add event listener on each card
 **/

function createGame() {
    // Update the display
    get("#play").style.display = "none";
    get("#cheat").style.display = "block";
    get("#reload").style.display = "block";

    // Create arrays and randomize the cards
    for (let i = 0; i < _NB_TO_WIN; i++) DISPLAY_CARDS.push(0, 0);
    PICTURES.sort(() => Math.random() - 0.5);

    // Add events on each cards
    for (let i = 0; i < LIST_CARDS.length; i++) {
        LIST_CARDS[i].src = _CONTENT.memory_pathPicture + 'recto.png';
        LIST_CARDS[i].data = PICTURES[i]
        LIST_CARDS[i].classList.remove("memoryFound"); 
        LIST_CARDS[i].addEventListener("click", () => { play(i); });
    }
}

/**
 * Stop the game and display all the hidden cards
 **/

function cheat() {
    get("#cheat").style.display = "none";
    for (let i = 0; i < LIST_CARDS.length; i++) {
        DISPLAY_CARDS[i] = 2;
        LIST_CARDS[i].src = _CONTENT.memory_pathPicture + LIST_CARDS[i].data + ".png";
        LIST_CARDS[i].removeEventListener("click", () => { play(i); });
    }
}

/**
 * Generate the score and display the end game
 **/

function endGame() {
    // Score
    let score = 116 - NB_CLICK;
    GAME.memory.lastScore = score;
    if (score > GAME.memory.bestScore) GAME.memory.bestScore = score;
    setStorage("GAMZ-save", JSON.stringify(GAME));

    // Update the display
    get("#cheat").style.display = "none";
    get("#memoryBoard").innerHTML = "<p>" + _CONTENT.memory_win_part1 + "</p>";
    get("#memoryBoard").innerHTML += "<p>" + _CONTENT.memory_win_part2 + NB_CLICK + _CONTENT.memory_win_part3 + score + _CONTENT.memory_win_part4 + "</p>";
}