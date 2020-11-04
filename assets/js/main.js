// =================================================
// =================================================
// ============ INITIALISATION

const version = 1.1; // the actual version of the app
const linkGitHub = "<a target=\"_blank\" href=\"https://github.com/n-deleforge/gam-z\">GitHub</a>";
const linkHome = "<a target=\"_blank\" href=\"https://nicolas-deleforge.fr/\">nd</a>";

// ===> Correct the bug with viewport on mobile
if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) get("#container").style.minHeight = window.outerHeight + 'px';

// ===> French translation
const FR = {
    'title' : "Salut Gamer'z",
    'subtitle' : "Les classiques",
    'links' : "Disponible sur " + linkGitHub + " (v " + version + ")<br />Heberge sur " + linkHome,
    'classicGame1' : "Morpion",
    'classicGame2' : "Le pendu"
}

// ===> English translation
const EN = {
    'title' : "Hey Gamer'z",
    'subtitle' : "Classic games",
    'links' : "Available on " + linkGitHub + " (v " + version + ")<br />Hosted on " + linkHome,
    'classicGame1' : "Tic tac toe",
    'classicGame2' : "The hangman"
}

// ===> Will determine the language of the app
if (navigator.language == "fr" || navigator.language == "fr-FR") {
    display = FR;
    get("#htmlTag").lang = "fr";
}
else {
    display = EN;
    get("#htmlTag").lang = "en";
}

// ===> Automatically fill all ID fields
let idName = Object.keys(display);
let values = Object.values(display);
for (let i = 0; i < idName.length; i++) get("#" + idName[i]).innerHTML = values[i];

// =================================================
// =================================================
// ============ GENERIC

// ===> Easy selector
function get(n) {
    if (n.search("#") == 0 && n.split("#")[1] != null && document.querySelector(n) != null) return document.querySelector(n);
    if (n.search(".") == 0 && n.split(".")[1] != null && document.querySelectorAll(n) != null) return document.querySelectorAll(n);
    if (n.search("~") == 0 && n.split("~")[1] != null && document.querySelectorAll(n.split("~")[1]) != null) return document.querySelectorAll(n.split("~")[1])[0];
}
