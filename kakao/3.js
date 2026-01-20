function solution(today, terms, privacies) {
  const answer = [];

  const countDays = (date) => {
    const [year, month, day] = date.split('.').map((e) => Number(e));

    return year * 12 * 28 + month * 28 + day;
  };

  const expirationTime = {};

  for (const term of terms) {
    const [kind, month] = term.split(' ');
    expirationTime[kind] = Number(month * 28);
  }

  const todayDays = countDays(today);

  let i = 1;
  for (const privacy of privacies) {
    const [colletedDate, termKind] = privacy.split(' ');

    const validDays = countDays(colletedDate) + expirationTime[termKind] - 1;

    if (todayDays > validDays) {
      answer.push(i);
    }
    i++;
  }
  return answer;
}

console.log(solution('2020.01.01', ['Z 3', 'D 5'], ['2019.01.01 D', '2019.11.15 Z', '2019.08.02 D', '2019.07.01 D', '2018.12.28 Z']));
