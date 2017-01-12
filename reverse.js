/*

Problem:
Reverse an array in place.

Solution:
We use es6 destructuring in order to switch corresponding elements
(mirrored elements) without using a temporary variable. 

Time complexity: O(n)

*/

const assert = require('assert');

/**
* Reverses an array in place.
* @param {Array} arr - An input array.
* @returns {Array} arr - Reversed array.
*/
function reverse(arr) {
	for (let i = 0, len = arr.length - 1; i < Math.floor(len/2 + 1); i++) {
		[arr[i], arr[len - i]] = [arr[len - i], arr[i]];
	}
	return arr;
}

assert.deepEqual(reverse([1, 2, 3, 4, 5]), [5, 4, 3, 2, 1]);
assert.deepEqual(reverse(['a', 'b']), ['b', 'a']);
assert.deepEqual(reverse(['a', 1, 'c']), ['c', 1, 'a']);
