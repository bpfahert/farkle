// import './App.css';
import React from "react"
import Dice from './Components/Dice';
import Scoreboard from './Components/Scoreboard';

function App() {

  const [dice, setDice] = React.useState(initializeDice);
  const [totalScoreP1, setTotalScoreP1] = React.useState(0);
  const [roundScoreP1, setRoundScoreP1] = React.useState(0);
  const [totalScoreP2, setTotalScoreP2] = React.useState(0);
  const [roundScoreP2, setRoundScoreP2] = React.useState(0);
  const [player1Turn, setPlayer1Turn] = React.useState(true);
  const [gameOver, setGameOver] = React.useState(false);
  const [isClickable, setIsClickable] = React.useState(true);
  const [checkFarkle, setCheckFarkle] = React.useState(false);

  let player1Name = "Bryan";
  let player2Name = "Cyndi";

  //TODO: Code function to check if a player has 10,000 points.
  React.useEffect(() => {
    if (totalScoreP1 >= 10000 && gameOver === false) {
      alert(`${player1Name} has at least 10,000 points! ${player2Name} has one more turn to try to beat their score!`);
      setGameOver(true);
    }
    else if (totalScoreP2 >= 10000 && gameOver === false) {
      alert(`${player2Name} has at least 10,000 points! ${player1Name} has one more turn to try to beat their score!`);
      setGameOver(true);
    }
  },[totalScoreP1, totalScoreP2]);

  React.useEffect(() => {
    setCheckFarkle(true);
  }, [])

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


  function diceCheck() {
    let diceScoreArray = getRoundScoreArray();
    let diceScore = scoreCalculator(diceScoreArray);
    if (diceScore === 0 || diceScore === undefined) {
      return 0;  
    }
  }


  //Rolls all dice that aren't marked as kept or used
  //TODO: ADD CHECK FOR DICE BEING SCORED FIRST
  function rollAllDice() {
    if (canRollAgain() === true) {
      setDice(initializeDice);
      setCheckFarkle(prevState => !prevState);
    }
    else if (keptDiceCount() === 0) {
      alert("You must keep at least one point-scoring dice to roll again!");
    }
    else if (diceCheck() === 0) {
      alert("You can only roll dice that score points!");
    }
    else if (keptDiceCount() > 0  && (roundScoreP1 > 0 || roundScoreP2 > 0)) {
      setDice(prevDice => prevDice.map(die => {
        if (die.pointsGiven === false) {
          return {...die, value: Math.ceil(Math.random() * 6)};
        }
        else {
          return {...die, isUsed: true};
        }
        }))
        setCheckFarkle(prevState => !prevState);
      }
    setIsClickable(true);
  }

  //Allows clicking on a dice to mark it as kept
    function keepDie(id) {
      if (isClickable === true) {
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
    }

    function keptDiceCount() {
      let keptDiceCount = 0;
      const diceCountArray = dice.map(die => {
        if (die.isKept === true && die.isUsed === false) {
         keptDiceCount += 1; 
        }
      })
      return keptDiceCount;
    }

  //Check for farkle every time dice are rolled
  React.useEffect(() => {
      const unusedDiceArray = dice.filter(die => die.isUsed === false);
      const farkleArray = [];
      for (let i = 0; i < unusedDiceArray.length; i++) {
        farkleArray[i] = unusedDiceArray[i].value;
      }
      console.log(farkleArray);
      if (scoreCalculator(farkleArray) === 0 && farkleArray.length > 0) {
        if (gameOver === true) {
          alert(totalScoreP1 > totalScoreP2 ? `${player1Name} wins!` : `${player2Name} wins!`)
        }
        else {
          alert("Farkle! Next player clicks to roll dice!");
          setRoundScoreP1(0);
          setRoundScoreP2(0);
          setPlayer1Turn(player => !player);
          setDice(initializeDice);
        }
      }
    }, [checkFarkle])

  function getRoundScoreArray() {
    const keptDiceArray = dice.filter(die => die.isKept === true && die.isUsed === false);
    const roundScoreArray = [];
    for (let i = 0; i < keptDiceArray.length; i ++) {
      roundScoreArray[i] = keptDiceArray[i].value;
    }
    return roundScoreArray;
    // changeScore(scoreCalculator(roundScoreArray)); Dont need in this function?
  }

  //FUNCTION THAT CALCULATES SCORE FROM KEPT DICE WHEN KEEP DIE BUTTON IS CLICKED
  function scoreCalculator(array) {
    let countArray = array;
    const score = array.reduce( (round, value) => {
      if (!round[value]) {
        round[value] = 0;
      }
      round[value] += 1;
      return round;
    },{})
    let newScore = 0;
    let tripletCount = 0;
    let pairCount = 0;
    let fourSame = false;
    let pair = false;
    let usedDiceCount = 0;
    for (let i = 2; i < 7; i++) {
      if (score[i]) {
        if (score[i] === 3) {
          newScore += (100 * i);
          tripletCount += 1;
          usedDiceCount += 3;
        }
      }
    }
    if (score[1] && score[1] === 3) {
      tripletCount += 1;
      usedDiceCount += 3;
      newScore += 300;
    }
    if (score[5] && score[5] < 3) {
      newScore += score[5] * 50;
      usedDiceCount += score[5];
    }
    if (score[1] && score[1] < 4) {
      newScore += score[1] * 100;
      usedDiceCount += score[1];
    }
    if (score[1] && score[2] && score[3] && score[4] && score[5] && score[6]) {
      newScore += 1500;
      usedDiceCount = 6;
    }
    for (let i = 1; i < 7; i++) {
      if (score[i]) { 
        if (score[i] === 4) {
        newScore += 1000;
        fourSame = true;
        usedDiceCount += 4;
        }
        if (score[i] === 5) {
          newScore += 2000;
          usedDiceCount += 5;
        }
        if (score[i] === 6) {
          newScore += 3000;
          usedDiceCount = 6;
        }
        if (score[i] === 2) {
          pair = true;
          pairCount += 1;
        }
      }
    }
    if (tripletCount === 2) {
      newScore = 2500;
      usedDiceCount = 6;
      console.log("triplet!");
    }
    if (pairCount === 3) {
      newScore = 1500;
      usedDiceCount = 6;
      console.log("Three pairs!");
    }
    if (fourSame === true && pair === true) {
      newScore = 1500;
      usedDiceCount = 6;
      console.log("four with a pair!");
    }
    if (usedDiceCount === countArray.length) {
      return newScore;
    }
    else if (getRoundScoreArray(array).length === 0 || getRoundScoreArray(array).length === undefined) {
      return newScore;
    }
    else if (usedDiceCount < countArray.length && countArray.length > 1) {
      alert("Please select a valid points combination.");
    }
  }

  function changeScore(score) {
    if (player1Turn === true) {
      setRoundScoreP1(prevScore => {
        return prevScore + score;
      })
    }
    else {
      setRoundScoreP2(prevScore => {
        return prevScore + score;
      })
    }
  }

  function p1HasScored500() {
    if (roundScoreP1 >= 500 || totalScoreP1 >= 500) {
      return true;
    }
    else {
      return false;
    }
  }

  function p2HasScored500() {
    if (roundScoreP2 >= 500 || totalScoreP2 >= 500) {
      return true;
    }
    else {
      return false;
    }
  }

  //Function for player to keep points and end their turn
  //TODO: ALSO NEED TO ADD GAMEOVER IF PLAYER FARKLES AND LOSES
  function keepPoints() {
    if (player1Turn === true && p1HasScored500() === true) {
      setTotalScoreP1(prevScore => {
        return prevScore + roundScoreP1;
      });
      if (gameOver === true) {
        console.log("Game is over!");
      }
    }
    else if (player1Turn === false && p2HasScored500() === true) {
      setTotalScoreP2(prevScore => {
        return prevScore + roundScoreP2;
      });
      if (gameOver === true) {
        console.log("Game is over!");
      }
    }
    if ((player1Turn === true && p1HasScored500() === true) || (player1Turn === false && p2HasScored500() === true)) {
      alert("Points kept! Next player click okay to roll dice!");
      setIsClickable(true);
      resetRound();
      setPlayer1Turn(player => !player);
    }
    else {
      alert("You must score at least 500 points to keep your first points!");
    }
  }  

  //Adds kept dice points to round total and marks each kept die as pointsGiven
  function keepSelectedDice() {
    if (isClickable === true) {
      let roundScoreArray = getRoundScoreArray();
      let newScore = scoreCalculator(roundScoreArray);
      if (newScore === 0 || newScore === undefined) {
        alert("Illegal move! You must select a valid points combination to roll again!");
      }
      else {
        setIsClickable(false);
        changeScore(newScore);
        setDice(prevDice => prevDice.map(die => {
          if (die.isKept === true) {
            return {...die, pointsGiven: true};
          }
          else {
            return {...die};
          }
        }))
      }
    }
    else {
      alert("You already kept these dice! Please click Roll All Dice to roll any remaining dice or Keep Points to end your turn and keep all of your points.")
    }
  }

  //Resets the dice and sets the score to 0, used after a farkle or player change
  function resetRound() {
    setDice(initializeDice);
    setRoundScoreP1(0);
    setRoundScoreP2(0);
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

//make an object instead of an array and give each value(key) an isScoring property w/ true and false?
  // function isValid() {
  //   let checkedDiceArray = getRoundScoreArray();
    
  // }
  

// dice.push trues or values into array, should match number of kept dice, dice.length should match initial count of array length (store in variable?) DICE USED COUNT IN SCORING


  const diceArray = dice.map(die => {
    return (
    <Dice value={die.value} iskept={die.isKept} isused={die.isUsed} diceid={die.id} key={die.id} pointsgiven={die.pointsGiven} keepdie={() => {keepDie(die.diceID)}} />
    )}
  )

  return (
    <div className="app">
      <h2>Turn: {player1Turn ? `${player1Name}` : `${player2Name}`}</h2>
      <div className="scorebox">
      <Scoreboard totalscore={totalScoreP1} roundscore={roundScoreP1} playerid={player1Name}/>
      <Scoreboard totalscore={totalScoreP2} roundscore={roundScoreP2} playerid={player2Name}/>
      </div>
      <div className="dicecontainer">
        {diceArray}
      </div>
      <button type="button" onClick={rollAllDice}> Roll All Dice</button>
      <button onClick={keepSelectedDice}>Keep selected dice</button>
      <button type="button" onClick={keepPoints}> Keep Points</button>
      {/* <button onClick={isValid}>isValid</button> */}
      <h3>Click to keep a dice that's eligible for points! Grey die means die is kept, red die means die is already used for this round.</h3>
    </div>
  );
}

export default App;