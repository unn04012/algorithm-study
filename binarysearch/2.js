// https://school.programmers.co.kr/learn/courses/30/lessons/43238
function solution(n, times) {
  var answer = 0;

  times.sort((a, b) => a - b);

  let left = 1;
  let right = times[times.length - 1] * n;

  const availableTimes = [];

  while (right >= left) {
    const mid = Math.floor((left + right) / 2);

    const count = times.reduce((acc, cur) => acc + Math.floor(mid / cur), 0);
    console.log(mid, count);
    if (count >= n) {
      availableTimes.push(mid);
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return Math.min(...availableTimes);
}

const n = 6;
const times = [7, 10];

console.log(solution(n, times));
