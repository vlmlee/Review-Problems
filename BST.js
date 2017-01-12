/*

Problems:
Implement a binary search tree.

Solution:
Wrote a es6 binary search tree using well known BST operations.

*/

const assert = require('assert');

/**
* Class representing a Node.
*/
class Node {
    
    /**
    * Create a node.
    * @param {*} data - A value held by the node.
    */
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

/**
* Class representing a binary search tree.
*/
class BST {
    
    /**
    * Create a binary search tree with a root with initial value null.
    */
	constructor() {
		this.root = null;
	}

    /**
    * Add a node to the binary search tree with a initial value.
    * @param {*} data - A value held by the node.
    */
	add(data) {
		let node = new Node(data);
		if (!this.root) {
			this.root = node;
		} else {
			let current = this.root;
			while (current) {
				if (node.data < current.data) {
					if (!current.left) {
						current.left = node;
						break;
					}
					current = current.left;
				} else if (node.data > current.data) {
					if (!current.right) {
						current.right = node;
						break;
					}
					current = current.right;
				} else {
					break;
				}
			}
		}
	}

    /**
    * Remove a node from the binary if it holds a certain value.
    * @param {*} data - The value held by the node you want to remove.
    * @returns {node}
    */
	remove(data) {
		let self = this;
		let removeNode = function(node, data) {
			if (!node) {
				return null;
			}
			if (data === node.data) {
				if (!node.left && !node.right) {
					return null;
				}
				if (!node.left) {
					return node.right;
				}
				if (!node.right) {
					return node.left;
				}
				let temp = self.getMin(node.right);
				node.data = temp;
				node.right = removeNode(node.right, temp);
				return node;
			} else if (data < node.data) {
				node.left = removeNode(node.left, data);
				return node;
			} else {
				node.right = removeNode(node.right, data);
				return node;
			}
		};
		this.root = removeNode(this.root, data);
	}

    /**
    * Returns the minimum value of a subtree.
    * @param {node} node - Starting point in the subtree.
    * @returns {*} data - The minimum value of the subtree.
    */
	getMin(node) {
		if (!node) {
			node = this.root;
		}
		while (node.left) {
			node = node.left;
		}
		return node.data;
	}
    
    /**
    * Returns the maximum value of a subtree.
    * @param {node} node - Starting point in the subtree.
    * @returns {*} data - The maximum value of the subtree.
    */
	getMax(node) {
		if (!node) {
			node = this.root;
		}
		while (node.right) {
			node = node.right;
		}
		return node.data;
	}

    /**
    * Search the tree to see if a value exists.
    * @param {*} data - The value you want to search.
    * @returns {Boolean}
    */
	search(data) {
		let current = this.root;
		while (current) {
			if (data === current.data) {
				return true;
			}
			if (data < current.data) {
				current = current.left;
			} else {
				current = current.right;
			}
		}
		return false;
	}

    /**
    * Traverses the tree in preorder order.
    * @param {node} node - The starting node of the traversal.
    * @param {Array} preorder - An array containing any previous values.
    * @returns {Array} - Array of values in preorder order.
    */
	preOrder(node, preorder) {
		if (!preorder) {
			preorder = [];
		}
		if (node) {
			preorder.push(node.data);
			this.preOrder(node.left, preorder);
			this.preOrder(node.right, preorder);
		}
		return preorder;
	}

    /**
    * Traverses the tree in postorder order.
    * @param {node} node - The starting node of the traversal.
    * @param {Array} postorder - An array containing any previous values.
    * @returns {Array} - Array of values in postorder order.
    */
	postOrder(node, postorder) {
		if (!postorder) {
			postorder = [];
		}
		if (node) {
			this.postOrder(node.left, postorder);
			this.postOrder(node.right, postorder);
			postorder.push(node.data);
		}
		return postorder;
	}

    /**
    * Traverses the tree in inorder order.
    * @param {node} node - The starting node of the traversal.
    * @param {Array} inorder - An array containing any previous values.
    * @returns {Array} - Array of values in inorder order.
    */
	inOrder(node, inorder) {
		if (!inorder) {
			inorder = [];
		}
		if (node) {
			this.inOrder(node.left, inorder);
			inorder.push(node.data);
			this.inOrder(node.right, inorder);
		}
		return inorder;
	}

