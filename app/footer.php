        <?php echo ($_name == "home") ? '<div id="void"></div><div id="footer"></div>' : '<a href="index.php" class="gameButton" id="back"></a>'; ?>
    </div>

    <script src="/../libraries/littleJS.min.js?v=<?php echo $_version; ?>">'</script>
    <script src="assets/js/core.min.js?v=<?php echo $_version; ?>">'</script>

    <?php 
        if ($_name == "tictactoe")  echo '<script src="assets/js/tictactoe.min.js?v='. $_version . '"></script>';
        if ($_name == "hangman") echo '<script src="assets/js/hangman.min.js?v='. $_version . '"></script>';
        if ($_name == "memory")   echo '<script src="assets/js/memory.min.js?v='. $_version . '"></script>';
    ?>
</body>
</html>