/*

Problem:
Given you can climb 1, 2, or 3 stairs in one step, how many ways can you reach the top?

Solution:
You can solve the problem inductively. The number of ways you can climb 1 step is 1
since you can only use 1 step. With 2 steps, the number of ways is 2, that is, the 
number of ways you can climb using single steps and double steps. With 3 steps, it 
becomes the sum of the number of ways you can climb it using 1, 2, or 3 steps. This
has the characteristics of recursion and has the recurrence:

f(n) = f(n-1) + f(n-2) + f(n-3)

which is similiar to the fibonacci sequence. So, we can solve this problem
by applying the algorithm for a fibonacci sequence.

*/


const assert = require('assert');
let cache = {};

/**
* Number of ways to reach to top of a n staircase with 1, 2, or 3 possible step increments.
* @param {Number} n - The number of steps.
* @returns {Number} value - The number ways to get to the top of staircase.
*/
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
