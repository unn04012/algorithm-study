// https://www.acmicpc.net/problem/15649
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

console.log(solution(input[0].split(' ').map((e) => Number(e))));

function solution([N, M]) {
  const answer = [];
  const visited = Array(N + 1).fill(false);

  const permutation = (curNumbers) => {
    if (curNumbers.length === M) {
      answer.push([...curNumbers]);
      return;
    }

    for (let i = 1; i <= N; i++) {
      if (visited[i]) {
        continue;
      }

      visited[i] = true;
      curNumbers.push(i);
      permutation(curNumbers);
      visited[i] = false;
      curNumbers.pop();
    }
  };

  permutation([]);

  return answer.map((e) => e.join(' ')).join('\n');
}
