function solution(storage, requests) {
  let answer = 0;

  const delta = [
    [0, 1], // right
    [0, -1], // left
    [1, 0], // up
    [-1, 0], // down
  ];

  const n = storage.length; // 세로
  const m = storage[0].length; // 가로

  // 컨테이너 존재 여부
  const grid = Array.from({ length: n + 2 }, () => new Array(m + 2).fill(null));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      // i+1만 하면 패딩이 적용되는지
      grid[i + 1][j + 1] = storage[i][j];
    }
  }

  const bfs = (container) => {
    const visited = Array.from({ length: n + 2 }, () => new Array(m + 2).fill(false));

    visited[0][0] = true;
    const queue = [[0, 0]];
    let jobIndex = 0;

    const beEliminated = [];
    // 크레인 전용
    while (queue.length) {
      const [x, y] = queue.shift();

      if (grid[x][y] === container) {
        // grid[x][y] = null; // container 제거

        beEliminated.push([x, y]);
        continue;
      }

      if (grid[x][y] !== null) {
        continue;
      }

      for (const [x1, y1] of delta) {
        const newX = x + x1;
        const newY = y + y1;

        // 범위를 넘을 경우
        if (newX < 0 || newX > n + 1 || newY < 0 || newY > m + 1) {
          continue;
        }

        // 다른 컨테이너를 만난 경우
        if (grid[x][y] !== null && grid[newX][newY] !== null) {
          continue;
        }

        if (visited[newX][newY]) continue;

        visited[newX][newY] = true;
        queue.push([newX, newY]);
      }
    }
    for (const [x, y] of beEliminated) {
      grid[x][y] = null;
    }
  };

  const lift = (container) => {
    for (let i = 0; i < n + 2; i++) {
      for (let j = 0; j < m + 2; j++) {
        if (grid[i][j] === container) {
          grid[i][j] = null;
        }
      }
    }
  };

  for (const request of requests) {
    if (request.length === 1) {
      bfs(request);
    } else {
      lift(request[0]);
    }
  }

  return grid.flat().filter((e) => e !== null).length;
}

console.log(solution(['HAH', 'HBH', 'HHH', 'HAH', 'HBH'], ['C', 'B', 'B', 'B', 'B', 'H']));
