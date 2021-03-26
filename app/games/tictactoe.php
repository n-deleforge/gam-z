<div id="app" class="app-tictactoe">
    <div id="tictactoeBoard">
        <div class="tttLine">
            <div class="tttCase tttC1"><span class="tttTic">X</span></div>
            <div class="tttCase tttC2"><span class="tttTac">O</span></div>
            <div class="tttCase tttC3"></div>
        </div>
        <div class="tttLine">
            <div class="tttCase tttC4"></div>
            <div class="tttCase tttC5"><span class="tttTic">X</span></div>
            <div class="tttCase tttC6"></div>
        </div>
        <div class="tttLine">
            <div class="tttCase tttC7"></div>
            <div class="tttCase tttC8"></div>
            <div class="tttCase tttC9"><span class="tttTac">O</span></div>
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