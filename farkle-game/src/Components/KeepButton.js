import React from 'react';

export default function KeepButton(props) {

    return (
        <div className="dicebtn">
            <button type="button" className="dicebtn" iskept={props.isKept} diceid={props.diceID}> {props.iskept ? "Holding" : "Keep"} </button>
        </div>
    )
}