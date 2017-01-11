function arrayToBST(arr, tree) {
	if (!arr.length) {
		return;
	}
	let mid = Math.floor((arr.length)/ 2);
	tree.add(arr[mid]);
	arrayToBST(arr.slice(0, mid), tree);
	arrayToBST(arr.slice(mid+1), tree);
}
