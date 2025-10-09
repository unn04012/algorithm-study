// https://school.programmers.co.kr/learn/courses/30/lessons/42586
function solution(progresses, speeds) {
  const maxProgress = 100;

  const duringDays = progresses.map((progress, index) => {
    const day = Math.ceil((maxProgress - progress) / speeds[index]);

    return day;
  });

  const answer = [];

  for (let i = 0; i < duringDays.length; ) {
    let cnt = 1;
    let first = duringDays[i];
    let j = i + 1;

    while (j < duringDays.length && first >= duringDays[j]) {
      cnt++;
      j++;
    }

    answer.push(cnt);
    i = j;
  }

  return answer;
}

console.log(solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]));
