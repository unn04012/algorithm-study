// https://www.acmicpc.net/problem/11722
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

console.log(
  solution(
    Number(input[0]),
    input[1].split(' ').map((e) => Number(e)),
  ),
);

function solution(N, numbers) {
  const dp = [1];

  for (let i = 1; i < N; i++) {
    let max = 1; // 초소 1
    for (let j = i - 1; j >= 0; j--) {
      if (numbers[j] > numbers[i]) {
        max = Math.max(max, dp[j] + 1);
      }
    }
    dp[i] = max;
  }
  return Math.max(...dp);
}
