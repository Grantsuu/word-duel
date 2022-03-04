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
    const word = "butts".split('');
    const [active, setActive] = useState("".padEnd(word.length));
    const [guesses, setGuesses] = useState([]);
    const [evaluations, setEvaluations] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("");

    function updateActive(active) {
        setActive(active.padEnd(word.length));
    }

    function checkGuess(guess) {

        guess = guess.split('');

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
        updateActive("");
        evaluateGuess(guess);
        return true;
    }

    function evaluateGuess(guess) {
        const evaluation = new Array(word.length).fill(EvaluationColor.Gray);
        let wordCopy = word;

        for (let i = 0; i < word.length; i++) {
            if (guess[i] === word[i]) {
                evaluation[i] = EvaluationColor.Green;
                // make sure to replace with an impossible symbol
                delete wordCopy[i];
            }
        }
        
        console.log({evaluation, guess, wordCopy});
        
        for (let i = 0; i < wordCopy.length; i++) {
            const indexOfLetter = wordCopy.indexOf(guess[i]);
            if (indexOfLetter > -1) {
                evaluation[i] = EvaluationColor.Yellow;
                // make sure to replace with an impossible symbol
                delete wordCopy[indexOfLetter];
            }
        }

        winGame(evaluation);
        setEvaluations([...evaluations, evaluation]);
    }

    function winGame(evaluation) {
        if (evaluation.some(result => result !== "green")) {
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
                active={active}
                guesses={guesses}
                evaluations={evaluations}
            />
            {message && <div className='message' align="center">{message}</div>}
            <Keyboard
                word={word}
                updateActive={updateActive}
                checkGuess={checkGuess}
                gameOver={gameOver}
            />
        </div>
    );
}
