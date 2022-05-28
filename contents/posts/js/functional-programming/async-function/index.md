---
title: '비동기 상황에서 잘 작동하는 함수'
date: 2021-11-08
category: 'category1'
tags:
  - javascript
  - functional
series: '함수형 프로그래밍과 JavaScript ES6'
draft: false
---

## 비동기 상황이란?

비동기는 동시에 일어나지 않는다를 의미합니다.

따라서 요청한 결과가 동시에 일어나지 않는다는 것입니다. 이전에 작성한 함수들을 비동기 상황에서도 잘 작동할 수 있도록 수정해 보겠습니다.

## 비동기 작업을 처리하는 go1

기존의 작성하였던 go함수에 비동기 상황이 발생하도록 코드를 만들어 보겠습니다.

```jsx
go(
  1,
  (a) => a + 10,
  (a) => Promise.resolve(a + 100),
  (a) => a + 1000,
  console.log,
) // [object Promise]1000
```

중간의 비동기 상황이 발생 시에 의도하지 않은 연산으로 결과 값이 전달됩니다. go, pipie 함수는 내부적으로 모두 reduce 함수를 사용하고 있기 때문에 reduce 함수를 수정해 보도록 하겠습니다.

### go1을 적용한 reduce

```jsx
// fx.js

// const reduce = curry((f, acc, iter) => {
//   if (!iter) {
//     iter = acc[Symbol.iterator]();
//     acc = iter.next().value;
//   }
//   for (const a of iter) {
//     acc = f(acc, a);
//   }
//   return acc;
// });

const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a))

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]()
    acc = iter.next().value
  } else {
    iter = acc[Symbol.iterator]()
  }

  return go1(acc, function recur(acc) {
    let cur
    while (!(cur = iter.next()).done) {
      const a = cur.value
      acc = f(acc, a)
      if (acc instanceof Promise) return acc.then(recur)
    }
    return acc
  })
})
```

go1이라는 메서드를 작성합니다. 이 메서드는 instanceof를 이용하여 전달받은 객체가 Promise인지 체크합니다. Promise라면 then한뒤 값을 전달하고 아니라면 이전과 동일하게 작동하도록 합니다.

반복문으로 처리되던 부분을 유명 함수로 선언하여 반복하도록 합니다. 또한 for... of에서 while으로 바뀌었는데, for... of는 내부적으로 반복이 종료되는 경우에는 이터레이터의 리턴 메서드를 강제로 실행시켜버리기 때문에 while을 사용하여 반복문을 실행합니다.

### go1을 적용한 L.map

go1함수를 이용하여 map함수도 비동기 상황의 코드를 작성해 보겠습니다.

```jsx
go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  L.map((a) => a + 10),
  take(2),
  console.log,
) // ["[object Promise]10", "[object Promise]10"]
```

우리가 예상한 결과값은 11, 12가 나와야했엇지만 엉뚱한 값이 출력 되었습니다. 해당 연산이 정상적으로 나올수 있도록 함수를 수정해 보겠습니다.

```jsx
// fx.js

L.map = curry(function* (f, iter) {
  for (const a of iter) yield go1(a, f)
})

go(
  [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)],
  L.map((a) => a + 10),
  take(2),
  console.log,
) // [Promise, Promise]
```

map함수도 go1을 이용하여 비동기 상황에서도 정상적으로 연산이 되도록 수정하였습니다. 하지만 아직 Promise값을 출력하고 있습니다. 결괏값을 만들어 내는 take함수도 reduce함수처럼 수정해 보도록 하겠습니다.

```jsx
// fx.js

// const take = curry((l, iter) => {
//   let res = [];
//   for (const a of iter) {
//     res.push(a);
//     if (res.length == l) return res;
//   }
//   return res;
// });
const take = curry((l, iter) => {
  let res = []
  iter = iter[Symbol.iterator]()
  return (function recur() {
    let cur
    while (!(cur = iter.next()).done) {
      const a = cur.value
      if (a instanceof Promise) {
        return a.then((a) => {
          res.push(a)
          return res.length === l ? res : recur()
        })
      }
      res.push(a)
      if (res.length == l) return res
    }
    return res
  })()
})
```

### nop을 이용해 비동기 처리하는 L.filter

```jsx
go(
  [1, 2, 3, 4, 5],
  L.map((a) => Promise.resolve(a * a)),
  L.filter((a) => {
    console.log(a) // Promise {<resolved>: 1} ...
    return a % 2
  }),
  take(2),
  console.log,
) // []
```

