function solution(record) {
  const answer = [];
  const userIdMap = new Map();
  for (const behavior of record) {
    const [command, userId, nickname] = behavior.split(' ');

    if (command === 'Enter' || command === 'Change') {
      userIdMap.set(userId, nickname);
    }
  }
  const printMap = {
    Enter: (nickname) => `${nickname}님이 들어왔습니다.`,
    Leave: (nickname) => `${nickname}님이 나갔습니다.`,
  };

  for (const behavior of record) {
    const [command, userId] = behavior.split(' ');
    if (printMap[command]) {
      const nickname = userIdMap.get(userId);
      answer.push(printMap[command](nickname));
    }
  }

  return answer;
}

console.log(solution(['Enter uid1234 Muzi', 'Enter uid4567 Prodo', 'Leave uid1234', 'Enter uid1234 Prodo', 'Change uid4567 Ryan']));
