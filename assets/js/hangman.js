// =================================================
// =================================================
// ============ SETTINGS 

let ERROR = 0;  let MAX_ERROR = 9; let WORD_DATA; let WORD_STRING; let WORD_ARRAY;
const _LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const _WORDS = [
    "AEROPORT", "AFFAIRE", "ALBUM", "ALPHABET", "AMENER", "AMPOULE", "ANCIEN", "ANORAK", "ANTENNE", "APPAREIL", "APPORTER", "APPUYER", "APRES", "ARC", "ARMOIRE", "ARRET", "ARRIERE", "ARRIVER", "ARROSER", "ASSIETTE", "ASSIS", "ATTACHER", "ATTENDRE", "ATTENTION", "ATTERRIR", "ATTRAPER", "AU", "AUTANT", "AUTO", "AUTOMOBILISTE", "AUTORADIO", "AUTOUR", "AVANCER", "AVANT", "AVEC", "AVION", 
    "BAGAGE", "BAGUETTE", "BAIGNER", "BÂILLER", "BALLE", "BANC", "BARBE", "BARBOTER", "BARQUE", "BARRE", "BARREAU", "BAS", "BATEAU", "BEAUCOUP", "BIBLIOTHEQUE", "BLANC", "BLEU", "BOIS", "BOITE", "BONDIR", "BONNET", "BORD", "BOSSER", "BOTTE", "BOUCHER", "BOUCHON", "BOUDER", "BOUGER", "BOUSCULER", "BOUT", "BOUTEILLE", "BOUTON", "BRAS", "BRETELLE", "BRICOLAGE", "BRUIT", "BRUN", "BULLES", "BUREAU", 
    "CABANE", "CABINET", "CAGOULE", "CAHIER", "CAISSE", "CALME", "CAMARADE", "CAMESCOPE", "CAMION", "CANARD", "CARNET", "CARREAU", "CARTABLE", "CARTON", "CASIER", "CASQUE", "CASQUETTE", "CASSE", "CASSER", "CASSEROLE", "CASSETTE", "CATALOGUE", "CEDE", "CEDEROM", "CEINTURE", "CERCEAU", "CHAINE", "CHAISE", "CHAISES", "CHANSON", "CHAPEAU", "CHARGER", "CHAT", "CHAUD", "CHAUSSETTE", "CHAUSSON", "CHAUSSURE", "CHEMISE", "CHERCHER", "CHEVILLE", "CHIFFRE", "CHOISIR", "CHOSE", "CHUCHOTER", "CHUTE", "CIGARETTE", "CINQ", "CISEAUX", "CLASSE", "CLAVIER", "CLE", "CLOU", "COIN", "COL", "COLERE", "COLLANT", "COLLE", "COLLER", "COLORIAGE", "COLORIER", "COMMENCER", "COMPARER", "COMPTER", "CONDUIRE", "CONSTRUIRE", "CONTE", "CONTINUER", "CONTRAIRE", "CONTRE", "COPAIN", "COPIER", "COQUILLAGE", "COQUILLETTE", "COQUIN", "CORDE", "CORPS", "COTE", "COU", "COUCHE", "COUDE", "COUDRE", "COULEUR", "COULOIR", "COUPER", "COURIR", "COURONNE", "COURT", "CRAIE", "CRAVATE", "CROCHET", "CUBE", "CUILLERE", "CUISSE", "CULOTTE", "CURIEUX", "CUVETTE", 
    "DAME", "DANGER", "DANS", "DANSER", "DE", "DEBORDER", "DEBOUT", "DECHIRER", "DECOLLER", "DECORER", "DECOUPAGE", "DECOUPER", "DEDANS", "DEFENDRE", "DEHORS", "DELTAPLANE", "DEMANDER", "DEMARRER", "DEMOLIR", "DEPASSER", "DERNIER", "DERRIERE", "DESCENDRE", "DESOBEIR", "DESSIN", "DESSINER", "DETRUIRE", "DEUX", "DEUXIEME", "DEVANT", "DICTIONNAIRE", "DIFFERENCE", "DIFFERENT", "DIFFICILE", "DIRE", "DIRECTEUR", "DIRECTRICE", "DISCUTER", "DISPARAITRE", "DISTRIBUER", "DIX", "DOIGT", "DOIGTS", "DOMINO", "DONNER", "DORMIR", "DOS", "DOSSIER", "DOUCHE", "DOUCHER", "DOUX", "DROIT", "DU", "DUR", 
    "EAU", "ECARTER", "ECHANGER", "ECHARPE", "ECHASSES", "ECHELLE", "ECLABOUSSER", "ECLAIRER", "ECOLE", "ECOUTER", "ECRAN", "ECRASER", "ECRIRE", "ECRITURE", "EFFACER", "EFFORT", "ELASTIQUE", "ELECTRICITE", "ELEVE", "EMMENER", "EMPORTER", "ENCORE", "ENERVE", "ENFANT", "ENFILER", "ENFONCER", "ENGIN", "ENLEVER", "ENTENDRE", "ENTONNOIR", "ENTOURER", "ENTREE", "ENTRER", "ENVELOPPE", "ENVOYER", "EPAIS", "EPAULE", "EPEE", "EQUIPE", "ESCABEAU", "ESCALADER", "ESCALIER", "ESCARGOT", "ESCARPIN", "ESSUYER", "ETAGERE", "ETANG", "ETIQUETTE", "ETROIT", "ETUDE", "ETUDIER", "EXPLIQUER", "EXTERIEUR", 
    "FABRIQUER", "FACILE", "FAIRE", "FATIGUE", "FAUTE", "FAUTEUIL", "FEE", "FENETRE", "FERMER", "FESSE", "FEU", "FEUILLE", "FEUTRE", "FICELLE", "FIL", "FILET", "FILLE", "FILM", "FINIR", "FLECHE", "FLEUR", "FLOTTER", "FOIS", "FONCE", "FOND", "FOOTBALL", "FORT", "FOUILLER", "FRAPPER", "FREIN", "FROID", "FUSEE", "FUSIL", 
    "GAGNER", "GANT", "GARAGE", "GARÇON", "GARDER", "GARDIEN", "GARE", "GAUCHE", "GENER", "GENOU", "GENTIL", "GLISSER", "GOLF", "GOMME", "GONFLER", "GOUTER", "GOUTTES", "GRAND", "GRIMPER", "GRIS", "GRONDER", "GROS", "GROUPE", "GRUE", "GYMNASTIQUE", 
    "HABIT", "HANCHE", "HANDICAPE", "HAUT", "HELICOPTERE", "HEXAGONE", "HISTOIRE", "HORLOGE", "HUIT", "HUMIDE", 
    "IDEE", "ILE", "IMAGE", "IMITER", "IMMEUBLE", "IMMOBILE", "INONDER", "INSEPARABLE", "INSTRUMENT", "INTERESSANT", "INTERIEUR", "INTRUS", 
    "JALOUX", "JAMBES", "JAUNE", "JEAN", "JEU", "JOLI", "JOUER", "JOUET", "JUPE", 
    "LAC", "LACER", "LACET", "LAINE", "LAISSER", "LARGE", "LAVABO", "LAVER", "LECTURE", "LETTRE", "LIERRE", "LIGNE", "LINGE", "LIRE", "LISSE", "LISTE", "LIT", "LITRE", "LIVRE", "LOIN", "LONG", "LUMIERE", "LUNETTES",
    "MADAME", "MAGAZINE", "MAGICIEN", "MAGIE", "MAGNETOSCOPE", "MAILLOT", "MAIN", "MAINS", "MAISON", "MAITRE", "MAITRESSE", "MAL", "MALADROIT", "MANCHE", "MANQUER", "MANTEAU", "MARCHE", "MARIONNETTE", "MARTEAU", "MATELAS", "MATERNELLE", "MELANGER", "MEME", "MENSONGE", "MESURER", "METAL", "METRE", "METTRE", "MEUBLE", "MICRO", "MIEUX", "MILIEU", "MINE", "MODELE", "MOINS", "MONTAGNE", "MONTER", "MONTRER", "MORCEAU", "MOT", "MOTEUR", "MOTO", "MOUCHOIR", "MOUFLE", "MOUILLE", "MOUILLER", "MOULIN", "MOUSSE", "MOYEN", "MUET", "MULTICOLORE", "MUR", "MUSCLE", "MUSIQUE", 
    "NAGER", "NENUPHAR", "NEUF", "NŒUD", "NOIR", "NOM", "NOMBRE", "NOUVEAU", "NU", "NUMERO", 
    "OBEIR", "OBJET", "OBLIGER", "ONGLE", "ORCHESTRE", "ORDINATEUR", "ORDRE", "OURS", "OUTIL", "OUVRIR", 
    "PAGE", "PAIRE", "PANNE", "PANTALON", "PAPIER", "PARACHUTE", "PARCOURS", "PAREIL", "PARKING", "PARLER", "PARTAGER", "PARTIR", "PAS", "PASSERELLE", "PATAUGER", "PEDALO", "PEINDRE", "PEINTURE", "PELUCHE", "PENTE", "PERCER", "PERDRE", "PERLE", "PERSONNE", "PETIT", "PEU", "PEUR", "PHOTO", "PIED", "PIEDS", "PILOTE", "PINCEAU", "PION", "PLACARD", "PLAFOND", "PLAGE", "PLANCHE", "PLÂTRE", "PLEUVOIR", "PLI", "PLIAGE", "PLIER", "PLONGEOIR", "PLONGER", "PLUIE", "PLUS", "PNEU", "POCHE", "POIGNET", "POING", "POINT", "POINTE", "POINTU", "POISSON", "POLI", "POMPIERS", "PONT", "PORTE", "PORTEMANTEAU", "PORTER", "POSER", "POSTER", "POT", "POUBELLE", "POUCE", "POUSSER", "POUVOIR", "PREMIER", "PRENDRE", "PRENOM", "PREPARER", "PRES", "PRESENT", "PRESQUE", "PRESSER", "PRETER", "PRINCE", "PRISES", "PRIVER", "PROMETTRE", "PROPRE", "PUNAISE", "PUNIR", "PUZZLE", "PYJAMA", "PYRAMIDE", 
    "QUAI", "QUATRE", "QUESTION", 
    "RACONTER", "RADIATEUR", "RADIO", "RAME", "RAMPE", "RAMPER", "RANGER", "RATER", "RAYURE", "RECEVOIR", "RECITER", "RECOMMENCER", "RECREATION", "RECULER", "REFUSER", "REGARDER", "REINE", "REMETTRE", "REMPLACER", "REMPLIR", "RENTREE", "RENTRER", "RENVERSER", "REPARER", "REPETER", "REPONDRE", "RESPIRER", "RESSEMBLER", "RESTER", "RETARD", "REUSSIR", "REVENIR", "RIDEAU", "ROBE", "ROBINET", "ROI", "ROND", "ROUE", "ROUGE", "ROULADE", "ROULER", "ROUX", "RUBAN", "RUGUEUX", 
    "SAGE", "SALADIER", "SALE", "SALLE", "SAUT", "SAUTER", "SAVON", "SCIE", "SEAU", "SEC", "SECHER", "SEMELLE", "SENS", "SENTIR", "SEPARER", "SEPT", "SERIEUX", "SERPENT", "SERRE", "SERRER", "SERRURE", "SERVIETTE", "SERVIR", "SEUL", "SIEGE", "SIESTE", "SILENCE", "SIX", "SOL", "SOLDAT", "SOLIDE", "SOMMEIL", "SONNER", "SONNETTE", "SORCIERE", "SORTIE", "SORTIR", "SOUFFLER", "SOULEVER", "SOULIGNER", "SOUPLE", "SOURD", "SOURIRE", "SOUS", "SPAGHETTI", "SPORT", "STYLO", "SUIVANT", "SUIVRE", "SUR", "SURFEUR", 
    "TABLE", "TABLEAU", "TABLIER", "TABOURET", "TACHE", "TAILLE", "TAILLER", "TALON", "TAMBOUR", "TAMPON", "TAPER", "TAPIS", "TARD", "TASSE", "TELECOMMANDE", "TELEPHONE", "TELEVISION", "TENDRE", "TENIR", "TENNIS", "TERMINER", "TETE", "TIRER", "TIROIR", "TISSU", "TITRE", "TOBOGGAN", "TOILETTE", "TOMBER", "TORDU", "TOT", "TOUCHER", "TOUR", "TOURNER", "TOURNEVIS", "TRAIN", "TRAIT", "TRAMPOLINE", "TRANQUILLE", "TRANSPARENT", "TRANSPIRER", "TRANSPORTER", "TRAVAIL", "TRAVAILLER", "TRAVERSER", "TREMPER", "TRICHER", "TRICOT", "TRIER", "TROIS", "TROISIEME", "TROMPETTE", "TROP", "TROUER", "TROUS", "TROUSSE", "TUNNEL", 
    "UN", "UNIFORME", "USE", 
    "VACHE", "VALISE", "VASE", "VEHICULE", "VENIR", "VENTRE", "VERRE", "VERS", "VERSER", "VERT", "VESTE", "VETEMENT", "VIDER", "VIRAGE", "VIS", "VITE", "VITESSE", "VITRE", "VOITURE", "VOIX", "VOLER", "VOULOIR", "VOYAGE", 
    "WAGON",
    "XYLOPHONE", 
    "ZERO", "ZIGZAG"
];

