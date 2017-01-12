/*

Problem:
Implement breadth-first search.

Solution:
What we need to do is traverse the tree level by level.
The way to do this without having an unbounded traversal
is to use a queue. We first push the root node into the 
queue and then unshift it as the node to consider. We then
push the children of that node into the queue in left to right
order, get its content, and then push each children's children 
into the queue. This is how we can implement a level by level 
traversal.

*/


/**
* Breadth first search.
* @param {Node} current - The starting node of the traversal.
* @param {Array} order - An array containing any previous values.
* @returns {Array} - Array of values in bfs order.
*/
bfs(current, order) {
    if (!order) {
        order = [];
    }
    this.queue = [];
    this.queue.push(current);
    while(this.queue.length) {
        let node = this.queue.shift();
        order.push(node.data);
        if (node.left) {
            this.queue.push(node.left);
        }
        if (node.right) {
            this.queue.push(node.right);
        }
    }
    return order;
}
