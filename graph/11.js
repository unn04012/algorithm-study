// https://www.acmicpc.net/problem/14496
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

console.log(
  solution(
    input[0].split(' ').map((e) => Number(e)),
    input[1].split(' ').map((e) => Number(e)),
    input.slice(2).map((e) => e.split(' ').map((e) => Number(e))),
  ),
);

function solution([a, b], [N, M], numbers) {
  let answer = Number.MAX_SAFE_INTEGER;
  const graph = {};

  const visited = Array(N + 1).fill(false);

  for (const [num1, num2] of numbers) {
    if (!graph[num1]) {
      graph[num1] = [];
    }
    if (!graph[num2]) {
      graph[num2] = [];
    }
    graph[num1].push(num2);
    graph[num2].push(num1);
  }

  const bfs = (start) => {
    const queue = [[start, 0]];
    let head = 0;

    while (head < queue.length) {
      const [node, depth] = queue[head++];

      if (node === b) {
        answer = Math.min(answer, depth);
      }

      for (const newNode of graph[node]) {
        if (visited[newNode]) continue;
        queue.push([newNode, depth + 1]);
        visited[newNode] = true;
      }
    }
  };
  bfs(a);

  return answer === Number.MAX_SAFE_INTEGER ? -1 : answer;
}
