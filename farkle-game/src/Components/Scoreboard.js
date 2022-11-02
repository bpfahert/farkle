import React from 'react';

export default function Scoreboard(props) {



    return (
        <div className="scoreboard">
            <h2>Score: {props.score}</h2>
        </div>
    );
}