import React, { useState } from "react";
import './keyboard.css';
import Key from '../key';

export default function Keyboard({ word, layout, updateActive, checkGuess, gameOver }) {
    const [input, setInput] = useState("");

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
        const val = event.target.value.replace(/[^a-zA-Z]/g, '').toLowerCase();
        if (val.length <= word.length) {
            setInput(val);
            updateActive(val);
        }
    }

    function KeyboardRow({ rowLayout }) {
        return (
            <div className="keyboard-row">
                {rowLayout && rowLayout.toUpperCase().split('').map((letter, idx) =>
                    <Key
                        key={idx}
                        color="key-default"
                        value={letter}
                    />
                )}
            </div>
        );
    }

    function Keyboard({ layout }) {
        return (
            <div className="word-duel-keyboard">
                {layout && layout.split('-').map((row, idx) =>
                    <KeyboardRow
                        key={idx}
                        rowLayout={row}
                    />
                )}
            </div>
        );
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
            <Keyboard
                layout={layout}
            />
        </div>
    );
}
