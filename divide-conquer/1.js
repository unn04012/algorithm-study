// https://www.acmicpc.net/problem/2302
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

console.log(
  solution(
    Number(input[0]),
    input.slice(1).map((e) => e.split('').map((e) => Number(e)))
  )
);

function solution(N, numbers) {
  const answer = [];
  let n = N;

  /**
   * @param {*} x  시작점
   * @param {*} y  시작점
   * @param {*} n
   */
  const compression = (x, y, n) => {
    const start = numbers[x][y];
    let canCompression = true;

    for (let i = x; i < x + n; i++) {
      for (let j = y; j < y + n; j++) {
        if (start !== numbers[i][j]) {
          canCompression = false;
          break;
        }
      }
    }

    // 압출 할 수 없으면
    if (!canCompression) {
      answer.push('(');

      compression(x, y, n / 2); // 왼쪽 위
      compression(x, y + n / 2, n / 2); // 오른쪽 위
      compression(x + n / 2, y, n / 2); // 왼쪽 아래
      compression(x + n / 2, y + n / 2, n / 2); // 오른쪽 down
      answer.push(')');
    } else {
      answer.push(start);
    }
  };
  compression(0, 0, n);

  return answer.join('');
}
