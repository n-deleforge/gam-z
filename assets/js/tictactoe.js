// =================================================
// ============ SETTINGS

let gameTable; let listCases; let lastCell; let currentPlayer = rand(1, 2);
const _grid = 3;
const _colorPlayer1 = getVariableCSS("ttt-color-1");
const _colorPlayer2 = getVariableCSS("ttt-color-2");

// =================================================
// ============ MAIN

/**
 * Initialize the game : modify header and add events on buttons
 **/

get("~header").innerHTML = "Gam'z ~ " + _content.tictactoe;
get("#reload").addEventListener("click", () => { document.location.reload(); });
get("#play").addEventListener("click", createGame);

/**
 * Check the played case, check the victory and update the turn
 * @param {int} cell the number of played cell
 **/

function play(cell) {
  lastCell = cell;

  // Check if the case is empty
  if (gameTable[lastCell] == " ") {
    get("#writing").play();
    navigator.vibrate("50");

    gameTable[lastCell] = currentPlayer == 1 ? '<span class="tttTic">X</span>' : '<span class="tttTac">O</span>';
    for (let i = 0; i < _grid * _grid; i++) {
      listCases[i].innerHTML = gameTable[i];
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
  gameTable = new Array(_grid * _grid);
  gameTable.fill(" ");

  // Add listeners on all cases
  listCases = get(".tttCase");
  for (let i = 0; i < listCases.length; i++) {
    listCases[i].innerHTML = "";
    listCases[i].addEventListener("click", () => { play(i); });
  }
}

/**
 * Display the actual player, and can switch of player
 * @param {bool} newPlayer true to switch player, false to not switch
 **/

function checkPlayer(newPlayer = false) {
  if (newPlayer == true) currentPlayer == 1 ? currentPlayer = 2 : currentPlayer = 1;

  get("#tttPlayer").style.color = currentPlayer == 1 ?  _colorPlayer1 :  _colorPlayer2;
  get("#tttPlayer").innerHTML = _content.tictactoe_turn_part1 + currentPlayer + _content.tictactoe_turn_part2;
}

/**
 * Check the victory or the draw and call the endGame function
 **/

function checkVictory() {
  // Check victory
  let existingCombo = gameTable[lastCell];
  if ((gameTable[0] == existingCombo && gameTable[1] == existingCombo && gameTable[2] == existingCombo) ||
      (gameTable[3] == existingCombo && gameTable[4] == existingCombo && gameTable[5] == existingCombo) ||
      (gameTable[6] == existingCombo && gameTable[7] == existingCombo && gameTable[8] == existingCombo) ||
      (gameTable[0] == existingCombo && gameTable[3] == existingCombo && gameTable[6] == existingCombo) ||
      (gameTable[1] == existingCombo && gameTable[4] == existingCombo && gameTable[7] == existingCombo) ||
      (gameTable[2] == existingCombo && gameTable[5] == existingCombo && gameTable[8] == existingCombo) ||
      (gameTable[0] == existingCombo && gameTable[4] == existingCombo && gameTable[8] == existingCombo) ||
      (gameTable[2] == existingCombo && gameTable[4] == existingCombo && gameTable[6] == existingCombo)) {

      endGame();
      currentPlayer == 1 ? get("#tttPlayer").style.color = _colorPlayer1 : get("#tttPlayer").style.color = _colorPlayer2;
      get("#tttPlayer").innerHTML = _content.tictactoe_win_part1 + currentPlayer + _content.tictactoe_win_part2;
  }

  // Check draw
  else if (gameTable.indexOf(" ") == -1) {
    endGame();
    get("#tttPlayer").innerHTML = _content.tictactoe_draw;
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

  game.tictactoe.games ++;
  setStorage("GAMZ-save", JSON.stringify(game));
}