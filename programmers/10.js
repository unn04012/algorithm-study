function solution(n, lighthouse) {
  const graph = Array.from({ length: n + 1 }, () => []);

  for (const [a, b] of lighthouse) {
    graph[a].push(b);
    graph[b].push(a);
  }

  const dp = Array.from({ length: n + 1 }, () => [0, 0]);
  const visited = Array(n + 1).fill(false);
  const parent = Array(n + 1).fill(-1);

  // Step 1: 스택으로 방문 순서 기록
  const order = [];
  const stack = [1];
  visited[1] = true;

  while (stack.length) {
    const node = stack.pop();
    order.push(node);

    for (const child of graph[node]) {
      if (!visited[child]) {
        visited[child] = true;
        parent[child] = node; // 부모 기록!
        stack.push(child);
      }
    }
  }

  // Step 2: 역순으로 DP 계산 (리프 → 루트)
  for (let i = order.length - 1; i >= 0; i--) {
    const node = order[i];
    dp[node][0] = 0;
    dp[node][1] = 1;

    for (const child of graph[node]) {
      // child가 node의 자식인 경우만 처리
      if (parent[child] === node) {
        dp[node][1] += Math.min(dp[child][0], dp[child][1]);
        dp[node][0] += dp[child][1];
      }
    }
  }

  return Math.min(dp[1][0], dp[1][1]);
}

console.log(
  solution(10, [
    [4, 1],
    [5, 1],
    [5, 6],
    [7, 6],
    [1, 2],
    [1, 3],
    [6, 8],
    [2, 9],
    [9, 10],
  ]),
);
