function solution(storey) {
  let answer = 0;

  const digits = String(storey).split('').map(Number).reverse();

  let carry = 0;
  for (let i = 0; i < digits.length; i++) {
    const current = digits[i] + carry;

    if (current < 5) {
      // 내림
      answer += current;
      carry = 0;
    } else if (current > 5) {
      // 올림
      answer += 10 - current;
      carry = 1;
    } else {
      // 정확히 5일 때 → 다음 자릿수 확인
      const next = digits[i + 1] ?? 0; // 없으면 0
      if (next >= 5) {
        // 올림 (다음도 올릴 거니까)
        answer += 5;
        carry = 1;
      } else {
        // 내림
        answer += 5;
        carry = 0;
      }
    }
  }

  return answer + carry;
}

console.log(solution(155));
