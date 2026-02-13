function solution(n, cores) {
  var answer = 0;

  const getCount = (time) => {
    let sumTask = 0;
    for (const core of cores) {
      sumTask += Math.floor(time / core);
    }
    return sumTask;
  };

  let left = 1;
  let right = Math.min(...cores) * n;
  let time = right;

  const targetNumTasks = n - cores.length;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    const totalNumTask = getCount(mid);

    if (totalNumTask >= targetNumTasks) {
      right = mid - 1;
      time = Math.min(time, mid);
    } else {
      left = mid + 1;
    }
  }

  let remainingTasks = targetNumTasks - getCount(time - 1);

  for (let i = 0; i < cores.length; i++) {
    if (time % cores[i] === 0) {
      remainingTasks--;
      if (remainingTasks === 0) {
        answer = i + 1;
        break;
      }
    }
  }
  return answer;
}

console.log(solution(6, [1, 2, 3]));
