// import './App.css';
import React from "react"
import Dice from './Components/Dice';
import Scoreboard from './Components/Scoreboard';

function App() {

  const [dice, setDice] = React.useState(initializeDice);
  const [totalScore, setTotalScore] = React.useState(0);
  const [roundScore, setRoundScore] = React.useState(0);

//Completely resets dice with a random value between 1 and 6
  function initializeDice() {
    const rolledDice = [];
    for (let i = 0; i < 6; i++) {
        rolledDice.push({
          value: Math.ceil(Math.random() * 6),
          isKept : false,
          isUsed: false,
          pointsGiven: false,
          diceID : i
        });
    }
    return rolledDice;
  }

  //Rolls all dice that aren't marked as kept or used
  function rollAllDice() {
    if (canRollAgain() === true) {
      setDice(initializeDice)
    }
    else {
      setDice(prevDice => prevDice.map(die => {
        if (die.isKept === false) {
          return {...die, value: Math.ceil(Math.random() * 6)};
        }
        else {
          return {...die, isUsed: true};
        }}))
      }
  }

  //Allows clicking on a dice to mark it as kept
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

  //Check for farkle every time dice are rolled
  React.useEffect(() => {
      const unusedDiceArray = dice.filter(die => die.isUsed === false);
      const farkleArray = [];
      for (let i = 0; i < unusedDiceArray.length; i++) {
        farkleArray[i] = unusedDiceArray[i].value;
      }
      if (farkleArray.includes(1) === false && farkleArray.includes(5) === false && farkleArray.length > 0) {
        console.log(farkleArray);
        setRoundScore(0);
        setDice(initializeDice);
        console.log("Farkle!");
      }
    }, [dice])

  //FINISH
  function calculateRoundScore() {
    const keptDiceArray = dice.filter(die => die.isKept === true && die.isUsed === false);
    const roundScoreArray = [];
    for (let i = 0; i < keptDiceArray.length; i ++) {
      roundScoreArray[i] = keptDiceArray[i].value;
    }
    scoreCalculator(roundScoreArray);
  }

  //FUNCTION THAT CALCULATES SCORE FROM KEPT DICE WHEN KEEP DIE BUTTON IS CLICKED
  function scoreCalculator(array) {
    const score = array.reduce( (round, value) => {
      if (!round[value]) {
        round[value] = 0;
      }
      round[value] += 1;
      return round;
    },{})
    let newScore = 0;
    for (let i = 2; i < 7; i++) {
      if (score[i]) {
        if (score[i] === 3) {
          newScore += (100 * i);
        }
      }
    }
    if (score[5] && score[5] < 3) {
      newScore += score[5] * 50;
    }
    if (score[1] && score[1] < 4) {
      newScore += score[1] * 100;
    }
    if (score[1] && score[2] && score[3] && score[4] && score[5] && score[6]) {
      newScore += 1500;
    }
    for (let i = 1; i < 7; i++) {
      if (score[i]) { 
        if (score[i] === 4) {
        newScore += 1000;
        }
        if (score[i] === 5) {
          newScore += 2000;
        }
        if (score[i] === 6) {
          newScore += 3000;
        }
      }
    }
    setRoundScore(prevScore => {
      return prevScore + newScore;
    } )
  }

  //Function for player to keep points and end their turn
  function keepPoints() {
    setTotalScore(prevScore => {
      return prevScore + roundScore;
    });
    resetRound();
  }  

  //Adds kept dice points to round total and marks each kept die as pointsGiven
  function keepSelectedDice() {
    calculateRoundScore();
    setDice(prevDice => prevDice.map(die => {
      if (die.isKept === true) {
        return {...die, pointsGiven: true};
      }
      else {
        return {...die};
      }
}))};

  //Resets the dice and sets the score to 0, used after a farkle or player change
  function resetRound() {
    setDice(initializeDice);
    setRoundScore(0);
  }
  
  //Funciton to check if all dice are used and the player can choose to roll again
  function canRollAgain() {
    const roundStatusArray = dice.map(die => {
      return die.pointsGiven;
    });
    if (roundStatusArray.includes(false)) {
      return false;
    }
    else {
      return true;
    }
  }

  const diceArray = dice.map(die => {
    return (
    <Dice value={die.value} iskept={die.isKept} isused={die.isUsed} diceid={die.id} key={die.id} pointsgiven={die.pointsGiven} keepdie={() => {keepDie(die.diceID)}} />
    )}
  )

  return (
    <div className="app">
      <Scoreboard totalscore={totalScore} roundscore={roundScore}/>
      <div className="dicecontainer">
        {diceArray}
      </div>
      <button type="button" onClick={rollAllDice}> Roll All Dice</button>
      <button onClick={keepSelectedDice}>Keep selected dice</button>
      <button type="button" onClick={keepPoints}> Keep Points</button>
      <h3>Click to keep a dice that's eligible for points! Grey die means die is kept, red die means die is already used for this round.</h3>
    </div>
  );
}

export default App;