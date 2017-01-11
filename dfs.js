dfs(current, order) {
  if (!order) {
    order = [];
  }
  return this.preOrder(current, order);
}
