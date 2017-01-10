const LinkedList = require('./LinkedList.js'),
      assert = require('assert');

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
        let pos = merged.find(node => {
            if (node.data > left.data) {
                return node;
            } else {
                return false;
            }
        });
        
        if (pos) {
            merged.addBefore(pos, left.data);
        } else {
            merged.add(left.data);
        }
        left = left.next;
    }
    
    while (right) {
        let pos = merged.find(node => {
            if (node.data > right.data) {
                return node;
            } else {
                return false;
            }
        });
        
        if (pos) {
            merged.addBefore(pos, right.data);
        } else {
            merged.add(right.data);
        }
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
