//https://school.programmers.co.kr/learn/courses/30/lessons/60057
function solution(s) {
  let answer = Number.MAX_SAFE_INTEGER;

  if (s.length === 1) return 1;

  const compressionStr = (numSlice, str) => {
    // first chunk
    let chunk = str.slice(0, numSlice);
    let continuousNum = 1;

    let compressionStr = '';

    let i = numSlice;

    for (; i < str.length; i += numSlice) {
      //  prevent overflow
      const endIndex = Math.min(i + numSlice, str.length);
      const nextChunk = str.slice(i, endIndex);
      //   console.log(i, chunk, nextChunk, endIndex);
      if (chunk === nextChunk) {
        continuousNum++;
      } else {
        compressionStr += (continuousNum !== 1 ? continuousNum : '') + chunk;
        continuousNum = 1;
        // chunk 갱신
        chunk = nextChunk;
      }
    }

    compressionStr += (continuousNum !== 1 ? continuousNum : '') + chunk;

    return compressionStr;
  };

  for (let i = 1; i <= Math.floor(s.length / 2); i++) {
    const compressedStr = compressionStr(i, s);

    answer = Math.min(compressedStr.length, answer);
  }
  return answer;
}

console.log(solution('ababcdcdababcdcd'));
