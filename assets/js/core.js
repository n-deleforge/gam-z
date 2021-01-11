// =================================================
// =================================================
// ============ CORE VARIABLES

const version = 1.2;
const githubLink = "<a target=\"_blank\" href=\"https://github.com/n-deleforge/gam-z\">GitHub</a>";
const homeLink = "<a target=\"_blank\" href=\"https://nicolas-deleforge.fr/\">nd</a>";
const currentPage = document.currentScript.src.split("?")[1];
const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
let display; let french; let english;

// =================================================
// =================================================
// ============ CORE INITIALISATION

// ===> Correct the bug with viewport on mobile
if (mobile) get("#content").style.minHeight = window.innerHeight + 'px';

// ===> According the page, choose the correct array of words
switch (currentPage) {  
    case "main": // Main screen
        french = {
            'subtitle': "Liste des jeux",
            'links': "Disponible sur " + githubLink + " (v " + version + ")<br />Heberge sur " + homeLink,
            'classicGame1': "Morpion"
        };
        english = {
            'subtitle': "Games list",
            'links': "Available on " + githubLink + " (v " + version + ")<br />Hosted on " + homeLink,
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
if (navigator.language == "fr" || navigator.language == "fr-FR") {
    display = french;
    get("#htmlTag").lang = "fr";
} else {
    display = english;
    get("#htmlTag").lang = "en";
}

// ===> Automatically fill all ID fields
let names = Object.keys(display);
let values = Object.values(display);

for (let i = 0; i < names.length; i++) {
    if (get("#" + names[i])) {
        get("#" + names[i]).innerHTML = values[i];
    }
}