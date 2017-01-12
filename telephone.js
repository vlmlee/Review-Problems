/*

Problem:
Convert numbers into words according to letters on an old phone keypad.

Solution:
Split the incoming numbers into an array and handle each number with
switch/case. Then store the input string of numbers in a dictionary 
with the resulting word for fast lookup.

*/

const assert = require('assert');

let dictionary = {};

/**
* Converts a string of numbers into a word.
* @param {string} input - An input string of numbers.
* @returns {string}
*/
function telephone(input) {
	if (dictionary[input]) {
		console.log('foo');
		return dictionary[input];
	}

	let result = [],
		col = input.split(" ");

	col.forEach(num => {
		switch (num) {
			case '1' : result.push('a'); break;
			case '11' : result.push('b'); break;
			case '111' : result.push('c'); break;
			case '2' : result.push('d'); break;
			case '22' : result.push('e'); break;
			case '222' : result.push('f'); break;
			case '3' : result.push('g'); break;
			case '33' : result.push('h'); break;
			case '333' : result.push('i'); break;
			case '4' : result.push('j'); break;
			case '44' : result.push('k'); break;
			case '444' : result.push('l'); break;
			case '5' : result.push('m'); break;
			case '55' : result.push('n'); break;
			case '555' : result.push('o'); break;
			case '6' : result.push('p'); break;
			case '66' : result.push('q'); break;
			case '666' : result.push('r'); break;
			case '7' : result.push('s'); break;
			case '77' : result.push('t'); break;
			case '777' : result.push('u'); break;
			case '8' : result.push('v'); break;
			case '88' : result.push('w'); break;
			case '888' : result.push('x'); break;
			case '9' : result.push('y'); break;
			case '99' : result.push('z'); break;
			default : result.push('unrecognized character'); break;
		}
	});
	dictionary[input] = result.join('');
	return result.join('');
}

assert.equal(telephone('1 2 3 4'), 'adgj');
assert.deepEqual(dictionary, { '1 2 3 4': 'adgj' });
assert.equal(telephone('33 22 444 444 555') 
	+ ' ' + telephone('88 555 666 444 2'), 'hello world');
