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
}

let tree = Object.create(BST.prototype);

tree.add(2);
tree.add(1);
tree.add(3);
tree.add(4);
tree.add(5);

assert.deepEqual(tree.preOrder(tree.root), [2, 1, 3, 4, 5]);
assert.deepEqual(tree.inOrder(tree.root), [1, 2, 3, 4, 5]);
assert.deepEqual(tree.postOrder(tree.root), [1, 5, 4, 3, 2]);

