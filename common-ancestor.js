function lca(node, a, b) {
	if (!node || node.data === a || node.data === b) return node;
	let left = lca(node.left, a, b),
		right = lca(node.right, a, b);
	return (left && right) ? node.data : (left || right);
}
