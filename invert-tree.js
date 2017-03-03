/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if (root) {
        var left  = root.left  ? root.left  : null,
            right = root.right ? root.right : null;
        root.left  = invertTree(right);
        root.right = invertTree(left);
    }
    return root;
};
