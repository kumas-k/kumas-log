---
title: "🙈 Nodemon 모니터링 파일 설정하기"
date: 2021-11-11
tags:
  - node
draft: false
---

## 개요

테스트 환경에서 사용하는 Nodemon을 사용하다 보면 모니터링하는 파일을 직접 설정할 필요가 있습니다. 그럴 경우 설정 파일을 작성하면 해당 파일이 변경될 때만 감사하도록 설정할 수 있습니다.

## 설정

```json
// nodemon.json
{
  "ext": ".js, .json"
}
```

## 참고

- [NPM - nodemon](https://www.npmjs.com/package/nodemon)
