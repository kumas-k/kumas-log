---
title: '유클리드 호제법'
date: 2021-11-22
tags:
  - algorithm
---

## 유클리드 호제법이란?

유클리드 호제법이란 `2개의 자연수로 최대공약수`를 구하는 알고리즘입니다. 호제법이란 말은 두 수가 서로 상대방의 수를 나누어 결국 원하는 수를 얻는 알고리즘을 말합니다.

### 최대공약수

2개의 자연수 a, b에 대하여 a를 b로 나눈 나머지를 r이라고 하면(단, a > b) a와 b의 최대공약수는 b와 r의 최대공약수와 같습니다. 이 성질에 따라, b를 r로 나눈 나머지 r'를 구하고, 다시 r을 r'로 나눈 나머지를 구하는 과정을 반복하여 나머지가 0이 되었을 때 나누는 수가 a와 b의 최대공약수입니다.

```jsx
function gcd(min, max) {
  return min % max ? gcd(max, min % max) : max
}
```

### 최소공배수

유클리드 호제법으로 구한 최대공약수를 이용한다면 최소공배수도 쉽게 구할 수 있습니다.

```jsx
function lcm(min, max) {
  return (min * max) / gcd(min, max)
}
```

## 참고

- [위키백과](https://ko.wikipedia.org/wiki/%EC%9C%A0%ED%81%B4%EB%A6%AC%EB%93%9C_%ED%98%B8%EC%A0%9C%EB%B2%95)
