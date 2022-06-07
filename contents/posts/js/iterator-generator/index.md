---
title: '️이터레이터와 제너레이터'
date: 2021-09-25
tags:
  - javascript
  - es6+
---

## 이터레이터와 제너레이터

ES6에서 추가된 이터레이터(iterator)와 제너레이터(generator)를 많이 들어 보았는데 어떻게 쓸 수 있는지 알아보도록 하겠습니다.

### 이터레이터

이터러블 객체의 Symbol.iterator 메서드를 호출하면 반환되는 이터레이터는 반복을 위해 설계된 인터페이스 객체이며 {value, done}을 가지며 next의 메서드를 가지고 있습니다.

### 순차적 접근

for... of은 이터레이터 객체의 done 값이 true가 될 때까지 반복하며 value을 출력해 주는 방식입니다.

```jsx
const arr = [1, 2, 3]
for (const a of arr) console.log(a) // 1 2 3

// 인덱스 방식으로 접근하지 않기 때문에 set, map에iter.next(); // 1서도 사용가능
const set = new Set([1, 2, 3])
for (const a of set) console.log(a) // 1 2 3

const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
])
for (const a of map.keys()) console.log(a) // a b c
for (const a of map.values()) console.log(a) // 1 2 3
for (const a of map.entries()) console.log(a) // ['a', 1] ['b', 2] ['c', 3]
```

### 메서드 호출

배열의 인덱스를 순회하는 것이 아닌 이터레이터의 next 메서드를 이용하는 것이기 때문에 이런 식으로도 사용이 가능합니다.

```jsx
const arr = [1, 2, 3]
const iter = arr[Symbol.iterator]() // Symbol.iterator을 호출하여 반환된 이터레이터를 할당
iter.next() // {value: 1, done: false};
iter.next() // {value: 2, done: false};
iter.next() // {value: 3, done: false};
iter.next() // {value: undefined, done: true};
iter.next() // {value: undefined, done: true};
iter.next() // {value: undefined, done: true};
```

### 커스텀 이터레이터

이터레이터만 있다면 for.. of을 사용할 수 있는 특징을 이용하여 임의의 이터레이터를 작성하는 것도 가능합니다.

```jsx
const iterable = {
  [Symbol.iterator]() {
    // 호출할수 있는 이터레이터 메서드 작성
    let i = 3
    return {
      next() {
        // next 메서드 작성
        return i == 0
          ? { vlaue: undefined, done: true }
          : { value: i--, done: false }
      },
      [Symbol.iterator]() {
        // next 호출 후에도 자기 자신을 반환하도록
        return this
      },
    }
  },
}

for (const a of iterable) console.log(a) // 3 2 1
```

### 제너레이터

위의 방식으로 커스텀 이터레이터를 만들 수도 있지만 제너레이터를 이용한다면 보다 쉽게 작성할 수 있습니다.

```jsx
function* iterable(i = 0) {
  while (true) {
    yield i++
    if (i > 100) return undefined
  }
}

const iter = iterable()
iter.next() // {value: 0, done: false};
iter.next() // {value: 1, done: false};
iter.next() // {value: 2, done: false};

const iter2 = iterable(10) // 제너레이터에 매개변수 전달
iter2.next() // {value: 10, done: false};
iter2.next() // {value: 11, done: false};
iter2.next() // {value: 12, done: false};

for (const a of iter) {
  // 이터레이터가 존재하기 때문에 for of 문도 사용이 가능합니다.
  console.log(a) // 3 4 5 .... 100
}
```

제너레이터는 function\* 의 이름으로 함수를 생성하면 됩니다. 그리고 일반 function 이였다면 무한히 돌아가는 while으로 스크립트가 멈추었겠지만, yield라는 키워드로 독특하게 함수가 실행 되게 됩니다.

제너레이트 함수의 yield는 호출을 할 때마다 해당하는 지점에서 작동을 중지하고 변수를 기억합니다. 또한 return 통해서 종료 시점을 제어할 수도 있습니다.

## 참고

- [함수형 프로그래밍과 JavaScript ES6+](https://www.inflearn.com/course/functional-es6)