// =================================================
// =================================================
// ============ MAIN 

// ===> Zvents on the buttons
get("#reload").addEventListener("click", () => { location.reload(); });
get("#quit").addEventListener("click", () => { document.location.href = _BACK_LINK; });
get("#play").addEventListener("click", function() { 
    WORD_DATA = chooseWord(); 
    WORD_STRING = WORD_DATA[0];
    WORD_ARRAY= WORD_DATA[1];

    generateKeyboard();
    updateGame();
    get("#header").style.display = "none";
    get("#play").style.display = "none";
    get("#quit").style.display = "none";
    get("#gameScreen").style.display = "flex";
});

// ===> The main game function
function play(letterChoosen) {
    // Check if it's a correct letter
    let positions = [];
    for (i = 0; i < WORD_STRING.length; i++) {
        if (WORD_STRING[i] == letterChoosen) positions.push(i);
    }

    // Then, if the letter is correct
    if (positions.length != 0) {
        for (i = 0; i < positions.length; i++) {
            WORD_ARRAY[positions[i]] = letterChoosen;
        }
        get("#" + letterChoosen).style.background = getVariableCSS("--correctLetter");
    }
    
    //Or, if the letter is incorrect
    else {
        ERROR++;
        navigator.vibrate('300');
        get("#" + letterChoosen).style.background = getVariableCSS("--incorrectLetter");
    }

    // In any cases, disable the letter
    get("#" + letterChoosen).disabled = true;
    updateGame();
}

