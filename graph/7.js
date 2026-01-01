const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

console.log(
  solution(
    input[0].split(' ').map((e) => Number(e)),
    input[1].split(' ').map((e) => Number(e))
  )
);

function solution([N, K], weights) {
  const path = [];
  const visited = Array(N).fill(false);
  const dfs = (depth, currentWeight) => {
    if (depth === N) {
      return 1;
    }
    let count = 0;

    for (let i = 0; i < weights.length; i++) {
      if (!visited[i]) {
        // 이번 키트 사용 후 중량 계산
        const newWeight = currentWeight + weights[i] - K;

        // 조건 확인: 중량이 500 이상이어야 함
        if (newWeight >= 500) {
          visited[i] = true; // 방문 표시
          count += dfs(depth + 1, newWeight);
          visited[i] = false;
        }
      }
    }
    return count;
  };
  let answer = dfs(0, 500);

  return answer;
}
