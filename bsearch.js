/*

Problem:
Write a binary search algorithm.

Solution:
Our binary search function takes in a 'key' and a list of
values. If the array is empty, we return false, indicating that the
key does not exist in the array. Binary search only works on
sorted lists, so we will have to make sure the input list or
array is sorted. The first value we compare our key to is the 
midpoint value of the array where the reference points are at 
the beginning and end of the array. If the key is greater than 
that value, we set the lower reference point to one element ahead 
of the midpoint and we recalculate the next midpoint. If the key 
is less than that value, we set the upper reference point to one 
element before the midpoint. We repeat this until we either find 
the key or when the reference points cross.

Time complexity: O(nlogn) with sort(), O(logn) for sorted input

*/


const assert = require('assert');

function bsearch(key, a) {
	if (!a) {
		return false;
	}

	let arr = a.sort(),
		low = 0,
		high = arr.length - 1;

	while (low <= high) {
		let mid = Math.floor((low + high) / 2),
			value = arr[mid];

		if (value > key) {
			high = mid - 1;
		} else if (value < key) {
			low = mid + 1;
		} else {
			return true;
		}
	}

	return false;
}

assert(bsearch(2, [5, 4, 3, 2, 1]));
assert(bsearch(2, [1, 2, 3, 4, 5]));
assert(bsearch(1, [1]));
assert.equal(bsearch(), false);
assert.equal(bsearch(2, [0, 1, 3, 4, 5]), false);
assert(bsearch(2, [2, 2, 2]));
