const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);
const arr = input[1].split(' ').map(Number);
const queries = input.slice(2).map((line) => line.split(' ').map(Number));

console.log(solution(N, M, arr, queries));

function solution(N, M, arr, queries) {
  // 여기에 누적합 로직 구현

  const answer = [];

  const sums = [0];

  for (let i = 0; i < arr.length; i++) {
    sums.push(sums[i] + arr[i]);
  }

  for (const [i, j] of queries) {
    answer.push(sums[j] - sums[i - 1]);
  }
  return answer.join('\n');
}
