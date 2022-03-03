import React from 'react';
import './key.css';

export default function Key({ color, value }) {
    return (
        <button className={color}>
            {value}
        </button>
    )
}
