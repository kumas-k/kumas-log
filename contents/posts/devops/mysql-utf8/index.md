---
title: 'MySQL에서 한글 깨짐'
date: 2021-06-04
tags:
  - spring
  - gradle
draft: false
---

#

## 원인

characterset UTF-8로 되어있지 않아서 발생하는 문제입니다.

데이터베이스 생성 시 기본적으로 utf-8 형식으로 만들어지도록 수정해 보겠습니다.

mysqld.cnf 수정합니다.

```bash
vi /etc/mysql/mysql.conf.d/mysqld.cnf

[client]
default-character-set   = utf8
[mysqld]
character-set-server    = utf8
collation-server        = utf8_general_ci

mysql> status

Server characterset:	utf8
Db     characterset:	utf8
Client characterset:	utf8
Conn.  characterset:	utf8
```
