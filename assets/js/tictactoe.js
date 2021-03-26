// =================================================
// =================================================
// ============ SETTINGS

let GAME_TABLE; let LIST_CASES; let LAST; let CURRENT_PLAYER = rand(1, 2);
const _GRID = 3;
const _COLOR_PLAYER1 = getVariableCSS("tttColor1");
const _COLOR_PLAYER2 = getVariableCSS("tttColor2");

// =================================================
// =================================================
// ============ MAIN

/**
 * Initialize the game : modify header and add events on buttons
 **/

get("~header").innerHTML = "Gam'z ~ " + _CONTENT.tictactoe;
get("#reload").addEventListener("click", () => { document.location.reload(); });
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

    GAME_TABLE[LAST] = CURRENT_PLAYER == 1 ? '<span class="tttTic">X</span>' : '<span class="tttTac">O</span>';
    for (let i = 0; i < _GRID * _GRID; i++) {
      LIST_CASES[i].innerHTML = GAME_TABLE[i];
    }

    // Check of the victory/draw
    checkVictory();
  }
}

/**
 * Create a new game and add event listener on each case
 **/

function createGame() {
  // Update the display
  get("#tttPlayer").style.display = "flex";
  get("#gameList").style.display = "none";
  get("#play").style.display = "none";
  checkPlayer();

  // Creation of the grid
  GAME_TABLE = new Array(_GRID * _GRID);
  GAME_TABLE.fill(" ");

  // Add listeners on all cases
  LIST_CASES = get(".tttCase");
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

  get("#tttPlayer").style.color = CURRENT_PLAYER == 1 ?  _COLOR_PLAYER1 :  _COLOR_PLAYER2;
  get("#tttPlayer").innerHTML = _CONTENT.tictactoe_turn_part1 + CURRENT_PLAYER + _CONTENT.tictactoe_turn_part2;
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
      CURRENT_PLAYER == 1 ? get("#tttPlayer").style.color = _COLOR_PLAYER1 : get("#tttPlayer").style.color = _COLOR_PLAYER2;
      get("#tttPlayer").innerHTML = _CONTENT.tictactoe_win_part1 + CURRENT_PLAYER + _CONTENT.tictactoe_win_part2;
  }

  // Check draw
  else if (GAME_TABLE.indexOf(" ") == -1) {
    endGame();
    get("#tttPlayer").innerHTML = _CONTENT.tictactoe_draw;
  }

  // Change player if no draw or victory
  else checkPlayer(true);
}

/**
 * Change the display for the #tttResults and save the number of games
 **/

function endGame() {
  get("#tictactoeBoard").style.display = "none";
  get("#gameList").style.display = "flex";
  get("#reload").style.display = "block";

  GAME.tictactoe.games ++;
  storage("set", "GAMZ-save", JSON.stringify(GAME));
}