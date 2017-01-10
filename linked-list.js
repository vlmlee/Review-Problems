/*

Problem:
Implement add, remove, and search for a singly linked list.

Solution:
A class-based implementation of a linked list.

*/

const assert = require('assert');

class LinkedList {
	constructor() {
		this._length = 0;
		this.root = null;
	}

	add(value) {
		let node = new Node(value);
        
		if (this._length) {
			this.root.next = node;
		} else {
			this.root = node;
		}
        
		this._length++;
		return node;
	}

	search(position) {
		let currentNode = this.root,
			count = 1;

		if (this._length === 0 || position < 1 || position > this._length) {
			throw new Error('Cannot find node');
		}

		while (count < position) {
			currentNode = currentNode.next;
			count++;
		}
        
		return currentNode;
	}

	remove(position) {
		let currentNode = this.root,
			count = 1,
			nodeToDelete,
			deletedNode;

		if (this._length === 0 || position < 1 || position > this._length) {
			throw new Error('Could not delete node');
		}

		if (position === 1) {
			this.root = currentNode.next;
		} else {
			while (count < position - 1) {
				currentNode = currentNode.next;
				count++;
			}

			nodeToDelete = currentNode.next;
			currentNode.next = nodeToDelete.next;
			deletedNode = nodeToDelete;
			nodeToDelete = null;
		}
        
		this._length--;
		return deletedNode;
	}
}

class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

let list = new LinkedList();
list.add(1);
assert.equal(list.search(1).data, 1);
list.add(2);
assert(list.remove(2));
