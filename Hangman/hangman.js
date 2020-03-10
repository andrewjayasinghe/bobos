let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", 
"k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
let word_bank = ["electricity", "committee", "popcorn", "technology", "elephant", "moose", "tattoo", "pepper", "amir", "supercalifragilisticexpialidocious"];
let lives = 7;
let random_word = Math.round(Math.random() * (word_bank.length - 1));
let score = 0;
let word_done = "";

function createLetters() {
    // creates the letters that are used to guess
    for(let i=0; i<alphabet.length; i++) {
        let letter = document.createElement("button");
        document.getElementById("letters").appendChild(letter);
        letter.innerHTML = alphabet[i];
        letter.setAttribute("id", "alph" + i)
        letter.onclick = function() {
            if (lives > 0) {
                if (word_bank[random_word].includes(alphabet[i])) {
                    //if letter is in the word
                    let letter_clicked = alphabet[i];
                    let ind = word_bank[random_word].indexOf(letter_clicked);
                    letter.style.backgroundColor = "green";
                    letter.disabled = true;

                    while (ind != -1) {
                        //checks for multiple letters
                        document.getElementById(letter_clicked + ind).innerHTML = letter_clicked;
                        let j = ind + 1
                        ind = word_bank[random_word].indexOf(letter_clicked, j)
                        score += 2
                        word_done += letter_clicked;
                        document.getElementById("score").innerHTML = "Score: " + score;
                    }
                    if (word_done.length == word_bank[random_word].length) {
                        //if the word is guessed, reset the word and alphabet
                        setTimeout(function() {
                            for (let i=0; i<alphabet.length; i++) {
                                document.getElementById("alph" + i).style.display = "none";
                                document.getElementById("alph" + i).removeAttribute("id", "alph" + i);
                            }
                            for (let i=0; i<word_bank[random_word].length; i++) {
                                document.getElementById(word_bank[random_word][i] + i).style.display = "none";
                                document.getElementById(word_bank[random_word][i] + i).removeAttribute("id", word_bank[random_word][i] + i);
                            }
                            random_word = Math.round(Math.random() * (word_bank.length - 1));
                            createLetters();
                            guessing_word();
                            document.getElementById("hint").innerHTML = "";
                            word_done = "";
                        }, 1000)
                    }

                } else {
                    //if letter is not in the word
                    letter.style.backgroundColor = "red";
                    letter.disabled = true;
                    if (lives <= 4) {
                        give_hint();
                    }
                    if (lives > 0) {
                        lives -= 1;
                        score -= 1
                        document.getElementById("score").innerHTML = "Score: " + score;
                    } 
                    if (lives <= 0) {
                        setTimeout(game_end, 1000);
                    }
                    document.getElementById("lives").innerHTML = "Guesses Remaining: " + lives;
                }
            }
        };
    }
}


function guessing_word(){
    // creates the unknown letters as "_"
    for(let i=0; i<word_bank[random_word].length; i++){
        let unknown = document.createElement("span");
        document.getElementById("unknown").appendChild(unknown);
        unknown.setAttribute("id", word_bank[random_word][i] + i);
        unknown.setAttribute("class", "unknowns")
        unknown.innerHTML = "_";
        unknown.style.marginRight = "20px";
    }
}

function give_hint() {
    // gives a hint for each word
    if (random_word == 0) {
    document.getElementById("hint").innerHTML = "HINT: is the set of physical phenomena associated with the presence and motion of electric charge";
    }
    if (random_word == 1) {
    document.getElementById("hint").innerHTML = "HINT: a group of people appointed for a specific function";
    }
    if (random_word == 2) {
    document.getElementById("hint").innerHTML = "HINT: favorite snack to enjoy while watching movies";
    }
    if (random_word == 3) {
    document.getElementById("hint").innerHTML = "HINT: the industry we are workin hard to get into";
    }
    if (random_word == 4) {
    document.getElementById("hint").innerHTML = "HINT: The biggest land mammal mainly found in asia & africa";
    }
    if (random_word == 5) {
    document.getElementById("hint").innerHTML = "HINT: The most candian animal with long antlers. ";
    }
    if (random_word == 6) {
    document.getElementById("hint").innerHTML = "HINT: a form of body modification where a design is made by inserting ink";
    }
    if (random_word == 7) {
    document.getElementById("hint").innerHTML = "HINT: a spice that makes you sneeze";
    }
    if (random_word == 8) {
    document.getElementById("hint").innerHTML = "HINT: What is the name of your favourite web dev instructor?";
    }
    if (random_word == 9) {
    document.getElementById("hint").innerHTML = "HINT: the longest word in the english language";
    }

}

function game_start_screen() {
    // home screen display
    document.getElementById("letters").style.display = "none";
    document.getElementById("unknown").style.display = "none";
    document.getElementById("lives").style.display = "none";
    document.getElementById("refresh").style.display = "none";
    document.getElementById("score").style.display = "none";
    document.getElementById("desc").style.display = "none";
    document.getElementById("name").style.display = "none";
    document.getElementById("go").style.display = "none";
    document.getElementById("entername").style.display = "none";
    document.getElementById("start").onclick = initalize;
    document.getElementById("h2p").onclick = how_to_play;
}


function game_end() {
    // game end screen
    document.getElementById("letters").style.display = "none";
    document.getElementById("unknown").style.display = "none";
    document.getElementById("lives").style.display = "none";
    document.getElementById("refresh").style.display = "none";
    document.getElementById("score").style.display = "none";
    document.getElementById("hint").style.display = "none";
    document.getElementById("entername").style.display = "block";
    document.getElementById("name").style.display = "block";
    document.getElementById("go").style.display = "block";
}

function how_to_play() {
    // how to play page for information
    document.getElementById("h2p").style.display = "none";
    document.getElementById("title").innerHTML = "HOW TO PLAY:";
    document.getElementById("desc").style.display = "block";
}

function show_score(){
    // shows the end score
    document.getElementById("name").style.display = "none";
    document.getElementById("go").style.display = "none";
    let name = document.getElementById("name").value;
    document.getElementById("entername").innerHTML = name + " ➯ Score: " + score;
    document.getElementById("refresh").style.display = "block";
    document.getElementById("refresh").style.marginTop = "150px"
}

function initalize() {
    // initializes the main hangman game
    document.getElementById("letters").style.display = "block";
    document.getElementById("unknown").style.display = "block";
    document.getElementById("lives").style.display = "block";
    document.getElementById("refresh").style.display = "block";
    document.getElementById("score").style.display = "block";
    document.getElementById("lives").innerHTML = "Guesses Remaining: " + lives;
    document.getElementById("score").innerHTML = "Score: " + score;
    document.getElementById("entername").style.display = "none";
    document.getElementById("name").style.display = "none";
    document.getElementById("go").style.display = "none";
    document.getElementById("go").onclick = show_score;
    document.getElementById("h2p").style.display = "none";
    document.getElementById("title").style.display = "none";
    document.getElementById("desc").style.display = "none";
    document.getElementById("start").style.display = "none";
    createLetters();
    guessing_word();
}
