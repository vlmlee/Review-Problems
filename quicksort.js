const assert = require('assert');

function swap(arr, i, j){
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

function partition(arr, left, right) {
    let index = Math.floor((right + left) / 2),
        pivot = arr[index],
        i = left,
        j = right;

    while (i < j) {
        while (arr[i] < pivot) {
            i++;
        }
        while (arr[j] > pivot) {
            j--;
        }
        if (i < j) {
            swap(arr, i, j);
            if (i === index) {
                index = j;
            } else if (j === index) {
                index = i;
            }
            i++;
            j--;
        }
    }
    return index;
}

function quicksort(arr, left, right) {
    if (arr.length > 1) {
        let pivotinx = partition(arr, left, right);
        if (left < pivotinx - 1) quicksort(arr, left, pivotinx - 1);
        if (pivotinx + 1 < right) quicksort(arr, pivotinx + 1, right);
    }
    return arr;
}

let a = [1, 3, 2, 5, 4],
    b = [1, 1, 0, 1, 1],
    c = ['b', 'a', 'd', 'c', 'e'];

assert.deepEqual(quicksort(a, 0, a.length - 1), [1, 2, 3, 4, 5]);
assert.deepEqual(quicksort(b, 0, b.length - 1), [0, 1, 1, 1 ,1]);
assert.deepEqual(quicksort(c, 0, c.length - 1), ['a', 'b', 'c', 'd', 'e']);
