// import './App.css';
import React from "react"
import Dice from './Components/Dice';
import Scoreboard from './Components/Scoreboard';

function App() {

  const [dice, setDice] = React.useState(rollAllDice);
  const [score, setScore] = React.useState(500);

  function rollAllDice() {
    const rolledDice = [];
    for (let i = 0; i < 6; i++) {
      rolledDice[i] = {value: Math.ceil(Math.random() *6),
        isKept : false};
    }
    console.table(rolledDice);
    return rolledDice;
  }

  function handleClick() {
    setDice(rollAllDice());
  }


  return (
    <div className="app">
      <Scoreboard score={score}/>
      <div className="dicebox">
        <Dice value={dice[0].value} />
        <Dice value={dice[1].value} />
        <Dice value={dice[2].value} />
        <Dice value={dice[3].value} />
        <Dice value={dice[4].value} />
        <Dice value={dice[5].value} />
      </div>
      <button type="button" onClick={handleClick}> Roll All Dice</button>
    </div>
  );
}

export default App;
