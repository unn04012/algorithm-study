// https://www.acmicpc.net/problem/2512
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

console.log(
  solution(
    Number(input[0]),
    input[1].split(' ').map((e) => Number(e)),
    Number(input[2])
  )
);

function solution(N, budgets, totalBudget) {
  let answer = Number.MIN_SAFE_INTEGER;

  let min = 1;
  let max = totalBudget;

  const payBudget = (availableBudget) => {
    return budgets.reduce((acc, cur) => acc + Math.min(cur, availableBudget), 0);
  };

  const sumBudget = payBudget(totalBudget);
  if (totalBudget >= sumBudget) return Math.max(...budgets);

  while (max > min + 1) {
    const mid = Math.floor((max + min) / 2);

    const sumBudget = payBudget(mid);

    // 예산 초과가 난 경우 즉, max를 줄여야 한다
    if (sumBudget > totalBudget) {
      max = mid;
    } else {
      min = mid;
      answer = Math.max(answer, mid);
    }
  }

  return answer === Number.MIN_SAFE_INTEGER ? 1 : answer;
}
