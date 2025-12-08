const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

class Deque {
  constructor() {
    this.data = {};
    this.front = 0;
    this.back = 0;
  }

  addFront(value) {
    this.front--;
    this.data[this.front] = value;
  }

  addBack(value) {
    this.data[this.back] = value;
    this.back++;
  }

  removeFront() {
    if (this.isEmpty()) return undefined;
    const value = this.data[this.front];
    delete this.data[this.front];
    this.front++;
    return value;
  }

  removeBack() {
    if (this.isEmpty()) return undefined;
    this.back--;
    const value = this.data[this.back];
    delete this.data[this.back];
    return value;
  }

  size() {
    return this.back - this.front;
  }

  isEmpty() {
    return this.size() === 0;
  }

  indexOf(value) {
    for (let i = this.front; i < this.back; i++) {
      if (this.data[i] === value) return i - this.front;
    }
    return -1;
  }
}

console.log(solution(input[0].split(' ').map(Number), input[1].split(' ').map(Number)));

function solution([N, M], numbers) {
  let answer = 0;
  const deque = new Deque();

  // 초기화
  for (let i = 1; i <= N; i++) {
    deque.addBack(i);
  }

  for (const target of numbers) {
    const idx = deque.indexOf(target);

    const left = idx;
    const right = deque.size() - idx;

    if (left <= right) {
      // 왼쪽으로 회전
      for (let i = 0; i < left; i++) {
        deque.addBack(deque.removeFront());
      }
    } else {
      // 오른쪽으로 회전
      for (let i = 0; i < right; i++) {
        deque.addFront(deque.removeBack());
      }
    }

    deque.removeFront(); // 맨 앞 원소 제거
    answer += Math.min(left, right);
  }

  return answer;
}
