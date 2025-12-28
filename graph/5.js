// https://www.acmicpc.net/problem/1389
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

console.log(
  solution(
    input[0].split(' ').map((e) => Number(e)),
    input.slice(1).map((e) => e.split(' ').map((e) => Number(e)))
  )
);

function solution([N, M], vertexes) {
  let answer = [];

  const graph = {};

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

  const bfs = (start) => {
    const queue = [start];
    const dist = Array(N + 1).fill(-1);
    dist[start] = 0;

    while (queue.length) {
      const node = queue.shift();

      for (const next of graph[node]) {
        if (dist[next] === -1) {
          dist[next] = dist[node] + 1;
          queue.push(next);
        }
      }
    }

    return dist.slice(1).reduce((acc, cur) => acc + cur, 0);
  };

  for (let i = 1; i <= N; i++) {
    answer.push({ index: i, numBacon: bfs(i) });
  }

  answer.sort((a, b) => {
    if (a.numBacon === b.numBacon) return a.index - b.index;
    return a.numBacon - b.numBacon;
  });

  return answer[0].index;
}
