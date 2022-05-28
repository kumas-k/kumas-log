---
title: '비동기를 값으로 다루는 Promise'
date: 2021-10-27
tags:
  - javascript
draft: false
---

## Promise란?

Promise 객체는 비동기 작업이 맞이할 미래의 완료 또는 실패와 그 결괏값을 나타냅니다. `MDN`
ES6에서 추가된 Promise는 비동기 연산을 하기 위한 객체이며 기존의 callback 함괏의 단점들을 보완한 함수입니다.

Promise는 다음 중 하나의 상태를 가집니다.

- 대기(pending): 이행하거나 거부되지 않은 상태
- 이행(fulfilled): 연산이 성공적으로 완료됨.
- 거부(rejected): 연산이 실패함.

### Promise의 사용방법

Promise는 resolve, reject 두 인자를 매개변수로 받습니다. 이 두 함수는 promise를 이행하거나 거부합니다. 비동기 작업이 모두 끝난 뒤 resolve를 호출해서 이행하고, 오류가 생겼다면 reject를 이용하여 거부할 수 있습니다. 또한 Promise 객체에는 비동기 상태가 담겨있기 때문에 비동기 처리 시점을 명확하게 표시할 수 있습니다.

```jsx
const promise = new Promise((resolve, reject) => {})

console.log(promise) // Promise {status: "pending"}
```

### then, catch, finally

Promise가 종료되면 then과 catch로 resolve와 reject의 값을 꺼내어 볼 수 있습니다. 하지만 reject 된 경우에는 catch 항목이 없다면 오류가 발생합니다.

```jsx
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('성공'), 1000)
}) // 10초 후에 결과 출력

promise1.then(console.log) // 성공

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => reject('실패'), 1000)
}) // 10초 후에 결과 출력

promise2.then(console.log) // 오류가 발생했지만 catch 항목이 없어서 error 발생
// Uncaught (in promise) 실패
promise2
  .then(console.log)
  .catch(console.error) // 실패
  .finally(() => console.log('종료됨')) // 이행이나 거부와 상관없이 무조건 실행됨
```

### 메서드 체이닝

Promise의 리턴값은 자기 자신을 반환하기 때문에 함수를 연속적으로 사용할수 있습니다. 또한 연속적으로 사용한 함수에서 에러처리 또한 매번 할 필요 없이 한번만 처리 해주면 됩니다.

```jsx
const promise = new Promise((resolve, reject) => resolve(1));
const add1 = (num) => num + 1;

promise
  .then(add1)
  .then(add1) // 연속적으로 then 호출 가능
  .then(console.log);
  .catch(console.error); // 연속적으로 then을 호출하더라도 하나의 catch에서 처리
```

### Promise.all, Promise.rece

Promise 메서드 종류

- Promise.all: 주어진 모든 Promise를 이행합니다.
- Promise.rece: 주어진 모든 Promise 중 가장 먼저 완료된 것만 이행합니다.

```jsx
// Promise.all

const promise1 = new Promise((resolve) => setTimeout(resolve, 3000, '첫번째'))

const promise2 = new Promise((resolve) => setTimeout(resolve, 2000, '두번째'))

const promise3 = new Promise((resolve) => setTimeout(resolve, 1000, '세번째'))

const allPromise = Promise.all([promise1, promise2, promise3])
allPromise
  .then(console.log) // 모든 promise를 이행한뒤 출력
  .catch(console.error)
// [ '첫번째', '두번째', '세번째']
```

```jsx
// Promise.rece

const promise1 = new Promise((resolve, reject) =>
  setTimeout(reject, 3000, '첫번째'),
)

const promise2 = new Promise((resolve) => setTimeout(resolve('두번째'), 2000))

const promise3 = new Promise((resolve) => setTimeout(resolve('세번째'), 1000))

const recePromise = Promise.race([promise1, promise2, promise3])

recePromise
  .then(console.log) // 가장 먼저 끝난 세번째만 반환하고 종료
  .catch(console.error) // 첫번째가 이행되지 않아서 오류발생안함
// [ '세번째']
```

## 참고

- [함수형 프로그래밍과 JavaScript ES6+](https://www.inflearn.com/course/functional-es6)
