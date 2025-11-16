// https://www.acmicpc.net/problem/5397
const path = process.platform === 'linux' ? '/dev/stdin' : '../problem.txt';
let input = require('fs').readFileSync(path).toString().trim().split('\n');

console.log(solution(input.slice(1)));

function solution(keyLoggers) {
  const passwordHasher = (keyLogger) => {
    const stack = [];
    const stack2 = [];
    let cursorIndex = 0;

    for (const e of keyLogger) {
      if (e === '>') {
        if (stack2.length) {
          stack.push(stack2.pop());
        }
        continue;
      }

      if (e === '<') {
        if (stack.length) {
          stack2.push(stack.pop());
        }
      } else if (e === '-') {
        stack.pop();
      } else {
        stack.push(e);
      }
    }

    stack.push(...stack2.reverse());
    return stack.join('');
  };

  const answer = keyLoggers.map((keyLogger) => passwordHasher(keyLogger));

  return answer.join('\n');
}
