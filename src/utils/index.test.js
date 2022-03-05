const { isMaxGuesses } = require('./utils');

test(`test test`, () => {
    expect(isMaxGuesses({})).toBe(false);
})