/*

Problem:
Find all subsets of an array.

Solution:
This solution uses the concept of a bitmask to filter the
element in the ith position while the other elements are 
ignored.

Without the bitmask, to prevent duplicate arrays, we would have 
an array like:

[a, b, c, d] => [ [a], [a, b], [a, b, c], [a, b, c, d],
                  [b], [b, c], [b, c, d], [c], [c, d], [d]
                  ... ]

And collecting any elements before the ith position would be 
inefficient.

With (i & Math.pow(2, j)), when i = 1, i bitwise would be 0001 (in four places). 
Then when j = 0 (0001), only the first element will be pushed into the superset, 
with all the others filtered. On j = 1 (0010), no elements are added. On 
j = 2 (0100), (i & Math.pow(2, j)) is false (0001 & 0100). On j = 3, (0001 & 1001) 
is true and so arr[3] is added. 

Thus, when i = 1, [a, d] are added to the superset. 
When i = 2, [b] is added to the superset.
When i = 3, [a, b, d] is added to the superset.
When i = 4, [c]  is added to the superset.
...

It is the case that we can get all combinations this way.

*/


/**
* Returns the subsets of an array.
*
* @param {Array} arr - An input array.
* @returns {Array} set - Returns the superset of the array.
*/
function subsets(arr) {
	let set = [],
		combinationsCount = Math.pow(2, arr.length);

	for (let i = 1; i < combinationsCount; i++) {
		let combination = [];
		for (let j = 0; j < arr.length; j++) {
			if (i & Math.pow(2, j)) {
				combination.push(arr[j]);
			}
		}
		set.push(combination);
	}
	return set;
}

console.log(subsets([1,2,3,4,5]));
