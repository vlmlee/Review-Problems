/*

Problem:
Find max path sum in the tree where negative nodes are possible.

Solution:
The context of this question is on a balanced binary search tree so
because of this, we simply traverse the tree and greedily get the
sum from the bottom up. When we get to a leaf node, we set its value
to either left or right depending where we had traversed from. We then
take the max of the two leaf nodes and add it to the parent node and 
repeat this process until we reach the root node.

*/

/**
* Returns the maximum sum of a subtree.
*
* @param {Node} node - The root node of the subtree.
* @returns {Number} sum - Max sum of the subtree.
*/
function maxPathSum(node) {
	if (!node) return 0;
	let left = Math.max(maxPathSum(node.left)),
		right = Math.max(maxPathSum(node.right)),
		sum = node.data + Math.max(left, right);
	return sum;
}
