function subsets(arr) {
	let set = [],
		combinationsCount = Math.pow(2, arr.length);

	for (let i = 1; i < combinationsCount; i++) {
		let combination = [];
		for (let j = 0; j < arr.length; j++) {
			if (i & Math.pow(2, j)) {
				combination.push(arr[j]);
			}
		}
		set.push(combination);
	}
	return set;
}

console.log(subsets([1,2,3,4,5]));
