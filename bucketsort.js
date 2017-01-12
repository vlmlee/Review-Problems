/*

Problem:
Implement bucketsort.

Solution:
Bucketsort separates a list of items into two or more 
buckets meeting certain conditions. The contents of each
bucket is then separated again until they all have their own
buckets. The items are then collected in order or in which ever 
order you set from each level until all the items are sorted. 
This sorting algorithm is stable.

Time complexity: O(n)

*/

const assert = require('assert');

function bucketsort(arr) {
	if (arr.length < 1) {
		return arr;
	}
	let left = [],
		right = [],
		pivot = arr[0];
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] < pivot) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}
	return bucketsort(left).concat(pivot).concat(bucketsort(right));
}

assert.deepEqual(bucketsort([1, 3, 4, 2, 5]), [1, 2, 3, 4, 5]);
assert.deepEqual(bucketsort([1, 3, 1, 2, 1]), [1, 1, 1, 2, 3]);
assert.deepEqual(bucketsort(['a', 'f', 'c', 'e', 'b']), ['a', 'b', 'c', 'e', 'f']);
