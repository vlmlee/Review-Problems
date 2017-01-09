/*

Problem:
Merge two sorted arrays.

Solution:
The solution takes in two arrays as parameters and compares the elements 
at the beginning of the arrays. We shift the result into another array and 
repeat this process until one array empties, which then we concatenate 
the remaining elements to the now merged array. If the array are sorted in 
ascending order, our comparison pushes the lower number into the new array. 
If it is sorted descending, we push the higher number.

Time complexity: O(l+r), i.e. length of the arrays

*/

const assert = require('assert');

function merge(left, right) {
	let merged = [],
	    which = left.length > right.length ? left : right,
	    order = (function() {
			for (let i = 0; i < which.length - 1; i++) {
				if (which[i] > which[i + 1]) {
					return false;
				}
			}
			return true;
		})();

	if (order) {
		while (left.length && right.length) {
			if (left[0] <= right[0]) {
				merged.push(left.shift());
			} else {
				merged.push(right.shift());
			}
		}
		return merged.concat(left).concat(right);
	} else {
		while (left.length && right.length) {
			if (left[0] >= right[0]) {
				merged.push(left.shift());
			} else {
				merged.push(right.shift());
			}
		}
		return merged.concat(left).concat(right);
	}
}

assert.deepEqual(merge([1, 2, 3], [2, 3, 4, 5]), [1, 2, 2, 3, 3, 4, 5]);
assert.deepEqual(merge([1, 2, 3], []), [1, 2, 3]);
assert.deepEqual(merge([3, 2, 1], [5, 3, 2, 1]), [5, 3, 3, 2, 2, 1, 1]);
assert.deepEqual(merge([1], []), [1]);
assert.deepEqual(merge([1, 2, 3], [1, 1, 1, 1, 1, 1]), [1, 1, 1, 1, 1, 1, 1, 2, 3]);
assert.deepEqual(merge([1, 1, 1, 1, 1, 1], [1, 2, 3]), [1, 1, 1, 1, 1, 1, 1, 2, 3]);
