// =================================================
// =================================================
// ============ CORE VARIABLES

let FRENCH; let english;
const _VERSION = 1.3;
const _GITHUB = "<a target=\"_blank\" href=\"https://github.com/n-deleforge/gam-z\">GitHub</a>";
const _HOME = "<a target=\"_blank\" href=\"https://nicolas-deleforge.fr/\">nd</a>";
const _CURRENT_PAGE = document.currentScript.src.split("?")[1];
const _MOBILE = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const _BACK_LINK = "https://nicolas-deleforge.fr/my-apps/gamz/";

// =================================================
// =================================================
// ============ CORE INITIALISATION

// ===> Correct the bug with viewport on mobile
if (_MOBILE) get("#container").style.minHeight = window.innerHeight + 'px';

// ===> According the page, choose the correct array of words
switch (_CURRENT_PAGE) {  
    case "main": // Main screen
        FRENCH = {
            'links': "Disponible sur " + _GITHUB + " (v " + _VERSION + ")<br />Heberge sur " + _HOME,
            'classicGame1': "Morpion",
            'classicGame2': "Le pendu"
        };
        ENGLISH = {
            'links': "Available on " + _GITHUB + " (v " + _VERSION + ")<br />Hosted on " + _HOME,
            'classicGame1': "Tic tac toe",
            'classicGame2': "Hangman"
        };
        break;
    case "tictactoe": // Game : Tic Tac Toe
        FRENCH = {
            'game': "Jouer",
            'quit': "Quitter",
            'reload': "Recommencer",
            'turn_part1': "C'est au tour du joueur ",
            'turn_part2': "",
            'victory_part1': "Victoire du joueur ",
            'victory_part2': " 😁",
            'draw': "Égalité 😱"
        };
        ENGLISH = {
            'game': "Play",
            'quit': "Quit",
            'reload': "Restart",
            'turn_part1': "Player ",
            'turn_part2': " turn",
            'victory_part1': "Player ",
            'victory_part2': " won 😁",
            'draw': "Draw 😱"
        };
        break;
    case "hangman":  // Game : Hangman
        FRENCH = {
            'play': "Jouer",
            'quit': "Quitter",
            'reload': "Recommencer",
            'letter': "Choissisez une lettre",
            'error': " n'est pas une lettre correcte.",
            'lastTry': "Plus qu'un essai !",
            'try': " essais restants",
            'lost': "Dommage, vous avez perdu !<br />Le mot à trouver était : ",
            'win_part1': "Bien joué !<br />Vous avez fait ",
            "win_part2": " erreurs"
        };
        ENGLISH = {
            'play' : "Play",
            'quit' : "Quit",
            'reload': "Restart",
            'letter' : "Choose a letter",
            'error' : " is not a correct letter.",
            'lastTry' : "One try left !",
            'try' : " tries left",
            'lost' : "Too bad, you have lost.<br />The word to find was : ",
            'win_part1' : "Good game !<br />You did ",
            "win_part2" : " errors"
        };
        break;
}

// ===> Determine the language of the app
const _CONTENT = navigator.language == "fr" || navigator.language == "fr-FR" ? FRENCH : ENGLISH;
let names = Object.keys(_CONTENT);
let values = Object.values(_CONTENT);

for (let i = 0; i < names.length; i++) {
    if (get("#" + names[i])) {
        get("#" + names[i]).innerHTML = values[i];
    }
}