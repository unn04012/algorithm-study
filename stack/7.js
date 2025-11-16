// https://www.acmicpc.net/problem/17298
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

console.log(solution(input[1].split(' ').map((e) => Number(e))));

function solution(numbers) {
  const answer = [];
  // [3,5,2,7]
  const stack = [];
  // [7,2,5,3]
  numbers.reverse();

  for (const num of numbers) {
    while (stack.length && stack[stack.length - 1] <= num) {
      stack.pop();
    }

    if (stack.length) {
      answer.push(stack[stack.length - 1]);
    } else {
      answer.push(-1);
    }
    stack.push(num);
  }
  return answer.reverse().join(' ');
}
