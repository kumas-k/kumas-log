---
title: "✍️ Linux Apache2 + Tomcat9 연동 설치"
date: 2021-06-10
tags:
  - linux
  - web
  - was
draft: false
---

## apache2 설치

apache2를 설치합니다.

```bash
sudo apt-get update
sudo apt-get install apache2
```

ufw 사용하도록 설정 후 80 포트 추가, 추가된 포트를 확인합니다.

```bash
sudo ufw enable
sudo ufw allow 80/tcp
sudo ufw status
```

정상적으로 설치되었는지 웹페이지에 localhost & ip를 입력하여 확인합니다.

## tomcat9 설치

tomcat9를 설치합니다.

```bash
sudo apt-get update
sudo apt-get install tomcat9
```

ufw 사용하도록 설정 후 8080 포트 추가, 추가된 포트를 확인합니다.

```
sudo ufw enable
sudo ufw allow 8080/tcp
sudo ufw status
```

정상적으로 설치되었는지 웹페이지에 localhost:8080 & ip:8080를 입력하여 확인합니다.

## mod-jk 설치

mod-jk를 설치합니다.

```bash
sudo apt-get update
sudo apt-get install libapache2-mod-jk
```

## 세팅

아래의 파일에서 내용을 수정합니다.

```bash
sudo vi /etc/apache2/workers.properties

# workers.properties
workers.tomcat_home=/usr/share/tomcat8
workers.java_home=/usr/lib/jvm/default-java

# Define 1 real worker ajp13
worker.list=tomcat

# Set properties for tomcat1 (ajp13)
worker.tomcat1.port = 8009
worker.tomcat1.host = localhost

worker.tomcat1.type = ajp13
worker.tomcat1.lbfactor = 20
```

```bash
sudo vi /etc/apache2/mods-available/jk.conf

# JkWorkersFile /etc/libapache2-mod-jk/workers.properties
JkWorkersFile /etc/apache2/workers.properties
```

```bash
sudo vi /etc/apache2/sites-available/000-default.conf

#DocumentRoot /var/www/html
DocumentRoot /var/lib/tomcat9/webapps/ROOT
JkMount /* tomcat
```

```bash
sudo vi /etc/tomcat9/server.xml

<!--
<Connector port="8009" protocol="AJP/1.3" redirectPort="8443" />
-->
```

apache2와 tomcat9을 재시작 합니다.

```bash
service apache2 restart
service tomcat9 restart
```

정상적으로 설치되었는지 웹페이지에 localhost & ip를 입력하여 확인합니다. 톰캣의 페이지가 나온다면 정상적으로 설정되었습니다.
