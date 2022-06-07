---
title: '백준 문제풀이 세팅 (Node.js)'
date: 2021-11-28
tags:
  - algorithm
  - node
---

## 개요

프로그래머스와 LeetCode와는 다르게 백준에서의 알고리즘 문제 풀이는 입력까지 모두 사용자가 구현해야 합니다. JavaScript로 문제를 풀이할 것이기 때문에 Node 세팅을 해보겠습니다.

## 설치

아래의 형식과 같이 프로젝트를 생성해 줍니다.

```
├── dev
│   └── stdin
└── index.js
```

백준은 dev의 stdin파일에 입력 파일이 존재합니다. 해당 파일을 읽어와 코드를 실행할 수 있도록 해보겠습니다.

```jsx
// index.js
let fs = require('fs')
let input = fs.readFileSync('./dev/stdin').toString().trim().split(' ')

let a = parseInt(input[0])
let b = parseInt(input[1])

console.log(a + b)
```

fs모듈을 이용하여 파일을 읽어와 string 타입으로 변환하여 split을 이용하여 분리하는 방식입니다. 여러 줄을 입력을 받는다면 split('\n')을 이용하여 입력을 받을 수도 있습니다. 또한 구조 분해 할당을 이용한다면 아래와 같이도 사용할 수 있습니다.

```jsx
// index.js
let [n, ...arr] = require('fs')
  .readFileSync('./dev/stdin')
  .toString()
  .trim()
  .split('\\n') // 첫번째 입력 항목의 갯수, 두번째 입력항목인 경우

console.log(n) // 첫번째 행의 값
console.log(arr) // 나머지 행의 값의 배열
```

## 참고

- [Baekjoon Online Judge](https://www.acmicpc.net/)
