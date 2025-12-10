//https://www.acmicpc.net/problem/11866
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

console.log(solution2(input[0].split(' ').map((e) => Number(e))));

function solution([N, K]) {
  const answer = [];

  let front = 0; // 데이터가 나가는 곳
  let rear = 0; // 데이터가 들어오는 곳
  const queue = [];

  for (let i = 1; i <= N; i++) {
    queue[rear++] = i;
  }

  while (front !== rear) {
    for (let i = 0; i < K - 1; i++) {
      queue[rear++] = queue[front++];
    }
    answer.push(queue[front++]);
  }

  return `<${answer.join(', ')}>`;
}

function solution2([N, K]) {
  const answer = [];
  let rear = 0;
  let front = 0;
  const maxSize = N + 1;

  const queue = [];

  for (let i = 1; i <= N; i++) {
    queue.push(i);
    rear = (rear + 1) % maxSize;
  }
  //   console.log(queue, rear);
  const length = () => (rear - front + maxSize) % maxSize;

  while (length() > 0) {
    for (let i = 0; i < K - 1; i++) {
      queue[rear] = queue[front];
      rear = (rear + 1) % maxSize;
      front = (front + 1) % maxSize;
    }

    answer.push(queue[front]);
    front = (front + 1) % maxSize;
  }

  return `<${answer.join(', ')}>`;
}
