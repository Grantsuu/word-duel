import React, { useState, useEffect } from "react";
import Keyboard from '../components/keyboard';
import Board from '../components/board';
import * as util from '../utils/utils';
import './word-duel.css';

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

        if (util.isMaxGuesses(guesses)) {
            setMessage("Maximum number of guesses already reached.");
            setGameOver(true);
            return false;
        }

        if (!util.isWordLength(word, guess)) {
            setMessage("Guess length does not match word length");
            return false;
        }

        setMessage("");
        updateActive("");

        setGuesses([...guesses, guess]);

        const evaluation = util.getEvaluation(word, guess);
        setEvaluations([...evaluations, evaluation]);

        return true;
    }

    function checkWin() {

        if (evaluations.length < 1) {
            return;
        }

        const evaluation = evaluations[evaluations.length - 1];

        if (!util.isWin(evaluation)) {
            if (util.isMaxGuesses(guesses)) {
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
                rows={util.MAX_GUESSES}
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
