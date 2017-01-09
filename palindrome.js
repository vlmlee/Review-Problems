/*

Problem: 
Determine if a string is a palindrome.

Solution:
A string is a palindrome if it is the same reversed. So, what we 
need to do is reverse the string and see if it's equal to itself. 

Time complexity: O(n)
*/

const assert = require('assert');

// Using built-in methods 'split', 'reverse', and 'join'
// a.k.a. the *best* way
function palindrome(str) {
	return (str.split('').reverse().join('') === str);
}

// 'In-place'-like (since strings are immutable) iterative solution
function inPlacePalindrome(str) {
	let p = '';
	for (let i = str.length - 1; i >= 0; i--) {
		p += str[i];
	}
	return p === str;
}

assert(palindrome('abcba'));
assert.equal(palindrome('abc'), false);
assert(inPlacePalindrome('abbba'));
assert.equal(inPlacePalindrome('abc'), false);
