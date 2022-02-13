import React from "react";
import "./Grid.css"

function renderValue(turn) {
    if(turn === "cross") {
        return "X";
    }else if(turn === "circle") {
        return "O"
    }
    return null;
}

export function Grid(props) {
    const {data, turn} = props;
    return (
        <div className="container">
            {data.map((value, index) => {
                return (
                    <div key={index} onClick={() => props.getGrid(index)}>{renderValue(value)}</div>
                );
            })}
        </div>
    );

}