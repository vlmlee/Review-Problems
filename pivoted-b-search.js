const assert = require('assert');

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

function pivotBsearch(arr, key) {
	let pivot = findMin(arr);
	if (arr[pivot] === key) return pivot;
	if (arr[0] <= key) return bsearch(arr, 0, pivot, key);
	return bsearch(arr, pivot + 1, arr.length - 1, key);
}

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
