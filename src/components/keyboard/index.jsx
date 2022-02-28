import React, { useState } from "react";
import './keyboard.css';

export default function Keyboard({ word, updateActive, checkGuess, gameOver }) {
    const [ input, setInput ] = useState("");
    
    function handleSubmit(event) {
        event.preventDefault();
        if (gameOver) {
            return;
        }
        if (checkGuess(input)) {
            setInput("");
        }
    }
    
    function onChange(event) {
        if (gameOver) {
            return;
        }
        event.preventDefault();
        if (event.target.value.match(/[^a-z]/g)) {
            event.target.value = event.target.value.replace(/[^a-z]/g, '');
        }
        let val = event.target.value;
        if (val.length <= word.length) {
            setInput(event.target.value.toLowerCase());
            updateActive(event.target.value.toLowerCase());
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