// =================================================
// =================================================
// ============ GAME ASIDE

//  ===> Update the display, check errors and victory
function updateGame() {
    // Transform the word into underscore
    let wordAsUnderscore = "";
    for (i = 0; i < WORD_ARRAY.length; i++) {
        wordAsUnderscore += WORD_ARRAY[i] + " ";
    }
    get('#guess').innerHTML = wordAsUnderscore.trim();

    // Error count
    if (MAX_ERROR == ERROR + 1) {
        get('#hangman').style.color = "red";
        get('#hangman').innerHTML = _CONTENT.lastTry;
    }
    else get('#hangman').innerHTML = (MAX_ERROR - ERROR) + _CONTENT.try;

    // Defeat
    if (ERROR == MAX_ERROR) {
        get('#hangman').innerHTML = _CONTENT.lost + WORD_STRING;
        get('#keyboard').style.display = "none";
        get('#reload').style.display = "block";
    }

    // Victory
    else if (WORD_ARRAY.indexOf("_") == -1) {
        get('#hangman').style.color = "green";
        get('#hangman').innerHTML = _CONTENT.win_part1 + ERROR + _CONTENT.win_part2;
        get('#keyboard').style.display = "none";
        get('#reload').style.display = "block";
    }
}

// ===> Choose randomly a word in an array
function chooseWord() {
    // Word as a string
    let nb = rand(0, _WORDS.length);
    let wordString = _WORDS[nb];

    // Word as an array
    let wordArray = [];
    for (i = 0; i < wordString.length; i++) wordArray[i] = "_";
    
    return [wordString, wordArray];
}

// ===> Generate a keyboard
function generateKeyboard() {
    for (let i = 0; i < _LETTERS.length; i ++) {
        let elem = document.createElement("button");
        elem.innerHTML = _LETTERS[i];
        elem.id = _LETTERS[i];
        elem.classList.add("keyboardButton");
        elem.addEventListener("click", function() { play(_LETTERS[i]) });
        get("#keyboard").appendChild(elem);
    }
}