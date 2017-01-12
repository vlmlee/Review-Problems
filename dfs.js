/*

Problem:
Implement depth-first search.

Solution:
Depth first search is essentially preorder traversal,
meaning that it we want to print out all the leaves of
a subtree before their parents.

*/

/**
* Depth first search
* @param {Node} current - Starting point in the subtree.
* @param {Array} order - An array containing any previous values.
* @returns {Array} - An array of values in preorder order.
*/
dfs(current, order) {
  if (!order) {
    order = [];
  }
  return this.preOrder(current, order);
}
