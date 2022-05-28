---
title: 'JavaScript의 Array.Prototype'
date: 2021-09-22
tags:
  - javascript
  - prototype
draft: false
---

## Array.prototype

모든 Array 인스턴스는 Array.prototype으로부터 메서드와 프로퍼티를 상속받습니다. 이렇게 상속받은 Array.prototype 메서드는 크게 다음과 같이 구분할 수 있습니다.

- 원본 배열을 변경하는 메서드
- 원본 배열은 변경하지 않고 참조만 하는 메서드
- 원본 배열을 반복적으로 참조하는 메서드

### 원본 배열을 변경하는 메서드

- pop

`pop()` 메서드는 배열에서 마지막 요소를 제거하고 그 요소를 반환합니다.

```jsx
let arr = [1, 2, 3, 4, 5]
arr.pop() // 5
arr.pop() // 4
arr // [1, 2, 3]
```

- push

`push()` 메서드는 배열의 끝에 하나 이상의 요소를 추가하고, 배열의 새로운 길이를 반환합니다.

```jsx
let arr = [1, 2, 3, 4, 5]
arr.push(0) // 6
arr // [1, 2, 3, 4, 5, 0]
arr.push(6, 7) // 8
arr // [1, 2, 3, 4, 5, 0, 6, 7]
```

- shift

`shift()` 메서드는 배열에서 첫 번째 요소를 제거하고, 제거된 요소를 반환합니다. 이 메서드는 배열의 길이를 변하게 합니다.

```jsx
let arr = [1, 2, 3, 4, 5]
arr.shift() // 1
arr.shift() // 2
arr // [3, 4, 5]
```

- unshift

`unshift()` 메서드는 새로운 요소를 배열의 맨 앞쪽에 추가하고, 새로운 길이를 반환합니다.

```jsx
let arr = [1, 2, 3, 4, 5]
arr.unshift(0) // 6
arr // [0, 1, 2, 3, 4, 5, 0]
arr.unshift(6, 7) // 8
arr // [6, 7, 0, 1, 2, 3, 4, 5, 0]
```

- reverse

`reverse()` 메서드는 배열의 순서를 반전합니다. 첫 번째 요소는 마지막 요소가 되며 마지막 요소는 첫 번째 요소가 됩니다.

```jsx
let arr = [1, 2, 3, 4, 5]
arr.reverse() // [5, 4, 3, 2, 1]
```

- sort

`sort()` 메서드는 배열의 요소를 적절한 위치에 정렬한 후 그 배열을 반환합니다. 기본 정렬 순서는 문자열의 유니코드 코드 포인트를 따릅니다

```jsx
let strArr = ['다', '가', '라', '나']
let numArr = [10, 21, 1, 2, 3]
strArr.sort() // ['가', '나', '다', '라']
numArr.sort() // [1, 10, 2, 21, 3]

// 직접 정렬의 방식을 지정해 줄 수도 있다.
strArr.sort(function (a, b) {
  a.localeCompare(b)
}) // ['가', '나', '다', '라']

numArr.sort((a, b) => {
  return a - b
}) // [1, 2, 3, 10, 21]

let items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Magnetic', value: 13 },
  { name: 'Zeros', value: 37 },
]

items.sort(function (a, b) {
  let nameA = a.name.toUpperCase()
  let nameB = b.name.toUpperCase()
  if (nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }
  return 0
})
```

- splice

`splice()` 메서드는 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경합니다.

```jsx
let arr = ['가', '나', '다', '라', '마']

arr.splice(1, 2, '바', '사') // ['나', '다']
arr // ['가', '바', '사', '라', '마']
```

### 원본 배열은 변경하지 않고 참조만 하는 메서드

- join

`join()` 메서드는 배열의 모든 요소를 연결해 하나의 문자열로 만듭니다.

```jsx
const arr = [1, 2, 3]
arr.join() // 1,2,3
arr.join(' + ') // 1 + 2 + 3
arr.join(' ') // 1 2 3
arr.join('') // 123
```

- slice

`slice()` 메서드는 어떤 배열의 begin부터 end까지(end 미포함)에 대한 얕은 복사본을 새로운 배열 객체로 반환합니다.

```jsx
const arr = [1, 2, 3, 4, 5]
arr.slice(1, 3) // [2, 3]
arr.slice(1) // [2, 3, 4, 5]
arr.slice(4, 5) // [5]
arr // [1, 2, 3, 4, 5]
```

- concat

`concat()` 메서드는 해당 배열의 뒤에 인수로 전달받은 배열을 합쳐서 만든 새로운 배열을 반환합니다.

```jsx
const arr = [1, 2]
const newArr = [3, 4]
arr.concat(newArr) // [1, 2, 3, 4]
arr.concat([5, 6]) // [1, 2, 5, 6]
arr.concat([7], [8, 9]) // [1, 2, 7, 8, 9]
```

- indexOf

`indexOf()` 메서드는 배열에서 지정된 요소를 찾을 수 있는 첫 번째 인덱스를 반환하고 존재하지 않으면 -1을 반환합니다.

```jsx
const arr = ['가', '나', '다', '라', '가']
arr.indexOf('가') // 0
arr.indexOf('가', 1) // 4
arr.indexOf('나', 2) // -1
```

- includes

`includes()` 메서드는 배열이 특정 요소를 포함하고 있는지 판별합니다.

```jsx
const arr = ['가', '나', '다', '라', '가']
arr.includes('가') // true
arr.includes('가', 1) // true
arr.includes('나', 2) // false
```

### 원본 배열을 반복적으로 참조하는 메서드

- forEach

`forEach() 메서드는 주어진 함수를 배열 요소 각각에 대해 실행합니다.`

```jsx
const arr = ['가', '나', '다']
arr.forEach((element) => {
  console.log(element)
})

// 가
// 나
// 다
```

- map

`map()` 메서드는 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환합니다.

```jsx
const arr = [1, 2, 3]
const newArr = arr.map((x) => {
  return x * 2
})

arr // 1, 2, 3
newArr // 2, 4, 6
```

- filter

`filter()` 메서드는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환합니다.

```jsx
const arr = [1, 2, 3, 4, 5]
const result = arr.filter((x) => {
  return x > 2
})

result // [3, 4, 5]
```

- reduce

`reduce()` 메서드는 배열의 각 요소에 대해 주어진 리듀서(reducer) 함수를 실행하고, 하나의 결과값을 반환합니다.

```jsx
const arr = [1, 2, 3, 4, 5]
const resultAdd = arr.reduce((acc, cur, i) => {
  return acc + cur // 1 + 2 + 3 + 4 + 5
}, 0)

const resultArry = arr.reduce((acc, cur, i) => {
  acc.push(cur)
  return acc // [1, 2, 3, 4, 5]
}, [])
```

## 참고

- [MDN Web Docs](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array)
