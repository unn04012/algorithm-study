const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

const N = Number(input[0]);
const matrix = [];
for (let i = 1; i <= N; i++) {
  matrix.push(input[i].split(' ').map(Number));
}

class MaxHeap {
  constructor() {
    this.heap = [null];
  }

  parentIndex(i) {
    return Math.floor(i / 2);
  }

  leftIndex(i) {
    return i * 2;
  }

  rightIndex(i) {
    return i * 2 + 1;
  }

  enqueue(value) {
    this.heap.push(value);

    let curIdx = this.heap.length - 1;
    while (curIdx !== 1) {
      const parentIdx = this.parentIndex(curIdx);

      if (this.heap[curIdx] > this.heap[parentIdx]) {
        [this.heap[curIdx], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[curIdx]];
        curIdx = parentIdx;
      } else break;
    }
  }

  dequeue() {
    //1. 루트와 마지막 노드 변경
    [this.heap[1], this.heap[this.heap.length - 1]] = [this.heap[this.heap.length - 1], this.heap[1]];

    const maxValue = this.heap.pop();

    let curIdx = 1;
    while (curIdx < this.heap.length) {
      let maxIndex = curIdx;
      const leftIdx = this.leftIndex(curIdx);
      const rightIdx = this.rightIndex(curIdx);

      // 왼쪽 자식 노드가 더 큰 경우 변경
      if (this.heap[leftIdx] > this.heap[maxIndex]) {
        // [this.heap[leftIdx], this.heap[curIdx]] = [this.heap[curIdx], this.heap[leftIdx]];
        maxIndex = leftIdx;
      }

      if (this.heap[rightIdx] > this.heap[maxIndex]) {
        maxIndex = rightIdx;
      }
      // 자식 중에 더 큰 노드가 없는 경우
      if (maxIndex === curIdx) break;

      [this.heap[curIdx], this.heap[maxIndex]] = [this.heap[maxIndex], this.heap[curIdx]];

      curIdx = maxIndex;
    }
    return maxValue;
  }
}

function solution(N, matrix) {
  // 여기서 풀이 작성
  const queue = new MaxHeap();
  for (const numbers of matrix) {
    for (const number of numbers) {
      queue.enqueue(number);
    }
  }
  for (let i = 1; i < N; i++) queue.dequeue();

  return queue.dequeue();
}

console.log(solution(N, matrix));
