// ===> General variables
const version = 1.1; // the actual version of the app
const linkGitHub = "<a target=\"_blank\" href=\"https://github.com/n-deleforge/gam-z\">GitHub</a>";
const linkHome = "<a target=\"_blank\" href=\"https://nicolas-deleforge.fr/\">nd</a>";
const page = document.currentScript.src.split("?")[1];
let FR;
let EN;

// ===> Correct the bug with viewport on mobile
if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) get("#content").style.minHeight = window.innerHeight + 'px';

switch (page) {
    // Main screen
    case "main":
        FR = {
            'title': "Salut Gamer'z",
            'subtitle': "Les classiques",
            'links': "Disponible sur " + linkGitHub + " (v " + version + ")<br />Heberge sur " + linkHome,
            'classicGame1': "Morpion"
        }

        EN = {
            'title': "Hey Gamer'z",
            'subtitle': "Classic games",
            'links': "Available on " + linkGitHub + " (v " + version + ")<br />Hosted on " + linkHome,
            'classicGame1': "Tic tac toe"
        }
        break;

    // Game : Tic Tac Toe
    case "tictactoe":
        FR = {
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
        }

        EN = {
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
        }
        break;
}

// ===> Determine the language of the app
if (navigator.language == "fr" || navigator.language == "fr-FR") {
    display = FR;
    get("#htmlTag").lang = "fr";
} else {
    display = EN;
    get("#htmlTag").lang = "en";
}

// ===> Automatically fill all ID fields
let idName = Object.keys(display);
let values = Object.values(display);

for (let i = 0; i < idName.length; i++) {
    if (get("#" + idName[i])) get("#" + idName[i]).innerHTML = values[i];
}