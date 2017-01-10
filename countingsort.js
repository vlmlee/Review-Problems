const assert = require('assert');

function countingsort(arr) {
	let count = {},
	    result = [];

	arr.map(i => {
		if (typeof i === 'string') {
			i = i.charCodeAt(0);
		}
		if (count[i]) {
			count[i]++;
		} else {
			count[i] = 1
		}
	});

	Object.keys(count).map(i => {
		for (let j = 0; j < count[i]; j++) {
			if (~~i >= 97) {
				i = String.fromCharCode(i);
			} else {
				i = ~~i;
			}
			result.push(i);
		}
	});
	return result;
}

assert.deepEqual(countingsort([4, 2, 3, 1, 1, 2]), [1, 1, 2, 2, 3, 4]);
assert.deepEqual(countingsort(['d', 'a','f', 'c', 'b']), ['a', 'b', 'c', 'd', 'f']);
