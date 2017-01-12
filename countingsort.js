/*

Problem:
Implement countingsort.

Solution:
We count each occurrrence of an item by using a
object and then we push the keys into an array 
for the number of times equal to their values.

Time complexity: O(n)

*/

const assert = require('assert');

/**
* Counting sort
* @param {Array} arr - An input array that may or may not be sorted.
* @returns {Array} result - A sorted array.
*/
function countingsort(arr) {
	let count = {},
		result = [];
	arr.map(i => {
		if (count[i]) count[i]++;
        else count[i] = 1;
	});
	Object.keys(count).map(i => {
		for (let j = 0; j < count[i]; j++) {
			result.push(i);
		}
	});
	return result;
}

assert.deepEqual(countingsort([4, 2, 3, 1, 1, 2]), [1, 1, 2, 2, 3, 4]);
