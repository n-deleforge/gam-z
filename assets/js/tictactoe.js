// =================================================
// =================================================
// ============ SETTINGS

let GAME_TABLE; let LIST_CASES; let LAST; let CURRENT_PLAYER = rand(1, 2);
const _GRID = 3;
const _COLOR_PLAYER1 = getVariableCSS("ticTacToeColor1");
const _COLOR_PLAYER2 = getVariableCSS("ticTacToeColor2");

// =================================================
// =================================================
// ============ MAIN

/**
 * Initialize the game : display score and add events on buttons
 **/

get("#results").innerHTML = _CONTENT.tictactoe_games + GAME.tictactoe.games;
get("#reload").addEventListener("click", () => { document.location.reload(); });
get("#quit").addEventListener("click", () => { document.location.href = _BACK_LINK; });
get("#play").addEventListener("click", createGame);

/**
 * Check the played case, check the victory and update the turn
 * @param {int} cell the number of played cell
 **/

function play(cell) {
  LAST = cell;

  // Check if the case is empty
  if (GAME_TABLE[LAST] == " ") {
    get("#writing").play();
    navigator.vibrate("50");

    GAME_TABLE[LAST] = CURRENT_PLAYER == 1 ? '<span class="tic">X</span>' : '<span class="tac">O</span>';
    for (let i = 0; i < _GRID * _GRID; i++) {
      LIST_CASES[i].innerHTML = GAME_TABLE[i];
    }

    // Check of the victory/draw and change player
    checkVictory();
    checkPlayer(true);
  }
}

/**
 * Create a new game and add event listener on each case
 **/

function createGame() {
  // Update the display
  get("#player").style.display = "flex";
  get("#results").style.display = "none";
  get("#play").style.display = "none";
  get("#quit").style.display = "none";
  checkPlayer();

  // Creation of the grid
  GAME_TABLE = new Array(_GRID * _GRID);
  GAME_TABLE.fill(" ");

  // Add listeners on all cases
  LIST_CASES = get(".case");
  for (let i = 0; i < LIST_CASES.length; i++) {
    LIST_CASES[i].innerHTML = "";
    LIST_CASES[i].addEventListener("click", () => { play(i); });
  }
}

/**
 * Display the actual player, and can switch of player
 * @param {bool} newPlayer true to switch player, false to not switch
 **/

function checkPlayer(newPlayer = false) {
  if (newPlayer == true) CURRENT_PLAYER == 1 ? CURRENT_PLAYER = 2 : CURRENT_PLAYER = 1;

  get("#player").style.color = CURRENT_PLAYER == 1 ?  _COLOR_PLAYER1 :  _COLOR_PLAYER2;
  get("#player").innerHTML = _CONTENT.tictactoe_turn_part1 + CURRENT_PLAYER + _CONTENT.tictactoe_turn_part2;
}

/**
 * Check the victory or the draw and call the endGame function
 **/

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

      endGame();
      CURRENT_PLAYER == 1 ? get("#results").style.color = _COLOR_PLAYER1 : get("#results").style.color = _COLOR_PLAYER2;
      get("#results").innerHTML = _CONTENT.tictactoe_win_part1 + CURRENT_PLAYER + _CONTENT.tictactoe_win_part2;
  }

  // Check draw
  else if (GAME_TABLE.indexOf(" ") == -1) {
    endGame();
    get("#results").innerHTML = _CONTENT.tictactoe_draw;
  }
}

/**
 * Change the display for the results and save the number of games
 **/

function endGame() {
  get("#game").style.display = "none";
  get("#player").style.display = "none";
  get("#reload").style.display = "block";
  get("#results").style.display = "flex";

  GAME.tictactoe.games ++;
  storage("set", "GAMZ-save", JSON.stringify(GAME));
}