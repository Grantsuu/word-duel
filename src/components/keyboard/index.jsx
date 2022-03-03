import React, { useState } from "react";
import './keyboard.css';
import Key from '../key';

export default function Keyboard({ word, updateActive, checkGuess, gameOver }) {
    const [input, setInput] = useState("");

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
            <div className="keyboard-row">
                <Key
                    color="key-default"
                    value="Q"
                />
                <Key
                    color="key-default"
                    value="W"
                />
                <Key
                    color="key-default"
                    value="E"
                />
                <Key
                    color="key-default"
                    value="R"
                />
                <Key
                    color="key-default"
                    value="T"
                />
                <Key
                    color="key-default"
                    value="Y"
                />
                <Key
                    color="key-default"
                    value="U"
                />
                <Key
                    color="key-default"
                    value="I"
                />
                <Key
                    color="key-default"
                    value="O"
                />
                <Key
                    color="key-default"
                    value="P"
                />
            </div>
        </div>
    );
}
