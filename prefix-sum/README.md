# 구간 합

누적된 합을 미리 저장해두고, 필요할 때 패기 한번으로 답을 구하는 방식

공식

`구간[i ~ j]의 합 = prefix[j] - prefix[i-1]`

- prefix[j]: 0부터 j까지의 합
- prefix[i-1]: 0부터 i-1까지의 합(버릴 부분)
- prefix[j] - prefix[i-1]: i부터 j까지의 합(원하는 부분)

### 주의할 점

i가 0인 경우 음수가 될 수 있기 때문에 해당 처리를 해주어야 한다.

1. 앞에 0을 추가한다.

   ```javascript
   const prefix = [0];
   for (let i = 0; i < arr.length; i++) {
     prefix.push(prefix[i] + arr[i]);
   }
   ```

2. 조건을 추가한다.

   ```javascript
   function rangeSum(prefix, i, j) {
     if (i === 0) {
       return prefix[j]; // 예외 처리
     }
     return prefix[j] - prefix[i - 1];
   }
   ```

### 유형

1. 구간에 반복적으로 같은 연산을 할 때

   ```
   예: 1~5번 학생에게 사탕 1개씩
       3~7번 학생에게 사탕 1개씩
       2~4번 학생에게 사탕 1개씩
       → 각 학생이 최종적으로 몇 개 가지고 있나?
   ```

   백준 트럭주차
