// =================================================
// =================================================
// ============ INITIALISATION

// ===> Correct the bug with viewport on mobile
if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) get("#content").style.minHeight = window.outerHeight + 'px';

// ===> French translation
const FR = {
    'auto' : {
      'title' : "Le pendu",
      'rules' : `Le but du jeu du pendu est de deviner un mot en 9 essais maximum.<br />La liste des lettres déjà proposées est affiché pour plus de facilité.`,
      'play' : "Jouer",
      'quit' : "Quitter",
      'giveup' : "Arrêter",
      'reload' : "Retour"
    },
    'app' : {
      'letter' : "Choissisez une lettre",
      'error' : " n'est pas une lettre correcte.",
      'info' : "Vous devez entrer une lettre.",
      'lastTry' : "Plus qu'un essai !",
      'try' : " essais restants.",
      'listLetters' : "Liste des lettres incorrectes",
      'lost' : "Dommage, vous avez perdu !<br />Le mot à trouver était : ",
      'win_part1' : "Bien joué !<br />Vous avez fait ",
      "win_part2" : " erreurs."
    }
}

// ===> English translation
const EN = {
    'auto' : {
        'title' : "The Hangman",
        'rules' : `In this game, you have to guess a (french) word in 9 tries.<br />The list of letters already proposed is displayed for convenience.`,
        'play' : "Play",
        'quit' : "Quit",
        'giveup' : "Abandonner",
        'reload' : "Restart"
      },
      'app' : {
        'letter' : "Choose a letter",
        'error' : " is not a correct letter.",
        'info' : "You must enter a letter.",
        'lastTry' : "One try left !",
        'try' : " tries left.",
        'listLetters' : "List of incorrect letters.",
        'lost' : "Too bad, you have lost.<br />The word to find was : ",
        'win_part1' : "Good game !<br />You did ",
        "win_part2" : " errors."
      }
}

// ===> Will determine the language of the app
if (navigator.language == "fr" || navigator.language == "fr-FR") {
    display = FR;
    get("#htmlTag").lang = "fr";
}
else {
    display = EN;
    get("#htmlTag").lang = "en";
}

// ===> Automatically fill all ID fields
for(let i = 0; i < Object.keys(display).length - 1; i++) {
  let allData = display[Object.keys(display)[i]];
  let idName = Object.keys(allData);
  let values = Object.values(allData);
  for (let j = 0; j < idName.length; j++) get("#" + idName[j]).innerHTML = values[j];
}

// =================================================
// =================================================
// ============ VARIABLES / SETTINGS

let error = 0; 
let maxError = 9;
let tabError = " ";
let data = chooseWord();
let dataWord = data[0]; // the word as a string
let dataTab = data[1]; // the word as an empty array

// =================================================
// =================================================
// ============ MAIN 

get("#quit").addEventListener("click", function() { history.back(); });
get("#play").addEventListener("click", function() { 
    get('#display').innerHTML = transform(data[1]);
    document.addEventListener('keydown', keyEnter);
    get("#start").style.display = "none";
    get("#game").style.display = "flex";
    get("#letter").placeholder = display.app.letter;
    get('#letter').focus();
    get("#giveup").addEventListener("click", function() { location.reload(); });
});

// ===> Manage the enter key to play
function keyEnter(event) {
    if (event.key == "Enter") play();
}

// ===> The main game function
function play() {
    // If the input is not empty and respect the regex
    if (get('#letter').value != "" && get('#letter').checkValidity()) {
        let choice = get('#letter').value.toUpperCase();
        let positions = checkLetter(choice, dataWord)

        // If the letter is correct
        if (positions.length != 0) {
            addAll(choice, data[1], positions);
            get('#display').innerHTML = transform(data[1]);
            updateGame("correct");
            checkVictory(error, dataTab);
        } 
        
        // If the letter is incorrect
        else {
            get('#message').innerHTML = "<strong>" + choice + "</strong>" + display.app.error;
            error++;
            if (tabError.search(choice) == -1) tabError += choice + " ";
            updateGame("error");
            checkVictory(error, dataTab);
        }

    } 

    // If the input is incorrect
    else {
        updateGame();
        get('#message').innerHTML = display.app.info
    }
};

