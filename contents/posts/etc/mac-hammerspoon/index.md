---
title: '👌 macOS 한영 전환 단축키 변경하기 (M1)'
date: 2022-01-23
tags:
  - mac
draft: false
---

## 개요

M1 Mac에서 한영전환키는 Capslock키 입니다. Capslock키는 대소문자와 한영전환을 모두 수행하는 키라서 전환에 딜레이가 발생해서 매끄럽게 작동하지 않습니다. 그렇기 때문에 키를 변경 해 보도록 하겠습니다.

## HammerSpoon?

Mac에서의 키매핑하는 방법은 여러가지가 있습니다.

com.apple.symbolichotkeys.plist을 수정하여 변경하는 방법이나 유명한 karabiner같은 앱을 사용하여 변경을 할 수도 있습니다. com.apple.symbolichotkeys.plist을 수정하여 변경하는 방법은 간편하지 않고, karabiner으로 변경하는 것은 m1에서 문제가 있어서 이번에는 hammerspoon을 이용하여 변경해 보겠습니다.

## 설치

brew를 이용하여 hammerspoon을 설치합니다.

```bash
brew install hammerspoon
```

finder에서 shift + command + g 을 눌러 `~/.hammerspoon` 을 입력하여 경로로 이동합니다.

modules 폴더를 생성하여 아래의 파일들을 저장합니다.

[foundation_remapping.lua](https://drive.google.com/file/d/1A_7BlLXFg6mrUFm7eqtq3UuBfsJg3ShO)

[inputsource_aurora.lua](https://drive.google.com/file/d/1zYpNlIFnt26AwM3z-l-WMU6cHErcQbTN)

hammerspoon에서 Open Config을 합니다. init.lua에 아래의 내용을 입력합니다.

```lua
require('modules.inputsource_aurora')
local FRemap = require('modules.foundation_remapping')
local remapper = FRemap.new()
remapper:remap('rcmd', 'f18')
remapper:register()
```

전 오른쪽 커맨드키를 리매핑 해주었습니다.

시스템환경설정 → 키보드 → 단축키로 이동해 입력 메뉴에서 다음 소스 선택을 리매핑해준 키로 변경합니다.

![](images/01.png)

입력메뉴가 변경되면 아래처럼 변경된 입력메뉴가 표시 됩니다.

![](images/02.gif)

## 참고

- [김정환블로그](https://jeonghwan-kim.github.io/think/2021/04/29/my-first-capacitive-keyboard.html)
- [foundation_remapping](https://github.com/hetima/hammerspoon-foundation_remapping)
