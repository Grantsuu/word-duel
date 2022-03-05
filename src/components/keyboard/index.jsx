import React, { useState, useEffect, useCallback } from "react";
import './keyboard.css';
import Key from '../key';

export default function Keyboard({ word, layout, updateActive, checkGuess, gameOver }) {
    // TODO: I'm pretty sure input and active can be combined into one field but i dont know how
    const [input, setInput] = useState("");

    function handleBackspace() {
        const newInput = input.slice(0, -1);
        setInput(newInput);
        updateActive(newInput);
    }

    function handleEnter() {
        if (checkGuess(input.split(""))) {
            setInput("");
        }
    }

    function handleSpecialKey(key) {
        // on screen value uses back while keyboard uses backspace
        if(key.toLowerCase() === "back" || key.toLowerCase() === "backspace"){
            handleBackspace();
            return true;
        }
        if(key.toLowerCase() === "enter"){
            handleEnter();
            return true;
        }
        return false;
    }

    function handleInput(key) {
        if (gameOver) {
            return;
        }
        key = key.replace(/[^a-zA-Z]/g, '').toLowerCase();

        if (handleSpecialKey(key)) {
            return;
        }

        const newInput = input + key;
        if (newInput.length <= word.length) {
            setInput(newInput);
            updateActive(newInput);
        }
    }

    const handleKeydown = useCallback(event => {
        event.preventDefault();
        handleInput(event.key);
    }, [input]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeydown);
        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    }, [handleKeydown]);

    function KeyboardRow({ rowLayout }) {
        return (
            <div className="keyboard-row">
                {rowLayout && rowLayout.split('').map((letter, idx) =>
                    <Key
                        key={idx}
                        color="key"
                        value={letter}
                        handleInput={handleInput}
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
            <Keyboard
                layout={layout}
            />
        </div>
    );
}
