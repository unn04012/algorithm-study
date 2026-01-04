// https://school.programmers.co.kr/learn/courses/30/lessons/389479
function solution(players, m, k) {
  let answer = 0;

  const servers = []; // {startTime: }

  const getNumServerNeeded = (numPlayer) => {
    const base = numPlayer / m;

    const allServers = servers.reduce((acc, cur) => acc + cur.num, 0);
    for (let i = 1; i <= numPlayer; i++) {
      if (base >= i && base < i + 1) {
        return Math.max(i - allServers, 0);
      }
    }
    return 0;
  };

  for (let i = 0; i < players.length; i++) {
    // player 수를 구한다.
    const numPlayer = players[i];
    // 돌아가는 서버가 있을 경우
    if (servers.length) {
      // 종료시간이 다 왔으면 제거
      if (servers[0].endTime === i) servers.shift();
    }

    const numServer = getNumServerNeeded(numPlayer);

    // server를 증설 해야 한다면
    if (numServer) {
      servers.push({ num: numServer, endTime: i + k });
      answer += numServer;
    }
  }

  return answer;
}

console.log(solution([0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 5, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], 1, 1));
