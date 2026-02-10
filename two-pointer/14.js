function solution(queue1, queue2) {
  let answer = -1;
  let count = 0;

  let q1Sum = queue1.reduce((acc, cur) => acc + cur, 0);
  let q2Sum = queue2.reduce((acc, cur) => acc + cur, 0);

  let q1Index = 0;
  let q2Index = 0;
  const q1Leng = queue1.length;

  const sum = (q1Sum + q2Sum) / 2;

  while (q1Index < q1Leng || q2Index < q1Leng) {
    if (q1Sum === sum) {
      answer = count;
      break;
    }

    if (q1Sum < sum) {
      const queue2Value = queue2[q2Index++];
      console.log(queue2Value, q2Index - 1);
      q1Sum += queue2Value;
      q2Sum -= queue2Value;

      queue1.push(queue2Value);
    } else {
      const queue1Value = queue1[q1Index++];
      q1Sum -= queue1Value;
      q2Sum += queue1Value;

      queue2.push(queue1Value);
    }
    count++;
  }

  return answer;
}

console.log(solution([1, 1], [1, 5]));