// =================================================
// =================================================
// ============ GAME FUNCTIONS */

// ===> Add one letter
function add(letter, word, position) {
    word[position] = letter;
    return word;
}

// ===> Add one or multiple letters
function addAll(letter, word, positions) {
    for (i = 0; i < positions.length; i++) word = add(letter, word, positions[i])
    return word;
}

// ===> Return the positions of the letter
function checkLetter(letter, word) {
    let positions = [];
    for (i = 0; i < word.length; i++) {
        if (word[i] == letter) positions.push(i);
    }
    return positions;
}

// ===> Transform the word to a string
function transform(word) {
    let string = "";
    for (i = 0; i < word.length; i++) string += word[i] + " ";
    string.trim();
    return string;
}

// ===> Manage display for new turn
function updateGame(mode) {
    if (maxError == error + 1) {
        get('#hangman').style.color = "red";
        get('#hangman').innerHTML = display.app.lastTry;
    }
    else get('#hangman').innerHTML = (maxError-error) + display.app.try;

    get('#letter').value = "";
    get('#letter').focus();
    get('#letter').click();

    if (mode == "correct") get('#message').innerHTML = "";
    if (mode == "error") get('#list').innerHTML = "<u>" + display.app.listLetters + "</u><br />" + tabError;
}

//  ===> Check if the game is won or lost
function checkVictory(error, word) {
    if (error == maxError) {
        get('#message').innerHTML = display.app.lost + dataWord + ".";
        endGame();
    } 
    
    else if (word.indexOf("_") == -1) {
        get('#message').innerHTML = display.app.win_part1 + error + display.app.win_part2;
        get('#message').style.color = "green";
        endGame();
    }
}

// ===>  Manage the display for the end of the game
function endGame() {
    document.removeEventListener('keydown', keyEnter);
    get('#list').style.display = "none";
    get('#letter').style.display = "none";
    get('#hangman').style.display = "none";
    get('#giveup').style.display = "none";

    get('#reload').style.display = "block";
    get('#reload').addEventListener('click', function () { location.reload(); })
}

// =================================================
// =================================================
// ============ WORDS

// ===> Choose randomly a word
function chooseWord() {
    let words = dictionnary();
    let nb = Math.floor(Math.random() * Math.floor(words.length)) + 1;
    word = words[nb];

    // Now, we create the word to guess (with an array)
    let tab = [];
    for (i = 0; i < word.length; i++) tab[i] = "_";
    return [word, tab];
}

