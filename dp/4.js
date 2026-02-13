// https://school.programmers.co.kr/learn/courses/30/lessons/12913
function solution(land) {
  let answer = 0;

  // init
  const n = land.length;
  const dp = Array.from({ length: n }, () => []);

  dp[0] = land[0];

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < 4; j++) {
      const excludeLanded = dp[i - 1].filter((_, index) => j !== index);
      const max = Math.max(...excludeLanded);

      const maxLand = land[i][j] + max;
      dp[i][j] = maxLand;

      if (i === n - 1) {
        answer = Math.max(maxLand, answer);
      }
    }
  }

  return answer;
}

console.log(
  solution([
    [1, 2, 3, 5],
    [5, 6, 7, 8],
    [4, 3, 2, 1],
  ]),
);
