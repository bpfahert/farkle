import React from 'react';

export default function Scoreboard(props) {



    return (
        <div className="scoreboard">
            <h1>Total Score: {props.totalscore}</h1>
            <h2>Round Score: {props.roundscore}</h2>
        </div>
    );
}