function mirrorBST(t1, t2) {
  t1.invert(t1.root);
  let a = t1.inOrder(t1.root),
	  b = t2.inOrder(t2.root);
  for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
		  return false;
	  }
  }
  return true;
}
