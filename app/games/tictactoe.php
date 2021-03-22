<div id="app" class="app-tictactoe">
    <div id="tictactoeBoard">
        <div class="tttLine">
            <div class="tttCase c1"><span class="tic">X</span></div>
            <div class="tttCase c2"><span class="tac">O</span></div>
            <div class="tttCase c3"></div>
        </div>
        <div class="tttLine">
            <div class="tttCase c4"></div>
            <div class="tttCase c5"><span class="tic">X</span></div>
            <div class="tttCase c6"></div>
        </div>
        <div class="tttLine">
            <div class="tttCase c7"></div>
            <div class="tttCase c8"></div>
            <div class="tttCase c9"><span class="tac">O</span></div>
        </div>
    </div>

    <div id="tttPlayer"></div>

    <div id="gameList">
        <button class="gameButton" id="play"></button>
        <button class="gameButton" id="reload"></button>
    </div>
</div>

<audio id="writing">
    <source src="assets/sounds/tictactoe-writing.mp3" prelopad type="audio/mpeg">
</audio>