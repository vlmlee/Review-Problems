/*

Pre-order traversal
	1. Check if the current node is empty/null
	2. Display the data part of the root (or current node)
	3. Traverse the left subtree by recursively calling the pre-order function
	4. Traverse the right subtree by recursively calling the pre-order function
  
*/

_preOrder(node, callback) {
	if (node) {
		if (callback) {
			callback(node);
		}
	}

	this._preOrder(node.left, callback);
	this._preOrder(node.right, callback);
}

/*

In-order traversal
	1. Check if the current node is empty/null
	2. Traverse the left subtree by recursively calling the in-rder function
	3. Display the data part of the root (or current node)
	4. Traverse the right subtree by recursively calling the in-order function
  
*/

_inOrder(node, callback) {
	if (node) {
		this._inOrder(node.left, callback);
		if (callback) {
			callback(node);
		}
	}

	this._inOrder(node.right, callback);
}

/*

Post-order traversal
	1. Check if the current node is empty/null
	2. Traverse the left subtree by recursively calling the post-order function
	3. Traverse the right subtree by recursively calling the post-order function
	4. Display the data part of the root (or current node)
  
*/

_postOrder(node, callback) {
	if (node) {
		this._postOrder(node.left, callback);
		this._postOrder(node.right, callback);
		if (callback) {
			callback(node);
		}
	}
}
