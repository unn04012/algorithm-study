// https://www.acmicpc.net/problem/6198
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

console.log(
  solution(
    Number(input[0]),
    input.slice(1).map((e) => Number(e))
  )
);

function solution(num, heights) {
  // 단조감소 스택
  // [10,3,7,4,12,2]
  let answer = 0; // key: index, value: pop한 갯수(이거보다 작은 갯수를 몇개 가지고 있는지)
  const stack = []; // {value: height, cnt: pop한 갯수가 몇개 였는지}

  heights.reverse();

  for (let i = 0; i < heights.length; i++) {
    const height = heights[i];
    let cnt = 0;
    while (stack.length && height > stack[stack.length - 1].value) {
      const accStack = stack.pop();
      cnt += accStack.cnt + 1;
    }

    answer += cnt;
    stack.push({ value: height, cnt });

    // console.log(i, cnt, stack);
    // [2] -> [12] -> [12,4] -> [12,7]
  }

  return answer;
}
