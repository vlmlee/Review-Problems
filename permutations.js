function swap(array, i, j) {
	[array[i], array[j]] = [array[j], array[i]]
}

function permute(array, callback, n) {
	n = n || array.length;
	if (n === 1) {
		callback(array);
	} else {
		for (let i = 1; i <= n; i++) {
			permute(array, callback, n - 1);
			if (n % 2) {
				var j = 1;
			} else {
				var j = i;
			}
			swap(array, j - 1, n - 1);
		}
	}
}

permute([1, 2, 3], console.log);
