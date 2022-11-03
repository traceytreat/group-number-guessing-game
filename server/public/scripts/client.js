$(document).ready(handleReady);

let numToGuess = 0;

let round = 0;

function handleReady() {
  console.log("jquery is loaded!")

  $('#submit-btn').on('click', onSubmit);
  $('#restart-btn').on('click', newRound);

  getGuesses();
  // set the number to be guessed
  numToGuess = 0;
}

function newRound() {
  round = 0;
  $('#currentRound').empty();
  $('#winner').empty();
  if (round === 0){
    $('#currentRound').append(`
      <h2>Make a Guess!</h2>
    `);
  } else {
    $('#currentRound').append(`
      <h2> Round: ${round} </h2>
    `);
  }
  $.ajax({
    method: 'POST',
    url: '/random',
    
  }).then(function (response) {
    generateRandom();
  }).catch(function (error) {
    alert('newRound Failed', error);
  });

  
}

function getGuesses() {
  $.ajax({
    method: 'GET',
    url: '/guesses'

  }).then(function (response) {
    render(response); // guesses
  }).catch(function (error) {
    alert('request failure', error);
  });
}


function generateRandom() {
  // generating the random number from 1 to 25. 
  // This was moved to its own js file... randomNumber.js
  // will be using the module.exports to GET data.

  // Make the restart button invisible.
  $('#restart-btn').removeClass('makeButtonVisible');
  // .empty() on the player one and player two divs
  $('#contentForOne').empty();
  $('#contentForTwo').empty();

  // select a new random number

  $.ajax({
    method: 'GET',
    url: '/random',

  }).then(function (response) {
    numToGuess = response.num.num;
  }).catch(function (error) {
    alert('Generate random failure', error);
  });

  //numToGuess = Math.floor(Math.random() * 25) + 1;

}

function onSubmit() {
  // When the players have made their guesses, they click the submit button
  // and that calls onSubmit()

  // Use ajax and POST to send guesses to server.
  $.ajax({
    method: 'POST',
    url: '/guesses',

    data: {
      guess: {
        // Each guess should be an object with values:
        // num: (The number to guess)
        num: numToGuess,
        // pOneGuess: (Number, player one guess)
        pOneGuess: Number($('#playerOne-btn').val()),
        // pOneCompare: (String, comparison of p1's guess to answer)
        // this is done in the server so leave it a blank string for now
        pOneCompare: '',
        // pTwoGuess: (Number, player two guess)
        pTwoGuess: Number($('#playerTwo-btn').val()),
        // pTwoCompare: (String, comparison of p2's guess to answer)
        // this is done in the server so leave it a blank string for now
        pTwoCompare: '',
      }
    }
  }).then(function (response) {
    //after POST, add guesses to a "history of previous guesses"
    round++;
    $('#playerOne-btn').val('');
    $('#playerTwo-btn').val('');
    getGuesses();
  }).catch(function (error) {
    alert('onSubmit Failed', error);
  });
}

function render(guesses) {
  //Adding the guesses made from each player to the DOM. 
  //Updating the number of times the guesses were made
  console.log('this is RESPONSE', guesses);
  $('#currentRound').empty();
  if (round === 0){
    $('#currentRound').append(`
      <h2>Make a Guess!</h2>
    `);
  } else {
    $('#currentRound').append(`
      <h2> Round: ${round} </h2>
    `);
  }
  for (let guess of guesses) {
    console.log('The number to guess', guess.num.num);
    console.log('Current guess', guess.num);
    $('#contentForOne').append(`
      <tr>  
        <td>Player One's Guess: ${guess.pOneGuess}</td>
        <td>${guess.pOneCompare} </td>
      </tr>
    `);
    $('#contentForTwo').append(`
      <tr>  
        <td>Player Two's Guess: ${guess.pTwoGuess}</td>
        <td>${guess.pTwoCompare} </td>
      </tr>
    `);
    // if guess.pOneCompare === "Correct!" || guess.pTwoCompare === "Correct!"
    // then display restart button
    if (guess.pOneCompare === 'Correct!' || guess.pTwoCompare === 'Correct!') {
      // Display YOU WON!
      $('#winner').text('YOU WON!');
      // Make restart button visible by adding class .makeButtonVisible
      $('#restart-btn').addClass('makeButtonVisible');
      // restart button selects a new random number using POST.

    }
  }
}
