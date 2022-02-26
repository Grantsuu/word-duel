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
    const [message, setMessage] = useState("");

    function checkGuess(guess) {
        if (guess.length !== word.length) {
            setMessage("Guess wrong length!");
            return false;
        }

        if (guesses.length >= MAX_GUESSES) {
            setMessage("Guess limit reached.");
            setGameOver(true);
            return false;
        }

        setMessage("");
        setGuesses([...guesses, guess]);
        evaluateGuess(guess);
        return true;
    }

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
    function evaluateGuess(guess) {
        const evaluation = guess.split("").map((letter, idx) => {
            if (letter === word[idx]) {
                return EvaluationColor.Green;
            }

            if (word.includes(letter)) {
                return EvaluationColor.Yellow;
            }

            return EvaluationColor.Gray;
        }, []);

        winGame(evaluation);

        setEvaluations([...evaluations, evaluation]);
    }

    function winGame(evaluation) {
        if (!evaluation.includes("green")) {
            return;
        }

        setGameOver(true);
        setMessage("You win!");
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
            {message && <div className='message' align="center">{message}</div>}
            <Keyboard
                wordLength={word.length}
                checkGuess={checkGuess}
                gameOver={gameOver}
            />
        </div>
    );
}
