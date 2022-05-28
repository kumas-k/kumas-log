---
title: 'React의 종류'
date: 2021-09-14
tags:
  - react
draft: false
---

## Function? Class?

리액트는 함수형 컴포넌트(Functional Component)와 클래스형 컴포넌트(Class Component)로 나누어집니다. 함수형 컴포넌트로 작성 시에 코드가 매우 짧아지게 되는데, 알아보도록 하겠습니다.

### 클래스형 컴포넌트

- state기능 및 라이프사이클 기능을 사용할 수 있고 임의 메서드를 정의할 수 있다.
- render 함수가 꼭 있어야 하고, 그 안에서 보여 주어야 할 jsx를 반환해야 한다

```jsx
import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      first: Math.ceil(Math.random() * 9),
      second: Math.ceil(Math.random() * 9),
      value: '',
      result: '',
    }
  }

  onSubmit = () => {
    e.preventDefault()
    if (parseInt(this.state.value) === this.state.first * this.state.second) {
      this.setState((prevState) => {
        return {
          result: `정답: ${prevState.value}`,
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
          value: '',
        }
      })
    } else {
      this.setState({
        result: '땡',
        value: '',
      })
    }
    this.input.focus()
  }

  onChange = (e) => this.setState({ value: e.target.value })

  render() {
    return (
      <React.Fragment>
        <div>
          {this.state.first} 곱하기 {this.state.second}는?
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            ref={(c) => {
              this.input = c
            }}
            type="number"
            value={this.state.value}
            onChange={this.onChange}
          />
          <button>입력!</button>
          <div>{this.state.result}</div>
        </form>
      </React.Fragment>
    )
  }
}
```

### 함수형 컴포넌트

- 선언하기가 간편하다.
- 메모리가 클래스형 컴포넌트보다 덜 사용한다.

```jsx
import React,{useState, useRef} from 'react';

class App extends React.Component {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputEl = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (parseInt(value) === first * second) {
      setResult('정답');
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue('');
      inputEl.current.focus();
    } else {
      setResult('땡');
      setValue('');
      inputEl.current.focus();
    }
  };
  return (
    <>
      <div>{first} 곱하기 {second}는?</div>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputEl}
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button>입력!</button>
      </form>
      <div id="result">{result}</div>
    </>
  );
}
```

다음과 같이, 같은 코드를 작성하더라도 함수형 컴포넌트로 작성 시에 코드량이 매우 줄어드는 것을 알 수 있습니다. 그리고 React의 공식문서에서도 가능하다면 함수형 컴포넌트와 Hook을 사용하기를 권장하고 있으니, 특별한 이유가 있지 않다면 함수형 컴포넌트로 작성하시면 되겠습니다.

## 참고

- [웹 게임을 만들며 배우는 React](https://www.inflearn.com/course/web-game-react)
