const { EvaluationColor, getEvaluation, isMaxGuesses, isWin } = require('../utils');

/*
 * getEvaluation
 */

test('evaluations all match', () => {
    const word = "abcde";
    const guess = "abcde";
    const expected = [EvaluationColor.Green, EvaluationColor.Green, EvaluationColor.Green, EvaluationColor.Green, EvaluationColor.Green];
    expect(getEvaluation(word, guess)).toEqual(expected);
})

test('no evaluations match', () => {
    const word = "abcde";
    const guess = "fffff";
    const expected = [EvaluationColor.Gray, EvaluationColor.Gray, EvaluationColor.Gray, EvaluationColor.Gray, EvaluationColor.Gray];
    expect(getEvaluation(word, guess)).toEqual(expected);
})

test('one match', () => {
    const word = "abcde";
    const guess = "aaaaa";
    const expected = [EvaluationColor.Green, EvaluationColor.Gray, EvaluationColor.Gray, EvaluationColor.Gray, EvaluationColor.Gray];
    expect(getEvaluation(word, guess)).toEqual(expected);
})

test('one partial', () => {
    const word = "abcde";
    const guess = "faaaa";
    const expected = [EvaluationColor.Gray, EvaluationColor.Yellow, EvaluationColor.Gray, EvaluationColor.Gray, EvaluationColor.Gray];
    expect(getEvaluation(word, guess)).toEqual(expected);
})

test('one match, one partial', () => {
    const word = "abbde";
    const guess = "abaaa";
    const expected = [EvaluationColor.Green, EvaluationColor.Yellow, EvaluationColor.Gray, EvaluationColor.Gray, EvaluationColor.Gray];
    expect(getEvaluation(word, guess)).toEqual(expected);
})

/*
 * isMaxGuesses
 */

test(`not at max guesses`, () => {
    expect(isMaxGuesses([], 6)).toEqual(false);
})

test(`at max guesses`, () => {
    expect(isMaxGuesses([[], [], [], [], [], []], 6)).toEqual(true);
})

test(`beyond max guesses`, () => {
    expect(isMaxGuesses([[], [], [], [], [], [], []], 6)).toEqual(true);
})

/*
 * isWin
 */

test(`win`, () => {
    expect(isWin([EvaluationColor.Green, EvaluationColor.Green, EvaluationColor.Green, EvaluationColor.Green, EvaluationColor.Green])).toEqual(true);
})

test(`not win`, () => {
    expect(isWin([EvaluationColor.Gray, EvaluationColor.Green, EvaluationColor.Green, EvaluationColor.Green, EvaluationColor.Green])).toEqual(false);
})

test(`all yellow not win`, () => {
    expect(isWin([EvaluationColor.Yellow, EvaluationColor.Yellow, EvaluationColor.Yellow, EvaluationColor.Yellow, EvaluationColor.Yellow])).toEqual(false);
})

test(`all gray not win`, () => {
    expect(isWin([EvaluationColor.Gray, EvaluationColor.Gray, EvaluationColor.Gray, EvaluationColor.Gray, EvaluationColor.Gray])).toEqual(false);
})