// https://www.acmicpc.net/problem/1417
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

class MaxHeap {
  constructor() {
    this.heap = [null];
  }

  parentIdx(i) {
    return Math.floor(i / 2);
  }

  enqueue(value) {
    this.heap.push(value);

    let curIndex = this.heap.length - 1;

    while (curIndex !== 1) {
      const parentIdx = this.parentIdx(curIndex);

      if (this.heap[parentIdx] && this.heap[curIndex] > this.heap[parentIdx]) {
        [this.heap[curIndex], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[curIndex]];
        curIndex = parentIdx;
      } else break;
    }
  }

  dequeue() {
    // 1. 루트와 마지막 element 교체
    [this.heap[1], this.heap[this.heap.length - 1]] = [this.heap[this.heap.length - 1], this.heap[1]];
    const rootValue = this.heap.pop();

    let curIndex = 1;

    while (curIndex < this.heap.length) {
      let leftChildIdx = curIndex * 2;
      let rightChildIdx = curIndex * 2 + 1;

      let maxIndex = curIndex;

      if (this.heap[leftChildIdx] && this.heap[leftChildIdx] > this.heap[maxIndex]) {
        maxIndex = leftChildIdx;
      }

      if (this.heap[rightChildIdx] && this.heap[rightChildIdx] > this.heap[maxIndex]) {
        maxIndex = rightChildIdx;
      }

      // 자식들중에 더 큰 수가 없는 경우
      if (maxIndex === curIndex) {
        break;
      }
      [this.heap[curIndex], this.heap[maxIndex]] = [this.heap[maxIndex], this.heap[curIndex]];
      curIndex = maxIndex;
    }
    return rootValue;
  }

  peek() {
    return this.heap[1];
  }
}

function solution(N, votes) {
  let answer = 0;

  const queue = new MaxHeap();

  for (let i = 1; i < votes.length; i++) queue.enqueue(votes[i]);

  let firstCandidateVoteCount = votes[0];

  while (queue.heap.length !== 1 && firstCandidateVoteCount <= queue.peek()) {
    answer++;
    firstCandidateVoteCount++;
    const votes = queue.dequeue();

    queue.enqueue(votes - 1);
  }

  return answer;
}

console.log(
  solution(
    Number(input[0]),
    input.slice(1).map((e) => Number(e))
  )
);
