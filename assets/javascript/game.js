// create an array of 6 letter words
// these will be used as the words
// to guess in the game
  var possibleWords = ["hacker","jazzed","pizzas","pajama","jicama","sphynx","jigsaw"];
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
//create a game object
var game = {
  letterOne:document.getElementById('letterOne'),
  letterTwo:document.getElementById('letterTwo'),
  letterThree:document.getElementById('letterThree'),
  letterFour:document.getElementById('letterFour'),
  letterFive:document.getElementById('letterFive'),
  letterSix:document.getElementById('letterSix'),
};

// run the game numberOfGuesses times
if(numberOfGuesses !== 0){
  // this is what happens when
  // the user keys something
    document.onkeyup = function(event){
      var userEntry = event.key;
      var x;
      for (x in game ){
        if(game[x].innerHTML == userEntry){
          game[x].classList.remove('hide');
          delete game[x];
        }else{
          numberOfGuesses--;
          updateNumberOfGuesses();
          console.log(x);
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
