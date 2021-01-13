// =================================================
// =================================================
// ============ SETTINGS

let gameTable; let casesList; let player = rand(1,2);
const GRID = 3;
const COLOR_PLAYER1 = getVariableCSS("--ticTacToeColor1");
const COLOR_PLAYER2 = getVariableCSS("--ticTacToeColor2");

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
    for (let cell = 0; cell < GRID * GRID; cell++) {
      casesList[cell].innerHTML = array[cell];
    }

    // If the game is over : check victory or draw
    if (victory(gameTable, cell) || gameTable.indexOf(" ") == -1) {
      get("#containerPopup").style.display = "flex";
      get("#reload").addEventListener("click", function() { location.reload() });

      // Check the victory
      if (victory(gameTable, cell)) {
        player == 1 ? get("#popupText").style.color = COLOR_PLAYER1 : get("#popupText").style.color = COLOR_PLAYER2;
        get("#popupText").innerHTML = CONTENT.victory_part1 + player + CONTENT.victory_part2;
      }

      // Or check the draw
      if (gameTable.indexOf(" ") == -1 && !victory(gameTable, cell))
        get("#popupText").innerHTML = CONTENT.draw;
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
  gameTable = new Array(GRID * GRID);
  gameTable.fill(" ");

  // Add listeners on all cases
  casesList = get(".case");
  for (let cell = 0; cell < casesList.length; cell++) {
    casesList[cell].innerHTML = "";
    casesList[cell].addEventListener("click", function () { 
      play(cell, gameTable, drawPawn()); 
    });
  }
}

// ===> Determine the pawn of the player
function drawPawn() {
  let pawn = player == 1 ? '<span class="tic">X</span>' : '<span class="tac">O</span>';
  return pawn;
}

// ===> Display the player and change player
function displayPlayer(newPlayer) {
  if (newPlayer == true) player == 1 ? player = 2 : player = 1;

  player == 1 ? get("#player").style.color = COLOR_PLAYER1 : get("#player").style.color = COLOR_PLAYER2;
  get("#player").innerHTML = CONTENT.turn_part1 + player + CONTENT.turn_part2;
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