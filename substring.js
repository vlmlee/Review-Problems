/*

Problem:
Determine if a string is a substring and if it is, print out the index of its 
first occurence.

Solution:
We can use es7's 'includes' method to quickly determine if a substring exist and then
do a linear search of each substring of the same length.

Time complexity: O(n)

*/

const assert = require('assert');

/**
* Check if a string is a substring of another.
* @param {string} str - String to search in.
* @param {string} key - The substring to search for.
* @returns {Boolean}
*/
function isSubstring(str, key) {
	if (str.includes(key)) {
		for (let i = 0, len = key.length; i < str.length; i++) {
			if (str.slice(i, len + i) === key) {
				return `Index found: ${i}`;
			}
		}
	} else {
		return false;
	}
}

assert.equal(isSubstring('supersubstring', 'str'), 'Index found: 8');
assert.equal(isSubstring('notinthisone', 'str'), false);
