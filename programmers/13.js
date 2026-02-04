function solution(n, roads, sources, destination) {
  const answer = [];
  const graph = {};

  for (let i = 1; i <= n; i++) graph[i] = [];

  for (const [a, b] of roads) {
    graph[a].push(b);
    graph[b].push(a);
  }
  const distances = Array(n + 1).fill(-1);
  distances[destination] = 0;

  const queue = [[destination, 0]];
  const visited = Array(n + 1).fill(false);
  visited[destination] = true;
  let jobIndex = 0;

  while (jobIndex < queue.length) {
    const [node, dist] = queue[jobIndex++];

    distances[node] = dist;

    for (const next of graph[node]) {
      if (visited[next]) continue;

      queue.push([next, dist + 1]);
      visited[next] = true;
    }
  }

  return sources.map((e) => distances[e]);
}

console.log(
  solution(
    5,
    [
      [1, 2],
      [1, 4],
      [2, 4],
      [2, 5],
      [4, 5],
    ],
    [1, 3, 5],
    5,
  ),
);
