function solution(elements) {
  let answer = 0;
  const set = new Set();

  const twoElements = [...elements, ...elements];
  const prefix = [0];
  let sum = 0;
  for (const e of twoElements) {
    sum += e;
    prefix.push(sum);
  }

  let round = 1; // 고정 길이

  while (round <= elements.length) {
    for (let i = 0; i < elements.length; i++) {
      set.add(prefix[round + i] - prefix[i]);
    }
    round++;
  }

  return set.size;
}

console.log(solution([7, 9, 1, 1, 4]));
