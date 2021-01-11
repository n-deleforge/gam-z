// =================================================
// =================================================
// ============ SETTINGS

const grid = 3; // Nb of cases in the grid
let tab; // Content of the grid
let list; // List of all cases 
let player = (Math.floor(Math.random() * Math.floor(2))) + 1; // First player
const colorPlayer1 = getVariableCSS("--ticTacToeColor1");
const colorPlayer2 = getVariableCSS("--ticTacToeColor2");

// =================================================
// =================================================
// ============ MAIN

// ===> Quit game
get("#quit").addEventListener("click", function() { 
  document.location.href="https://nicolas-deleforge.fr/apps/gamz";
});

// ===> Start game
get("#game").addEventListener("click", function() {
  get("~nav").style.display = "flex";
  get("#game").style.display = "none";
  get("#quit").style.display = "none";

  displayPlayer(false);
  createGame();
});

// ===> The main game function
function play(cell, array, symbol) {
  if (array[cell] == " ") {
    // Play sound and update the display
    get("#writing").play();
    array[cell] = symbol;
    for (let cell = 0; cell < grid * grid; cell++) {
      list[cell].innerHTML = array[cell];
    }

    // If the game is over : check victory or draw
    if (victory(tab, cell) || tab.indexOf(" ") == -1) {
      get("#containerPopup").style.display = "flex";
      get("#reload").addEventListener("click", function() { location.reload() });

      // Check the victory
      if (victory(tab, cell)) {
        player == 1 ? get("#popupText").style.color = colorPlayer1 : get("#popupText").style.color = colorPlayer2;
        get("#popupText").innerHTML = display.victory_part1 + player + display.victory_part2;
      }

      // Or check the draw
      if (tab.indexOf(" ") == -1 && !victory(tab, cell))
        get("#popupText").innerHTML = display.draw;
    }

    // If it's not over : new turn and new player
    displayPlayer(true)
  }
}

// =================================================
// =================================================
// ============ GAME FUNCTIONS

// ===> Create the grid and add listeners
function createGame() {
  // Creation of the grid
  tab = new Array(grid * grid);
  tab.fill(" ");

  // Add listeners on all cases
  list = get(".case");
  for (let cell = 0; cell < list.length; cell++) {
    list[cell].innerHTML = "";
    list[cell].addEventListener("click", function () { 
      play(cell, tab, drawPawn()); 
    });
  }
}

// ===> Determine the pawn of the player
function drawPawn() {
  let pawn; 
  player == 1 ? pawn = '<span class="tic">X</span>' : pawn = '<span class="tac">O</span>';
  return pawn;
}

// ===> Display the player and change player
function displayPlayer(newPlayer) {
  if (newPlayer == true) player == 1 ? player = 2 : player = 1;

  player == 1 ? get("#player").style.color = colorPlayer1 : get("#player").style.color = colorPlayer2;
  get("#player").innerHTML = display.turn_part1 + player + display.turn_part2;
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