function solution(arrayA, arrayB) {
  let answer = 0;

  const gcd = (a, b) => {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  };

  const getArrayGCD = (arr) => arr.reduce((acc, cur) => gcd(acc, cur));

  const gcdA = getArrayGCD(arrayA);
  const gcdB = getArrayGCD(arrayB);

  let canA = true;
  let canB = true;

  for (let i = 0; i < arrayA.length; i++) {
    if (canA === false && canB === false) {
      return 0;
    }
    if (canB && arrayA[i] % gcdB === 0) {
      canB = false;
    }
    if (canA && arrayB[i] % gcdA === 0) {
      canA = false;
    }
  }
  if (canA) answer = Math.max(answer, gcdA);
  if (canB) answer = Math.max(answer, gcdB);

  return answer;
}

console.log(solution([14, 35, 119], [18, 30, 102]));
