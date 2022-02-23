import React, { useState } from "react";
import './word-duel.css';
import Keyboard from '../components/keyboard';
import Board from '../components/board';

const MAX_GUESSES = 6;

export default function WordDuel() {
    // const [ word, setWord ] = useState(generateNewWord())
    const word = "awash";
    const [ guesses, setGuesses ] = useState([]); 
    const [ error, setError ] = useState("");
    function checkGuess(guess) {
        if (guess.length !== word.length) {
            setError("Guess wrong length!");
            return false;
        }

        setError("");
        setGuesses([ ...guesses, guess ])
        return true;
    }

    return (
        <div className="word-duel">
            <header className="word-duel-header">
                Word Duel
            </header>
            { error && <div className='error-message'>{error}</div> }
            <Board
                columns={word.length}
                rows={MAX_GUESSES}
                guesses={guesses}
                evaluations={[]}
            />
            <Keyboard
                wordLength={word.length}
                checkGuess={checkGuess}
            />
        </div>
    );
}
