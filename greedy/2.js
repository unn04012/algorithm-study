// https://www.acmicpc.net/problem/2012
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

console.log(
  solution(
    Number(input[0]),
    input.slice(1).map((e) => Number(e))
  )
);

function solution(N, ranks) {
  let answer = 0;

  ranks.sort((a, b) => a - b); // 오름차순 정렬

  for (let i = 0; i < N; i++) {
    answer += Math.abs(ranks[i] - (i + 1)); // i+1이 실제 등수
  }

  return answer;
}
