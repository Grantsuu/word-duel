import React from 'react';
import Square from '../square';
import './board.css';

export default function Board({ columns, rows, guesses, evaluations }) {
    function Row({ guess, evaluation }) {
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
    const emptyRows = Math.max(0, rows - guesses.length);

    return (
        <div className="word-duel-board">
            {guesses && guesses.map((guess, idx) => <Row
                key={idx}
                guess={guess}
                evaluation={evaluations[idx]}
            />)}
            {Array(emptyRows).fill(0).map((_zero, idx) => <EmptyRow
                key={idx}
            />)}
        </div>
    );
}
