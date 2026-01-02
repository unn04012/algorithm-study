// https://www.acmicpc.net/problem/21921
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

console.log(
  solution(
    input[0].split(' ').map((e) => Number(e)),
    input[1].split(' ').map((e) => Number(e))
  )
);

function solution([N, X], visits) {
  let answer = 0;
  let currentSum = 0;
  let count = 0;

  for (let i = 0; i < X; i++) currentSum += visits[i];
  answer = currentSum;
  count = 1;

  for (let i = X; i < visits.length; i++) {
    currentSum = currentSum - visits[i - X] + visits[i];

    if (currentSum > answer) {
      answer = currentSum;
      count = 1;
    } else if (currentSum === answer) {
      count++;
    }
  }

  if (answer === 0) return 'SAD';

  return `${answer}\n${count}`;
}
