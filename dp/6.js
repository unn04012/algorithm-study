// https://school.programmers.co.kr/learn/courses/30/lessons/12900
function solution(n) {
  let answer = 0;

  let n1 = 2;
  let n2 = 1;
  let fibo;

  for (let i = 3; i <= n; i++) {
    fibo = (n1 + n2) % 1000000007;

    n2 = n1;
    n1 = fibo;
  }

  return fibo;
}

console.log(solution(4));
