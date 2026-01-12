// https://leetcode.com/problems/add-two-numbers/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let dummy = new ListNode(0);
  let p1 = l1;
  let p2 = l2;
  let carry = 0;
  let current = dummy;

  while (p1 || p2 || carry) {
    let val1 = p1 ? p1.val : 0;
    let val2 = p2 ? p2.val : 0;

    let sum = val1 + val2 + carry;

    current.next = new ListNode(sum % 10);

    carry = Math.floor(sum / 10);

    if (p1) p1 = p1.next;
    if (p2) p2 = p2.next;
    current = current.next;
  }
  return dummy.next;
};

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

// Example 1: [2,4,3] + [5,6,4]
let l1 = new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9)))))));

// [9,9,9,9]
let l2 = new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9))));

let result = addTwoNumbers(l1, l2);
console.log(JSON.stringify(result));
