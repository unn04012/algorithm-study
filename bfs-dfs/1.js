// https://www.acmicpc.net/problem/10451
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

const T = Number(input[0]); // 테스트 케이스 개수

let lineIdx = 1; // 현재 읽고 있는 줄 인덱스

for (let t = 0; t < T; t++) {
  const N = Number(input[lineIdx]); // 순열 크기
  const permutation = input[lineIdx + 1].split(' ').map(Number); // 순열 배열

  console.log(solution(N, permutation));

  lineIdx += 2; // 다음 테스트 케이스로 (N 줄 + 순열 줄)
}

function solution(N, permutation) {
  const visited = Array(N).fill(false);
  let cycleCount = 0;

  for (let i = 0; i < N; i++) {
    // 이미 방문한 노드는 건너뛰기
    if (visited[i]) continue;

    // 새로운 사이클 시작
    cycleCount++;

    // 사이클을 따라가면서 모두 방문 체크
    let current = i;
    while (!visited[current]) {
      visited[current] = true;
      current = permutation[current] - 1;
    }
  }

  return cycleCount;
}
