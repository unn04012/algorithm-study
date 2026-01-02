// https://www.acmicpc.net/problem/21921
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

console.log(
  solution(
    input[0].split(' ').map((e) => Number(e)),
    input.slice(1)
  )
);

function solution([N, K], students) {
  let answer = 0;
  const hash = {};

  const names = students.map((e) => e.length);

  for (let i = 0; i < names.length; i++) {
    // i nextIndex
    if (i > K) {
      const firstValue = names[i - (K + 1)];
      hash[firstValue]--;
    }
    answer += hash[names[i]] || 0;

    hash[names[i]] = (hash[names[i]] || 0) + 1;
  }
  return answer;
}
