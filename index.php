<?php
// =================================================
// =================================================
// ============ INITIALISATION

session_start();
$_VERSION = "1.4.0";

// =================================================
// =================================================
// ============ MAIN

$_PAGES = [
    // Main
    "home" => ["", "home"],
    "tictactoe" => ["games", "tictactoe"],
    "memory" => ["games", "memory"],
    "hangman" => ["games", "hangman"],
];

isset($_GET["a"]) ? loadPage($_PAGES[$_GET["a"]]) : loadPage($_PAGES["home"]);

// =================================================
// =================================================
// ============ FUNCTIONS

/**
 * Load a page, calling the header, the content and the footer
 *
 * @param array $content [directory, name of the file]
 * @return void
 */

function loadPage($content) {
    global $_VERSION;

    $_PATH = "app/";
    $_DIRECTORY = $content[0];
    $_NAME = $content[1];

    require $_PATH . '_header.php';
    require $_PATH . $_DIRECTORY . '/' . $_NAME . '.php';
    require $_PATH . '_footer.php';
}