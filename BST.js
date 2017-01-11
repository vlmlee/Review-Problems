const assert = require('assert');

class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

class BST {
	constructor() {
		this.root = null;
	}

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

	getMin(node) {
		if (!node) {
			node = this.root;
		}
		while (node.left) {
			node = node.left;
		}
		return node.data;
	}

	getMax(node) {
		if (!node) {
			node = this.root;
		}
		while (node.right) {
			node = node.right;
		}
		return node.data;
	}

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

	invert(node) {
		if (node) {
			let left = node.left ? node.left : null,
				right = node.right ? node.right : null;
			node.left = this.invert(right);
			node.right = this.invert(left);
		}
		return node;
	}

	dfs(current, order) {
		if (!order) {
			order = [];
		}
		return this.preOrder(current, order);
	}

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

	getHeight(node) {
		if (!node) {
			return -1;
		}
		let left = this.getHeight(node.left),
			right = this.getHeight(node.right);
		return Math.max(left, right) + 1;
	}

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

	maxToRoot(node, max) {
		if (!node) {
			return 0;
		}

		let left = Math.max(this.maxToRoot(node.left), 0),
			right = Math.max(this.maxToRoot(node.right), 0);

		let ps1 = node.data + Math.max(left, right),
			ps2 = node.data + left + right;

		max = Math.max(max, ps1, ps2);

		return ps1;
	}
}

function arrayToBST(arr, tree) {
	if (!arr.length) {
		return;
	}
	let mid = Math.floor((arr.length)/ 2);
	tree.add(arr[mid]);
	arrayToBST(arr.slice(0, mid), tree);
	arrayToBST(arr.slice(mid+1), tree);
}

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

function maxPathSum(node) {
	if (!node) return 0;
	let left = Math.max(maxPathSum(node.left)),
		right = Math.max(maxPathSum(node.right)),
		sum = node.data + Math.max(left, right);
	return sum;
}

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
