// https://www.acmicpc.net/problem/1446
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

class MinHeap {
  constructor() {
    this.heap = [null];
  }

  enqueue(value) {
    this.heap.push(value);
    let curIndex = this.heap.length - 1;

    while (curIndex !== 1) {
      const parentIdx = Math.floor(curIndex / 2);

      if (this.heap[curIndex][1] < this.heap[parentIdx][1]) {
        [this.heap[curIndex], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[curIndex]]; // swap
        curIndex = parentIdx;
      } else break;
    }
  }

  dequeue() {
    if (this.heap.length === 1) return null;

    // 왜 0이 아니라 1로했지?
    [this.heap[1], this.heap[this.heap.length - 1]] = [this.heap[this.heap.length - 1], this.heap[1]]; // 마지막 node와 swap
    const val = this.heap.pop();

    let curIndex = 1;
    while (curIndex < this.heap.length) {
      let minIndex = curIndex;
      const leftIdx = curIndex * 2;
      const rightIdx = curIndex * 2 + 1;

      // 더 크면 내려간다
      if (this.heap[leftIdx] && this.heap[leftIdx][1] < this.heap[minIndex][1]) {
        minIndex = leftIdx;
      }
      if (this.heap[rightIdx] && this.heap[rightIdx][1] < this.heap[minIndex][1]) {
        minIndex = rightIdx;
      }
      if (minIndex === curIndex) break;

      [this.heap[curIndex], this.heap[minIndex]] = [this.heap[minIndex], this.heap[curIndex]]; //swap

      curIndex = minIndex;
    }
    return val;
  }
  isEmpty() {
    return this.heap.length === 1;
  }
}

function solution([V, E], K, infos) {
  const graph = Array.from({ length: V + 1 }, () => []);

  for (const [u, v, w] of infos) {
    graph[u].push([v, w]);
    // graph[v].push([u, w]);
  }
  const distance = Array(V + 1).fill(Infinity);
  distance[K] = 0;
  const visited = Array(V + 1).fill(false);
  visited[K] = true;

  const queue = new MinHeap();
  queue.enqueue([K, 0]);

  while (!queue.isEmpty()) {
    const value = queue.dequeue(); // node까지 최단 거리는 weight

    const [node, weight] = value;
    visited[node] = true;

    for (const [n, w] of graph[node]) {
      if (visited[n]) continue;
      const newDist = w + distance[node];

      if (newDist < distance[n]) {
        distance[n] = newDist;
        queue.enqueue([n, newDist]);
      }
    }
  }
  let answer = '';

  for (let i = 1; i <= V; i++) {
    answer += (distance[i] === Infinity ? 'INF' : distance[i]) + '\n';
  }

  return answer;
}

console.log(
  solution(
    input[0].split(' ').map((e) => Number(e)),
    Number(input[1]),
    input.slice(2).map((e) => e.split(' ').map((e) => Number(e)))
  )
);
