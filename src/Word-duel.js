import React from "react";
import './Word-duel.css';

function Square(props) {
    return (
        <div className={props.color}>
            {props.value}
        </div>
    );
}

class Board extends React.Component {
    renderSquare(i, j) {
        let letter;
        if (this.props.words[i] != null && this.props.words[i].length != 0) {
            letter = this.props.words[i].charAt(j).toUpperCase();
        } else {
            letter = '';
        }

        return (
            <Square
                value={letter}
                color={this.props.color}
            />
        );
    }

    renderRow(line, letters) {
        let squares = [];

        for (let i = 0; i < letters; i++) {
            squares.push(this.renderSquare(line, letters));
        }

        return (
            <div className="Word-duel-board-row">
                {squares}
            </div>
        );
    }

    render() {
        let board = [];

        for (let i = 0; i < this.props.guesses; i++) {
            board.push(this.renderRow(i, this.props.letters));
        }

        return (
            <div className="Word-duel-board">
                {board}
            </div>
        );
    }
}

class Keyboard extends React.Component {
    render() {
        return (
            <div className="Word-duel-keyboard">
                <header>
                    Input Word
                </header>
                <form onSubmit={this.props.onSubmit}>
                    <label>
                        <input type="text" value={this.props.value} onChange={this.props.onChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

class WordDuel extends React.Component {
    MAX_LETTERS = 5;
    MAX_GUESSES = 6;

    constructor(props) {
        super(props);
        this.state = {
            letters: this.MAX_LETTERS,
            guesses: this.MAX_GUESSES,
            word: 'awash',
            words: Array(),
            line: 0,
            color: 'square'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Keyboard handlers
    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const word = this.state.value;
        if (this.validateWord(word)) {
            this.setState({
                value: '',
                words: this.state.words.concat(word)
            });
        } else {
            alert("Invalid word.");
        }
    }

    // Validators
    validateWord(word) {
        if (word == null || word.length != 5) {
            return false;
        } else {
            return true;
        }
    }

    render() {
        return (
            <div className="Word-duel">
                <header className="Word-duel-header">
                    Word-duel
                </header>
                <Board
                    letters={this.state.letters}
                    guesses={this.state.guesses}
                    words={this.state.words}
                    color={this.state.color}
                />
                <Keyboard
                    value={this.state.value}
                    onChange={i => this.handleChange(i)}
                    onSubmit={i => this.handleSubmit(i)}
                />
            </div>
        );
    }
}

export default WordDuel;