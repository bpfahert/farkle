import React from 'react';

export default function Scoreboard(props) {



    return (
        <div className="scoreboard">
            <h1>{props.playerid}</h1>
            <h2>Total Score: {props.totalscore}</h2>
            <h3>Round Score: {props.roundscore}</h3>
        </div>
    );
}