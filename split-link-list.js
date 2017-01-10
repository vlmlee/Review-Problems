const LinkedList = require('./LinkedList.js'),
      assert = require('assert');

function splitLinkedList(list) {
	let la = new LinkedList(),
		lb = new LinkedList(),
		node = list.head,
		flag = true;

	while (node) {
		if (flag) {
			la.add(node.data);
			flag = !flag;
		} else {
			lb.add(node.data);
			flag = !flag;
		}
		node = node.next;
	}

	return { la: la, lb: lb };
}

let list = new LinkedList();
list.add(0).add(1).add(2).add(3).add(4).add(5);
let A = list.find(node => node.data === 5);
A.next = null;
let splitLists = splitLinkedList(list);
assert.deepEqual(splitLists.la.toArray(), [0, 2, 4]);
assert.deepEqual(splitLists.lb.toArray(), [1, 3, 5]);
