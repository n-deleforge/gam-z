// =================================================
// =================================================
// ============ SETTINGS

let GAME_TABLE; let LIST_CASES; let LAST; let CURRENT_PLAYER = rand(1, 2);
const _GRID = 3;
const _COLOR_PLAYER1 = getVariableCSS("--ticTacToeColor1");
const _COLOR_PLAYER2 = getVariableCSS("--ticTacToeColor2");

// =================================================
// =================================================
// ============ MAIN

// ===> Events on the buttons
get("#quit").addEventListener("click", () => { document.location.href = _BACK_LINK; });
get("#reload").addEventListener("click", () => { document.location.reload(); });
get("#game").addEventListener("click", () => {
  get("#player").style.display = "flex";
  get("#game").style.display = "none";
  get("#quit").style.display = "none";
  checkPlayer();
  createGame();
});

// ===> The main game function
function play(cell, symbol) {
  LAST = cell;

  // Check if the case is empty
  if (GAME_TABLE[LAST] == " ") {
    get("#writing").play();
    GAME_TABLE[LAST] = symbol;
    for (let i = 0; i < _GRID * _GRID; i++) {
      LIST_CASES[i].innerHTML = GAME_TABLE[i];
    }

    // Check of the victory/draw and change player
    checkVictory();
    checkPlayer(true);
  }
}

// =================================================
// =================================================
// ============ GAME FUNCTIONS

// ===> Create the grid and add listeners
function createGame() {
  // Creation of the grid
  GAME_TABLE = new Array(_GRID * _GRID);
  GAME_TABLE.fill(" ");

  // Add listeners on all cases
  LIST_CASES = get(".case");
  for (let i = 0; i < LIST_CASES.length; i++) {
    LIST_CASES[i].innerHTML = "";
    LIST_CASES[i].addEventListener("click", () => { play(i, drawPawn()); });
  }
}

// ===> Determine the pawn of the player
function drawPawn() {
  let pawn = CURRENT_PLAYER == 1 ? '<span class="tic">X</span>' : '<span class="tac">O</span>';
  return pawn;
}

// ===> Check the player
function checkPlayer(newPlayer = false) {
  if (newPlayer == true) CURRENT_PLAYER == 1 ? CURRENT_PLAYER = 2 : CURRENT_PLAYER = 1;

  get("#player").style.color = CURRENT_PLAYER == 1 ?  _COLOR_PLAYER1 :  _COLOR_PLAYER2;
  get("#player").innerHTML = _CONTENT.turn_part1 + CURRENT_PLAYER + _CONTENT.turn_part2;
}

// ===> Check victory or draw
function checkVictory() {
  // Check victory
  let existingCombo = GAME_TABLE[LAST];
  if ((GAME_TABLE[0] == existingCombo && GAME_TABLE[1] == existingCombo && GAME_TABLE[2] == existingCombo) ||
      (GAME_TABLE[3] == existingCombo && GAME_TABLE[4] == existingCombo && GAME_TABLE[5] == existingCombo) ||
      (GAME_TABLE[6] == existingCombo && GAME_TABLE[7] == existingCombo && GAME_TABLE[8] == existingCombo) ||
      (GAME_TABLE[0] == existingCombo && GAME_TABLE[3] == existingCombo && GAME_TABLE[6] == existingCombo) ||
      (GAME_TABLE[1] == existingCombo && GAME_TABLE[4] == existingCombo && GAME_TABLE[7] == existingCombo) ||
      (GAME_TABLE[2] == existingCombo && GAME_TABLE[5] == existingCombo && GAME_TABLE[8] == existingCombo) ||
      (GAME_TABLE[0] == existingCombo && GAME_TABLE[4] == existingCombo && GAME_TABLE[8] == existingCombo) ||
      (GAME_TABLE[2] == existingCombo && GAME_TABLE[4] == existingCombo && GAME_TABLE[6] == existingCombo)) {
      get("#tab").style.display = "none";
      get("#player").style.display = "none";
      get("#results").style.display = "flex";
      get("#reload").style.display = "block";
      
      CURRENT_PLAYER == 1 ? get("#resultsText").style.color = _COLOR_PLAYER1 : get("#resultsText").style.color = _COLOR_PLAYER2;
      get("#resultsText").innerHTML = _CONTENT.victory_part1 + CURRENT_PLAYER + _CONTENT.victory_part2;
  }

  // Check draw
  else if (GAME_TABLE.indexOf(" ") == -1) {
    get("#tab").style.display = "none";
    get("#player").style.display = "none";
    get("#results").style.display = "flex";
    get("#reload").style.display = "block";
    get("#resultsText").innerHTML = _CONTENT.draw;
  }
}