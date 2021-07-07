// =================================================
// ============ VARIABLES

const _nbToWin = 8;
const _nbPerLine = 4;
let nbClick = 0; let nbFound = 0;
let listCards = get(".memoryCard"); let displayCards = []; let playedCards = [];
const _pictures = ["cute", "cute", "glasses", "glasses", "love", "love", "sad", "sad", "shocked", "shocked", "smile", "smile", "tongue", "tongue", "wink", "wink"];

// =================================================
// ============ MAIN

/**
 * Initialize the game : display score and add events on buttons
 **/

get("~header").innerHTML = "Gam'z ~ " + _content.memory;
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
    if (playedCards.length < 2 && displayCards[card] == 0) {
        get("#flip").play();
        nbClick++;
        
        displayCards[card] = 1;
        playedCards.push(card);
        turn(card);
   
        // If two cards are already played
        if (playedCards.length == 2) {
            // And if they are identical
            if (listCards[playedCards[0]].data == listCards[playedCards[1]].data) {
                timeout = 0; // If found, no timeout needed
                face = 2; // Founded
                nbFound++;
                
                // And if all the cards are found
                if (nbFound == _nbToWin) endGame();
            }

            // In any case, we turn the cards
            displayCards[playedCards[0]] = face;
            displayCards[playedCards[1]] = face;

            setTimeout(() => {
                turn(playedCards[0]);
                turn(playedCards[1]);
                playedCards = [];
            }, timeout);
        }
    }
}

/**
 * Turn the card hidden, visible or found according the value of displayCards[card]
 * @param {int} card the number of played card
 **/

function turn(card) {
    switch (displayCards[card]) {
        case 0: // face cachée
            listCards[card].src = "assets/images/memory/recto.png";
            break;

        case 1: // face visible
        listCards[card].src = "assets/images/memory/" + listCards[card].data + ".png";
            break;

        case 2: // paire trouvée
        listCards[card].classList.add("memoryFound");
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
    for (let i = 0; i < _nbToWin; i++) displayCards.push(0, 0);
    _pictures.sort(() => Math.random() - 0.5);

    // Add events on each cards
    for (let i = 0; i < listCards.length; i++) {
        listCards[i].src = _content.memory_pathPicture + 'recto.png';
        listCards[i].data = _pictures[i]
        listCards[i].classList.remove("memoryFound"); 
        listCards[i].addEventListener("click", () => { play(i); });
    }
}

/**
 * Stop the game and display all the hidden cards
 **/

function cheat() {
    get("#cheat").style.display = "none";
    for (let i = 0; i < listCards.length; i++) {
        displayCards[i] = 2;
        listCards[i].src = _content.memory_pathPicture + listCards[i].data + ".png";
        listCards[i].removeEventListener("click", () => { play(i); });
    }
}

/**
 * Generate the score and display the end game
 **/

function endGame() {
    // Score
    let score = 116 - nbClick;
    game.memory.lastScore = score;
    if (score > game.memory.bestScore) game.memory.bestScore = score;
    setStorage("GAMZ-save", JSON.stringify(game));

    // Update the display
    get("#cheat").style.display = "none";
    get("#memoryBoard").innerHTML = "<p>" + _content.memory_win_part1 + "</p>";
    get("#memoryBoard").innerHTML += "<p>" + _content.memory_win_part2 + nbClick + _content.memory_win_part3 + score + _content.memory_win_part4 + "</p>";
}