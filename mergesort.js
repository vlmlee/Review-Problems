const assert = require('assert');

function mergesort(arr) {
	if (arr.length < 2) {
		return arr;
	}

	let sorted = [],
	    mid = Math.floor(arr.length / 2),
	    left = arr.slice(0, mid),
	    right = arr.slice(mid);

	let sleft = mergesort(left),
	    sright = mergesort(right);

	while (sleft.length || sright.length) {
		if (sleft.length && (!sright.length || sleft[0] < sright[0])) {
			sorted.push(sleft.shift());
		} else {
			sorted.push(sright.shift());
		}
	}
	return sorted;
}

assert.deepEqual(mergesort([1, 2, 3, 2, 1, 4, 5]), [1, 1, 2, 2, 3, 4, 5]);
assert.deepEqual(mergesort([2, 1]), [1, 2]);
