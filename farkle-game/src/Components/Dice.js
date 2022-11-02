import React from 'react';

export default function Dice(props) {




    return (
        <div>
            <div className="dice">
                <h2>{props.value}</h2>
            </div>
            <div className="dicebtn">
                <button type="button" className="dicebtn">Keep</button>
            </div>
        </div>
        );
}