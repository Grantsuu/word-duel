export function selectWords(num, length) {
    const data = require('../../data/words/' + length + '_letters_normal.json');
    const words = [];
    const obj_keys = Object.keys(data);

    while(words.length < num) {
        var random_word = obj_keys[Math.floor(Math.random() *obj_keys.length)];
        if (!words.includes(random_word)){
            words.push(data[random_word].split(''));
        }
    }

    return words;
}

export function findWord(word) {
    const data = require('../../data/words/' + word.length + '_letters.json');

    return data.includes(word.toLowerCase());
}