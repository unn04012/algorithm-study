class MaxHeap {
  constructor() {
    this.heap = [null];
  }

  enqueue(value) {
    this.heap.push(value);

    let curIndex = this.heap.length - 1;

    while (curIndex !== 0) {
      const parentIdx = Math.floor(curIndex / 2);
      if (this.heap[parentIdx] && this.heap[curIndex] > this.heap[parentIdx]) {
        [this.heap[curIndex], this.heap[parentIdx]] = [this.heap[parentIdx], this.heap[curIndex]];
      } else break;
      curIndex = parentIdx;
    }
  }

  dequeue() {
    // root와 교환
    [this.heap[1], this.heap[this.heap.length - 1]] = [this.heap[this.heap.length - 1], this.heap[1]];
    const value = this.heap.pop();

    let curIndex = 1;
    while (curIndex <= this.heap.length - 1) {
      let leftIndex = curIndex * 2;
      let rightIndex = curIndex * 2 + 1;
      let maxIndex = curIndex;

      if (this.heap[leftIndex] && this.heap[leftIndex] > this.heap[maxIndex]) {
        maxIndex = leftIndex;
      }
      if (this.heap[rightIndex] && this.heap[rightIndex] > this.heap[maxIndex]) {
        maxIndex = rightIndex;
      }
      if (maxIndex === curIndex) break;

      [this.heap[curIndex], this.heap[maxIndex]] = [this.heap[maxIndex], this.heap[curIndex]];

      curIndex = maxIndex;
    }
    return value;
  }
}

function solution(n, k, enemy) {
  let answer = 0;

  const heap = new MaxHeap();

  for (let i = 0; i < enemy.length; i++) {
    const e = enemy[i];

    n -= e;
    heap.enqueue(e);
    if (n < 0 && k > 0) {
      n += heap.dequeue();
      k--;
    }

    if (n < 0) break;
    answer = i + 1;
  }

  return answer;
}

function solution2(n, k, enemy) {
  let answer = 0;

  let start = 0;
  let end = enemy.length - 1;

  while (end >= start) {
    const mid = Math.floor((start + end) / 2);

    const subArr = enemy.slice(0, mid + 1).sort((a, b) => b - a);

    let numArmy = n;
    let cheat = k;
    let isEnable = true;
    let round = 0;
    for (const e of subArr) {
      round++;
      if (cheat > 0) {
        cheat--;
        continue;
      }

      numArmy -= e;
      if (numArmy < 0) {
        isEnable = false;
        break;
      }
    }
    // console.log(mid, numArmy, subArr, round);
    if (isEnable) {
      start = mid + 1;
      answer = round;
    } else {
      end = mid - 1;
    }
  }

  return answer;
}

console.log(solution(7, 3, [4, 2, 4, 5, 3, 3, 1]));
