console.log(
  solution(
    ['joy', 'brad', 'alessandro', 'conan', 'david'],
    ['alessandro brad', 'alessandro joy', 'alessandro conan', 'david alessandro', 'alessandro david']
  )
);
function solution(friends, gifts) {
  const answer = 0;

  const n = friends.length;
  const nextGifts = Array(n).fill(0);

  // init hash
  const hash = new Map();
  for (let i = 0; i < friends.length; i++) {
    hash.set(friends[i], i);
  }

  const board = Array.from({ length: n }, () => new Array(n).fill(0));

  for (const [A, B] of gifts.map((e) => e.split(' '))) {
    const a = hash.get(A); // 준 사람
    const b = hash.get(B); // 받은 사람

    board[a][b]++;
  }

  // init gift index
  const gitIndex = [];
  for (let i = 0; i < n; i++) {
    const numGive = board[i].reduce((acc, cur) => acc + cur, 0);
    const numReceive = board.reduce((acc, cur) => acc + cur[i], 0);
    gitIndex.push(numGive - numReceive);
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) continue; // (대각선)
      const give = board[i][j];
      const receive = board[j][i];

      // 준 선물이 더 많을 경우
      if (give > receive) {
        nextGifts[i]++;
      } else if (give === receive) {
        // 선물 지수가 같다면
        if (gitIndex[i] > gitIndex[j]) {
          nextGifts[i]++;
        }
      }
    }
  }

  return Math.max(...nextGifts);
}
