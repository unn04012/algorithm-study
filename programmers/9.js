function solution(topping) {
  let answer = 0;

  if (topping.length === 1) return 0;

  const getNumToppingKind = (obj) => {
    return Object.keys(obj).length;
  };

  //1. init
  const chulsuHash = {
    [topping[0]]: 1,
  };
  const brotherhash = {};
  for (let i = 1; i < topping.length; i++) {
    if (!brotherhash[topping[i]]) {
      brotherhash[topping[i]] = 1;
      continue;
    }
    brotherhash[topping[i]]++;
  }

  let numChulsuTop = 1;
  let numBrotherTop = Object.keys(brotherhash).length;
  //2. divide
  for (let i = 1; i < topping.length; i++) {
    const top = topping[i];
    brotherhash[top]--;

    if (brotherhash[top] === 0) numBrotherTop--;

    if (!chulsuHash[top]) {
      chulsuHash[top] = 0;
      numChulsuTop++;
    }

    chulsuHash[top]++;

    if (numChulsuTop === numBrotherTop) answer++;
  }

  return answer;
}

console.log(solution([1, 2, 1, 3, 1, 4, 1, 2]));
