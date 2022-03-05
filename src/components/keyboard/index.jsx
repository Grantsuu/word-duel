import React, { useState } from "react";
import './keyboard.css';
import Key from '../key';

export default function Keyboard({ word, layout, updateActive, checkGuess, gameOver }) {
    const [input, setInput] = useState("");

    // need event in case of using the submit form button
    function handleSubmit(event) {
        if (event) {
            event.preventDefault();
        }
        
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

    function handleClick(event) {
        console.log(event);
        if (event === "BACK") {
            const newInput = input.slice(0, -1);
            setInput(newInput);
            updateActive(newInput);
            return;
        }

        if (event === "ENTER") {
            handleSubmit(null);
            return;
        }

        const newInput = input + event;
        if (newInput.length <= word.length) {
            setInput(newInput);
            updateActive(newInput);
        }
    }

    function KeyboardRow({ rowLayout }) {
        return (
            <div className="keyboard-row">
                {rowLayout && rowLayout.split('').map((letter, idx) =>
                    <Key
                        key={idx}
                        color="key"
                        value={letter}
                        handleClick={handleClick}
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
