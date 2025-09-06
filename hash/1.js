// https://school.programmers.co.kr/learn/courses/30/lessons/42576
function solution(participant, completion) {
  const map = new Map();

  for (const e of participant) {
    const found = map.get(e);
    if (!found) {
      map.set(e, 1);
    } else {
      map.set(e, found + 1);
    }
  }

  for (const e of completion) {
    const found = map.get(e);
    map.set(e, found - 1);
  }

  return [...map]
    .filter(([_, completion]) => completion > 0)
    .map(([name, _]) => name)
    .flat()
    .join();
}

const participant = ['leo', 'kiki', 'eden'];
const completion = ['eden', 'kiki'];
console.log(solution(participant, completion));
