import React, { useState } from "react";
import './keyboard.css';

export default function Keyboard({ word, updateActive, checkGuess, gameOver }) {
    const [ input, setInput ] = useState("");
    
    function handleSubmit(event) {
        event.preventDefault();
        if (gameOver) {
            return;
        }
        if (checkGuess(input.split(""))) {
            setInput("");
        }
    }
    
    function onChange(event) {
        if (gameOver) {
            return;
        }
        event.preventDefault();
        const val = event.target.value.replace(/[^a-zA-Z]/g, '').toLowerCase();
        if (val.length <= word.length) {
            setInput(val);
            updateActive(val);
        }
    }

    return (
        <div className="word-duel-keyboard">
            <header>
                Input Word
            </header>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        value={input}
                        onChange={onChange}
                        autoFocus
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
