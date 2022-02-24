import React, { useState } from "react";
import './word-duel.css';
import Keyboard from '../components/keyboard';
import Board from '../components/board';

const MAX_GUESSES = 6;

const EvaluationColor = {
    Gray: "gray",
    Yellow: "yellow",
    Green: "green"
}

export default function WordDuel() {
    // const [ word, setWord ] = useState(generateNewWord())
    const word = "stink";
    const [guesses, setGuesses] = useState([]);
    const [evaluations, setEvaluations] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [error, setError] = useState("");

    function checkGuess(guess) {
        if (guess.length !== word.length) {
            setError("Guess wrong length!");
            return false;
        }

        if (guesses.length >= MAX_GUESSES) {
            setError("Guess limit reached.");
            setGameOver(true);
            return false;
        }
        
        setError("");
        setGuesses([...guesses, guess]);
        evaluateGuess(guess);
        return true;
    }

    function evaluateGuess(guess) {
        let evaluation = [];
        for (let i = 0; i < guess.length; i++) {
            /* 
            TODO: These are very rudamentary rule but they are sufficient for now 
            There are some corner cases that can occur when there are repeated letters in a guess
            Case 1: Guess contains multiples of a letter where only 1 is in the word and both "miss"
                Actual: Both letters are yellow
                Expected: One letter should be yellow (the first one) and the other should be gray
            Case 2: Guess contains multiples of a letter where only 1 is in the word where 1 "hits" and 1 "misses"
                Actual: "Miss" is yellow and "hit" is green
                Expected: "Miss" is gray and "hit" is green
            Need to devise a way to make sure each letter is only used once when evaluating a guess
            */
            if (guess.charAt(i) === word.charAt(i)) {
                evaluation = [...evaluation, EvaluationColor.Green];
                continue;
            }

            if (word.includes(guess.charAt(i))) {
                evaluation = [...evaluation, EvaluationColor.Yellow];
                continue;
            }

            evaluation = [...evaluation, EvaluationColor.Gray];
        }

        winGame(evaluation);

        setEvaluations([...evaluations, evaluation]);
    }

    function winGame(evaluation) {
        for (let i = 0; i < evaluation.length; i++) {
            if(evaluation[i] !== "green") {
                return;
            }
        }

        setGameOver(true);
        setError("You win!");
    }

    return (
        <div className="word-duel">
            <header className="word-duel-header">
                Word Duel
            </header>
            <Board
                columns={word.length}
                rows={MAX_GUESSES}
                guesses={guesses}
                evaluations={evaluations}
            />
            {error && <div className='error-message' align="center">{error}</div>}
            <Keyboard
                wordLength={word.length}
                checkGuess={checkGuess}
                gameOver={gameOver}
            />
        </div>
    );
}
