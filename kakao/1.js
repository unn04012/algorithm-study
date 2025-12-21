//https://school.programmers.co.kr/learn/courses/30/lessons/60057
function solution(s) {
  const compression = (s, num) => {
    // num 갯수만큼 압축

    let compressedStr = '';
    let duplicateCount = 1;

    let start = num;
    let startUnit = s.slice(0, num);

    while (start < s.length) {
      const nextUnit = s.slice(start, start + num); // b
      if (startUnit === nextUnit) {
        duplicateCount++;
      } else {
        compressedStr += `${duplicateCount === 1 ? '' : duplicateCount}${startUnit}`;
        startUnit = nextUnit;
        duplicateCount = 1;
      }
      start += num;
    }

    compressedStr += `${duplicateCount === 1 ? '' : duplicateCount}${startUnit}`;

    return compressedStr;
  };
  let minLength = s.length;
  for (let i = 0; i < Math.floor(s.length / 2); i++) {
    const compressedStr = compression(s, i + 1);

    minLength = Math.min(minLength, compressedStr.length);
  }
  return minLength;
}

console.log(solution('aaaaaaaaaa'));
