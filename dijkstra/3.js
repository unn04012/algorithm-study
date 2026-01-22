// https://www.acmicpc.net/problem/1939
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

class MinHeap {
  constructor() {
    this.heap = [[null, 0]];
  }

  enqueue(value) {
    this.heap.push(value);

    let curIndex = this.heap.length - 1;

    while (curIndex !== 1) {
      const parentIdx = Math.floor(curIndex / 2);

      if (this.heap[curIndex][1] < this.heap[parentIdx][1]) {
        [this.heap[curIndex], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[curIndex]];
      } else break;

      curIndex = parentIdx;
    }
  }

  dequeue() {
    if (this.heap.length === 2) return this.heap.pop();

    [this.heap[1], this.heap[this.heap.length - 1]] = [this.heap[this.heap.length - 1], this.heap[1]];

    const value = this.heap.pop();

    let curIndex = 1;
    while (curIndex < this.heap.length) {
      let minIndex = curIndex;
      const leftIdx = minIndex * 2;
      const rightIdx = minIndex * 2 + 1;

      if (this.heap[leftIdx] && this.heap[leftIdx][1] < this.heap[minIndex][1]) {
        minIndex = leftIdx;
      }
      if (this.heap[rightIdx] && this.heap[rightIdx][1] < this.heap[minIndex][1]) {
        minIndex = rightIdx;
      }
      if (minIndex === curIndex) break;

      [this.heap[minIndex], this.heap[curIndex]] = [this.heap[curIndex], this.heap[minIndex]]; // swap
      curIndex = minIndex;
    }
    return value;
  }

  isEmpty() {
    return this.heap.length === 1;
  }
}

function solution([N, M], roads) {
  const graph = {};
  for (const [start, end, weight] of roads) {
    if (!graph[start]) {
      graph[start] = [];
    }
    if (!graph[end]) {
      graph[end] = [];
    }

    graph[start].push([end, weight]);
    graph[end].push([start, weight]);
  }

  const queue = new MinHeap();
  queue.enqueue([1, 0]);
  const visited = Array(N + 1).fill(false);
  const distance = Array(N + 1).fill(Infinity);
  distance[1] = 0;
  visited[1] = true;

  while (!queue.isEmpty()) {
    const [start, weight] = queue.dequeue();
    visited[start] = true;

    if (start === N) break;

    for (const [node, w] of graph[start]) {
      if (visited[node]) continue;

      const newDist = weight + w;
      if (distance[node] > newDist) {
        distance[node] = newDist;
        queue.enqueue([node, weight + w]);
      }
    }
  }
  return distance[N];
}

console.log(
  solution(
    input[0].split(' ').map((e) => Number(e)),
    input.slice(1).map((e) => e.split(' ').map((e) => Number(e))),
  ),
);
