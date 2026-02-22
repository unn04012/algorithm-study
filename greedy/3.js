function solution(n, t, m, timetable) {
  let answer = '';
  let conArriveMinute = 0;

  const getMinutesFromTime = (time) => {
    const [hour, minute] = time.split(':').map((e) => Number(e));
    return hour * 60 + minute;
  };

  // get bus time table
  const busMinutesTime = Array.from({ length: n }, (_, i) => i * t + 540);

  const crewMinutesTime = timetable.map((time) => getMinutesFromTime(time));

  // sorting
  crewMinutesTime.sort((a, b) => a - b);

  let busIndex = 0;
  let crewIndex = 0;

  // 막차일때까지
  while (busIndex < busMinutesTime.length) {
    const isLastBus = busIndex === busMinutesTime.length - 1;

    const busArriveTime = busMinutesTime[busIndex];
    let numPassenger = 0;

    // crew가 미리 도착해있을 경우 버스에 태운다
    while (numPassenger < m && busArriveTime >= crewMinutesTime[crewIndex]) {
      numPassenger++;
      crewIndex++;
    }

    if (isLastBus) {
      // 승객을 모두 태운 경우
      if (numPassenger === m) {
        conArriveMinute = crewMinutesTime[crewIndex - 1] - 1;
      } else {
        conArriveMinute = busArriveTime;
      }
    }

    busIndex++;
  }

  // minutes to time
  const hour = Math.floor(conArriveMinute / 60);
  const minute = conArriveMinute % 60;

  answer += hour < 10 ? `0${hour}` : hour;
  answer += ':';
  answer += minute < 10 ? `0${minute}` : minute;

  return answer;
}

console.log(solution(1, 1, 1, ['23:59']));