이번엔 filter까지 비동기 상황을 잘 처리할 수 있도록 변경해보겠습니다. 기존의 필터 함수는 비동기 상황을 처리 못하기 때문에 비정상적인 값을 출력하기 때문에 filter함수를 수정하여 비동기 상황을 정상적으로 처리할 수 있도록 수정해 보겠습니다.

```jsx
// fx.js

// L.filter = curry(function* (f, iter) {
//   for (const a of iter) {
//     if (f(a)) yield a;
//   }
// });

const nop = Symbol('nop');

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    const b = go1(a, f);
    if (b instanceof Promise) yield b.then(b => b ? a : Promise.reject(nop));
    else if (b) yield a;
  }
});

const take = curry((l, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  return (function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      if (a instanceof Promise) {
        return a
          .then((a) => {
            res.push(a);
            return res.length === l ? res : recur();
          })
          .catch((e) => { // nop 처리를 위해 추가된 부분.
            return e == nop ? recur() : Promise.reject(e);
          });
      }
      res.push(a);
      if (res.length == l) return res;
    }
    return res;
  })();

  go(
  [1, 2, 3, 4, 5],
  L.map(a => Promise.resolve(a * a)),
  L.filter(a =>  a % 2 ),
  take(2),
  console.log
  ) // [1, 9]
```

기존의 L.filter 함수는 이터레이터를 반복하며 함수 결괏값이 true인지 체크한 뒤 반환하도록 되어 있었습니다. 하지만 전달받은 함수가 Promise라면 정상적으로 연산되지 않기 때문에 go1 함수를 이용하여 연산합니다. 그 이후 연산된 값이 Promise 인지 체크하여 반환합니다.

하지만 L.filter 함수의 특성상 조건에 맞지 않는 값은 전달하지 않아야 하는데, 그렇게 처리하기 위해 nop이라는 임의의 구분자를 생성합니다. nop 구분자는 L.filter에서 전달하지 않아야 하는 값이라면 Promise.reject을 반환하며 nop 구분자를 전달합니다. 그렇게 되면 결과적으로 Promise는 에러를 발생시키기 때문에 해당 값을 전달하지 않게 됩니다.

그렇다면 take 함수에서 nop 구분자를 처리해 줄 수 있도록 수정합니다. 기존의 then함수에 catch 부분을 추가하여 해당 에러가 의도한 상황이면 다음 코드들을 평가하도록 recur() 함수를 호출하고 실제 에러가 발생했다면 다시 reject(e)을 통하여 에러를 발생시켜 줍니다.

### nop 지원하는 reduce

reduce 함수도 take함수처럼 nop을 지원하도록 수정해 보겠습니다.

```jsx
go(
  [1, 2, 3, 4, 5],
  L.map((a) => Promise.resolve(a * a)),
  L.filter((a) => Promise.resolve(a % 2)),
  reduce((a, b) => a + b),
  console.log,
) // 1[object Promise][object Promise][object Promise] Uncaugth (in promise) Symbol(nop)
```

일단 이전의 수정한 reduce함수는 첫 번째 인자가 Promise인지만 체크해서 계산하기 때문에 해당 부분을 매번 Promise를 체크하여 풀어줄 수 있도록 수정하고 nop을 잘 처리할 수 있도록 수정해 보겠습니다.

```jsx
// fx.js

const reduceF = (acc, a, f) =>
  a instanceof Promise
    ? a.then(
        (a) => f(acc, a),
        (e) => (e == nop ? acc : Promise.reject(e)),
      )
    : f(acc, a)

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]()
    acc = iter.next().value
  } else {
    iter = acc[Symbol.iterator]()
  }

  return go1(acc, function recur(acc) {
    let cur
    while (!(cur = iter.next()).done) {
      // const a = cur.value;
      // acc = f(acc, a);
      acc = reduceF(acc, cur.value, f)
      if (acc instanceof Promise) return acc.then(recur)
    }
    return acc
  })
})
```

reduceF라는 함수를 작성합니다. 전달받은 값이 Promise값인지 체크하여 then으로 연산하여 함수를 적용을 해주는 함수입니다. 또한 then을 처리하면서 catch를 통해 nop 구분자도 처리를 해줄 수 있도록 했습니다.

```jsx
go(
  [1, 2, 3, 4, 5],
  L.map((a) => Promise.resolve(a * a)),
  L.filter((a) => Promise.resolve(a % 2)),
  reduce((a, b) => a + b),
  console.log,
) // 35
```

이전의 작성한 코드를 새로 실행해 보면 정상적으로 잘 작동하는 것을 알 수 있습니다.

## 참고

- [함수형 프로그래밍과 JavaScript ES6+](https://www.inflearn.com/course/functional-es6)
