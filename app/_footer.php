        <?php echo ($_NAME == "home") ? '<div id="void"></div><div id="footer"></div>' : '<a href="index.php" class="gameButton" id="back"></a>'; ?>
    </div>

    <script src="/../libraries/littleJS.min.js"></script>
    <script src="assets/js/core.min.js?v=<?php echo  $_VERSION; ?>">'</script>
    <?php 
        if ($_NAME == "tictactoe")  echo '<script src="assets/js/tictactoe.min.js?v='. $_VERSION . '"></script>';
        if ($_NAME == "hangman") echo '<script src="assets/js/hangman.min.js?v='. $_VERSION . '"></script>';
        if ($_NAME == "memory")   echo '<script src="assets/js/memory.min.js?v='. $_VERSION . '"></script>';
    ?>
</body>
</html>