// https://www.acmicpc.net/problem/11724
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

console.log(
  solution(
    input[0].split(' ').map((e) => Number(e)),
    input.slice(1).map((e) => e.split(' ').map((e) => Number(e)))
  )
);

function solution([N, M], vertexes) {
  let answer = 0;
  const visited = Array(N + 1).fill(0);

  const graph = {};

  // 1. init graph
  for (const [node1, node2] of vertexes) {
    if (!graph[node1]) {
      graph[node1] = [];
    }
    if (!graph[node2]) {
      graph[node2] = [];
    }

    graph[node1].push(node2);
    graph[node2].push(node1);
  }

  const dfs = (startNode) => {
    const stack = [startNode];

    while (stack.length) {
      const node = stack.pop();

      for (const adjacentNode of graph[node] || []) {
        if (!visited[adjacentNode]) {
          visited[adjacentNode] = true;
          stack.push(adjacentNode);
        }
      }
    }
  };
  // 각 노드들만다 순회를 한다.
  for (let i = 1; i <= N; i++) {
    if (!visited[i]) {
      dfs(i);
      answer++;
    }
  }
  return answer;
}
