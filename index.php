<?php
// =================================================
// ============ INITIALISATION

session_start();
$_version = "1423";

// =================================================
// ============ MAIN

$_pages = [
    "home" => ["", "home"],

    // Games
    "tictactoe" => ["games", "tictactoe"],
    "memory" => ["games", "memory"],
    "hangman" => ["games", "hangman"],
];

isset($_GET["a"]) ? loadPage($_pages[$_GET["a"]]) : loadPage($_pages["home"]);

// =================================================
// ============ FUNCTIONS

/**
 * Load a page, calling the header, the content and the footer
 *
 * @param array $content [directory, name of the file]
 * @return void
 */

function loadPage($content) {
    global $_version;

    $_path = "app/";
    $_directory = $content[0];
    $_name = $content[1];

    require $_path . 'header.php';
    require $_path . $_directory . '/' . $_name . '.php';
    require $_path . 'footer.php';
}