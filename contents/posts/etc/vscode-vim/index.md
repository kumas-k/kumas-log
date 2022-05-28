---
title: 'VSCode에서 vim 설치 및 IM 세팅하기'
date: 2021-09-30
tags:
  - vscode
  - vim
draft: false
---

## vim이란?

Vim은 유닉스 환경에서 사용되는 텍스트 편집기 중에 하나인 vi에 독자적으로 다양한 기능들을 추가해 편의를 돕고 있는 편집기입니다. Vim의 설명은 다른 곳에서도 많이 설명이 되어있으니 바로 VSCODE에 Vim을 적용해 보겠습니다.

## 설치

### VSCode

VS Code의 익스텐션에서 vim을 검색하여 설치해 줍니다.

VS Code에서 해당 익스텐션을 설치 후 사용하다 보면 불편함점이 발생하게 되는데요, vim의 명령어들은 모두 영어로 작성되어있어서 코드를 작성하며 한글로 주석을 입력한 뒤 입력 모드에서 빠져나오게 되면 명령 모드에서도 한글로 되어있어 명령이 입력되지 않습니다. 매번 한글을 바꿔주기보다는 명령 모드로 진입 시에는 자동으로 영어로 변경되도록 설정해 보겠습니다.

### im-select(MAC)

입력기를 제어할 수 있는 `im-select`를 설치해 줍니다.

```bash
curl -Ls <https://raw.githubusercontent.com/daipeihust/im-select/master/install_mac.sh> | sh
...
im-select
com.apple.keylayout.ABC
```

im-select라는 프로그램은 입력방식을 제어하는 프로그램으로서 `im-select`을 입력한다면 현재의 입력방식을 확인할 수 있으며, `im-select com.apple.keylayout.ABC`으로 입력하면 현재 입력방식을 영문으로 변경해 줍니다. 이 부분을 이용하여 vim 확장 프로그램에서 설정을 하도록 하겠습니다.

VSCODE의 설정에서 json 편집으로 진입합니다.

```json
  ...
  "vim.autoSwitchInputMethod.enable": true
  "vim.autoSwitchInputMethod.defaultIM": "com.apple.keylayout.ABC",
  "vim.autoSwitchInputMethod.obtainIMCmd": "/usr/local/bin/im-select",
  "vim.autoSwitchInputMethod.switchIMCmd": "/usr/local/bin/im-select {im}",
```

설정의 맨 마지막 줄에 해당 내용들을 추가해 줍니다.

- `enable`: autoSwitchInputMethod 기능을 활성화합니다.
- `defaultIM`: 명령 모드에서 기본적으로 설정될 입력방식을 지정합니다.
- `obtainIMCmd`: 현재의 입력 모드를 확인할 수 있는 명령어를 지정합니다.
- `switchIMCmd`: 입력 모드를 변경할 수 있는 명령어를 지정합니다. {im}은 defaultIM에서 참조하여 변경됩니다.

다음과 같이 변경을 하게 된다면, 입력 모드에서 명령 모드로 변경 시 기존의 IM을 기억하기 때문에 입력 모드(한글) -> 명령 모드(영문) -> 입력 모드(한글)의 방식도 잘 지원을 하게 됩니다.

## 참고

- [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim)
