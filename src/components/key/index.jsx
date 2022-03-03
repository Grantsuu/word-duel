import React from 'react';
import { SpecialKey } from '../../pages/word-duel';
import './key.css';

export default function Key({ color, value, handleClick }) {
    if (value === SpecialKey.Back) {
        value = "BACK"
        color = "big";
    }

    if (value === SpecialKey.Enter) {
        value = "ENTER"
        color = "big";
    }

    return (
        <button className={"key " + color} onClick={() => handleClick(value)}>
            {value}
        </button>
    )
}
