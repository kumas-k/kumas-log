---
title: '지연된 평가를 병렬적으로 평가하기'
date: 2021-11-22
tags:
  - javascript
  - functional
series: '함수형 프로그래밍과 JavaScript ES6'
draft: false
---

## 지연된 함수열을 병렬적으로 평가하기

자바스크립트는 비동기 IO 동작을 합니다. 이는 하나의 쓰레드에서 IO작업을 효율적으로 처리할 수 있도록 하기 위함입니다. 하지만 데이터베이스 같은 외부에 IO 작업을 요청하는 경우에는 그저 명령을 전달 후 완료 시점을 대기하는 상황이기 때문에 자바스크립트에서도 병렬적인 작업이 필요합니다.

### 지연된 함수의 평가

명령을 요청하면 1초가 소요되는 IO작업이 있다고 한다면, 해당 작업을 순차적으로 진행하며 go 함수를 진행할 것입니다.

```jsx
const delay1000 = (a) =>
  newPromise((resolve) => setTimeout(() => resolve(a), 1000)) // 1초가 필요한 비동기 작업

go(
  [1, 2, 3, 4, 5],
  L.map((a) => delay1000(a * a)),
  L.filter((a) => a % 2),
  reduce((a, b) => a + b),
  console.log,
)
// 35
// default: 5016.022216796875 ms
```

### 지연된 함수를 병렬적으로 평가

C.reduce를 작성하여 전달받은 iter를 전개 연산자로 전달하여 줍니다. iter가 생략된 경우에는 acc가 iter이기 때문에 이 부분을 처리하여 전달합니다. 그저 전개 연산자로 전달했을 뿐인데, 모든 작업이 병렬적으로 처리되었습니다.

```jsx
const C = {};
C.reduce = curry((f, acc, iter) => iter ? ruduce(f, acc, [...iter]): reduce(f, [...acc]))
const delay1000 = a => newPromise(resolve => setTimeout(() => resolve(a), 1000)) // 1초가 필요한 비동기 작업

go(
  [1, 2, 3, 4, 5],
  L.map(a => delay1000(a * a)),
  L.filter(a => a % 2),
  reduce((a, b) => a + b)
  console.log
)
// 35
// default: 1005.98291015625 ms
```

### ... 전개연산자의 원리

제너레이터 함수는 next()을 진행할 때마다 yield를 한 번씩 진행하지만, 전개 연산자로 iter을 호출할 경우 남아있는 yield를 한 번에 호출하는 것을 볼 수 있습니다.

```jsx
function* f() {
  yield console.log(1)
  yield console.log(2)
  yield console.log(3)
}

const iter = f() // 아무일도 일어나지 않음
iter.next() // 콘솔이 1 찍힘
;[...iter] // 콘솔에 2, 3 찍힘
```

### 병렬적 평가에서 nop 체크하기

filter 함수에서 비동기 작업의 경우 조건이 부합하지 않는 값은 Promise.reject을 통해 자연스럽게 흘려보내도록 설계하였습니다. 하지만 이때 임의로 만든 nop이라는 구분자로 실제 에러인지, 의도한 상황인지 구별하도록 하였습니다. 이 부분에서 reject에 대해 catch하지 않아 `Uncaught` 에러가 발생합니다.

```jsx
...
go(
  [1, 2, 3, 4, 5],
  L.map(a => delay1000(a * a)),
  L.filter(a => a % 2),
  L.map(a => delay1000(a * a)),
  reduce((a, b) => a + b)
  console.log
)
// 707
// Uncaught (in promise) Symbol(nop)
```

### Promise.reject의 대한 catch

Promise.reject의 catch처리는 reduce나 take에서 처리할 것이기 때문에 reject의 catch에 아무것도 하지 않는 `function() {}` 함수를 할당합니다.

```jsx
const C = {};
C.reduce = curry((f, acc, iter) => {
  const iter2 = iter ? [...iter] : [...acc];
  iter2.forEach(a => a.catch(function() {}));
  // iter2 = iter.map(a => a.catch(function() {})); 이렇게 처리한다면 추후 catch 불가능!
  return iter ? reduce(f, acc, iter2) : reduce(f, iter2);
});
...
```

### 코드 개선

아무것도 하지 않는 함수는 자주 사용됨으로 noop이란 이름으로 선언해 두겠습니다. reject을 catch 해주는 부분도 catchNoop이라는 이름으로 선언하여 밖으로 꺼내어 줍니다.

```jsx
const C = {};
function noop() {}
const catchNoop = arr => (
  arr.forEach(a => (a instanceof Promise ? a.catch(noop) : a)), arr
);
C.reduce = curry((f, acc, iter) => {
  const iter2 = catchNoop(iter ? [...iter] : [...acc]);
  return iter ? reduce(f, acc, iter2) : reduce(f, iter2);
});
...
```

### C.take

reduce와 같이 결과를 만들어내는 take함수도 병렬적으로 평가할 수 있도록 catchNoop을 이용하여 작성합니다.

```jsx
...
C.take = curry((l, iter) => take(l, catchNoop([...iter])));
...
```

### C.map, C.filter

C.reduce와 C.take은 전체 작업을 모두 병렬적으로 처리하게 됩니다. 하나의 함수에서만 병렬적으로 처리해야 하는 경우도 있기 때문에 C.map과 C.filter를 작성해 보겠습니다. C.take를 이용한다면 쉽게 작성할 수 있습니다.

```jsx
...
C.takeAll = C.take(Infinity);

C.map = curry(pipe(L.map, C.takeAll));

C.filter = curry(pipe(L.map, C.takeAll));
```

## 참고

- [함수형 프로그래밍과 JavaScript ES6+](https://www.inflearn.com/course/functional-es6)
