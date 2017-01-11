/*

Pre-order traversal
	1. Check if the current node is empty/null
	2. Display the data part of the root (or current node)
	3. Traverse the left subtree by recursively calling the pre-order function
	4. Traverse the right subtree by recursively calling the pre-order function
  
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

/*

In-order traversal
	1. Check if the current node is empty/null
	2. Traverse the left subtree by recursively calling the in-order function
	3. Display the data part of the root (or current node)
	4. Traverse the right subtree by recursively calling the in-order function
  
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

/*

Post-order traversal
	1. Check if the current node is empty/null
	2. Traverse the left subtree by recursively calling the post-order function
	3. Traverse the right subtree by recursively calling the post-order function
	4. Display the data part of the root (or current node)
  
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
