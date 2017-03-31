// create an array of 6 letter words
// these will be used as the words
// to guess in the game
  var possibleWords = ["hacker","jazzed","pizzas","pajama","jicama","sphynx","jigsaw"];
  var lettersUsed = [];
// User starts with 6 chances to guess a 6 letter word
  var numberOfGuesses = 6;
  document.getElementById('triesLeft').innerHTML = numberOfGuesses;
// add click event listener to resetButton
  var resetButton = document.getElementById('reset');

// pick random word to guess
  var wordToGuess;
  pickWord();
  console.log(wordToGuess);
// display to game board
  displayToGameBoard(wordToGuess);
//create a gameBoard object
var gameBoard = {
  letters:{
    letterOne:document.getElementById('letterOne'),
    letterTwo:document.getElementById('letterTwo'),
    letterThree:document.getElementById('letterThree'),
    letterFour:document.getElementById('letterFour'),
    letterFive:document.getElementById('letterFive'),
    letterSix:document.getElementById('letterSix')
  }
};
var lettersToGuessArray = [gameBoard["letters"]["letterOne"].innerHTML,gameBoard["letters"]["letterTwo"].innerHTML,
                          gameBoard["letters"]["letterThree"].innerHTML,gameBoard["letters"]["letterFour"].innerHTML,
                          gameBoard["letters"]["letterFive"].innerHTML,gameBoard["letters"]["letterSix"].innerHTML,];
console.log(lettersToGuessArray);
// if numberOfGuesses is not 0
// allow the user to play the round
if(numberOfGuesses !== 0){
    // userEntry is used to store the
    // value entered by the user
    document.onkeyup = function(event){
      var userEntry = event.key;
      if(userEntry!=="Meta"){
        lettersUsed.push(userEntry);
      }
      console.log(lettersUsed);
      document.getElementById('lettersUsedParagraph').innerHTML = lettersUsed;
      console.log(userEntry);
      // for every letter on the game board letters object
      // if the userEntry is == to the letter
      // on the gameBoard remove the hide class
      // from the piece on the gameBoard also
      // remove that letter from lettersToGuessArray
      var x;
      for (x in gameBoard.letters ){
        // if the userEntry exits in the gameBoard
        if(gameBoard.letters[x].innerHTML == userEntry){
          // remove the hide class on gameBoardLetter
          gameBoard.letters[x].classList.remove('hide');
          // get indexToDelete and delete letter from lettersToGuessArray
          var indexToDelete = lettersToGuessArray.indexOf(userEntry);
          lettersToGuessArray.splice(indexToDelete,1);
          // once deleted if lettersToGuessArray is empty
          // run the win function
          if(lettersToGuessArray.length == 0){
            win();
          }
        }
      }
      console.log(lettersToGuessArray);
      if(userEntry in gameBoard == false && userEntry!=="Meta"){
        numberOfGuesses--;
        updateNumberOfGuesses();
        // if number of Guesses = 0
        // run the lose function
        if (numberOfGuesses==0){
          lose();
        }
      }
  };
}

function pickWord(){
  var arrayIndex = Math.floor(Math.random()*7);
  // console.log(arrayIndex);
  wordToGuess = possibleWords[arrayIndex];
}
function displayToGameBoard(wordToGuess){
  // split the word into an array
  // and display on screen
  // and then add hide class
  wordToGuess = wordToGuess.split("");
  document.getElementById('letterOne').innerHTML = wordToGuess[0];
  document.getElementById('letterTwo').innerHTML = wordToGuess[1];
  document.getElementById('letterThree').innerHTML = wordToGuess[2];
  document.getElementById('letterFour').innerHTML = wordToGuess[3];
  document.getElementById('letterFive').innerHTML = wordToGuess[4];
  document.getElementById('letterSix').innerHTML = wordToGuess[5];

  document.getElementById('letterOne').className+=" hide";
  document.getElementById('letterTwo').className+=" hide";
  document.getElementById('letterThree').className+=" hide";
  document.getElementById('letterFour').className+=" hide";
  document.getElementById('letterFive').className+=" hide";
  document.getElementById('letterSix').className+=" hide";
}
function updateNumberOfGuesses(){
  document.getElementById('triesLeft').innerHTML = numberOfGuesses;
}

function win(){
  console.log('you win!');
}
function lose(){
  console.log('you lose!');
}
