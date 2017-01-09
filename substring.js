/*

Problem:
Determine if a string is a substring and if it is, print out the index.

Solution:
We can use es7's include to quickly determine if a substring exist and then
do a linear search of each substring of the same length in the main
string.

*/

const assert = require('assert');

function isSubstring(str, sub) {
	if (str.includes(sub)) {
		for (let i = 0, len = sub.length; i < str.length; i++) {
			if (str.slice(i, len + i) === sub) {
				return `Index found: ${i}`;
			}
		}
	} else {
		return false;
	}
}

assert.equal(isSubstring('supersubstring', 'str'), 'Index found: 8');
assert.equal(isSubstring('notinthisone', 'str'), false);
