# 큐

### 선형큐

- front: 데이터가 나갈 위치
- rear: 데이터가 들어갈 위치

특징

- enqueue(), dequeue()시 O(1) 시간복잡도로 빠르게 가질 수 있습니다.
- 하지만 dequeue()시 front 포인터를 앞으로 옮기면서 메모리 낭비가 발생할 수 있습니다.

### 원형큐

- front
- rear

특징

- queue size보다 1 크게 만듭니다.
- 공백상태와 포화상태를 구분하기 위함입니다.

  - 공백상태: `front === rear`
  - 포화상태: `( rear + 1 ) % size === front`

- length

  - `(rear - front + size) % size`
  - size를 더해주는 이유는 rear-front가 음수가 될 수 있음을 방지하기 위함입니다.

- **회전**

  - 원형큐를 회전한다는 개념으로 enqueue()와 dequeue() 연산이 동시에 이루어지는 연산입니다.
  - 큐를 오른쪽으로 회전 시
    - rear = (rear + 1) % maxSize
    - front = (front+1) % maxSize
  - 큐를 왼쪽으로 회전 시
    - rear = (rear-1 + maxSize) % maxSize
    - front = (front-1 + maxSize) % maxSize
