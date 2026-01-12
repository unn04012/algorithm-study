// https://leetcode.com/problems/two-sum/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const hashMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (hashMap.has(target - nums[i])) {
      return [i, hashMap.get(target - nums[i])];
    }
    hashMap.set(nums[i], i);
  }
};

console.log(twoSum([3, 2, 4], 6));
