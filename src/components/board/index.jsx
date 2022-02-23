import React from 'react';
import Square from '../square';

export default function Board({ columns, rows, guesses, evaluations }) {
    function Row({ guess }) {
        const letters = guess.toUpperCase().split("");
        return (
            <div className="word-duel-board-row">
                { letters && letters.map((letter, idx) => <Square 
                    key={idx}
                    value={letter}
                    color={"gray"}
                />)}
            </div>
        );
    }
    
    function EmptyRow() {
        console.log("EMPTY ROW", columns);
        return (
            <div className="word-duel-board-row">
                { Array(columns).fill(0).map((_zero, idx) => <Square 
                    key={idx}
                    value={""}
                    color={"gray"}
                />)}
            </div>
        )
    }

    // Until we fix the "end game" state
    const emptyRows = Math.max(0, rows - guesses.length);

    return (
        <div className="word-duel-board">
            { guesses && guesses.map((guess, idx) => <Row 
                key={idx}
                guess={guess}
            />)}
            { Array(emptyRows).fill(0).map((_zero, idx) => <EmptyRow 
                key={idx}
            />)}
        </div>
    );
}
