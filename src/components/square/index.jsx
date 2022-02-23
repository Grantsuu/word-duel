import React from 'react';
import './square.css';

export default function Square({ color, value }) {
    return (
        <div className={"square " + color}>
            {value}
        </div>
    )
}
