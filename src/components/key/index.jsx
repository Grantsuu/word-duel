import React from 'react';
import './key.css';

export default function Key({ color, value }) {
    if (value === '!') {
        value = "BACK"
        color = "big";
    }
    if (value === '@') {
        value = "ENTER"
        color = "big";
    }
    return (
        <button className={"key " + color}>
            {value}
        </button>
    )
}
