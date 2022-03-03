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

// special keys
// @ - enter
// ! - backspace
const KeyboardLayout = {
    Qwerty: "qwertyuiop-asdfghjkl-@zxcvbnm!"
}

export default function WordDuel() {
    // const [ word, setWord ] = useState(generateNewWord())
    const word = "butts";
    const [active, setActive] = useState("".padEnd(word.length));
    const [guesses, setGuesses] = useState([]);
    const [evaluations, setEvaluations] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("");

    function updateActive(active) {
        setActive(active.padEnd(word.length));
    }

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
        updateActive("");
        evaluateGuess(guess);
        return true;
    }

    function evaluateGuess(guess) {
        const evaluation = new Array(word.length).fill(EvaluationColor.Gray);
        let wordCopy = word;

        for (let i = 0; i < word.length; i++) {
            if (guess.charAt(i) === word.charAt(i)) {
                evaluation[i] = EvaluationColor.Green;
                // make sure to replace with an impossible symbol
                wordCopy = replaceAt(wordCopy, i, '?');
            }
        }

        for (let i = 0; i < wordCopy.length; i++) {
            const index = wordCopy.indexOf(guess.charAt(i));
            if (index > 0) {
                evaluation[i] = EvaluationColor.Yellow;
                // make sure to replace with an impossible symbol
                wordCopy = replaceAt(wordCopy, index, '?');
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

    function replaceAt(word, index, replacement) {
        return word.slice(0, index) + replacement + word.slice(index + replacement.length);
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
                layout={KeyboardLayout.Qwerty}
                updateActive={updateActive}
                checkGuess={checkGuess}
                gameOver={gameOver}
            />
        </div>
    );
}
