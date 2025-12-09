//https://www.acmicpc.net/problem/2164
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

class CircularQueue {
  constructor(maxSize) {
    this.queue = new Array(maxSize + 1); // 한 칸 비워둠
    this.front = 0;
    this.rear = 0;
    this.maxSize = maxSize + 1;
  }

  enqueue(value) {
    this.rear = (this.rear + 1) % this.maxSize;
    this.queue[this.rear] = value;
  }

  dequeue() {
    this.front = (this.front + 1) % this.maxSize;
    return this.queue[this.front];
  }

  get length() {
    return (this.rear - this.front + this.maxSize) % this.maxSize;
  }

  get peek() {
    return this.queue[(this.front + 1) % this.maxSize];
  }
}

console.log(solution(Number(input[0])));

function solution(N) {
  const queue = new CircularQueue(N);

  for (let i = 1; i <= N; i++) queue.enqueue(i);

  while (queue.length !== 1) {
    queue.dequeue();
    queue.enqueue(queue.dequeue());
  }

  return queue.peek;
}
