class MaxHeap {
  constructor() {
    this.heap = [0];
  }

  enqueue(value) {
    this.heap.push(value);
    let curIdx = this.heap.length - 1;

    while (curIdx !== 1) {
      const parentIdx = Math.floor(curIdx / 2);

      if (this.heap[parentIdx] && this.heap[curIdx] > this.heap[parentIdx]) {
        [this.heap[parentIdx], this.heap[curIdx]] = [this.heap[curIdx], this.heap[parentIdx]];
        curIdx = parentIdx;
      } else break;
    }
  }

  dequeue() {
    if (this.isEmpty()) return null;
    //1. swap
    [this.heap[1], this.heap[this.heap.length - 1]] = [this.heap[this.heap.length - 1], this.heap[1]];
    const value = this.heap.pop();

    let curIndex = 1;
    while (curIndex < this.heap.length) {
      let maxIdx = curIndex;
      const leftIdx = curIndex * 2;
      const rightIdx = curIndex * 2 + 1;

      if (this.heap[leftIdx] && this.heap[leftIdx] > this.heap[maxIdx]) {
        maxIdx = leftIdx;
      }
      if (this.heap[rightIdx] && this.heap[rightIdx] > this.heap[maxIdx]) {
        maxIdx = rightIdx;
      }
      if (maxIdx === curIndex) break;

      [this.heap[curIndex], this.heap[maxIdx]] = [this.heap[maxIdx], this.heap[curIndex]];
      curIndex = maxIdx;
    }
    return value;
  }
  isEmpty() {
    return this.heap.length === 1;
  }

  peek() {
    return this.heap[1];
  }
}

const heap = new MaxHeap();

function solution(n, works) {
  const pq = new MaxHeap();

  for (const work of works) {
    pq.enqueue(work);
  }

  while (n > 0 && !pq.isEmpty()) {
    let maxWork = pq.dequeue();

    if (pq.peek()) {
      const diff = maxWork - pq.peek();
      const decrease = Math.min(Math.max(diff, 1), n); // diff가 0이어도 최소 1
      maxWork -= decrease;
      n -= decrease;
    } else {
      // 혼자 남으면 한 번에 처리
      const decrease = Math.min(maxWork, n);
      maxWork -= decrease;
      n -= decrease;
    }

    if (maxWork > 0) pq.enqueue(maxWork);
  }

  return pq.heap.reduce((acc, cur) => acc + Math.pow(cur, 2), 0);
}

console.log(solution(3, [1, 1]));
