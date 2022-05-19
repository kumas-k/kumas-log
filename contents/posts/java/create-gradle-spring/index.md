---
title: "🔨 Gradle으로 Spring 프로젝트 생성하기 "
date: 2021-06-04
tags:
  - spring
  - gradle
draft: false
---

## Gradle 프로젝트

Gradle 설치 후 진행합니다.
[Spring.io](http://spring.io/) 에서 스프링 프레임워크 퀵스타트를 이용하여 Gradle 프로젝트를 다운로드합니다.

[Spring initalizr](https://start.spring.io/)
Project -> Gradle Project
Language -> java
Packaging -> War

Project Metadata는 자신의 프로젝트에 맞게 수정해서 다운로드합니다.
build.gradle을 수정하여 해당 내용을 추가합니다.

```
<!-- build.gradle -->

plugins {
    id 'eclipse-wtp'
    id 'war'
}

dependencies {
    providedRuntime 'javax.servlet:javax.servlet-api:3.0.1'
    implementation 'jstl:jstl:1.2'
    implementation 'org.reflections:reflections:0.9.9-RC1'
    implementation 'log4j:log4j:1.2.17'
    implementation 'mysql:mysql-connector-java:5.1.30'
    implementation 'org.mybatis:mybatis:3.2.6'
}
```

src > main에서 webapp 폴더를 추가합니다.
build.gradle가 있는 폴더에서 터미널로 해당 명령어를 실행합니다.

```bash
gradle eclipse
```

이클립스에서 Import -> Existing Projects into Workspace로 프로젝트를 호출합니다.

## 참고

- [Spring Quickstart Guide](https://spring.io/quickstart)
