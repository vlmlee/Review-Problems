getHeight(node) {
    if (!node) {
        return -1;
    }
    let left = this.getHeight(node.left),
        right = this.getHeight(node.right);
    return Math.max(left, right) + 1;
}

isBalanced(node) {
    if (!node) {
        return true;
    }
    let heightLeft = this.getHeight(node.left),
        heightRight = this.getHeight(node.right),
        diff = Math.abs(heightLeft - heightRight);
    if (diff > 1) {
        return false;
    } else {
        return this.isBalanced(node.left) && this.isBalanced(node.right);
    }
}
