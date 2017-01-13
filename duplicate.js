/*
	
Problem:
Find all duplicates in an array.

Solution:
We pop off the last element and do a binary search 
(which we sorted). If we find the element in the array,
we push it into an array which indicates that there exists
a duplicate of it. Since we begin at the end, move backwards,
and push elements in, the resulting dup array will be in
descending order.

Time complexity: O(nlogn)

*/

const assert = require('assert');

/**
* Finds duplicates in an array
*
* @param {Array} arr - An input array which may or may not be sorted.
* @returns {Array} dups - An array of the duplicate items.
*/
function findDuplicates(arr) {
	let dups = [],
		sortedArr = arr.sort();

	for (let i = arr.length - 1; i >= 0; i--) {
		let key = arr.pop(),
			found = bsearch(key, sortedArr);
		if (found) {
			if (dups.indexOf(key) === -1) {
				dups.push(key);
			}
		}
	}
	return dups;
}

/**
* Binary search algorithm
*
* @param {*} key - The search key to compare elements.
* @param {Array} arr - A sorted input array.
* @returns {Boolean}
*/
function bsearch(key, arr) {
	if (!arr) {
		return false;
	}

	let low = 0,
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

assert.deepEqual(findDuplicates([1, 2, 3, 3, 2, 4, 4]), [4, 3, 2]);
assert.deepEqual(findDuplicates([1, 1, 1, 1, 1]), [1]);
assert.deepEqual(findDuplicates([1, 2, 3, 4, 5]), []);
assert.deepEqual(findDuplicates([2, 2, 3, 3, 2]), [3, 2]);
