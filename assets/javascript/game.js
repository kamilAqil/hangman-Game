// create an array of 6 letter words
// these will be used as the words
// to guess in the game
  var possibleWords = ["hacker","jazzed","pizzas","pajama","jicama","sphynx","jigsaw"];
  console.log(possibleWords);
  var lettersUsed = [];
  var wins = 0;
  var losses;
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
    letterOne:document.getElementById('letterOne').innerHTML,
    letterTwo:document.getElementById('letterTwo').innerHTML,
    letterThree:document.getElementById('letterThree').innerHTML,
    letterFour:document.getElementById('letterFour').innerHTML,
    letterFive:document.getElementById('letterFive').innerHTML,
    letterSix:document.getElementById('letterSix').innerHTML
  },
  lettersToAppend:{
    letterOne:document.getElementById('letterOne'),
    letterTwo:document.getElementById('letterTwo'),
    letterThree:document.getElementById('letterThree'),
    letterFour:document.getElementById('letterFour'),
    letterFive:document.getElementById('letterFive'),
    letterSix:document.getElementById('letterSix')
  }
};
var lettersToGuessArray = [gameBoard["lettersToAppend"]["letterOne"].innerHTML,gameBoard["lettersToAppend"]["letterTwo"].innerHTML,
                          gameBoard["lettersToAppend"]["letterThree"].innerHTML,gameBoard["lettersToAppend"]["letterFour"].innerHTML,
                          gameBoard["lettersToAppend"]["letterFive"].innerHTML,gameBoard["lettersToAppend"]["letterSix"].innerHTML,];
// console.log(lettersToGuessArray);
// if numberOfGuesses is not 0
// allow the user to play the round
if(numberOfGuesses !== 0){
    // userEntry is used to store the
    // value entered by the user
    document.onkeyup = function(event){
      var userEntry = event.key;
      console.log('numberOfGuesses:'+ numberOfGuesses);
      console.log('lettersToGuess: '+lettersToGuessArray.length);
      if(userEntry!=="Meta"){
        lettersUsed.push(userEntry);
      }

      // first check if userEntry is in Array
      // if it isnt decrease number of tries by 1
      if(lettersToGuessArray.indexOf(userEntry) == -1 && userEntry !=="Meta"){
        console.log('entry not in puzzle');
        numberOfGuesses -= 1;
        updateNumberOfGuesses();
      }
      // for every letter on the game board letters object
      // if the userEntry is == to the letter
      // on the gameBoard remove the hide class
      // from the piece on the gameBoard also
      // remove that letter from lettersToGuessArray
      var x;
      for (x in gameBoard.letters ){
        // if the userEntry exits in the gameBoard
        if(gameBoard.letters[x] == userEntry){
          // remove the hide class on gameBoardLetter
          gameBoard.lettersToAppend[x].classList.remove('hide');
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
      // if the user runs out of numberOfGuesses then run
      // lose function
      if(numberOfGuesses <= 0){
        lose();
      }
      document.getElementById('lettersUsedParagraph').innerHTML = lettersUsed;
      console.log(lettersToGuessArray);
  }

}

function pickWord(){
  var arrayIndex = Math.floor(Math.random()*7);
  // console.log(arrayIndex);
  wordToGuess = possibleWords[arrayIndex];
}
function displayToGameBoard(){
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
  flashWinMessage();
   updateWins();
   resetTryCounter();
   clearBoard();
   removeWordToGuessFromPossibleWords();
   pickWord();
   console.log(wordToGuess);
   displayToGameBoard();
   var gameBoard = {
     letters:{
       letterOne:document.getElementById('letterOne').innerHTML,
       letterTwo:document.getElementById('letterTwo').innerHTML,
       letterThree:document.getElementById('letterThree').innerHTML,
       letterFour:document.getElementById('letterFour').innerHTML,
       letterFive:document.getElementById('letterFive').innerHTML,
       letterSix:document.getElementById('letterSix').innerHTML
     },
     lettersToAppend:{
       letterOne:document.getElementById('letterOne'),
       letterTwo:document.getElementById('letterTwo'),
       letterThree:document.getElementById('letterThree'),
       letterFour:document.getElementById('letterFour'),
       letterFive:document.getElementById('letterFive'),
       letterSix:document.getElementById('letterSix')
     }
   };
   var lettersToGuessArray = [gameBoard["lettersToAppend"]["letterOne"].innerHTML,gameBoard["lettersToAppend"]["letterTwo"].innerHTML,
                             gameBoard["lettersToAppend"]["letterThree"].innerHTML,gameBoard["lettersToAppend"]["letterFour"].innerHTML,
                             gameBoard["lettersToAppend"]["letterFive"].innerHTML,gameBoard["lettersToAppend"]["letterSix"].innerHTML,];
  console.log(lettersToGuessArray);
}
function lose(){
  console.log('you lose!');
  // flashLoseMessage();
  // setTimout(updateLosses(),3000);
  // resetTryCounter();
  // clearBoard();
  // pickWord();
  // displayWord(wordToGuess);
}

function flashWinMessage(){
  document.getElementById('pressAnyKeyP').innerHTML = "YOU WIN!!!"
}
function updateWins(){
  wins += 1;
  document.getElementById('wins').innerHTML = wins;
}
function resetTryCounter(){
  numberOfGuesses = 6;
  updateNumberOfGuesses();
}
function clearBoard(){
  document.getElementById('letterOne').innerHTML = "";
  document.getElementById('letterTwo').innerHTML = "";
  document.getElementById('letterThree').innerHTML = "";
  document.getElementById('letterFour').innerHTML = "";
  document.getElementById('letterFive').innerHTML = "";
  document.getElementById('letterSix').innerHTML = "";
}
function removeWordToGuessFromPossibleWords(){
  // remove wordToGuess from possibleWords array
  var indexToRemove = possibleWords.indexOf(wordToGuess);
  possibleWords.splice(indexToRemove,1)
  console.log(possibleWords);
}
