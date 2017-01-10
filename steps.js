const assert = require('assert');
let cache = {};

function steps(n) {
	if (cache[n]) {
		return cache[n];
	}
	if (n === 0) {
		return 1;
	} else if (n < 0) {
		return 0;
	} else {
		let value = steps(n - 1) + steps(n - 2) + steps(n - 3);
		cache[n] = value;
		return value;
	}
}

assert.equal(steps(0), 1);
assert.equal(steps(1), 1);
assert.equal(steps(5), 13);
assert.deepEqual(cache, { '1': 1, '2': 2, '3': 4, '4': 7, '5': 13 });
