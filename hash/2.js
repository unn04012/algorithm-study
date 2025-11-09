// https://www.acmicpc.net/problem/10816
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

console.log(
  solution(
    input[1].split(' ').map((e) => Number(e)),
    input[3].split(' ').map((e) => Number(e))
  )
);

function solution(num1, num2) {
  const map = new Map();

  for (const num of num1) {
    const found = map.get(num);

    found ? map.set(num, found + 1) : map.set(num, 1);
  }
  return num2
    .map((e) => {
      const found = map.get(e);

      return found ?? 0;
    })
    .join(' ');
}
