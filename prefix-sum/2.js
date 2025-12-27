// https://www.acmicpc.net/problem/2979
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

const [N, M] = input[0].split(' ').map(Number);

console.log(
  solution2(
    input[0].split(' ').map((e) => Number(e)),
    input.slice(1).map((e) => e.split(' ').map((e) => Number(e)))
  )
);

function solution([A, B, C], trucks) {
  const maxTime = Math.max(...trucks.flat());

  const isParked = (time) => {
    const numParkedTruck = trucks.filter(([start, leave]) => time >= start && time < leave).length;
    return numParkedTruck;
  };

  const prices = {
    1: A,
    2: B,
    3: C,
  };
  let answer = 0;
  for (let i = 1; i <= maxTime; i++) {
    const numParkedTruck = isParked(i);

    const price = prices[String(numParkedTruck)];

    if (price) {
      answer += price * numParkedTruck;
    }
  }
  return answer;
}

function solution2([A, B, C], trucks) {
  // 1. 변화량 배열 만들기 (충분한 크기로)
  const diff = new Array(102).fill(0);

  const maxTime = Math.max(...trucks.flat());

  // 2. 각 트럭의 시작/끝 지점에 +1, -1 기록
  for (const [start, leave] of trucks) {
    // 여기서 어떻게 기록할지 생각해보세요!
    diff[start] += 1;
    diff[leave] -= 1;
  }

  // 3. 누적합 계산하면서 요금 계산
  let count = 0; // 현재 주차된 트럭 수
  let answer = 0;

  const prices = {
    1: A,
    2: B,
    3: C,
  };

  for (let i = 1; i <= maxTime; i++) {
    // count를 업데이트하고 요금 계산
    count += diff[i];
    const price = prices[String(count)];

    if (price) {
      answer += price * count;
    }
  }

  return answer;
}
