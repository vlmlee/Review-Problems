/*

Problem:
Collect all occurrences of an item in a list.

Solution:
We create an object to tally the occurrences of each 
element. We do so by simply incrementing the value by 1
if it exists in the object or setting the value to 1 if 
it doesn't already exist.

*/

const assert = require('assert');

/**
* Counting function
* @param {Array} arr - Input array to count items in the list.
* @returns {Object} col - Returns an object showing the number of
* occurrences of each item.
*/ 
function count(arr) {
	let col = {};
	arr.map(i => {
		if (col[i]) {
			col[i] += 1;
		} else {
			col[i] = 1;
		}
	});
	return col;
}

assert.deepEqual(count(['a', 'a', 'b', 'c']), { 'a': 2, 'b': 1, 'c': 1 });
