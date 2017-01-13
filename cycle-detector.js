/*

Problem:
Detect if there is a cycle in the list and return its starting point.

Solution:
This solution uses a well known algorithm called the tortoise and
the hare to detect a cycle in a list. The 'tortoise' will traverse
the list going one node at a time while the 'hare' will go 2 nodes
at a time. If they ever meet, it will mean a cycle exists in the
list. To determine the starting point of the cycle, we keep track
of how many nodes both the tortoise and the hare have gone through.
If the difference between the number of nodes they have traversed equals
the length of the list, this means that the start of the cycle
is at the head of the list and all nodes are contained in the cycle (this
can be worked out by induction). If the difference is not that value, it
means that the start of the cycle is somewhere ahead of the head and we can
find it by placing the tortoise at the head and moving both tortoise and
the hare one node at a time until they meet (you can prove this by induction). 
That node will be the start of the cycle.

*/

const assert = require('assert'),
    linkedList = require('./LinkedList.js');

/**
* Detects a cycle in a linked list and returns the start of the cycle.
*
* @params {LinkedList} list - A linked list with or without a cycle.
* @returns {Node} - Node that starts a cycle.
*/
function tortoiseAndHareLoopDetector(list) {
	let hare, tortoise, nextHare, t = 0, h = 1;
	tortoise = list.head;
	hare = list.head.next;
	while ((tortoise != null) && (hare != null)) {
		if (tortoise === hare) {
			if (list.toArray().length !== (h - t)) {
				tortoise = list.head;
	            while (tortoise !== hare) {
	                tortoise = tortoise.next;
	                hare = hare.next;
	            }
	            return tortoise;
			}
			return list.head;
		}
		tortoise = tortoise.next;
		hare = (nextHare = hare.next) != null ? nextHare.next : void 0;
		t++;
		h += 2;
	}
	return null;
}

let list = new linkedList();

list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);
list.add(6);

assert.equal(tortoiseAndHareLoopDetector(list), list.head);
list.head.next.next = null;
assert.equal(tortoiseAndHareLoopDetector(list), false);
