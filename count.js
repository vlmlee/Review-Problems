const assert = require('assert');

function count(arr) {
	let col = {};
	arr.forEach(i => {
		if (col[i]) {
			col[i] += 1;
		} else {
			col[i] = 1;
		}
	});
	return col;
}

assert.deepEqual(count(['a', 'a', 'b', 'c']), { 'a': 2, 'b': 1, 'c': 1 });
