/*

Problem:
Find all permutations of an array.

Solution:
We use a well known permutation algorithm called 
Heap's algorithm that systematically swaps elements in 
the array without creating duplicates.
The idea is that it is possible to do this in one
run and can be demonstrated thusly. The algorithm
is recursive and makes swaps in place depending on
the length of the subset of the array in question. 
In our version, if the length of the next subset is odd,
we swap the ith and the last element of that subset, 
and if the length is odd, we swap the ith and the last element:

(Note: these are visual subsets, not actual subarrays.) 

[ 1, 2, 3, 4, 5 ] ... [ [ 1, 2, 3 ] 4 ] 5 ] ...
    ... [ [ [ [ [ 1 ], 2 ], 3 ], 4 ], 5 ] -> first leaf of recursion tree
[ [ [ [ 1, 2 ], 3 ], 4 ], 5 ] <-> [ [ [ [ 2, 1 ], 3 ] , 4 ], 5 ] : swap 0 & end
[ [ [ [ 1, 2 ], 3 ], 4 ], 5 ] => reduce [ [ [ [ [ 1 ], 2 ], 3 ], 4 ], 5 ] -> leaf of recursion, print
[ [ [ [ 2, 1 ], 3 ], 4 ], 5 ] => reduce [ [ [ [ [ 2 ], 1 ], 3 ], 4 ], 5 ] -> leaf of recursion, print

[ [ [ 2, 1, 3 ], 4 ], 5 ] <-> [ [ [ 3, 1, 2 ], 4 ], 5 ] : swap i=0 & end
[ [ [ 3, 1, 2 ], 4 ], 5 ] => reduce
    [ [ [ [ 3, 1 ], 2 ], 4 ], 5 ] <-> [ [ [ [ 1, 3 ], 2 ], 4 ], 5 ] : swap 0 & end
[ [ [ [ 3, 1 ], 2 ], 4 ], 5 ] => reduce [ [ [ [ [ 3 ], 1 ], 2 ], 4 ], 5 ] -> leaf of recursion, print
[ [ [ [ 1, 3 ], 2 ], 4 ], 5 ] => reduce [ [ [ [ [ 1 ], 3 ], 2 ], 4 ], 5 ] -> leaf of recursion, print

[ [ [ 2, 1, 3 ], 4 ], 5 ] <-> [ [ [ 2, 3, 1 ], 4 ], 5 ] : swap i=1 & end
[ [ [ 2, 3, 1 ], 4 ], 5 ] => reduce
    [ [ [ [ 2, 3 ], 1 ], 4 ], 5 ] <-> [ [ [ [ 3, 2 ], 1 ], 4 ], 5 ] : swap 0 & end
[ [ [ [ 2, 3 ], 1 ], 4 ], 5 ] => reduce [ [ [ [ [ 2 ], 3 ], 1 ], 4 ], 5 ] -> leaf of recursion, print
[ [ [ [ 3, 2 ], 1 ], 4 ], 5 ] => reduce [ [ [ [ [ 3 ], 2 ], 1 ], 4 ], 5 ] -> leaf of recursion, print

etc.

*/

/**
* ES6 in-place swap using destructuring.
*
* @param {Array} array - An input array.
* @param {Number} i - An index in the array.
* @param {Number} j - An index in the array.
*/
function swap(array, i, j) {
	[array[i], array[j]] = [array[j], array[i]]
}

/**
* Algorithm that in-place swaps every element with a callback.
*
* @param {Array} array - An input array.
* @param {Function} callback - A callback function.
* @param {Number} n - The number of items in the list to permute from the left.
*/
function permute(array, callback, n) {
	n = n || array.length;
	if (n === 1) {
		callback(array);
	} else {
		for (let i = 1; i <= n; i++) {
			permute(array, callback, n - 1);
			if (n % 2) var j = 1;
			else var j = i;
			swap(array, j - 1, n - 1);
		}
	}
}

permute([1, 2, 3], console.log);
