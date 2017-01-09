/*

Problem:
Reverse an array in place.

Solution:
We use es6 destructuring in order to switch corresponding elements
(mirrored elements) without using a temporary variable. 

*/

const assert = require('assert');

function reverse(arr) {
	for (let i = 0, len = arr.length - 1; i < Math.floor(len/2 + 1); i++) {
		[arr[i], arr[len - i]] = [arr[len - i], arr[i]];
	}
	return arr;
}

assert.deepEqual(reverse([1, 2, 3, 4, 5]), [5, 4, 3, 2, 1]);
assert.deepEqual(reverse(['a', 'b']), ['b', 'a']);
assert.deepEqual(reverse(['a', 1, 'c']), ['c', 1, 'a']);
