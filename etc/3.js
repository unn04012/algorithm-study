function solution(genres, plays) {
  var answer = [];

  const objectAcc = {}; // 누적
  const objectPlay = {}; // 인덱스별 플레이 횟수

  for (let i = 0; i < plays.length; i++) {
    const playCount = plays[i];
    const genre = genres[i];

    if (!objectAcc[genre]) {
      objectAcc[genre] = 0;
      objectPlay[genre] = [];
    }

    objectAcc[genre] += playCount;
    objectPlay[genre].push({ index: i, playCount });
  }

  const sortedGenre = Object.entries(objectAcc)
    .map(([key, value]) => ({ genre: key, value }))
    .sort((a, b) => b.value - a.value);

  for (let i = 0; i < sortedGenre.length; i++) {
    const { genre } = sortedGenre[i];
    objectPlay[genre].sort((a, b) => b.playCount - a.playCount);

    for (let j = 0; j < 2; j++) {
      if (objectPlay[genre][j]) {
        answer.push(objectPlay[genre][j].index);
      }
    }
  }

  return answer;
}

console.log(solution(['classic', 'pop', 'classic', 'classic', 'jazz', 'pop', 'Rock', 'jazz'], [500, 600, 150, 800, 1100, 2500, 100, 1000])); // [4,1,3,0]
