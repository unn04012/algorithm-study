function binarySearch(arr, target, left, right) {
  if (left > right) return -1;

  const mid = Math.floor((right + left) / 2);
  const midValue = arr[mid];

  if (midValue === target) {
    return mid;
  }

  if (left > right) return;

  if (midValue > target) {
    return binarySearch(arr, target, left, mid - 1);
  } else {
    // target이 오른쪽에 있는 경우
    return binarySearch(arr, target, mid + 1, right);
  }
}

function binarySearchIteration(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let mid = Math.floor((left + right) / 2);

  while (right >= left) {
    if (arr[mid] === target) {
      return mid;
    }
    const midValue = arr[mid];

    // 중간값이 타겟보다 큰 경우(왼쪽 기준)
    if (midValue > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
    mid = Math.floor((left + right) / 2);
  }
}

const arr = [1, 2, 3, 7, 89, 100];

const targetIndex = binarySearch(arr, 100, 0, arr.length - 1);
const targetIndexV2 = binarySearchIteration(arr, 7);
console.log(targetIndexV2);

console.log(targetIndex);
