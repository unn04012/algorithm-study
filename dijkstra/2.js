// https://www.acmicpc.net/problem/1939
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

function solution([N, M], bridges, factory) {
  const graph = {};
  let allAvailableWeights = Number.MAX_SAFE_INTEGER;
  for (const [i1, i2, w] of bridges) {
    if (!graph[i1]) {
      graph[i1] = [];
    }
    if (!graph[i2]) {
      graph[i2] = [];
    }
    allAvailableWeights = Math.min(allAvailableWeights, w);
    graph[i1].push([i2, w]);
    graph[i2].push([i1, w]);
  }

  const dfs = (start, end, weight) => {
    const visited = new Set();
    const stack = [start]; // 1,2
    visited[start] = true;

    while (stack.length) {
      const node = stack.pop();

      if (node === end) {
        return true;
      }

      for (const [next, w] of graph[node]) {
        if (weight > w) continue; // 중량 제한을 조과한 경우
        if (visited.has(next)) continue;

        visited.add(next);
        stack.push(next);
      }
    }
    return false;
  };

  let start = allAvailableWeights;
  let end = 1000000000;
  let answer = 0;
  while (end >= start) {
    const mid = Math.floor((end + start) / 2);

    if (dfs(factory[0], factory[1], mid)) {
      answer = mid;
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return answer;
}

console.log(
  solution(
    input[0].split(' ').map((e) => Number(e)),
    input.slice(1, input.length - 1).map((e) => e.split(' ').map((e) => Number(e))),
    input[input.length - 1].split(' ').map((e) => Number(e))
  )
);
