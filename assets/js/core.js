// =================================================
// =================================================
// ============ SERVICE WORKER

"serviceWorker" in navigator && window.addEventListener ("load", function() {navigator.serviceWorker.register("serviceWorker.js")});

// =================================================
// =================================================
// ============ CORE VARIABLES

const _VERSION = 1.4;
const _GITHUB = "<a target=\"_blank\" href=\"https://github.com/n-deleforge/gam-z\">GitHub</a>";
const _HOME = "<a target=\"_blank\" href=\"https://nicolas-deleforge.fr/\">ForgeCode</a>";
const _MOBILE = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const _BACK_LINK = "https://nicolas-deleforge.fr/my-apps/gamz/";
const FRENCH = {
    // Main
    'footer': "Disponible sur " + _GITHUB + " (v " + _VERSION + ") ©  " + _HOME,
    'onePlayerTitle': "1 joueur",
    'hangman': "Le pendu",
    'memory': "Memory",
    'twoPlayerTitle': "2 joueurs",
    'tictactoe': "Morpion",
    // All games
    'play': "Jouer",
    'back': "Retour",
    'reload': "Recommencer",
    'cheat': "Solution",
    'bestScore': "Meilleur score",
    'lastScore': "Dernier score",
    'win': "Victoire(s)",
    'lose': "Défaite(s)",
    // TicTacToe
    'tictactoe_turn_part1': "C'est au tour du joueur ",
    'tictactoe_turn_part2': "",
    'tictactoe_win_part1': "Victoire du joueur ",
    'tictactoe_win_part2': " 😁",
    'tictactoe_draw': "Égalité 😱",
    'tictactoe_games': "Nombre de parties : ",
    // Hangman
    'hangman_lastTry': "Plus qu'un essai !",
    'hangman_try': " essais restants",
    'hangman_lost': "Dommage, vous avez perdu !<br />Le mot à trouver était : ",
    'hangman_win_part1': "Bien joué !<br />Vous avez fait ",
    'hangman_win_part2': " erreurs",
    'hangman_win_part3': "Votre score est de ",
    'hangman_win_part4': " points.",
    // Memory
    "memory_nbClick": "Nombre de clics : ",
    'memory_nbFound': "Nombre de paires : ",
    'memory_pathPicture': "assets/images/memory/",
    'memory_win_part1': "Bravo !",
    'memory_win_part2': "Tu as fais ",
    'memory_win_part3': " clics, ton score est de ",
    'memory_win_part4': " points.",
};
const ENGLISH = {
    // Main
    'footer': "Available on " + _GITHUB + " (v " + _VERSION + ") ©  " + _HOME,
    'onePlayerTitle': "1 player",
    'hangman': "Hangman",
    'memory': "Memory",
    'twoPlayerTitle': "2 players",
    'tictactoe': "Tic Tac Toe",
    // All games
    'play': "Play",
    'back': "Back",
    'reload': "Restart",
    'cheat': "Cheat",
    'bestScore' : "Best score",
    'lastScore' : "Last score",
    'win' : "Win",
    'lose' : "Lose",
    // TicTacToe
    'tictactoe_turn_part1': "Player ",
    'tictactoe_turn_part2': " turn",
    'tictactoe_win_part1': "Player ",
    'tictactoe_win_part2': " won 😁",
    'tictactoe_draw': "Draw 😱",
    'tictactoe_games' : "Number of games : ",
    // Hangman
    'hangman_lastTry' : "One try left !",
    'hangman_try' : " tries left",
    'hangman_lost' : "Too bad, you have lost.<br />The word to find was : ",
    'hangman_win_part1' : "Good game !<br />You did ",
    "hangman_win_part2" : " errors",
    'hangman_win_part3': "Your score is ",
    'hangman_win_part4': " points.",
    // Memory
    "memory_nbClick" : "Number of click : ",
    'memory_nbFound' : "Number of pairs : ",
    'memory_pathPicture' : "assets/images/memory/",
    'memory_win_part1' : "Congrats !",
    'memory_win_part2' : "You made ",
    'memory_win_part3' : " clicks, your score is ",
    'memory_win_part4' : " points.",
}

// =================================================
// =================================================
// ============ CORE INITIALISATION

// Correct the bug with viewport on mobile
if (_MOBILE) get("#container").style.minHeight = window.innerHeight + 'px';

// Create data game or parse it if existing
if (!getStorage("GAMZ-save")) {
    GAME = {
        'tictactoe' : {
            "games" : 0
        },
        'hangman' : {
            "bestScore" : 0,
            "win": 0,
        },
        'memory' : {
            "bestScore" : 0,
            "lastScore" : 0
        }
    }

    setStorage("GAMZ-save", JSON.stringify(GAME));
} else GAME = JSON.parse(getStorage("GAMZ-save"))

// Determine the language of the app
const _CONTENT = navigator.language == "fr" || navigator.language == "fr-FR" ? FRENCH : ENGLISH;
get('#manifest').href = navigator.language == "fr" || navigator.language == "fr-FR" ? "french.webmanifest" : "english.webmanifest";

let names = Object.keys(_CONTENT);
let values = Object.values(_CONTENT);

for (let i = 0; i < names.length; i++) {
    if (get("#" + names[i])) get("#" + names[i]).innerHTML = values[i];
}