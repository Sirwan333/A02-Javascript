
const wordarray = ["apple", "gun", "top", "shiver", "face", "pet", "measure", "efficient", "labored", "habitual", "homely", "therapeutic", 
"carriage", "obsequious", "pets", "slope", "copy", "drab", "tender", "ray", "conspire"]

let number = Math.round(Math.random() * 20);
let randomWord = wordarray[number];
console.log(randomWord)
let userLetterArray = []
let wrongLetterArray = []
let rightLetterArray = []

hang_hill.style.display = 'none';
hang_construction.style.display = 'none';
hang_body.style.display = 'none';
hang_rightarm.style.display = 'none';
hang_leftarm.style.display = 'none';
hang_rightleg.style.display = 'none';
hang_leftleg.style.display = 'none';
hang_rope.style.display = 'none';
hang_head.style.display = 'none';
lostNotification.style.display = "none";
wonNotification.style.display = "none";

function myfunction(){
    notification.style.display = 'none';
    let userLetter = document.getElementById("userInput").value;
    if(!userLetterArray.includes(userLetter)){
        userLetterArray.push(userLetter); 
        checkLetter();
        if(!randomWord.includes(userLetter)){
            wrongLetterArray.push(userLetter); 
            window.Hangman.show(window.Hangman.validParts[wrongLetterArray.indexOf(userLetter)])
            updatWrongLetter()
            checkResult();

        }  
    }else{
        window.alert("You Already enterd this letter")
    }
    
    
     
}
function checkResult(){
    if(wrongLetterArray.length == Hangman.validParts.length){
        lostNotification.style.display = 'block';
    } 
}

function playAgain(){
    window.location.reload();
}


function checkLetter(){
    
    document.getElementById("userInterface").innerHTML = `
    ${randomWord.split("").map(
				value => `
          <span>
            ${userLetterArray.includes(value) ? value : '_'}
          </span>
        `
            ).join("")}`;     
    let usertext = document.getElementById("userInterface").innerText.replace(/[ \n]/g, '');; 
    if(usertext===randomWord){
        wonNotification.style.display = "block";
    }
}

function updatWrongLetter(){
    document.getElementById("wrongLetters").innerHTML = `
    ${wrongLetterArray.map(
				value => `
          <span>
            ${value}
          </span>
        `
            )}`;        
}

checkLetter();


/**
 * Showing off how to display/hide parts of a SVG-image.
 */
window.Hangman = (function () {
    "use strict";



    var hangman = {

        // Get all elements as their id
        "partAsElement": {
            "hill": document.getElementById('hang_hill'),
            "gallow": document.getElementById('hang_construction'),
            "body": document.getElementById('hang_body'),
            "rightarm": document.getElementById('hang_rightarm'),
            "leftarm": document.getElementById('hang_leftarm'),
            "rightleg": document.getElementById('hang_rightleg'),
            "leftleg": document.getElementById('hang_leftleg'),
            "rope": document.getElementById('hang_rope'),
            "head": document.getElementById('hang_head')
        },

        // Create an array with all valid parts
        "validParts": [
            "hill",
            "gallow",
            "body",
            "rightarm",
            "leftarm",
            "rightleg",
            "leftleg",
            "rope",
            "head"
        ],


        /**
         * Check if part a valid part, writes error message to console if the part is invalid.
         *
         * @param string part Name of the part to check.
         *
         * @returns boolean true if valid part, else false.
         */
        "isValid": function (part) {
            if (this.validParts.indexOf(part) === -1) {
                window.console.log("The part is not valid: " + part);
                return false;
            }
            window.console.log("The part is valid: " + part);
            return true;
        },


        /**
         * Hide a part.
         *
         * @param string part Name of the part to hide.
         *
         * @returns void.
         */
        "hide": function (part) {
            if (this.isValid(part)) {
                window.console.log("Hiding part: " + part);
                this.partAsElement[part].style.display = "none";
            }
        },


        /**
         * Show a part.
         *
         * @param string part Name of the part to show.
         *
         * @returns void.
         */
        "show": function (part) {
            if (this.isValid(part)) {
                window.console.log("Showing part: " + part);
                this.partAsElement[part].style.display = "inline";
            }
        }
    };

    window.console.log("You can now use the hangman object as a part of the window-object." +
    "Try\n\nwindow.Hangman.hide('gallow')\nwindow.Hangman.show('gallow')" +
    "\n\nHere are all the parts you can work on.");
    window.console.log(hangman.validParts);

    // Return the object to make it visible.
    return hangman;
})();

