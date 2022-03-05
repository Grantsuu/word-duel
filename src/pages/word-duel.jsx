import React, { useState, useEffect } from "react";
import './word-duel.css';
import Keyboard from '../components/keyboard';
import Board from '../components/board';

const MAX_GUESSES = 6;

const EvaluationColor = {
    Gray: "gray",
    Yellow: "yellow",
    Green: "green"
}

function getEvaluation([...word], [...guess]) {
    const evaluation = new Array(word.length).fill(EvaluationColor.Gray);
    const wordCopy = word;

    // first pass finds exact matches
    for (let i = 0; i < word.length; i++) {
        if (guess[i] === word[i]) {
            evaluation[i] = EvaluationColor.Green;
            delete wordCopy[i];
        }
    }

    // second pass finds partial matches
    for (let i = 0; i < wordCopy.length; i++) {
        const indexOfLetter = wordCopy.indexOf(guess[i]);
        if (indexOfLetter > -1) {
            evaluation[i] = EvaluationColor.Yellow;
            delete wordCopy[indexOfLetter];
        }
    }

    return evaluation;
}

function isWordLength(word, guess) {
    if (word.length === guess.length) {
        return true;
    }

    return false;
}

function isMaxGuesses(guesses) {
    if (guesses.length >= MAX_GUESSES) {
        return true;
    }
    return false;
}

function isWin(evaluation) {
    if (evaluation.some(result => result !== "green")) {
        return false;
    }

    return true;
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

        if (isMaxGuesses(guesses)) {
            setMessage("Maximum number of guesses already reached.");
            setGameOver(true);
            return false;
        }

        if (!isWordLength(word, guess)) {
            setMessage("Guess length does not match word length");
            return false;
        }

        setMessage("");
        updateActive("");

        setGuesses([...guesses, guess]);

        const evaluation = getEvaluation(word, guess);
        setEvaluations([...evaluations, evaluation]);

        return true;
    }

    function checkWin() {

        if (evaluations.length < 1) {
            return;
        }

        const evaluation = evaluations[evaluations.length - 1];

        if (!isWin(evaluation)) {
            if (isMaxGuesses(guesses)) {
                setGameOver(true);
                setMessage("You lose!");
            }
            return;
        }

        setGameOver(true);
        setMessage("You win!");
    }

    useEffect(
        () => {
            checkWin();
        },
        [evaluations],
    );

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
