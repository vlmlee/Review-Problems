/*

Problem:
Check if a tree is balanced.

Solution:
A tree is unbalanced if the nodes of all subtrees have
at most a 1 level height difference. We check the height
of every subtree and if we find a height difference
greater than 1, we return false. Else, once we reach
the leaves of the subtrees, we return true.

*/

/**
* Returns the height of a subtree.
*
* @param {Node} node - The root node of the subtree.
* @returns {Number} - The height of the subtree.
*/
getHeight(node) {
    if (!node) {
        return -1;
    }
    let left = this.getHeight(node.left),
        right = this.getHeight(node.right);
    return Math.max(left, right) + 1;
}

/**
* Returns if the subtree is balanced.
*
* @param {Node} node - The root node of the subtree.
* @returns {Boolean} 
*/
isBalanced(node) {
    if (!node) {
        return true;
    }
    let heightLeft = this.getHeight(node.left),
        heightRight = this.getHeight(node.right),
        diff = Math.abs(heightLeft - heightRight);
    if (diff > 1) {
        return false;
    } else {
        return this.isBalanced(node.left) && this.isBalanced(node.right);
    }
}
