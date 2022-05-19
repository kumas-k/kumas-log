---
title: "✨️ 이터레이터를 이용한 높은 다형성을 가진 함수"
date: 2021-09-26
tags:
  - javascript
  - functional
series: "함수형 프로그래밍과 JavaScript ES6"
draft: false
---

## 다형성(polymorphism)이란?

프로그램 언어의 다형성은 그 프로그래밍 언어의 자료형 체계의 성질을 나타내는 것으로, 프로그램 언어의 각 요소들(상수, 변수, 식, 오브젝트, 함수, 메서드 등)이 다양한 자료형(type)에 속하는 것이 허가되는 성질을 가리킨다. 반대말은 단형성으로, 프로그램 언어의 각 요소가 한 가지 형태만 가지는 성질을 가리킨다. `위키피디아`

### 내장함수의 다형성

다형성이란 하나의 메서드를 여러 개의 객체에 사용할 수 있는 것을 말합니다. javascript의 Array.property인 map을 예로 들어보겠습니다.

```jsx
const arr = [1, 2, 3, 4, 5];
console.log(arr.map(v => v)); // [1, 2, 3, 4, 5];

const dom = document.querySelectorAll("*");
console.log(dom.map(el => el.nodeName)); // TypeError!
```

배열에서는 map 함수가 잘 작동하지만, querySelectorAll로 반환된 배열에는 오류가 발생했습니다. document.querySelectorAll로 반환되는 객체는 배열처럼 보이지만 내부에는 map 함수가 존재하지 않습니다. 따라서 map 함수가 작동되지 않는 것입니다. 그렇기 때문에 유사한 배열의 유형에서도 작동할 수 있는 다형성이 높은 map함수를 직접 구성해보겠습니다.

```jsx
const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

const dom = document.querySelectorAll("*");
console.log(map(el => el.nodeName, dom)); // ["HTML", "HEAD", "BODY"]
```

map함수처럼 이터레이터를 이용하여 filter와 reduce도 재작성해보겠습니다.

```jsx
const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
};

const reduce = (f, acc, iter) => {
  if (!iter) { // iter 입력되지 않은 경우 초기값을 설정합니다.
    iter = acc[Symbol.iterator](); // Symbol.iterator 호출
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
```

### 여러 메서드를 중첩으로 사용하기

자바스크립트에서 제공하는 기본 함수처럼 직접 만든 map, filter, reduce 함수도 연속으로 작성할 수 있습니다.

```jsx
const arr = [1, 2, 3, 4, 5];
arr
  .map(v => v)
  .filter(v => v > 3)
  .reduce((acc, cur) => acc + cur); // 9

reduce(
  (acc, cur) => acc + cur,
  map(
    v => v,
    filter(v => v > 3, arr)
  )
); // 9
```

위의 코드처럼 작성한다면 직접 작성한 함수들도 중첩하여 사용할 수 있습니다. 하지만 메서드체이닝 기능을 활용한 내장 함수와는 다르게 직접 구현한 함수는 중첩하여 사용하기 때문에 가독성이 떨어지는 문제가 있습니다. 이 부분을 조금 더 보기 좋도록 작성해 보겠습니다.

### 함수를 연속으로 실행하는 go함수

매개변수를 받아 reduce를 실행하는 함수를 작성합니다. go함수는 매개변수를 받아 reduce에게 전달합니다. reduce는 전달받은 매개변수를 가지고 함수를 진행하게 됩니다. 이처럼 다음과 같이 작성한다면 보다 보기 좋은 코드를 작성할 수 있습니다.

```jsx
const go = (...args) => reduec((a, f) => f(a), args);
go(
  arr, // reduce의 초기값
  arr => map(v => v, arr), // reduce에서 실행할 함수
  arr => filter(v => v > 3, arr),
  arr => reduce((acc, cur) => acc + cur, arr)
); // 9
```

### 함수를 리턴하는 pipe함수

go함수를 이용하여 또 다른 함수를 작성해보겠습니다. pipe함수는 함수를 리턴하는 함수입니다. go를 이용하여 함수를 미리 정의해놓은 상태에서 값만 전달하여 원하는 결과를 얻어낼 수 있습니다.

```jsx
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);
pipe(
  arr => map(v => v, arr),
  arr => filter(v => v > 3, arr),
  arr => reduce((acc, cur) => acc + cur, arr)
);
pipe(arr);
```

### 함수를 리턴하는 curry함수

함수를 리턴하는 방식으로 curry함수를 작성해보겠습니다. curry함수는 함수를 리턴하는 함수이며, 매개변수를 하나만 받는다면 또다시 리턴하여 매개변수를 하나 더 받는 함수입니다.

```jsx
const curry = f => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));

const mult = curry((a, b) => a * b);
mult(3)(5); // 매개변수를 두번 나누어 요청할 수 있다.
```

매개변수의 개수를 체크하여 더 받는다는 것이 왜?라는 의문이 생길 수 있지만, 여기에서 기존에 작성하였던 map, filter, reduce함수에 curry함수를 적용한다면 조금 더 편하게 go함수를 사용할 수 있습니다.

### curry가 적용된 map, filter, reduce 함수

```jsx
const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});
```

```jsx
go(
  arr, // 초기값
  map(v => v), // arr => map(v => v)(arr)으로 사용할 수 있기 때문에 arr을 생략가능.
  filter(v => v > 3),
  reduce((acc, cur) => acc + cur)
);
```

## 참고

- [함수형 프로그래밍과 JavaScript ES6+](https://www.inflearn.com/course/functional-es6)
