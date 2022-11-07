import React from 'react';

export default function Dice(props) {

    return (
        <div className="dice" id={props.iskept ? "kept" : "notkept"} onClick={props.keepdie} >
            <h2>{props.value}</h2>
        </div>
        );
}