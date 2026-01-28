// https://www.acmicpc.net/problem/11722
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

console.log(
  solution(
    Number(input[0]),
    input.slice(1).map((e) => e.split(' ').map((e) => Number(e))),
  ),
);

function solution(N, infos) {
  const dp = [];
  dp[N] = 0;

  for (let i = N - 1; i >= 0; i--) {
    const [t, p] = infos[i];
    const next = i + t;

    if (next > N) {
      dp[i] = dp[i + 1];
      continue;
    }

    dp[i] = Math.max(dp[i + 1], p + dp[next]);
  }

  return dp[0];
}
