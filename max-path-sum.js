function maxPathSum(node) {
	if (!node) return 0;
	let left = Math.max(maxPathSum(node.left)),
		right = Math.max(maxPathSum(node.right)),
		sum = node.data + Math.max(left, right);
	return sum;
}
