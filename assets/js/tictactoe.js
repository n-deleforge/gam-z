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

// Quit button
get("#quit").addEventListener("click", function() { document.location.href="https://nicolas-deleforge.fr/apps/gamz" });

// Start button
get("#game").addEventListener("click", function() {
  // Check the display of the game
  document.getElementsByTagName("nav")[0].style.display = "flex";
  get("#game").style.display = "none";
  get("#quit").style.display = "none";
  displayPlayer();

  // Creation of the grid
  tab = new Array(grid * grid);
  tab.fill(" ");

  // Add listeners on all cases
  list = get(".case");
  for (let cell = 0; cell < list.length; cell++) {
    list[cell].innerHTML = "";
    list[cell].addEventListener("click", function () { 
      play(cell, tab, pawn()); 
    });
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
        if (player == 1) 
          get("#popupText").style.color = "lightskyblue";
        else 
          get("#popupText").style.color = "lightgreen";
          
        get("#popupText").innerHTML = display.victory_part1 + player + display.victory_part2;
      }

      // Check the draw
      if (fullTable(tab) && !victory(tab, cell)) get("#popupText").innerHTML = display.draw;
    }

    displayPlayer("newPlayer")
  }
}

// =================================================
// =================================================
// ============ GAME FUNCTIONS

// ===> Determine the pawn of the player
function pawn() {
  if (player == 1) 
    return '<span class="tic">X</span>';
  else 
    return '<span class="tac">O</span>';
}

// ===> Display the player who's playing
function displayPlayer(mode) {
  if (mode == "newPlayer") {
    if (player == 1) 
      player = 2;
    else 
      player = 1;
  }

  if (player == 1) 
    get("#player").style.color = "lightskyblue";
  else 
    get("#player").style.color = "lightgreen";
  
  return get("#player").innerHTML = display.turn_part1 + player + display.turn_part2;
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