const shop_prices = [30000, 2000, 1500000];
const user_coupons = [20, 40];

function getMaxDiscountedPrice(prices, coupons) {
  // 이 곳을 채워보세요!
  prices.sort((a, b) => b - a);
  coupons.sort((a, b) => b - a);

  const sum = prices.reduce((acc, cur, i) => {
    // cur: 30000
    const disCount = coupons[i] ?? 0;
    const discountedPrice = (cur * disCount) / 100;

    return acc + (cur - discountedPrice);
  }, 0);
  return sum;
}

console.log('정답 = 926000 / 현재 풀이 값 = ', getMaxDiscountedPrice([30000, 2000, 1500000], [20, 40]));
console.log('정답 = 485000 / 현재 풀이 값 = ', getMaxDiscountedPrice([50000, 1500000], [10, 70, 30, 20]));
console.log('정답 = 1550000 / 현재 풀이 값 = ', getMaxDiscountedPrice([50000, 1500000], []));
console.log('정답 = 1458000 / 현재 풀이 값 = ', getMaxDiscountedPrice([20000, 100000, 1500000], [10, 10, 10]));
