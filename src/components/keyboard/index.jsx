import React, { useState } from "react";
import './keyboard.css';

export default function Keyboard({ checkGuess }) {
    const [ input, setInput ] = useState("");
    
    function handleSubmit(event) {
        event.preventDefault();
        if (checkGuess(input)) {
            setInput("");
        }
    }
    
    function onChange(event) {
        event.preventDefault();
        setInput(event.target.value.toLowerCase());
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
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
