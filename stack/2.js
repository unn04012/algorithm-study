// https://school.programmers.co.kr/learn/courses/30/lessons/12909
function solution(s) {
  const stack = [];

  if (s[0] === ')') return false;

  for (let i = 0; i < s.length; i++) {
    const e = s[i];

    if (e === '(') {
      stack.push(e);
    } else {
      // ')'
      if (stack.length) {
        stack.pop();
        continue;
      }
      return false;
    }
  }

  return stack.length ? false : true;
}

const s = '())(';

console.log(solution(s));
