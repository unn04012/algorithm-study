console.log(solution([100, 180, 360, 100, 270]));
function solution(weights) {
  let answer = 0;
  weights.sort((a, b) => a - b);
  const countMap = {};

  for (const weight of weights) {
    const availableWeights = [weight, (weight / 4) * 3, (weight / 3) * 2, weight * 0.5];

    for (const w of availableWeights) {
      if (Number.isInteger(w) && countMap[w]) {
        answer += countMap[w];
      }
    }

    countMap[weight] = (countMap[weight] || 0) + 1;
  }

  return answer;
}
