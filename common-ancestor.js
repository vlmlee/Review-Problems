/*

Problem:
Find the lowest common ancestor of 2 nodes in a tree.

Solution:
We traverse from the top of the tree until the values can be found.
If it is found from only one side of a node, we let that node be the 
new root to traverse until the values can be found from both the left 
and right sides. The first node that is returned will be the lowest
common ancestor.

*/

/**
* Returns the lowest common ancestor of two nodes in a subtree.
* @param {Node} node - The root node of the subtree.
* @param {*} a - The value of the first node.
* @param {*} b - The value of the second node.
* @returns {*} - The value of the lowest common ancestor.
*/
function lca(node, a, b) {
	if (!node || node.data === a || node.data === b) return node;
	let left = lca(node.left, a, b),
		right = lca(node.right, a, b);
	return (left && right) ? node.data : (left || right);
}
