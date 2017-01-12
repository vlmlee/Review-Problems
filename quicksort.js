/*

Problem:
Implement quicksort.

Solution:
Implemented using a popular version of quicksort, notably from
K&R.

Time complexity: O(nlogn)

*/

const assert = require('assert');

/**
* ES6 swap
* @param {Array} arr - An input array.
* @param {Number} i - An index to swap elements.
* @param {Number} j - An index to swap elements.
*/
function swap(arr, i, j){
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

/**
* Splits an array into values less than a pivot, the midpoint value, swap
* values in place and returns next pivot's index for the next iteration of 
* quicksort.
* @param {Array} arr - An input array that may or may not be sorted.
* @param {Number} left - The left endpoint of a subarray to sort.
* @param {Number} right - The right endpoint of a subarray to sort.
*/
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

/**
* Quicksort
* @param {Array} arr - An input array.
* @param {Number} left - The left endpoint of a subarray to sort.
* @param {Number} right - The right endpoint of a subarray to sort.
* @returns {Array} arr - A sorted array.
*/
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
