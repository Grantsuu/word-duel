import React, { useState, useEffect } from 'react';
import Keyboard from '../components/keyboard';
import Board from '../components/board';
import { getEvaluation, isMaxGuesses, isWin } from '../utils';
import { selectWords, findWord } from '../utils/word';
import './word-duel.css';

export const MAX_GUESSES = 6;

const KeyboardLayout = {
    Qwerty: "QWERTYUIOP-ASDFGHJKL-@ZXCVBNM!"
}

export const SpecialKey = {
    Enter: '@',
    Back: '!'
}

export default function WordDuel() {
    const [word, setWord] = useState(selectWords(3, 5)[0].split(''));
    const [active, setActive] = useState("".padEnd(word.length));
    const [guesses, setGuesses] = useState([]);
    const [evaluations, setEvaluations] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("");

    function updateActive(active) {
        setActive(active.padEnd(word.length));
    }

    function checkGuess(guess) {
        if (isMaxGuesses(guesses, MAX_GUESSES)) {
            endGame("Maximum number of guesses already reached.");
            return false;
        }

        if (word.length !== guess.length) {
            setMessage("Guess length does not match the word length");
            return false;
        }

        if (!findWord(guess.join(''))) {
            setMessage("Word not in dictionary.");
            return false;
        }

        setGuess(guess);

        return true;
    }

    function setGuess(guess) {
        setMessage("");
        updateActive("");

        const evaluation = getEvaluation(word, guess);

        // TODO: there has to be a more sane way of fixing this but if setGuesses goes before setEvaluations
        // GuessRow receives an empty evaluations array and crashes
        setEvaluations([...evaluations, evaluation]);
        setGuesses([...guesses, guess]);

        return true;
    }

    function checkWin() {

        if (evaluations.length < 1) {
            return;
        }

        const evaluation = evaluations[evaluations.length - 1];

        if (isWin(evaluation)) {
            endGame("You win!");
        } else if (isMaxGuesses(guesses)) {
            endGame("You lose!");
        }
    }

    function endGame(message) {
        setGameOver(true);
        setMessage(message);
    }

    useEffect(
        () => {
            checkWin();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [evaluations]
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
                layout={KeyboardLayout.Qwerty}
                updateActive={updateActive}
                checkGuess={checkGuess}
                gameOver={gameOver}
            />
        </div>
    );
}
