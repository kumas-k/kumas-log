---
title: "💠 Spring에서 JSON사용하기"
date: 2021-07-23
tags:
  - spring
  - jquery
draft: false
---

## 원인

스프링 프레임워크를 사용 시에 json 객채의 경우에는 string 타입으로 변환되어 전달이 되지만 배열 객체의 경우 전달이 되지 않습니다. http 통신은 원래 문자열만 전송할 수 있기 때문에 객체의 배열의 경우 직렬화를 하여 문자열 형태로 보내주어야 합니다.

## 해결 방법

### ajax

jquery을 이용하여 ajax로 객채 배열을 직렬화 시켜 String 타입으로 서버 측으로 전송합니다.

```jsx
let person = [
  { name: "James", age: 25, skill: "HTML" },
  { name: "John", age: 22, skill: "CSS" },
  { name: "Robert", age: 21, skill: "JavaScript" },
];
let jsonData = JSON.stringify(person); // JSON 타입으로 데이터 직렬화
//"[{\\"name\\":\\"James\\",\\"age\\":25,\\"skill\\":\\"HTML\\"}, ...]"

$.ajax({
  url: "getJson.do",
  type: "POST",
  data: { jsonData: jsonData },
  dataType: "json",
  success: function () {
    //
  },
  error: function () {
    //
  },
});
```

### spring

전달된 String 타입의 문자열을 JSON 라이브러리를 이용하여 다시 JSON 타입으로 변환시켜 객체에 다시 세팅합니다.

```java
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@RequestMapping(value = "/getJson.do", method = RequestMethod.POST)
public Object getJson(@RequestParam String jsonData) throws Exception {
  // 직렬화 시켜 가져온 오브젝트 배열을 JSONArray 형식으로 바꿔준다.
  JSONArray array = JSONArray.fromObject(jsonData);

  List<Person> persons = new ArrayList<Person>();
  for (int i = 0; i < array.size(); i++) {
    // JSONArray 형태의 값을 가져와 JSONObject 로 풀어준다.
    JSONObject obj = (JSONObject) array.get(i);

    Person person = new Person();
    person.setName((int) obj.get("name"));
    person.setAge((int) obj.get("age"));
    person.setSkill((String) obj.get("skill"));
    persons.add(person);
  }
}
```

### gradle

```
dependencies {
  implementation 'net.sf.json-lib:json-lib:2.4:jdk15'
}
```
