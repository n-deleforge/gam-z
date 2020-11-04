// =================================================
// =================================================
// ============ INITIALISATION

// ===> Correct the bug with viewport on mobile
if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) get("#content").style.minHeight = window.outerHeight + 'px';

// ===> French translation
const FR = {
    'auto' : {
      'title' : "Morpion",
      'game' : "Jouer",
      'quit' : "Quitter",
      'popupTitle' : "Fin de partie",
      'reload' : "Fermer"
    },
    'app' : {
      'turn_part1' : "C'est au tour du joueur ",
      'turn_part2' : "",
      'victory_part1' : "Victoire du joueur ",
      'victory_part2' : " 😁",
      'draw' : "Égalité 😱"
    }
}

// ===> English translation
const EN = {
  'auto' : {
    'title' : "Tic Tac Toe",
    'game' : "Play",
    'quit' : "Quit",
    'popupTitle' : "Game over",
    'reload' : "Close"
  },
  'app' : {
    'turn_part1' : "Player ",
    'turn_part2' : " turn",
    'victory_part1' : "Player ",
    'victory_part2' : " won 😁",
    'draw' : "Draw 😱"
  }
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
for(let i = 0; i < Object.keys(display).length - 1; i++) {
  let allData = display[Object.keys(display)[i]];
  let idName = Object.keys(allData);
  let values = Object.values(allData);
  for (let j = 0; j < idName.length; j++) get("#" + idName[j]).innerHTML = values[j];
}

// =================================================
// =================================================
// ============ SETTINGS

let grid = 3; // Nb of cases in the grid
let tab; // Content of the grid
let player = (Math.floor(Math.random() * Math.floor(2))) + 1; // First player
let list; // List of all cases 

// =================================================
// =================================================
// ============ MAIN

// ===> Start the game
get("#quit").addEventListener("click", function() { history.back(); });
get("#game").addEventListener("click", function() {
  document.getElementsByTagName("nav")[0].style.display = "flex";
  get("#game").style.display = "none";
  displayPlayer()

  // Creation of the grid
  tab = new Array(grid * grid);
  tab.fill(" ");

  // Add listeners on all cases
  list = get(".case");
  for (let cell = 0; cell < list.length; cell++) {
    list[cell].innerHTML = "";
    list[cell].addEventListener("click", function () { play(cell, tab, pawn()); });
  }
});

// ===> The main game function
function play(cell, array, symbol) {
  // If it's empty, it's playable
  if (array[cell] == " ") {
    get("#writing").play();
    array[cell] = symbol;

    // Update the display
    list = get(".case");
    for (let cell = 0; cell < grid * grid; cell++) {
      list[cell].innerHTML = array[cell];
    }

    // If there is victory or draw
    if (victory(tab, cell) || fullTable(tab)) {
      get("#containerPopup").style.display = "flex";
      get("#reload").addEventListener("click", function() { location.reload() });

      // Check the victory
      if (victory(tab, cell)) {
        if (player == 1) get("#popupText").style.color = "lightskyblue";
        else get("#popupText").style.color = "lightgreen";
        get("#popupText").innerHTML = display.app.victory_part1 + player + display.app.victory_part2;
      }

      // Check the draw
      if (fullTable(tab) && !victory(tab, cell)) get("#popupText").innerHTML = display.app.draw;
    }

    displayPlayer("newPlayer")
  }
}

// =================================================
// =================================================
// ============ GAME FUNCTIONS

// ===> Determine the pawn of the player
function pawn() {
  if (player == 1) return '<span class="tic">X</span>';
  else return '<span class="tac">O</span>';
}

// ===> Display the player who's playing
function displayPlayer(mode) {
  if (mode == "newPlayer") {
    if (player == 1) player = 2;
    else player = 1;
  }

  if (player == 1) get("#navPlayer").style.color = "lightskyblue";
  else get("#navPlayer").style.color = "lightgreen";
  
  return get("#navPlayer").innerHTML = display.app.turn_part1 + player + display.app.turn_part2;
}

// ===> Check if the array is full
function fullTable(array) {
  if (array.indexOf(" ") == -1) return true;
  return false;
}

// ===> Check if there is a victory
function victory(array, lastPosition) {
  let combo = array[lastPosition];

  if ((array[0] == combo && array[1] == combo && array[2] == combo) ||
    (array[3] == combo && array[4] == combo && array[5] == combo) ||
    (array[6] == combo && array[7] == combo && array[8] == combo) ||
    (array[0] == combo && array[3] == combo && array[6] == combo) ||
    (array[1] == combo && array[4] == combo && array[7] == combo) ||
    (array[2] == combo && array[5] == combo && array[8] == combo) ||
    (array[0] == combo && array[4] == combo && array[8] == combo) ||
    (array[2] == combo && array[4] == combo && array[6] == combo))
    return true;
  return false;
}

// =================================================
// =================================================
// ============ GENERIC

// ===> Easy selector
function get(n) {
  if (n.search("#") == 0 && n.split("#")[1] != null && document.querySelector(n) != null) return document.querySelector(n);
  if (n.search(".") == 0 && n.split(".")[1] != null && document.querySelectorAll(n) != null) return document.querySelectorAll(n);
  if (n.search("~") == 0 && n.split("~")[1] != null && document.querySelectorAll(n.split("~")[1]) != null) return document.querySelectorAll(n.split("~")[1])[0];
}