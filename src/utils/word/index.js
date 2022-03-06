export function selectWords(num, length) {
    const data = require('../../data/words/' + length + '_letters.json');
    const ret = [];
    const obj_keys = Object.keys(data);
    const used_keys = [];

    while(ret.length < num) {
        var ran_key = obj_keys[Math.floor(Math.random() *obj_keys.length)];
        if (!used_keys.includes(ran_key)){
            used_keys.push(ran_key);
            ret.push(data[ran_key]);
        }
    }

    console.log(ret);
    return ret;
}