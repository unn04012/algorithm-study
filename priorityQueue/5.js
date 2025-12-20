class MaxHeap {
  constructor() {
    this.heap = [null];
  }

  getParentIdx(i) {
    return Math.floor(i / 2);
  }

  /**
   *
   * @param value day
   * @param value supply
   */
  enqueue(value) {
    this.heap.push(value);
    let curIndex = this.heap.length - 1;

    while (curIndex > 0) {
      const parentIndex = this.getParentIdx(curIndex);
      if (this.heap[parentIndex] && this.heap[curIndex].supply > this.heap[parentIndex].supply) {
        [this.heap[parentIndex], this.heap[curIndex]] = [this.heap[curIndex], this.heap[parentIndex]];
      }
      curIndex = parentIndex;
    }
  }

  dequeue() {
    // 교환
    [this.heap[this.heap.length - 1], this.heap[1]] = [this.heap[1], this.heap[this.heap.length - 1]];

    const value = this.heap.pop();

    let curIndex = 1;
    while (this.heap[curIndex] && curIndex < this.heap.length) {
      let maxIndex = curIndex;
      const leftChildIdx = curIndex * 2;
      const rightChildIdx = curIndex * 2 + 1;

      if (this.heap[leftChildIdx] && this.heap[leftChildIdx].supply > this.heap[maxIndex].supply) {
        maxIndex = leftChildIdx;
      }
      if (this.heap[rightChildIdx] && this.heap[rightChildIdx].supply > this.heap[maxIndex].supply) {
        maxIndex = rightChildIdx;
      }
      if (maxIndex === curIndex) break;

      [this.heap[curIndex], this.heap[maxIndex]] = [this.heap[maxIndex], this.heap[curIndex]];
    }
    return value;
  }
}
function solution(stock, dates, supplies, k) {
  const supplyWithDates = dates.map((date, i) => ({ date, supply: supplies[i] }));

  let curDay = stock;
  let answer = 0;

  supplyWithDates.sort((a, b) => a.date - b.date);

  const queue = new MaxHeap(); // 대기 큐
  //   const tasks = [{ date: 0, supply: stock }]; // 작업 큐

  while (curDay <= k) {
    // 현재 날짜보다 작은 공급들 insert
    while (supplyWithDates.length && curDay >= supplyWithDates[0].date) {
      queue.enqueue(supplyWithDates.shift());
    }

    if (queue.heap.length === 1) {
      curDay = supplyWithDates[0].date;
      continue;
    }

    const task = queue.dequeue();

    curDay += task.supply;
    answer++;
  }

  return answer;
}

const stock = 4;
const dates = [4, 10, 15];
const supplies = [20, 5, 10];
const k = 30;

console.log(solution(stock, dates, supplies, k));
