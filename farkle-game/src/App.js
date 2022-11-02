// import './App.css';
import React from "react"
import Dice from './Components/Dice';
import Scoreboard from './Components/Scoreboard';

function App() {

  const [dice, setDice] = React.useState(rollAllDice);

  function rollAllDice() {
    const rolledDice = [];
    for (let i = 0; i < 6; i++) {
      rolledDice[i] = Math.ceil(Math.random() *6);
    }
    return rolledDice;
  }

  function handleClick() {
    console.table(dice);
    setDice(rollAllDice());
    console.table(dice);
  }



  return (
    <div className="app">
      <Scoreboard score="0"/>
      <Dice value={dice[2]} />
      <button type="button" onClick={handleClick}> Roll All Dice</button>
    </div>
  );
}

export default App;
