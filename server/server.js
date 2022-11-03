const express = require('express');
const bodyParser = require('body-parser');
//const newRandom = require('.randomNumber/');
const { response } = require('express');
const app = express();
const PORT = 5000;

//let randomNumber = require('./modules/randomNumber');
let randomNumber = 0;
// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// Array for guesses
// Each guess should be an object with values:
// pOneGuess: (Number, player one guess)
// pOneCompare: (String, comparison of p1's guess to answer)
// pTwoGuess: (Number, player two guess)
// pTwoCompare: (String, comparison of p2's guess to answer)
let guesses = [];

// GET & POST Routes go here
// GET route for /guesses
app.get('/guesses', (req, res) => {
  console.log('The guesses array', guesses);
  res.send(guesses);
});


app.get('/random', (req, res) => {
  console.Console('In Get /random');
  res.send(randomNumber);
});

app.post('/random', (req, response) => {
  randomNumber = Math.floor(Math.random() * 25) + 1;
  res.sendStatus(201);
});


//this will be the post or get for the new number (restarting game).
// app.post('/random', (req, response) => {

// })

// POST route for guesses
// Number comparison happens here
app.post('/guesses', (req, res) => {
  console.log('In server app.post');
  //guess is an object
  let guess = req.body.guess;

  // The random number
  guess.num = randomNumber;
  // Player one check
  console.log('In server app.post');
  if (guess.pOneGuess > guess.num) {
    // guess too high
    guess.pOneCompare = 'Too high';
  } else if (guess.pOneGuess < guess.num) {
    // guess too low
    guess.pOneCompare = 'Too low';
  } else {
    // correct!
    guess.pOneCompare = 'Correct!';
  }
  // Player two check
  if (guess.pTwoGuess > guess.num) {
    // guess too high
    guess.pTwoCompare = 'Too high';
  } else if (guess.pOneGuess < guess.num) {
    // guess too low
    guess.pTwoCompare = 'Too low';
  } else {
    // correct!
    guess.pTwoCompare = 'Correct!';
  }

  // Push guess object to the guesses array
  guesses = [];
  guesses.push(guess);
  res.sendStatus(201);
});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})
