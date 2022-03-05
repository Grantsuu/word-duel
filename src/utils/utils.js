export const MAX_GUESSES = 6;

const EvaluationColor = {
    Gray: "gray",
    Yellow: "yellow",
    Green: "green"
}

export function getEvaluation([...word], [...guess]) {
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

export function isWordLength(word, guess) {
    if (word.length === guess.length) {
        return true;
    }

    return false;
}

export function isMaxGuesses(guesses) {
    if (guesses.length >= MAX_GUESSES) {
        return true;
    }
    return false;
}

export function isWin(evaluation) {
    if (evaluation.some(result => result !== "green")) {
        return false;
    }

    return true;
}