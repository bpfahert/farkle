import React from 'react';

export default function Scoreboard(props) {



    return (
        <div className="scoreboard">
            <h1>Score: {props.score}</h1>
        </div>
    );
}