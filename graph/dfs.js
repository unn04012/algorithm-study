const graph = {
  1: [2, 5, 9],
  2: [1, 3],
  3: [2, 4],
  4: [3],
  5: [1, 6, 8],
  6: [5, 7],
  7: [6],
  8: [5],
  9: [1, 10],
  10: [9],
};

function dfsStack(adjacentGraph, startNode) {
  const stack = [startNode];
  const visited = [];

  while (stack.length) {
    const node = stack.pop();
    visited.push(node);

    for (const adjacentNode of graph[node]) {
      if (!visited.includes(adjacentNode)) {
        stack.push(adjacentNode);
      }
    }
  }
  return visited;
}

console.log(dfsStack(graph, 1));
