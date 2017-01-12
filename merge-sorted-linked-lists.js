/*

Problem:
Merge two sorted lists.

Solution:
The solution is almost identical to merging two arrays except we 
are using linked lists operations to add values into a new linked list. 
We start at the heads of the two linked list, compare the two, and 
insert the lesser node or value into the new linked list while also 
moving onto the next node of that linked list. We do this comparison 
until we reach the end of a linked list and then add the rest of the other 
linked list to the new linked list. 

*/

const LinkedList = require('./LinkedList.js'),
      assert = require('assert');

/**
* Merges two sorted linked lists.
* @param {LinkedList} la - First linked list.
* @param {LinkedList} lb - Second linked list.
* @returns {LinkedList}
*/
function mergeLinkedList(la, lb) {
    let merged = new LinkedList(),
        left = la.head,
        right = lb.head;

    while (left && right) {
        if (left.data < right.data) {
            merged.add(left.data);
            left = left.next;
        } else {
            merged.add(right.data);
            right = right.next;
        }
    }
    
    while (left) {
        merged.add(left.data);
        left = left.next;
    }
    
    while (right) {
        merged.add(right.data);
        right = right.next;
    }
    
    return merged;
}

let a = new LinkedList(),
    b = new LinkedList();

a.add(1).add(2).add(4).add(6);
b.add(3).add(5).add(7).add(9);

let A = a.find((node) => node.data === 1),
    B = a.find((node) => node.data === 2),
    C = a.find((node) => node.data === 4),
    D = a.find((node) => node.data === 6),
    E = b.find((node) => node.data === 3),
    F = b.find((node) => node.data === 5),
    G = b.find((node) => node.data === 7),
    H = b.find((node) => node.data === 9);

D.next = null,
H.next = null;

assert.deepEqual(mergeLinkedList(a, b).toArray(), [1, 2, 3, 4, 5, 6, 7, 9]);