    /**
    * Inverts the binary search tree.
    * @param {node} node - The root node of the subtree to invert. 
    * @returns {node} node - Returns node to set left -> right, right -> left.
    */
	invert(node) {
		if (node) {
			let left = node.left ? node.left : null,
				right = node.right ? node.right : null;
			node.left = this.invert(right);
			node.right = this.invert(left);
		}
		return node;
	}

    /**
    * Depth first search.
    * @param {node} current - The starting node of the traversal.
    * @param {Array} order - An array containing any previous values.
    * @returns {Array} - Array of values in dfs order.
    */
	dfs(current, order) {
		if (!order) {
			order = [];
		}
		return this.preOrder(current, order);
	}

    /**
    * Breadth first search.
    * @param {node} current - The starting node of the traversal.
    * @param {Array} order - An array containing any previous values.
    * @returns {Array} - Array of values in bfs order.
    */
	bfs(current, order) {
		if (!order) {
			order = [];
		}
		this.queue = [];
		this.queue.push(current);
		while(this.queue.length) {
			let node = this.queue.shift();
			order.push(node.data);
			if (node.left) {
				this.queue.push(node.left);
			}
			if (node.right) {
				this.queue.push(node.right);
			}
		}
		return order;
	}

    /**
    * Returns the high of a subtree.
    * @param {node} node - The root node of the subtree.
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
    * @param {node} node - The root node of the subtree.
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
}

/**
* Converts a sorted array into a binary search tree.
* @param {Array} arr - A sorted array.
* @param {tree} tree - A tree structure.
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

/**
* Checks if two trees are mirror images of one another.
* @param {tree} t1 - The first tree.
* @param {tree} t2 - The second tree.
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
* Returns the maximum sum of a subtree.
* @param {node} node - The root node of the subtree.
* @returns {Number} sum - Max sum of the subtree.
*/
function maxPathSum(node) {
	if (!node) return 0;
	let left = Math.max(maxPathSum(node.left)),
		right = Math.max(maxPathSum(node.right)),
		sum = node.data + Math.max(left, right);
	return sum;
}

/**
* Returns the lowest common ancestor of two nodes in a subtree.
* @param {node} node - The root node of the subtree.
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

let tree = Object.create(BST.prototype);
arrayToBST([1, 2, 3, 4, 5, 6, 7], tree);

assert.deepEqual(tree.preOrder(tree.root), [4, 2, 1, 3, 6, 5, 7]);
assert.deepEqual(tree.inOrder(tree.root), [1, 2, 3, 4, 5, 6, 7]);
assert.deepEqual(tree.postOrder(tree.root), [1, 3, 2, 5, 7, 6, 4]);
assert.deepEqual(tree.bfs(tree.root), [4, 2, 6, 1, 3, 5, 7]);
tree.invert(tree.root);
assert.deepEqual(tree.inOrder(tree.root), [7, 6, 5, 4, 3, 2, 1]);
assert(tree.isBalanced(tree.root));

let unbalancedTree = Object.create(BST.prototype);
unbalancedTree.add(3);
unbalancedTree.add(2);
unbalancedTree.add(4);
unbalancedTree.add(5);
unbalancedTree.add(6);

assert.equal(unbalancedTree.isBalanced(unbalancedTree.root), false);

let t1 = Object.create(BST.prototype),
	t2 = Object.create(BST.prototype);

t1.add(2);
t1.add(1);
t1.add(3);
t2.add(2);
t2.add(1);
t2.add(3);
t1.invert(t1.root);

assert(mirrorBST(t2, t1));
assert.equal(maxPathSum(t1.root), 5);
assert.equal(maxPathSum(tree.root), 17);

let t3 = Object.create(BST.prototype);
arrayToBST([2, 7, 8, 9, 10, 11, 13, 15, 16], t3);

assert.equal(maxPathSum(t3.root), 49);
assert.equal(lca(t3.root, 7, 9), 8);
