function solution(cap, n, deliveries, pickups) {
  let answer = 0;

  let deliveryIdx = n - 1;
  let pickupIdx = n - 1;

  while (pickupIdx >= 0 || deliveryIdx >= 0) {
    while (deliveryIdx >= 0 && deliveries[deliveryIdx] === 0) {
      deliveryIdx--;
    }
    while (pickupIdx >= 0 && pickups[pickupIdx] === 0) {
      pickupIdx--;
    }

    if (deliveryIdx < 0 && pickupIdx < 0) break;
    // console.log(deliveryIdx, pickupIdx);
    const further = Math.max(deliveryIdx, pickupIdx) + 1;
    answer += further * 2;

    // 배달
    let curCap = cap;
    while (deliveryIdx >= 0 && curCap !== 0) {
      const subtractProduct = Math.min(deliveries[deliveryIdx], curCap); // 2,4
      //   console.log(subtractProduct);
      curCap -= subtractProduct; // 물품 배달
      deliveries[deliveryIdx] -= subtractProduct; // 남은 물품 차감

      if (deliveries[deliveryIdx] !== 0) break;
      deliveryIdx--;
    }

    // 수거
    let pickCap = 0;
    while (pickupIdx >= 0 && pickCap !== cap) {
      const addedProduct = Math.min(pickups[pickupIdx], cap - pickCap);
      pickCap += addedProduct;
      pickups[pickupIdx] -= addedProduct;
      if (pickups[pickupIdx] > 0) break;
      pickupIdx--;
    }
  }

  return answer;
}

console.log(solution(2, 7, [1, 0, 2, 0, 1, 0, 2], [0, 2, 0, 1, 0, 2, 0]));
