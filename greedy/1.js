// https://www.acmicpc.net/problem/1459
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

console.log(solution(input[0].split(' ').map((e) => Number(e))));

function solution([x, y, W, S]) {
  let answer = 0;
  let startX = 0;
  let startY = 0;

  const min = Math.min(x, y);
  const max = Math.max(x, y);
  const diff = max - min;

  if (S > 2 * W) {
    answer += 2 * W * min;
  } else {
    answer += S * min;
  }

  const remain = diff % 2;

  if (remain === 0) {
    const share = diff / 2;
    if (share > 0) {
      if (S < W) {
        answer += 2 * S * share;
      } else {
        answer += 2 * W * share;
      }
    }
  } else {
    const share = Math.floor(diff / 2); // 3

    if (share > 0) {
      if (S < W) {
        answer += 2 * S * share;
      } else {
        answer += 2 * W * share;
      }
    }
    answer += W;
  }

  return answer;
}
