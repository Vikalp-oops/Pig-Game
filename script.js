'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
let score, currentScore, activePlayer, playing;

// score0El.textContent = 0;
// score1El.textContent = 0;

// const diceEl = document.querySelector('.dice');
// diceEl.classList.add('hidden');
// const score = [0, 0]; //score of both player will be placed in ana array
// let currentScore = 0; //cannot be inside the function because it will be zero eaxh  time that we click the button
// let activePlayer = 0;
// let playing = true;

const restart = function () {
  score1El.textContent = 0;
  score0El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
restart();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//ROLLING A DICE
btnRoll.addEventListener('click', function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice); //generating a number
    diceEl.classList.remove('hidden'); //displaying dice
    diceEl.src = `dice-${dice}.png`;

    //checking for 1 if true switch player
    if (dice !== 1) {
      //add to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      //changes according to player 0 or 1
    } else {
      //switch player
      // document.querySelector(`#current--${activePlayer}`).textContent = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // currentScore = 0;
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');
      switchPlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    diceEl.classList.add('hidden');
    //hold botton will change current score to score and switch player
    //adding current score to active player's score
    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];
    //checking if any player reached >=200
    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //and switch players
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', restart);
