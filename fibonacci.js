let memo = {};

function Fibonacci(n) {
  if (n === 0 || n === 1) {
    return n;
  }
  
  if (memo[n]) {
    return memo[n];
  }
  
  memo[n] = Fibonacci(n-1) + Fibonacci(n-2);
  return memo[n]
}
