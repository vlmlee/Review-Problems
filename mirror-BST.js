/*

Problem:
Check if two trees are mirror image of each other

Solution:
We invert a tree and do an traversal of that tree. We then
compare every node (or value of that node) to the second tree
and if they are equal, then the two trees are mirror images.

*/

/**
* Checks if two trees are mirror images of one another.
* @param {BST} t1 - The first tree.
* @param {BST} t2 - The second tree.
* @returns {Boolean}
*/
function mirrorBST(t1, t2) {
	t1.invert(t1.root);
	let a = t1.inOrder(t1.root),
		b = t2.inOrder(t2.root);
	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) {
			return false;
		}
	}
	return true;
}

/**
* Inverts the binary search tree.
* @param {Node} node - The root node of the subtree to invert. 
* @returns {Node} node - Returns node to set left -> right, right -> left.
*/
function invert(node) {
    if (node) {
        let left = node.left ? node.left : null,
            right = node.right ? node.right : null;
        node.left = this.invert(right);
        node.right = this.invert(left);
    }
    return node;
}
