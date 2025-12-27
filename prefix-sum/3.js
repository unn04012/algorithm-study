// https://www.acmicpc.net/problem/2979
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);

console.log(
  solution(
    input[0],
    Number(input[1]),
    input.slice(2).map((e) =>
      e.split(' ').map((e, i) => {
        if (i !== 0) return Number(e);
        return e;
      })
    )
  )
);

function solution(S, numQuestion, questions) {
  const answer = [];

  // 1. 알파벳별 누적합 배열 초기화
  const prefix = {};
  for (let c = 97; c <= 122; c++) {
    const char = String.fromCharCode(c);
    prefix[char] = new Array(S.length + 1).fill(0);
  }

  // 2. 누적합 계산 (O(N) - 한 번만 순회)
  for (let i = 0; i < S.length; i++) {
    // 모든 알파벳의 이전 값을 복사
    for (let c = 97; c <= 122; c++) {
      const char = String.fromCharCode(c);
      prefix[char][i + 1] = prefix[char][i];
    }
    // 현재 문자만 +1
    prefix[S[i]][i + 1]++;
  }

  // 3. 질문 처리 (O(1) per query)
  for (const [alphabet, start, end] of questions) {
    answer.push(prefix[alphabet][end + 1] - prefix[alphabet][start]);
  }

  return answer.join('\n');
}
