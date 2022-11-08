import React from 'react';

export default function Dice(props) {
    
    function diceStatus() {
        if (props.pointsgiven === true || props.isused === true) {
            return "diceused";
        }
        else if (props.iskept === true) {
            return "dicekept";
        }
        else {
            return "dice";
        }
    }

    let diceClassName= diceStatus();

    return (
        <div className={diceStatus()} onClick={props.keepdie} >
            <h2>{props.value}</h2>
        </div>
        );
}