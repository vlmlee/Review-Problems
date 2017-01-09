/*

Problem:
Implement matrix multiply.

Solution:
Writing out the multiplication factors is very helpful in
this exercise. If we have the resulting matrix:

[ z[0][0] ... z[0][N] ]
[ z[1][0] ... z[1][N] ]
[   ...   ...   ...   ]
[ z[N][0] ... z[N][N] ]

Then: 
z[0][0] = x[0][0] * y[0][0] + x[0][1] * y[1][0] + ... + x[0][N] * y[N][0]
z[0][1] = x[0][0] * y[0][1] + x[0][1] * y[1][1] + ... + x[0][N] * y[N][1]
...
z[1][0] = x[1][0] * y[0][0] + x[1][1] * y[1][0] + ... + x[1][N] * y[N][0]
z[1][1] = x[1][0] * y[0][1] + x[1][1] * y[1][1] + ... + x[1][N] * y[N][1]
...
z[i][j] = x[i][0] * y[0][j] + x[i][1] * y[1][j] + ... + x[i][N] * y[N][j]

For each row in matrix x, we will have to create a new array since its rows 
contributes to creating new columns for z while the columns in matrix y only 
contributes to extending the length of the array. We will have to go through 
each element in matrix x and multiply it with the jth element of
each *array* in matrix y, which are the columns. Then we take the sum of 
those multiplications and set it to the z[i][j] position.

*/

const assert = require('assert');

function matrixMultiply(x, y) {
	let z = [];
	for (let i = 0; i < x.length; i++) {
		z[i] = [];
		for (let j = 0; j < x[0].length; j++) {
			let sum = 0;
			for (let k = 0; k < x[0].length; k++) {
				sum += x[i][k] * y[k][j];
			}
			z[i][j] = sum;
		}
	}
	return z;
}

assert.deepEqual(matrixMultiply([[1, 1], [1, 1], [1, 1]], [[1, 1, 1], [1, 1, 1]]), [[2, 2], [2, 2], [2, 2]]);
assert.deepEqual(matrixMultiply([[3, 2], [2, 1]], [[1, 5], [2, 1]]), [[7, 17], [4, 11]]);
