---
title: "🧠 이차원 배열 행과 열 바꾸기"
date: 2021-11-22
tags:
  - algorithm
draft: false
---

## Python zip

파이썬의 내장 함수 중 zip을 이용한다면 행열을 쉽게 바꾸어 줄 수 있습니다. 이러한 방식을 자바스크립트에서도 사용해 보겠습니다.

```jsx
const zip = r => r[0].map((_, c) => r.map(r => r[c]));
```

## 참고

- [[javascript] Python의 zip 함수와 동등한 Javascript](http://daplus.net/javascript-python%EC%9D%98-zip-%ED%95%A8%EC%88%98%EC%99%80-%EB%8F%99%EB%93%B1%ED%95%9C-javascript/)
