/*

Problem:
Implement binary search in a sorted rotated array.

Solution:
We split the array in two by its minimum value which
we get by finding the peak of the array. We then perform
a binary search on the array where the key is in range.

Time complexity: O(logn)

*/

const assert = require('assert');

/**
* Finds the minimum of a rotated sorted array.
* @param {Array} arr - An input array.
* @returns {*} low - The minimum of the array.
*/
function findMin(arr) {
	let low = 0,
		high = arr.length - 1;
	while (arr[low] > arr[high]) {
		let mid = Math.floor((low + high) / 2);
		if (arr[mid] > arr[high]) {
			low = mid + 1;
		} else {
			high = mid;
		}
	}
	return low;
}

/**
* Splits a rotated sorted array into two sorted arrays and searches for a key.
* @param {Array} arr - An input array.
* @param {*} key - A value to search for in the array.
* @returns {Boolean}
*/
function pivotBsearch(arr, key) {
	let pivot = findMin(arr);
	if (arr[pivot] === key) return true;
	if (arr[0] <= key) return bsearch(arr, 0, pivot, key);
	return bsearch(arr, pivot + 1, arr.length - 1, key);
}

/**
* Binary search algorithm
* @param {Array} arr - An input array.
* @param {*} low - Left endpoint of a binary search.
* @param {*} high - Right endpoint of a binary search.
* @param {*} key - A value to search for in the array.
* @returns {Boolean}
*/
function bsearch(arr, low, high, key) {
	if (!arr) {
		return false;
	}
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

assert.equal(findMin([5, 6, 7, 8, 1, 2, 3]), 4);
assert.equal(pivotBsearch([6, 7, 1, 2, 3, 4], 2), true);
assert.equal(pivotBsearch([6, 7, 1, 2, 3, 4], 5), false);
