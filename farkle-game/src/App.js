// import './App.css';
import React from "react"
import Dice from './Components/Dice';
import Scoreboard from './Components/Scoreboard';

function App() {

  const [dice, setDice] = React.useState(initializeDice);
  const [totalScore, setTotalScore] = React.useState(0);
  const [roundScore, setRoundScore] = React.useState(0);


  function initializeDice() {
    const rolledDice = [];
    for (let i = 0; i < 6; i++) {
        rolledDice.push({
          value: Math.ceil(Math.random() *6),
          isKept : false,
          isUsed: false,
          diceID : i
        });
    }
    return rolledDice;
  }

  function rollAllDice() {
    setDice(prevDice => prevDice.map(die => {
      if (die.isKept === false) {
        return {...die, value: Math.ceil(Math.random() * 6)};
      }
      else {
        return {...die, isUsed: true};
      }})
  )}

  function keepDie(id) {
    setDice(prevDice => prevDice.map(die => {
      if (id === die.diceID && die.isUsed === false) {
        return {...die,
        isKept: !die.isKept
        }}
      else {
        return {...die};
      }
    }))
  }

  //function for getting only the values of the unused dice
  function getUnusedDiceValues() {
    const unusedDiceArray = dice.filter(die => die.isUsed === false);
    const farkleArray = [];
    for (let i = 0; i < unusedDiceArray.length; i++) {
      farkleArray[i] = unusedDiceArray[i].value;
    }
    return farkleArray;
  }

  function isFarkle() {
    const farkleArray = getUnusedDiceValues();
    if (farkleArray.includes(1) === false && farkleArray.includes(5) === false) {
      alert("Farkle!");
      setRoundScore(0);
    }
  }

  //FINISH
  function calculateRoundScore() {
    const keptDiceArray = dice.filter(die => die.isKept === true && die.isUsed === false);
    const roundScoreArray = [];
    for (let i = 0; i < keptDiceArray.length; i ++) {
      roundScoreArray[i] = keptDiceArray[i].value;
    }
    scoreCalculator(roundScoreArray);
  }

  //TODO: Write a function that calculates score each time you role
  function scoreCalculator(array) {
    const score = array.reduce( (round, value) => {
      if (!round[value]) {
        round[value] = 0;
      }
      round[value] += 1;;
      return round;
    },{})
    console.log(score);
    let newScore = 0;
    if (score[1] && score[5]) {
      newScore = (score[1] * 100) + (score[5] * 50);
    }
    else if (score[5]) {
      newScore = score[5] * 50;
    }
    else if (score[1]) {
      newScore = score[1] * 100;
    }
    console.log(newScore);
    setRoundScore(prevScore => {
      return prevScore += newScore;
    } )
  }

  //FUNCTION TO KEEP POINTS AND ADD TO TOTAL
  function keepPoints() {
    setTotalScore(prevScore => {
      return prevScore += roundScore;
    })
    setRoundScore(0);

  }

  //FUNCTION TO CHECK IF ALL DICE ARE USED
  // function checkDice() {}

  const diceArray = dice.map(die => {
    return (
    <Dice value={die.value} iskept={die.isKept} isused={die.isUsed} diceid={die.id} key={die.id} keepdie={() => {keepDie(die.diceID)}} />
    )}
  )

  function checkDice() {
    console.table(dice);
  }

  return (
    <div className="app">
      <Scoreboard totalscore={totalScore} roundscore={roundScore}/>
      <div className="dicecontainer">
        {diceArray}
      </div>
      <button type="button" onClick={rollAllDice}> Roll All Dice</button>
      <button type="button" onClick={keepPoints}> Keep Points</button>
      <button onClick={checkDice}>Check dice state</button>
      <button onClick={calculateRoundScore}>Check farkle</button>
    </div>
  );
}

export default App;
