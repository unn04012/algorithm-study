// https://www.acmicpc.net/problem/3273
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

console.log(
  solution(
    Number(input[0]),
    input[1].split(' ').map((e) => Number(e)),
    Number(input[2])
  )
);

function solution(n, numbers, x) {
  const set = new Set(numbers);
  let count = 0;

  for (const num of numbers) {
    if (num < x - num && set.has(x - num)) {
      count++;
    }
  }
  return count;
}
