const assert = require('assert'),
    linkedList = require('./LinkedList.js');

function tortoiseAndHareLoopDetector(list) {
	let hare, tortoise, nextHare;
	tortoise = list.head;
	hare = list.head.next;
	while ((tortoise != null) && (hare != null)) {
		if (tortoise === hare) {
			return true;
		}
		tortoise = tortoise.next;
		hare = (nextHare = hare.next) != null ? nextHare.next : void 0;
	}
	return false;
}

let list = new linkedList();
list.add(1);
list.add(2);
list.add(3);
assert.equal(tortoiseAndHareLoopDetector(list), true);
list.head.next.next = null;
assert.equal(tortoiseAndHareLoopDetector(list), false);
