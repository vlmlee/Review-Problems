/*

Problem:
Construct a BST from a sorted array.

Solution:
Insert the middle element into a BST and then
recursively split the array and insert the middle
elements of those arrays.

Time complexity: O(n) - slice()

*/

/**
* Converts a sorted array into a binary search tree.
*
* @param {Array} arr - A sorted array.
* @param {BST} tree - A tree structure.
*/
function arrayToBST(arr, tree) {
	if (!arr.length) {
		return;
	}
	let mid = Math.floor((arr.length)/ 2);
	tree.add(arr[mid]);
	arrayToBST(arr.slice(0, mid), tree);
	arrayToBST(arr.slice(mid+1), tree);
}
