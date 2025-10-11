// https://school.programmers.co.kr/learn/courses/30/lessons/42584
function solution(prices) {
  const answer = [];
  for (let i = 0; i < prices.length; i++) {
    const price = prices[i];
    let count = 0;
    for (let j = i + 1; j < prices.length; j++) {
      if (prices[j] >= price) {
        count++;
      } else {
        count++;
        break;
      }
    }
    answer.push(count);
  }
  console.log(answer);
  return answer;
}

const prices = [1, 2, 3, 2, 3];
// console.log(solution(prices));

function solutionWithStack(prices) {
  const answer = Array(prices.length).fill(0);
  const stack = []; // 위치를 저장한다.

  for (let i = 0; i < prices.length; i++) {
    console.log(stack);
    const curPrice = prices[i];
    // stack의 마지막이 현재 가격보다 큰 경우(가격이 떨어진 경우)

    while (stack.length && prices[stack[stack.length - 1]] > curPrice) {
      const index = stack.pop(); // 2
      answer[index] = i - index; // 3 - 2 = 1
    }

    stack.push(i);
  }

  // stack에 남아있다 = 가격이 떨어지지 않았다.
  while (stack.length) {
    const index = stack.pop();
    answer[index] = prices.length - 1 - index;
  }
  return answer;
}

console.log(solutionWithStack(prices));
