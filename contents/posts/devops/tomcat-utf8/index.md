---
title: 'Windows Tomcat 배치파일 한글 깨짐'
date: 2021-04-25
tags:
  - windows
  - tomcat
draft: false
---

## 원인

Windows 환경에서 톰캣 배치파일 실행 시에 한글이 깨지는 이유는 톰캣 콘솔 코드 페이지가 ANSI/OEM으로 설정되어 있어서 한글이 깨져서 출력됩니다.

## 해결 방법

CMD에서 해당 명령어를 입력하면 콘솔 페이지가 UTF-8 형식으로 변경됩니다.

```bash
REG ADD HKCU\\Console\\Tomcat /v CodePage /t REG_DWORD /d 65001
```

## 참고

- [톰캣(Tomcat) cmd 실행시 한글 깨짐 현상 해결](https://zagood.home.blog/2020/11/11/%ED%86%B0%EC%BA%A3tomcat-cmd-%EC%8B%A4%ED%96%89%EC%8B%9C-%ED%95%9C%EA%B8%80-%EA%B9%A8%EC%A7%90-%ED%98%84%EC%83%81-%ED%95%B4%EA%B2%B0/)
