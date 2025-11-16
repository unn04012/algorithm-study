// https://www.acmicpc.net/problem/11478
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

console.log(solution(input[0]));

function solution(str) {
  const set = new Set(str.split(''));

  for (let i = 0; i < str.length; i++) {
    let substr = '';
    for (let j = i; j < str.length; j++) {
      substr += str[j];
      set.add(substr);
    }
  }
  return set.size;
}
