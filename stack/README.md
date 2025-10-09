## 스택을 사용해야 하는 핵심 신호

### 신호 1: "가장 최근의 것"과 관련된 문제

**키워드:**

- "가장 최근에 ~"
- "바로 이전의 ~"
- "역순으로 ~"

**예시 문제들:**

```
1. 가장 최근에 방문한 페이지 (뒤로가기)
2. 가장 최근에 입력한 명령 취소 (Ctrl+Z)
3. 가장 최근에 열린 괄호와 짝짓기
```

### 신호 2: "짝을 맞춰야 하는" 문제

**패턴:**

- 여는 것 → 닫는 것
- 시작 → 끝
- 태그 열기 → 태그 닫기

**예시:**

javascript

```javascript
// 여러 종류의 괄호
"({[]})"  → 올바름
"({[}])"  → 잘못됨([ 와 } 가 짝이 안 맞음)

// HTML 태그
"<div><span></span></div>"  → 올바름
"<div><span></div></span>"  → 잘못됨
```

## 스택이 빛나는 대표 문제 유형

### 유형 1: 괄호 검증 (여러 종류)

javascript

```javascript
// 문제: ({[]}) 는 OK, ({[}]) 는 NO
functionisValid(s){
const stack =[];
const pairs ={'(':')','{':'}','[':']'};

for(let char of s){
if(char in pairs){
// 여는 괄호
            stack.push(char);
}else{
// 닫는 괄호
const last = stack.pop();
if(pairs[last]!== char){
returnfalse;// 짝이 안 맞음!
}
}
}

return stack.length===0;
}
```

**왜 스택?**

- `{` 를 만나면 → 나중에 `}` 가 나와야 함을 기억
- `}` 를 만나면 → **가장 최근의** `{` 와 짝지어야 함
- 카운터로는 불가능! (종류별로 매칭해야 하므로)

### 유형 2: 다음/이전 큰(작은) 원소 찾기

javascript

```javascript
// 문제: 각 원소의 오른쪽에서 처음으로 나오는 더 큰 수 찾기
// [2, 1, 2, 4, 3] → [4, 2, 4, -1, -1]

functionnextGreaterElement(arr){
const result =newArray(arr.length).fill(-1);
const stack =[];// 인덱스를 저장

for(let i =0; i < arr.length; i++){
// 현재 원소가 스택의 원소들보다 크면
while(stack.length>0&& arr[stack[stack.length-1]]< arr[i]){
const idx = stack.pop();
            result[idx]= arr[i];// 답을 찾았다!
}
        stack.push(i);
}

return result;
}
```

**동작 과정:**

```
[2, 1, 2, 4, 3]

i=0: arr[0]=2
  stack=[0]

i=1: arr[1]=1 (2보다 작음)
  stack=[0,1]

i=2: arr[2]=2
  - 1 < 2 → pop(1), result[1]=2
  - 2 >= 2 → 중단
  stack=[0,2]

i=3: arr[3]=4
  - 2 < 4 → pop(2), result[2]=4
  - 2 < 4 → pop(0), result[0]=4
  stack=[3]

i=4: arr[4]=3 (4보다 작음)
  stack=[3,4]

결과: [4, 2, 4, -1, -1]
```

**왜 스택?**

- 아직 답을 못 찾은 원소들을 "대기"시킴
- 더 큰 수를 만나면 대기 중인 것들을 "해결"
- LIFO 특성으로 효율적으로 처리

### 유형 3: 중첩 구조 파싱

javascript

```javascript
// 문제: 경로 단순화
// "/a/./b/../../c/" → "/c"

functionsimplifyPath(path){
const stack =[];
const parts = path.split('/');

for(let part of parts){
if(part ===''|| part ==='.'){
continue;// 무시
}elseif(part ==='..'){
            stack.pop();// 상위 디렉토리로
}else{
            stack.push(part);// 디렉토리 진입
}
}

return'/'+ stack.join('/');
}
```

**왜 스택?**

- `..` 는 "가장 최근에 들어간 디렉토리"에서 나오기
- 경로는 중첩된 구조 (들어가고 나오고)

### 유형 4: 수식 계산

javascript

```javascript
// 문제: 후위 표기식 계산
// "2 1 + 3 *" → ((2+1)*3) = 9

functionevalRPN(tokens){
const stack =[];

for(let token of tokens){
if(['+','-','*','/'].includes(token)){
const b = stack.pop();
const a = stack.pop();

if(token ==='+') stack.push(a + b);
elseif(token ==='-') stack.push(a - b);
elseif(token ==='*') stack.push(a * b);
else stack.push(Math.trunc(a / b));
}else{
            stack.push(Number(token));
}
}

return stack[0];
}
```

**왜 스택?**

- 연산자를 만나면 "가장 최근 2개"의 피연산자 필요
- 자연스러운 계산 순서 보장

### 유형 5: 히스토그램 최대 직사각형

javascript

```javascript
// 문제: 히스토그램에서 가장 큰 직사각형 넓이
// [2,1,5,6,2,3] → 10 (5*2)

functionlargestRectangle(heights){
const stack =[];
let maxArea =0;

for(let i =0; i <= heights.length; i++){
const h = i === heights.length?0: heights[i];

while(stack.length>0&& heights[stack[stack.length-1]]> h){
const height = heights[stack.pop()];
const width = stack.length===0? i : i - stack[stack.length-1]-1;
            maxArea =Math.max(maxArea, height * width);
}

        stack.push(i);
}

return maxArea;
}
```

## 스택 vs 다른 자료구조

### 스택을 써야 할 때:

```
✅ LIFO (Last In First Out) 순서가 중요
✅ "가장 최근" 데이터 접근
✅ 중첩/계층 구조 처리
✅ 역순 처리
```

### 큐를 써야 할 때:

```
✅ FIFO (First In First Out) 순서가 중요
✅ "가장 오래된" 데이터 접근
✅ 순차 처리 (BFS, 작업 큐)
```

### 배열을 써야 할 때:

```
✅ 랜덤 접근 필요
✅ 인덱스 기반 조회
✅ 정렬 필요
```

## 스택 문제 판별 체크리스트

문제를 읽을 때 이런 단어들이 보이면 스택을 고려하세요:

```
☑️ "가장 가까운"
☑️ "가장 최근의"
☑️ "짝을 맞춰"
☑️ "유효한지 검증"
☑️ "중첩된"
☑️ "역순으로"
☑️ "취소"
☑️ "되돌리기"
☑️ "이전으로"
```

## 실전 팁

### 1. 인덱스 vs 값 저장

javascript

```javascript
// 값만 필요할 때
stack.push(value);

// 나중에 위치 정보가 필요할 때
stack.push(index); // 인덱스 저장!
```

### 2. 스택이 비었는지 항상 체크

javascript

```javascript
// ❌ 위험
const top = stack.pop();

// ✅ 안전
if (stack.length > 0) {
  const top = stack.pop();
}
```

### 3. 마지막 원소 확인 (pop 안 하고)

javascript

```javascript
// peek 패턴
const top = stack[stack.length - 1];
```

## 연습하기 좋은 문제들

1. **쉬움:** 올바른 괄호 (단일 종류)
2. **쉬움:** 올바른 괄호 (여러 종류)
3. **중간:** 다음 큰 원소 찾기
4. **중간:** 주식 가격 (며칠 뒤 떨어질까?)
5. **어려움:** 히스토그램 최대 직사각형
6. **어려움:** 빌딩 실루엣
