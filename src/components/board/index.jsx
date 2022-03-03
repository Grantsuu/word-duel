import React from 'react';
import Square from '../square';
import './board.css';

export default function Board({ columns, rows, active, guesses, evaluations }) {
    function GuessRow({ guess, evaluation }) {
        const letters = guess.toUpperCase().split("");

        return (
            <div className="word-duel-board-row">
                {letters && letters.map((letter, idx) => <Square
                    key={idx}
                    value={letter}
                    color={evaluation[idx]}
                />)}
            </div>
        );
    }

    function ActiveRow({ active }) {
        const letters = active.toUpperCase().split("");

        if (guesses.length < rows) {
            return (
                <div className="word-duel-board-row">
                    {letters && letters.map((letter, idx) => <Square
                        key={idx}
                        value={letter}
                    />)}
                </div>
            );
        }

        return null;
    }

    function EmptyRow() {
        return (
            <div className="word-duel-board-row">
                {Array(columns).fill(0).map((_zero, idx) => <Square
                    key={idx}
                    value={""}
                    color={""}
                />)}
            </div>
        )
    }

    // Until we fix the "end game" state
    const emptyRows = Math.max(0, rows - guesses.length - 1);

    return (
        <div className="word-duel-board">
            {guesses && guesses.map((guess, idx) => <GuessRow
                key={idx}
                guess={guess}
                evaluation={evaluations[idx]}
            />)}
            <ActiveRow
                active={active}
            />
            {Array(emptyRows).fill(0).map((_zero, idx) => <EmptyRow
                key={idx}
            />)}
        </div>
    );
}
