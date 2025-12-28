const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

console.log(
  solution(
    Number(input[0]),
    input.slice(1).map((e) => Number(e))
  )
);

function solution(N, numbers) {
  // 그래프 생성: i → numbers[i-1]
  const graph = {};
  for (let i = 1; i <= N; i++) {
    graph[i] = numbers[i - 1];
  }

  const state = Array(N + 1).fill(0); // 0: 미방문, 1: 방문중, 2: 완료
  const inCycle = Array(N + 1).fill(false);

  const findCycle = (start) => {
    const path = []; // 현재 탐색 경로
    let curr = start;

    // 1. 미방문 노드를 따라가며 경로 기록
    while (state[curr] === 0) {
      state[curr] = 1; // 방문중 표시
      path.push(curr);
      curr = graph[curr]; // 다음 노드로 이동
    }

    // 2. 사이클 발견 (현재 경로에서 다시 만난 경우)
    if (state[curr] === 1) {
      // curr이 사이클의 시작점
      // path에서 curr의 위치를 찾아서 그 이후가 사이클
      const cycleStartIdx = path.indexOf(curr);
      for (let i = cycleStartIdx; i < path.length; i++) {
        inCycle[path[i]] = true;
      }
    }

    // 3. 경로의 모든 노드를 완료 처리
    for (const node of path) {
      state[node] = 2;
    }
  };

  // 모든 노드에서 탐색 시작
  for (let i = 1; i <= N; i++) {
    if (state[i] === 0) {
      findCycle(i);
    }
  }

  // 결과 수집
  const answer = [];
  for (let i = 1; i <= N; i++) {
    if (inCycle[i]) answer.push(i);
  }

  return `${answer.length}\n${answer.join('\n')}`;
}
