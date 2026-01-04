function solution(n, q, ans) {
  let answer = 0;

  const isPassword = (password) => {
    let isCorrect = true;
    for (let i = 0; i < q.length; i++) {
      // 일치하는 Password를 찾는다.
      const correctLength = password.filter((e) => q[i].includes(e)).length;

      if (correctLength !== ans[i]) {
        isCorrect = false;
        break;
      }
    }
    if (isCorrect) {
      answer++;
    }
  };
  const dfs = (num) => {
    const stack = [[num]];

    while (stack.length) {
      const numbers = stack.pop(); // []

      if (numbers.length === 5) {
        //검사
        // console.log(numbers);
        isPassword(numbers);
        continue;
      }

      for (let i = numbers[numbers.length - 1] + 1; i <= n; i++) {
        stack.push([...numbers, i]);
      }
    }
  };

  for (let i = 1; i <= n - 4; i++) {
    dfs(i);
  }

  return answer;
}

const n = 15;
const q = [
  [2, 3, 9, 12, 13],
  [1, 4, 6, 7, 9],
  [1, 2, 8, 10, 12],
  [6, 7, 11, 13, 15],
  [1, 4, 10, 11, 14],
];
const ans = [2, 1, 3, 0, 1];
console.log(solution(n, q, ans));
