---
title: "⭐️ 일급함수란 무엇인가?"
date: 2021-09-25
tags:
  - javascript
draft: false
---

## 일급함수란?

함수를 다른 변수와 동일하게 다루는 언어는 일급 함수를 가졌다고 표현합니다. 예를 들어, 일급 함수를 가진 언어에서는 함수를 다른 함수에 매개변수로 제공하거나, 함수가 함수를 반환할 수 있으며, 변수에도 할당할 수 있습니다.

## JavaScript의 일급함수

### 함수 할당

익명 함수를 변수에 할당하여 호출할 수 있습니다. 또한 매개변수의 값이 하나라면 괄호를 생략할 수 있습니다.

```jsx
const add = a => a + 5;
console.log(add); // a => a + 5
console.log(add(5)); // 10
```

### 함수 전달

함수를 매개변수로 전달하여 호출할 수도 있습니다. 이때 전달하는 함수는 호출하지 않고 함수 자체를 전달하여야 합니다.

```jsx
const sayHello = () => "Hello";
const showHello = (msg, name) => console.log(`${msg()} ${name}`);
showHello(sayHello, "Javascript"); // Hello Javascript
showHello(sayHello(), "Javascript"); // Error
```

### 함수 반환

함수가 함수를 반환하는 형식도 작성이 가능합니다. 이를 자바스크립트에서는 `고차 함수`라 부릅니다. 또한 고차 함수를 호출 시에는 함수 자체를 반환하기 때문에 다른 변수에 저장하여 호출하거나 이중 괄호를 이용하여 호출합니다.

```jsx
const sayHello = () => () => "Hello";

const myFunc = sayHello();
myFunc(); // Hello
sayHello()(); // Hello
```

## 참고

- [MDN Web Docs](https://developer.mozilla.org/ko/docs/Glossary/First-class_Function)
