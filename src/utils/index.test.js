const { EvaluationColor, getEvaluation, isMaxGuesses, isWin } = require('../utils');

/*
 * getEvaluation
 */

test("guess completely matches the word", () => {
    const word = "abcde";
    const guess = "abcde";
    const expected = [EvaluationColor.Green, EvaluationColor.Green, EvaluationColor.Green, EvaluationColor.Green, EvaluationColor.Green];
    expect(getEvaluation(word, guess)).toEqual(expected);
})

test("no letters in guess match any in the word", () => {
    const word = "abcde";
    const guess = "fffff";
    const expected = [EvaluationColor.Gray, EvaluationColor.Gray, EvaluationColor.Gray, EvaluationColor.Gray, EvaluationColor.Gray];
    expect(getEvaluation(word, guess)).toEqual(expected);
})

test("exactly one letter in guess matches one letter in the word even with multiples in the guess", () => {
    const word = "abcde";
    const guess = "aaaaa";
    const expected = [EvaluationColor.Green, EvaluationColor.Gray, EvaluationColor.Gray, EvaluationColor.Gray, EvaluationColor.Gray];
    expect(getEvaluation(word, guess)).toEqual(expected);
})

test("exactly one letter in the guess partially matches one letter in the word even with multiples in the guess", () => {
    const word = "abcde";
    const guess = "faaaa";
    const expected = [EvaluationColor.Gray, EvaluationColor.Yellow, EvaluationColor.Gray, EvaluationColor.Gray, EvaluationColor.Gray];
    expect(getEvaluation(word, guess)).toEqual(expected);
})

test("exactly one letter matches and exactly one letter partially matches even with multiples in the guess", () => {
    const word = "abbde";
    const guess = "aaaba";
    const expected = [EvaluationColor.Green, EvaluationColor.Gray, EvaluationColor.Gray, EvaluationColor.Yellow, EvaluationColor.Gray];
    expect(getEvaluation(word, guess)).toEqual(expected);
})

/*
 * isMaxGuesses
 */

test("empty array is not at max", () => {
    expect(isMaxGuesses([], 6)).toEqual(false);
})

test("array with fewer arrays than the max is not at max", () => {
    expect(isMaxGuesses([[], [], []], 6)).toEqual(false);
})

test("array containing exact amount of max arrays is at max", () => {
    expect(isMaxGuesses([[], [], [], [], [], []], 6)).toEqual(true);
})

test("array containing more than the maximum amount of arrays is at max", () => {
    expect(isMaxGuesses([[], [], [], [], [], [], []], 6)).toEqual(true);
})

/*
 * isWin
 */

test("all green evaluations is a win", () => {
    expect(isWin([EvaluationColor.Green, EvaluationColor.Green, EvaluationColor.Green, EvaluationColor.Green, EvaluationColor.Green])).toEqual(true);
})

test("a single not green evaluation is not a win", () => {
    expect(isWin([EvaluationColor.Gray, EvaluationColor.Green, EvaluationColor.Green, EvaluationColor.Green, EvaluationColor.Green])).toEqual(false);
})

test("all yellow evaluations is not win", () => {
    expect(isWin([EvaluationColor.Yellow, EvaluationColor.Yellow, EvaluationColor.Yellow, EvaluationColor.Yellow, EvaluationColor.Yellow])).toEqual(false);
})

test("all gray evaluations is not win", () => {
    expect(isWin([EvaluationColor.Gray, EvaluationColor.Gray, EvaluationColor.Gray, EvaluationColor.Gray, EvaluationColor.Gray])).toEqual(false);
})