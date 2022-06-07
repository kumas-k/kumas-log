---
title: 'Linux MySQL 5.7 설치'
date: 2021-05-15
tags:
  - linux
  - database
---

## MySQL 설치

apt-get을 업데이트한 후 MySQL을 설치합니다.

```bash
sudo apt-get update
sudo apt-get install mysql-server
```

부팅 시 MySQL이 시작되도록 설정합니다.

```bash
sudo systemctl enable mysql
```

기본 보안 세팅합니다.

```bash
sudo mysql_secure_installation
```

1. VALIDATE PASSWORD plugin?
   : 테스트 환경이라 활성화하지 않았습니다. (n)
2. New password:
   : 초기 비밀번호를 설정해줍니다.
3. Remove anonymous users?
   : 익명의 사용자를 삭제합니다. (y)
4. Disallow root login remotely?
   : 외부에서 root 계정으로 접속하지 못하게 합니다. (y)
5. Remove test database and access to it?
   : test DB를 삭제합니다. (y)
6. Reload privilege tables now?
   : privilege tables 을 reload 해줍니다. (y)

## 외부접속 설정

네트워크 상태 확인합니다.

```bash
netstat -tnl

Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN
```

127.0.0.1:3306으로 설정되어 있습니다. 외부에서 접속할 수 있도록 로컬 어드레스를 수정합니다.

```bash
vi /etc/mysql/mysql.conf.d/mysqld.cnf
...
bind-address = 0.0.0.0
```

MySQL을 재시작합니다.

```bash
service mysql restart
```

다시 네트워크 상태를 확인합니다.

```bash
netstat -tnl

Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 0.0.0.0:3306            0.0.0.0:*               LISTEN
```

0.0.0.0:3306으로 변경이 완료 되었습니다.

### 외부 접속 계정 설정

MySQL root 계정으로 접속해서 외부에서 접속할 계정 생성 및 데이터베이스에 권한을 할당합니다.
`*.*` 부분을 데이터베이스·테이블로 입력 시 해당 데이터베이스만 접속할 수 있도록 설정할 수 있습니다.

```sql
mysql -u root -p

mysql> GRANT ALL privileges on *.* to '계정'@'%' identified by '암호';
mysql> Flush privileges;
mysql> SELECT host,user FROM mysql.user;
+-----------+------------------+
| host      | user             |
+-----------+------------------+
| %         | user             |
| localhost | debian-sys-maint |
| localhost | mysql.session    |
| localhost | mysql.sys        |
| localhost | root             |
+-----------+------------------+
5 rows in set (0.00 sec)
```

### 방화벽 설정

ufw 사용하여 외부에서 접속을 할 수 있도록 설정 합니다.

```bash
sudo ufw enable
sudo ufw allow 3306/tcp
sudo ufw status

Status: active

To                         Action      From
--                         ------      ----
3306/tcp                   ALLOW       Anywhere
3306/tcp (v6)              ALLOW       Anywhere (v6)
```

[yougetsignal](https://www.yougetsignal.com/tools/open-ports/)에서 포트가 정상적으로 열렸는지 확인합니다.
