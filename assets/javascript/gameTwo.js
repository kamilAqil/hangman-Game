// Create a game object
var game = {
  // create an object board with board piece
  // these are the actual html elements
  // we will add and remove hide class
  // as the user guesses the words
  "board":{
    "pieceOne":document.getElementById("letterOne"),
    "pieceTwo":document.getElementById("letterTwo"),
    "pieceThree":document.getElementById("letterThree"),
    "pieceFour":document.getElementById("letterFour"),
    "pieceFive":document.getElementById("letterFive"),
    "pieceSix":document.getElementById("letterSix")
  },
  // fill an array with 6 letter words
  //  (test array)
  //"possibleWords":["jazzed"],
  "possibleWords" : ["hacker","jazzed","pizzas","pajama","jicama","sphynx","jigsaw"],
  // create variables for wins losses, triesLeft and lettersToGuess
  // these will be tracked and updated to the screen
  // for the user
  "lettersToGuess" : [],
  "":[],
  "wins" : 0,
  "losses" : 0,
  "triesLeft" : 6,

  // create a variable for pickedRandomWord
  // which is assigned only after pickRandomWord
  // has been run
  "pickedRandomWord" : "",

  // create a function to return a random word from the array
  "pickRandomWord" : function (){
     var numberBetween = this.possibleWords.length;
     var randomNumber = Math.floor((Math.random() * numberBetween));
     var randomWord = this["possibleWords"][randomNumber];
     this.pickedRandomWord = randomWord;
     return randomWord
  },
    // create a function to display word to gameboard
    // this can only run once the pickedRandomWord has
    // been assigned
  "displayRandomWord" : function(){
      // split pickedRandomWord into an array and change
      // the html of the existing game pieces
      var wordArray = this.pickedRandomWord.split("");
      console.log(wordArray);
      // set the innerHTML of the piece elements to
      // the corresponding values of the wordArray
      this.board.pieceOne.innerHTML = wordArray[0];
      this.board.pieceTwo.innerHTML = wordArray[1];
      this.board.pieceThree.innerHTML = wordArray[2];
      this.board.pieceFour.innerHTML = wordArray[3];
      this.board.pieceFive.innerHTML = wordArray[4];
      this.board.pieceSix.innerHTML = wordArray[5];
      // for each element in wordArray
      // push the element to the lettersToGuess array
      wordArray.forEach(function(element){
        game.lettersToGuess.push(element);
      });

      // add the hide class on the pieces of the board
      for(element in game.board){
        // console.log(game.board[element]);
        game.board[element].classList.add("hide");
      }

      document.getElementById("triesLeft").innerHTML = game.triesLeft;
  },
    // create a function for game play
  // in game play create a function to update the user
  // with the letters that have been used
  // update the user how many tries are left
  "gamePlay": function(){
    var lettersUsedArray = [];
    // the user will press a key
    document.onkeyup = function (element){
      var userEntry = element.key;
      // console.log(userEntry);


      // if userEntry !== "Meta"
      // push the letter entered to the
      // letters used array
      if(userEntry !== "Meta"){
        lettersUsedArray.push(userEntry);
        document.getElementById("lettersUsedParagraph").innerHTML = lettersUsedArray;
      }
      // if userEntry is not in lettersToGuess
      // reduce triesLeft by one then
      // update tries left
      if(game.lettersToGuess.indexOf(userEntry)== -1 && userEntry !== "Meta"){
        game.triesLeft --;
        game.updateTriesLeft();
        // if triesLeft = 0 then run lose function
        if (game.triesLeft == 0){
          console.log("you lose!");
          game.lose();
          lettersUsedArray = [];
          // reset tries left
          game.triesLeft = 6;
          game.updateTriesLeft();
        }
      }
      // for each element on the board
      // if the user entry is = to the innerHTML
      // of the gamePiece remove the hide class from
      // game piece.
      for(element in game.board){
        if (userEntry == game.board[element].innerHTML && userEntry !== "Meta"){
          // console.log("same letter");
          game.board[element].classList.remove("hide");
          // if userEntry is in lettersToGuess
          // delete the letter from the Array of
          // lettersToGuess
          if(game.lettersToGuess.indexOf(userEntry)>-1){
            var indexToDeleteFromArray = game.lettersToGuess.indexOf(userEntry);
            game.lettersToGuess.splice(indexToDeleteFromArray,1);
            console.log(game.lettersToGuess);
          }
                // if letterstoGuess == 0 then run win()
                if(game.lettersToGuess.length == 0){
                  game.win();
                  lettersUsedArray = [];
                }

        }
      }

    };  // end of keup function

  },//end of gamePlay function
  "updateTriesLeft": function(){
    document.getElementById("triesLeft").innerHTML = game.triesLeft;
  },
  "lose": function(){
    // clear lettersToGuessArray
      game.lettersToGuess = [];
    // reset game board
    game.displayRandomWord();
    //  reset letters used
    lettersUsedArray = [];
    // update Losses and display to screen
    game.losses += 1;

    document.getElementById("losses").innerHTML = game.losses;
    document.getElementById("lettersUsedParagraph").innerHTML = "";
  },// end of lose function
  "win": function(){
    console.log("you win!");
    game.wins += 1;
    // reset and update tries left
    game.triesLeft = 6;
    game.updateTriesLeft();
    // remove word from possible words
    console.log(game.pickedRandomWord);
    var indexToDelete = game.possibleWords.indexOf(game.pickedRandomWord);
    game.possibleWords.splice(indexToDelete,1);
    console.log(game.possibleWords);

    // clear lettersToGuess
    game.lettersToGuess = [];
    // update the user on wins
    document.getElementById("wins").innerHTML = game.wins;
    // pick and display word
    game.pickRandomWord();
    game.displayRandomWord();
    // which will reset the lettersToGuess array
    document.getElementById("lettersUsedParagraph").innerHTML = "";

  },//end of win function
};// end of game object



// user will press any key to start

//

// if the user clicks the reset button the page will refresh

// this is a section for logs to test



  // Will run game here

  game.pickRandomWord();
  game.displayRandomWord();
  if(game.possibleWords.length > 0){
    game.gamePlay();
  }else{
    console.log("you beat the whole game");
  }
