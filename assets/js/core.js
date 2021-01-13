// =================================================
// =================================================
// ============ CORE VARIABLES

let french; let english;
const VERSION = 1.2;
const GITHUB = "<a target=\"_blank\" href=\"https://github.com/n-deleforge/gam-z\">GitHub</a>";
const HOME = "<a target=\"_blank\" href=\"https://nicolas-deleforge.fr/\">nd</a>";
const CURRENT_PAGE = document.currentScript.src.split("?")[1];
const MOBILE = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// =================================================
// =================================================
// ============ CORE INITIALISATION

// ===> Correct the bug with viewport on mobile
if (MOBILE) get("#content").style.minHeight = window.innerHeight + 'px';

// ===> According the page, choose the correct array of words
switch (CURRENT_PAGE) {  
    case "main": // Main screen
        french = {
            'subtitle': "Liste des jeux",
            'links': "Disponible sur " + GITHUB + " (v " + VERSION + ")<br />Heberge sur " + HOME,
            'classicGame1': "Morpion"
        };
        english = {
            'subtitle': "Games list",
            'links': "Available on " + GITHUB + " (v " + VERSION + ")<br />Hosted on " + HOME,
            'classicGame1': "Tic tac toe"
        };
        break;
    case "tictactoe": // Game : Tic Tac Toe
        french = {
            'title': "Morpion",
            'game': "Jouer",
            'quit': "Quitter",
            'popupTitle': "Fin de partie",
            'reload': "Fermer",
            'turn_part1': "C'est au tour du joueur ",
            'turn_part2': "",
            'victory_part1': "Victoire du joueur ",
            'victory_part2': " 😁",
            'draw': "Égalité 😱"
        };
        english = {
            'title': "Tic Tac Toe",
            'game': "Play",
            'quit': "Quit",
            'popupTitle': "Game over",
            'reload': "Close",
            'turn_part1': "Player ",
            'turn_part2': " turn",
            'victory_part1': "Player ",
            'victory_part2': " won 😁",
            'draw': "Draw 😱"
        };
        break;
}

// ===> Determine the language of the app
const CONTENT = navigator.language == "fr" || navigator.language == "fr-FR" ? french : english;
let names = Object.keys(CONTENT);
let values = Object.values(CONTENT);

for (let i = 0; i < names.length; i++) {
    if (get("#" + names[i])) {
        get("#" + names[i]).innerHTML = values[i];
    }
}