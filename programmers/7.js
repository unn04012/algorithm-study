function solution(scores) {
  let answer = 0;
  if (scores.length === 1) return 1;

  const newScore = scores
    .map((e, i) => ({ index: i, value: e }))
    .sort((a, b) => {
      if (a.value[0] === b.value[0]) {
        return a.value[1] - b.value[1];
      }
      return b.value[0] - a.value[0];
    });

  let max = Number.MIN_SAFE_INTEGER;

  const flagWithScore = [];
  for (const { index, value } of newScore) {
    const [a, b] = value;

    if (b >= max) {
      max = b;
    } else {
      if (index === 0) {
        return -1;
      }
      continue;
    }

    flagWithScore.push({ index, value });
  }

  flagWithScore.sort((a, b) => b.value[0] + b.value[1] - (a.value[0] + a.value[1]));

  let rank = 0;
  let cumulativeRank = 1;
  let lastScore;
  for (const { index, value } of flagWithScore) {
    const [a, b] = value;
    const score = a + b;
    if (score === lastScore) {
      if (index === 0) return rank;
      cumulativeRank++;
      continue;
    }
    rank += cumulativeRank;
    if (cumulativeRank > 1) cumulativeRank = 1;

    if (index === 0) return rank;

    lastScore = score;
  }

  return answer;
}

console.log(
  solution([
    [2, 2],
    [1, 4],
    [3, 2],
    [3, 2],
    [2, 1],
  ]),
);
