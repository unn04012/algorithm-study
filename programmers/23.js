function solution(survey, choices) {
  let answer = '';
  const personalityScore = {
    1: {
      R: 0,
      T: 0,
    },
    2: {
      C: 0,
      F: 0,
    },
    3: {
      J: 0,
      M: 0,
    },
    4: {
      A: 0,
      N: 0,
    },
  };
  const choiceScore = {
    1: 3, // 매우 비동의
    2: 2,
    3: 1,
    4: 0,
    5: 1,
    6: 2,
    7: 3, // 매우 동의
  };
  const questionMapper = {
    AN: 4,
    NA: 4,
    RT: 1,
    TR: 1,
    CF: 2,
    FC: 2,
    JM: 3,
    MJ: 3,
  };

  for (let i = 0; i < survey.length; i++) {
    const q = survey[i];

    const [nonAgree, agree] = q.split(''); // [A,N]

    // get score
    const choiceNum = choices[i];
    const score = choiceScore[choiceNum];

    // AN -> N
    const personality = choiceNum >= 4 ? agree : nonAgree;
    const question = questionMapper[q]; // 4

    personalityScore[question][personality] += score;

    // const
  }

  for (const value of Object.values(personalityScore)) {
    const sortedValue = Object.entries(value).sort((a, b) => {
      if (a[1] === b[1]) {
        return a[0].charCodeAt(0) - b[0].charCodeAt(0);
      }
      return b[1] - a[1];
    });

    answer += sortedValue[0][0];
  }

  return answer;
}

console.log(solution(['TR', 'RT', 'TR'], [7, 1, 3]));
