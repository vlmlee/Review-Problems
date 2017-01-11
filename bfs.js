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
