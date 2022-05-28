---
title: 'Linux MSSQL 2019 설치'
date: 2021-05-19
tags:
  - linux
  - database
draft: false
---

## MSSQL 설치

MSSQL은 메모리가 최소 `2G`가 넘어야 설치할 수 있습니다.

공용 리포지토리 GPG 키를 가져옵니다.

```bash
wget -qO- <https://packages.microsoft.com/keys/microsoft.asc> | sudo apt-key add -
```

Microsoft SQL Server Ubuntu 리포지토리를 등록합니다.

```bash
sudo add-apt-repository "$(wget -qO- <https://packages.microsoft.com/config/ubuntu/18.04/mssql-server-2019.list>)"
```

apt-get을 업데이트한 후 SQL Server를 설치합니다.

```bash
sudo apt-get update
sudo apt-get install -y mssql-server
```

mssql-conf setup을 실행합니다.

```bash
sudo /opt/mssql/bin/mssql-conf setup
```

1. Enter your edition(1-8)
   : 특별히 라이선스가 있는 것이 아니라면 2.Developer / 3.Express 둘 중에 하나를 선택하면 됩니다.
2. Do you accept the license terms?
   : 라이선스 조건에 동의합니다. (Yes)
3. Enter the SQL Server system administrator password:
   : SA 계정의 패스워드를 설정합니다. _대문자 및 소문자, 기본 10자리 숫자 및/또는 영숫자가 아닌 기호를 포함하여 최소 길이 8자._

mssql 서비스가 실행 중인지 확인합니다.

```bash
systemctl status mssql-server --no-pager

● mssql-server.service - Microsoft SQL Server Database Engine
   Loaded: loaded (/lib/systemd/system/mssql-server.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2021-05-19 07:20:39 UTC; 1min 52s ago
     Docs: <https://docs.microsoft.com/en-us/sql/linux>
 Main PID: 22746 (sqlservr)
    Tasks: 118
   CGroup: /system.slice/mssql-server.service
           ├─22746 /opt/mssql/bin/sqlservr
           └─22779 /opt/mssql/bin/sqlservr
```

## SQL Server 명령줄 도구 설치

공용 리포지토리 GPG 키를 가져옵니다.

```bash
curl <https://packages.microsoft.com/keys/microsoft.asc> | sudo apt-key add -
```

Microsoft Ubuntu 리포지토리를 등록합니다.

```bash
curl <https://packages.microsoft.com/config/ubuntu/18.04/prod.list> | sudo tee /etc/apt/sources.list.d/msprod.list
```

MSSQL-Tools 설치 합니다.

```bash
sudo apt-get update
sudo apt-get install mssql-tools
```

커맨드 입력 시 실행이 되도록 환경변수에 등록합니다.

```bash
echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
source ~/.bashrc
sqlcmd -S localhost -U SA
1>
```

## 방화벽 설정

ufw 사용하도록 설정 후 1433 포트 추가, 추가된 포트를 확인합니다.

```bash
sudo ufw enable
sudo ufw allow 3306/tcp
sudo ufw status

Status: active

To                         Action      From
--                         ------      ----
1433/tcp                   ALLOW       Anywhere
1433/tcp (v6)              ALLOW       Anywhere (v6)
```

[yougetsignal](https://www.yougetsignal.com/tools/open-ports/)에서 포트가 정상적으로 열렸는지 확인합니다.

## 참고

- [Microsoft Docs](https://docs.microsoft.com/ko-kr/sql/linux/sql-server-linux-setup?view=sql-server-ver15)
