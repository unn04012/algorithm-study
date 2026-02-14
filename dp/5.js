function solution(n) {
  let answer = 0;
  const hash = new Map();

  const dfs = (num) => {
    if (hash.has(num)) {
      return hash.get(num);
    }
    if (num === n) {
      return 1;
    } else if (num > n) {
      return 0;
    }

    const num1 = dfs(num + 1); // dfs(4)
    const num2 = dfs(num + 2); // dfs(5)
    const result = num1 + num2;

    hash.set(num, result);
    return result;
  };

  return dfs(0) % 1234567;
}

console.log(solution(4));
