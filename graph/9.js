// https://www.acmicpc.net/problem/9663
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

console.log(solution(Number(input[0])));

function solution(N) {
  let answer = 0;
  const queens = [];

  const canPlace = (row, col) => {
    for (let i = 0; i < queens.length; i++) {
      const prevCol = queens[i];
      // 같은 열인경우
      if (prevCol == col) return false;

      // 대각선인경운
      if (Math.abs(prevCol - col) - Math.abs(i - row) === 0) return false;
    }
    return true;
  };

  const backtracking = (row) => {
    if (row === N) {
      answer++;
      return;
    }

    for (let col = 0; col < N; col++) {
      if (canPlace(row, col)) {
        queens.push(col);
        backtracking(row + 1);
        queens.pop();
      }
    }
  };

  backtracking(0);
  return answer;
}
