function solution(relation) {
  let answer = 0;
  const n = relation[0].length;
  const combination = Array.from({ length: n }, (_, i) => i);

  const getCombination = (size) => {
    if (size === 1) return combination.map((e) => [e]);
    const result = [];
    const dfs = (start, arr) => {
      if (arr.length === size) {
        result.push([...arr]);
        return;
      }

      for (let i = start; i < combination.length; i++) {
        arr.push(combination[i]);
        dfs(i + 1, arr);
        arr.pop();
      }
    };
    dfs(0, []);

    return result;
  };

  const getIsUnique = (colSet) => {
    const set = new Set();
    for (const row of relation) {
      const key = colSet.map((col) => row[col]).join('-');
      set.add(key);
    }
    return set.size === relation.length;
  };

  const candidateKey = [];
  // 최소성 검사
  const getIsSubset = (currentKey) => {
    return candidateKey.some(
      (
        candidate, // 후보키 중 하나라도
      ) => candidate.every((col) => currentKey.includes(col)), // 부분집합이면
    );
  };

  for (let i = 1; i <= n; i++) {
    const combination = getCombination(i);

    for (const colSet of combination) {
      const isUnique = getIsUnique(colSet);

      if (isUnique) {
        // 최소성 검사
        const isSubset = getIsSubset(colSet);

        if (isSubset) continue;

        candidateKey.push(colSet);
        answer++;
      }
    }
  }

  return answer;
}

console.log(
  solution([
    ['100', 'ryan', 'music', '2'],
    ['200', 'apeach', 'math', '2'],
    ['300', 'tube', 'computer', '3'],
    ['400', 'con', 'computer', '4'],
    ['500', 'muzi', 'music', '3'],
    ['600', 'apeach', 'music', '2'],
  ]),
);
