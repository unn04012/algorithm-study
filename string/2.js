// https://www.acmicpc.net/problem/9093
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

console.log(solution(input[0], input.slice(1)));

function solution(T, strings) {
  let answer = '';

  const reverseString = (str) => {
    return str
      .split(' ')
      .map((e) => e.split('').reverse().join(''))
      .join(' ');
  };

  for (const str of strings) {
    answer += reverseString(str) + '\n';
  }
  return answer;
}
