/*

Problem:
Implement add, remove, and search for a singly linked list.

Solution:
A class-based implementation of a linked list.

*/

const assert = require('assert');

/**
* Class representing a linked list.
*/
class LinkedList {
    
    /**
    * @constructor - creates empty list with length 0 and null root
    */
	constructor() {
		this._length = 0;
		this.root = null;
	}

    /**
    * Adds a node to the linked list. If no nodes exist, sets the node to root.
    *
    * @param {*} value - A value held by the node.
    * @returns {Node}
    */
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

    /**
    * Searches the list for a node at a particular position
    *
    * @param {Number} position - The position to return a node.
    * @returns {Node}
    */
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

    /**
    * Removes a node at a particular position.
    *
    * @param {Number} position - The position to remove a node.
    * @returns {Node} deletedNode - Info on the deleted node.
    */
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

/**
* Class representing a Node.
*/
class Node {
    
    /**
    * Creates a node.
    *
    * @param {*} data - A value held by the node.
    */
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
