function solution(order) {
  let answer = 0;

  const belts = Array.from({ length: order.length }, (_, i) => i + 1);
  const secondaryBelts = []; // stack
  let jobIndex = 0;

  const found = (deliveryNumber) => {
    // secondaryBelts에 있는지 확인
    if (secondaryBelts.length) {
      if (secondaryBelts[secondaryBelts.length - 1] === deliveryNumber) {
        secondaryBelts.pop();
        return true;
      }
    }

    while (jobIndex < order.length) {
      if (belts[jobIndex] === deliveryNumber) {
        jobIndex++;
        return true;
      }
      secondaryBelts.push(belts[jobIndex++]);
    }
    return false;
  };

  for (let i = 0; i < order.length; i++) {
    const deliveryNumber = order[i];

    if (found(deliveryNumber)) {
      answer++;
    } else break;
  }

  return answer;
}

console.log(solution([5, 4, 3, 2, 1]));
