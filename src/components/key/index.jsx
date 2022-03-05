import React from 'react';
import { SpecialKey } from '../../pages/word-duel';
import './key.css';

export default function Key({ color, value, handleInput }) {
    if (value === SpecialKey.Back) {
        value = "Back"
        color = "big";
    }

    if (value === SpecialKey.Enter) {
        value = "Enter"
        color = "big";
    }

    return (
        <button className={"key " + color} onClick={() => handleInput(value)}>
            {value}
        </button>
    )
}
