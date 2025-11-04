function is_correct_parenthesis(str) {
  // 구현해보세요!

  const stack = [];
  for (const e of str) {
    if (e === '(') stack.push(e);
    else {
      if (stack[stack.length - 1] === '(') {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  if (stack.length) return false;

  return true;
}

console.log('정답 = True / 현재 풀이 값 = ', is_correct_parenthesis('(())'));
console.log('정답 = False / 현재 풀이 값 = ', is_correct_parenthesis(')'));
console.log('정답 = False / 현재 풀이 값 = ', is_correct_parenthesis('((())))'));
console.log('정답 = False / 현재 풀이 값 = ', is_correct_parenthesis('())()'));
console.log('정답 = False / 현재 풀이 값 = ', is_correct_parenthesis('((())'));