// ===> List of all the worlds
function dictionnary() {
    const words = [
        "AEROPORT", "AFFAIRE", "ALBUM", "ALPHABET", "AMENER", "AMPOULE", "ANCIEN", "ANORAK", "ANTENNE", "APPAREIL",
        "APPORTER", "APPUYER", "APRES", "ARC", "ARMOIRE", "ARRET", "ARRIERE", "ARRIVER", "ARROSER", "ASSIETTE",
        "ASSIS", "ATTACHER", "ATTENDRE", "ATTENTION", "ATTERRIR", "ATTRAPER", "AU", "AUTANT", "AUTO",
        "AUTOMOBILISTE", "AUTORADIO", "AUTOUR", "AVANCER", "AVANT", "AVEC", "AVION", "BAGAGE", "BAGUETTE",
        "BAIGNER", "BÂILLER", "BALLE", "BANC", "BARBE", "BARBOTER", "BARQUE", "BARRE", "BARREAU", "BAS",
        "BATEAU", "BEAUCOUP", "BIBLIOTHEQUE", "BLANC", "BLEU", "BOIS", "BOITE", "BONDIR", "BONNET", "BORD",
        "BOSSER", "BOTTE", "BOUCHER", "BOUCHON", "BOUDER", "BOUGER", "BOUSCULER", "BOUT", "BOUTEILLE", "BOUTON",
        "BRAS", "BRETELLE", "BRICOLAGE", "BRUIT", "BRUN", "BULLES", "BUREAU", "CABANE", "CABINET", "CAGOULE",
        "CAHIER", "CAISSE", "CALME", "CAMARADE", "CAMESCOPE", "CAMION", "CANARD", "CARNET", "CARREAU", "CARTABLE",
        "CARTON", "CASIER", "CASQUE", "CASQUETTE", "CASSE", "CASSER", "CASSEROLE", "CASSETTE", "CATALOGUE", "CEDE",
        "CEDEROM", "CEINTURE", "CERCEAU", "CHAINE", "CHAISE", "CHAISES", "CHANSON", "CHAPEAU", "CHARGER", "CHAT",
        "CHAUD", "CHAUSSETTE", "CHAUSSON", "CHAUSSURE", "CHEMISE", "CHERCHER", "CHEVILLE", "CHIFFRE", "CHOISIR",
        "CHOSE", "CHUCHOTER", "CHUTE", "CIGARETTE", "CINQ", "CISEAUX", "CLASSE", "CLAVIER", "CLE", "CLOU",
        "COIN", "COL", "COLERE", "COLLANT", "COLLE", "COLLER", "COLORIAGE", "COLORIER", "COMMENCER", "COMPARER",
        "COMPTER", "CONDUIRE", "CONSTRUIRE", "CONTE", "CONTINUER", "CONTRAIRE", "CONTRE", "COPAIN", "COPIER",
        "COQUILLAGE", "COQUILLETTE", "COQUIN", "CORDE", "CORPS", "COTE", "COU", "COUCHE", "COUDE", "COUDRE",
        "COULEUR", "COULOIR", "COUPER", "COURIR", "COURONNE", "COURT", "CRAIE", "CRAVATE", "CROCHET", "CUBE",
        "CUILLERE", "CUISSE", "CULOTTE", "CURIEUX", "CUVETTE", "DAME", "DANGER", "DANS", "DANSER", "DE",
        "DEBORDER", "DEBOUT", "DECHIRER", "DECOLLER", "DECORER", "DECOUPAGE", "DECOUPER", "DEDANS", "DEFENDRE",
        "DEHORS", "DELTAPLANE", "DEMANDER", "DEMARRER", "DEMOLIR", "DEPASSER", "DERNIER", "DERRIERE", "DESCENDRE",
        "DESOBEIR", "DESSIN", "DESSINER", "DETRUIRE", "DEUX", "DEUXIEME", "DEVANT", "DICTIONNAIRE", "DIFFERENCE",
        "DIFFERENT", "DIFFICILE", "DIRE", "DIRECTEUR", "DIRECTRICE", "DISCUTER", "DISPARAITRE", "DISTRIBUER", "DIX",
        "DOIGT", "DOIGTS", "DOMINO", "DONNER", "DORMIR", "DOS", "DOSSIER", "DOUCHE", "DOUCHER", "DOUX",
        "DROIT", "DU", "DUR", "EAU", "ECARTER", "ECHANGER", "ECHARPE", "ECHASSES", "ECHELLE", "ECLABOUSSER",
        "ECLAIRER", "ECOLE", "ECOUTER", "ECRAN", "ECRASER", "ECRIRE", "ECRITURE", "EFFACER", "EFFORT", "ELASTIQUE",
        "ELECTRICITE", "ELEVE", "EMMENER", "EMPORTER", "ENCORE", "ENERVE", "ENFANT", "ENFILER", "ENFONCER",
        "ENGIN", "ENLEVER", "ENTENDRE", "ENTONNOIR", "ENTOURER", "ENTREE", "ENTRER", "ENVELOPPE", "ENVOYER",
        "EPAIS", "EPAULE", "EPEE", "EQUIPE", "ESCABEAU", "ESCALADER", "ESCALIER", "ESCARGOT", "ESCARPIN",
        "ESSUYER", "ETAGERE", "ETANG", "ETIQUETTE", "ETROIT", "ETUDE", "ETUDIER", "EXPLIQUER", "EXTERIEUR",
        "FABRIQUER", "FACILE", "FAIRE", "FATIGUE", "FAUTE", "FAUTEUIL", "FEE", "FENETRE", "FERMER", "FESSE",
        "FEU", "FEUILLE", "FEUTRE", "FICELLE", "FIL", "FILET", "FILLE", "FILM", "FINIR", "FLECHE",
        "FLEUR", "FLOTTER", "FOIS", "FONCE", "FOND", "FOOTBALL", "FORT", "FOUILLER", "FRAPPER", "FREIN",
        "FROID", "FUSEE", "FUSIL", "GAGNER", "GANT", "GARAGE", "GARÇON", "GARDER", "GARDIEN", "GARE",
        "GAUCHE", "GENER", "GENOU", "GENTIL", "GLISSER", "GOLF", "GOMME", "GONFLER", "GOUTER", "GOUTTES",
        "GRAND", "GRIMPER", "GRIS", "GRONDER", "GROS", "GROUPE", "GRUE", "GYMNASTIQUE", "HABIT", "HANCHE",
        "HANDICAPE", "HAUT", "HELICOPTERE", "HEXAGONE", "HISTOIRE", "HORLOGE", "HUIT", "HUMIDE", "IDEE", "ILE",
        "IMAGE", "IMITER", "IMMEUBLE", "IMMOBILE", "INONDER", "INSEPARABLE", "INSTRUMENT", "INTERESSANT", "INTERIEUR",
        "INTRUS", "JALOUX", "JAMBES", "JAUNE", "JEAN", "JEU", "JOLI", "JOUER", "JOUET", "JUPE", "LAC",
        "LACER", "LACET", "LAINE", "LAISSER", "LARGE", "LAVABO", "LAVER", "LECTURE", "LETTRE", "LIERRE",
        "LIGNE", "LINGE", "LIRE", "LISSE", "LISTE", "LIT", "LITRE", "LIVRE", "LOIN", "LONG", "LUMIERE",
        "LUNETTES", "MADAME", "MAGAZINE", "MAGICIEN", "MAGIE", "MAGNETOSCOPE", "MAILLOT", "MAIN", "MAINS",
        "MAISON", "MAITRE", "MAITRESSE", "MAL", "MALADROIT", "MANCHE", "MANQUER", "MANTEAU", "MARCHE",
        "MARIONNETTE", "MARTEAU", "MATELAS", "MATERNELLE", "MELANGER", "MEME", "MENSONGE", "MESURER", "METAL",
        "METRE", "METTRE", "MEUBLE", "MICRO", "MIEUX", "MILIEU", "MINE", "MODELE", "MOINS", "MONTAGNE",
        "MONTER", "MONTRER", "MORCEAU", "MOT", "MOTEUR", "MOTO", "MOUCHOIR", "MOUFLE", "MOUILLE", "MOUILLER",
        "MOULIN", "MOUSSE", "MOYEN", "MUET", "MULTICOLORE", "MUR", "MUSCLE", "MUSIQUE", "NAGER", "NENUPHAR",
        "NEUF", "NŒUD", "NOIR", "NOM", "NOMBRE", "NOUVEAU", "NU", "NUMERO", "OBEIR", "OBJET", "OBLIGER",
        "ONGLE", "ORCHESTRE", "ORDINATEUR", "ORDRE", "OURS", "OUTIL", "OUVRIR", "PAGE", "PAIRE", "PANNE",
        "PANTALON", "PAPIER", "PARACHUTE", "PARCOURS", "PAREIL", "PARKING", "PARLER", "PARTAGER", "PARTIR", "PAS",
        "PASSERELLE", "PATAUGER", "PEDALO", "PEINDRE", "PEINTURE", "PELUCHE", "PENTE", "PERCER", "PERDRE",
        "PERLE", "PERSONNE", "PETIT", "PEU", "PEUR", "PHOTO", "PIED", "PIEDS", "PILOTE", "PINCEAU",
        "PION", "PLACARD", "PLAFOND", "PLAGE", "PLANCHE", "PLÂTRE", "PLEUVOIR", "PLI", "PLIAGE", "PLIER",
        "PLONGEOIR", "PLONGER", "PLUIE", "PLUS", "PNEU", "POCHE", "POIGNET", "POING", "POINT", "POINTE",
        "POINTU", "POISSON", "POLI", "POMPIERS", "PONT", "PORTE", "PORTEMANTEAU", "PORTER", "POSER", "POSTER",
        "POT", "POUBELLE", "POUCE", "POUSSER", "POUVOIR", "PREMIER", "PRENDRE", "PRENOM", "PREPARER", "PRES",
        "PRESENT", "PRESQUE", "PRESSER", "PRETER", "PRINCE", "PRISES", "PRIVER", "PROMETTRE", "PROPRE", "PUNAISE",
        "PUNIR", "PUZZLE", "PYJAMA", "PYRAMIDE", "QUAI", "QUATRE", "QUESTION", "RACONTER", "RADIATEUR", "RADIO",
        "RAME", "RAMPE", "RAMPER", "RANGER", "RATER", "RAYURE", "RECEVOIR", "RECITER", "RECOMMENCER", "RECREATION",
        "RECULER", "REFUSER", "REGARDER", "REINE", "REMETTRE", "REMPLACER", "REMPLIR", "RENTREE", "RENTRER",
        "RENVERSER", "REPARER", "REPETER", "REPONDRE", "RESPIRER", "RESSEMBLER", "RESTER", "RETARD", "REUSSIR",
        "REVENIR", "RIDEAU", "ROBE", "ROBINET", "ROI", "ROND", "ROUE", "ROUGE", "ROULADE", "ROULER",
        "ROUX", "RUBAN", "RUGUEUX", "SAGE", "SALADIER", "SALE", "SALLE", "SAUT", "SAUTER", "SAVON",
        "SCIE", "SEAU", "SEC", "SECHER", "SEMELLE", "SENS", "SENTIR", "SEPARER", "SEPT", "SERIEUX",
        "SERPENT", "SERRE", "SERRER", "SERRURE", "SERVIETTE", "SERVIR", "SEUL", "SIEGE", "SIESTE", "SILENCE",
        "SIX", "SOL", "SOLDAT", "SOLIDE", "SOMMEIL", "SONNER", "SONNETTE", "SORCIERE", "SORTIE", "SORTIR",
        "SOUFFLER", "SOULEVER", "SOULIGNER", "SOUPLE", "SOURD", "SOURIRE", "SOUS", "SPAGHETTI", "SPORT", "STYLO",
        "SUIVANT", "SUIVRE", "SUR", "SURFEUR", "TABLE", "TABLEAU", "TABLIER", "TABOURET", "TACHE", "TAILLE",
        "TAILLER", "TALON", "TAMBOUR", "TAMPON", "TAPER", "TAPIS", "TARD", "TASSE", "TELECOMMANDE", "TELEPHONE",
        "TELEVISION", "TENDRE", "TENIR", "TENNIS", "TERMINER", "TETE", "TIRER", "TIROIR", "TISSU", "TITRE",
        "TOBOGGAN", "TOILETTE", "TOMBER", "TORDU", "TOT", "TOUCHER", "TOUR", "TOURNER", "TOURNEVIS", "TRAIN",
        "TRAIT", "TRAMPOLINE", "TRANQUILLE", "TRANSPARENT", "TRANSPIRER", "TRANSPORTER", "TRAVAIL", "TRAVAILLER",
        "TRAVERSER", "TREMPER", "TRICHER", "TRICOT", "TRIER", "TROIS", "TROISIEME", "TROMPETTE", "TROP", "TROUER",
        "TROUS", "TROUSSE", "TUNNEL", "UN", "UNIFORME", "USE", "VACHE", "VALISE", "VASE", "VEHICULE",
        "VENIR", "VENTRE", "VERRE", "VERS", "VERSER", "VERT", "VESTE", "VETEMENT", "VIDER", "VIRAGE",
        "VIS", "VITE", "VITESSE", "VITRE", "VOITURE", "VOIX", "VOLER", "VOULOIR", "VOYAGE", "WAGON",
        "XYLOPHONE", "ZERO", "ZIGZAG"
    ];

    return words;
}

// =================================================
// =================================================
// ============ GENERIC

// ===> Easy selector
function get(n) {
    if (n.search("#") == 0 && n.split("#")[1] != null && document.querySelector(n) != null) return document.querySelector(n);
    if (n.search(".") == 0 && n.split(".")[1] != null && document.querySelectorAll(n) != null) return document.querySelectorAll(n);
    if (n.search("~") == 0 && n.split("~")[1] != null && document.querySelectorAll(n.split("~")[1]) != null) return document.querySelectorAll(n.split("~")[1])[0];
}
