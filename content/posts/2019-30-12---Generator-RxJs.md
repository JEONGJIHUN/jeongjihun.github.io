---
title: Generator & RxJS
date: "2019-12-30"
template: "post"
draft: false
slug: "Generator & RxJS"
category: "Javascript"
tags:
  - "Javascript"
  - "Generator"
  - "RxJS"
description: "제너레이터의 간단한 구조 및 예시를 소개한 다음, RxJS 에 대한 간략한 설명과 예시로 마치겠습니다."
socialImage: ""
---

## Index

- [Intro](#Intro)
- [Main](#Main)
  - [Generator](#Generator)
  - [RxJS](#RxJS)
- [Conclusion](#Conclusion)

## Intro

2부에서는 제너레이터의 간단한 구조 및 예시를 소개한 다음, RxJS 에 대한 간략한 설명과 예시로 마치겠습니다.

## Main

### Generator

1부에서 설명한 대로 제너레이터는 Generator 객체를 반환하며 컨택스트를 저장한 상태로 generator function 을 빠져나갔다가 돌아올 수 있는 함수입니다.

그렇다면 제너레이터 함수는 왜 쓸까요?

co.js 라이브러리를 사용하면 자바스크립트의 비동기적인 특성을 동기적으로 작성할 수 있게 해줍니다. 그렇기에 콜백 지옥을 벗어날 수 있게 해줍니다.

```js
//Promise/then
const fetchJson = url =>
  fetch(url)
    .then(request => request.text())
    .then(text => JSON.parse(text))
    .catch(error => console.log(`ERROR: ${error.message}`));

//generator/yield
const fetchJson = co.wrap(function*(url) {
  try {
    let request = yield fetch(url);
    let text = yield request.text();
    return JSON.parse(text);
  } catch (error) {
    console.log(`ERROR: ${error.message}`);
  }
});
```

async/await 와 거의 비슷한 맥락으로 사용할 수 있습니다.

```js
const iterableObj = {
  [Symbol.iterator]() {
    let step = 0;
    return {
      next() {
        step++;
        if (step === 1) {
          return { value: 'This', done: false };
        } else if (step === 2) {
          return { value: 'is', done: false };
        } else if (step === 3) {
          return { value: 'MMT Tech Blog.', done: false };
        }
        return { value: '', done: true };
      }
    };
  }
};

for (const val of iterableObj) {
  console.log(val);
}

// This
// is
// MMT Tech Blog.
```

또한 이렇게 `next()` 와 `[symbol.iterator]()` 를 사용해 데이터를 관리할 수 있습니다.

위와 같은 코드를 `yield` 를 사용해 간단히 만들 수 있습니다.

```js
function* iterableObj() {
  yield 'This';
  yield 'is';
  yield 'MMT Tech Blog.';
}

for (const val of iterableObj()) {
  console.log(val);
}

// This
// is
// MMT Tech Blog.
```

Generator 의 또다른 장점은 Lazy Evaluation 이 가능하므로 우리가 필요할 때까지 계산을 미룰 수 있습니다.

Generator 는 새로운 값을 받으면 깨어나므로 Generator 는 observer 라고도 합니다. 이러한 동작은 어떤 의미에서는 값을 계속 관찰하고 Generator 가 값을 가졌을 때, Generator 가 동작한다고 생각할 수 있습니다.

지금까지 알아본 `Callback function` 이나 `Promise`, `Generator`, `async/await` 로 HTTP 요청과 같은 비동기 처리를 구현할 수 있습니다.

`Callback function` 을 사용하는 경우, error handling 이 어렵고 콜백 지옥 등의 문제가 발생하므로 `Promise` 를 사용하는 것이 더 나은 방법이지만 서버로 보낸 요청은 취소할 수 없다는 점입니다.

그러다 저희 팀원 grapgrap 님의 추천으로 ReactiveX 에 대해 알게 되었습니다.

ReactiveX는 관찰 가능한 스트림을 사용한 비동기 및 이벤트 기반 프로그래밍을 위한 API입니다.
Rx 는 .NET 에서 사용하기 위해 만든 오픈 소스 라이브러리였지만 지금은 넷플릭스에서 만든 RxJava 와 RxJS 가 각광을 받고 있습니다.

그 중, RxJS 의 `Observable` 은 기존 비동기 처리 방식의 단점을 해결할 수 있는 더 나은 대안이라고 생각해 소개해 보려 합니다.

### RxJS

#### RxJS는 Observable 을 사용하여 비동기 및 이벤트 기반 프로그램을 작성하기 위한 라이브러리입니다.

#### The General Theory of Reactivity

![theGeneralTheoryOfReactivity](https://user-images.githubusercontent.com/50353227/71554258-5c2e8100-2a60-11ea-986c-76086b244e29.png)

- **Promise 는 하나의 비동기 결과를 리턴하기 위해 사용됩니다.**
- **Function 은 하나의 결과를 위해 사용되고,**
- **Generator 는 iterator 를 제공하기 위해 사용됩니다.**
- **Observable 은 여러 비동기 값들을 지원하는 데이터 유형을 제공합니다.**

- **Pull Scenario**
  - 외부에서 명령하여 응답받고 처리합니다.
  - 데이터를 가지고 오기 위해서는 계속 호출해야 합니다.
- **Push Scenario**
  - 외부에서 명령하고 기다리지 않고, 응답이 오면 그때 반응하여 처리합니다
  - 데이터를 가지고 오기 위해서 subscribe 해야 합니다.

시간 축을 따라 연속적으로 흐르는 데이터, 즉 데이터 스트림을 생성하고 방출하는 객체를 Observable 이라 합니다.

Observable 을 subscribe 하여 Observable 이 방출한 Notification 을 전파받아 사용하는 객체를 Observer 라 합니다.

Observer 는 `next`, `error`, `complete` 함수를 가진 객체를 가집니다. Observable 에 의해 데이터가 전달될 때는 Generator 에서의 `next`, `throw`, `return` 과 비슷한 `next` 함수가 호출되고, 에러가 발생했을 때는 `error` 함수, 데이터 전달이 완료되었을 때는 `complete` 함수가 호출되어 집니다.

이러한 Observable 은 Hot Observable 과 Cold Observable 이 있습니다.

- Hot Observable

  - 구독자의 존재 여부와 상관없이 데이터를 배출하는 Observable 입니다.
  - 마우스, 이벤트, 시스템 이벤트 등이 자주 사용됩니다.
  - subscribe 하는 시점으로 발행하는 값을 받는 걸 기본으로 합니다.

- Cold Observable
  - 일반적인 Observer 를 말합니다.
  - subscribe 되기 이전에는 데이터 스트림을 방출(emit)하지 않습니다.
  - 웹 요청, DB 쿼리 등이 사용되며 요청 시 결과를 확인할 수 있습니다.
  - 처음부터 발행하는 것을 기본으로 합니다.

기본적으로 Observable은 Cold Observable 방식이고, Subject를 사용하여 Hot Observable 을 구현할 수 있습니다.

Subject 는 `Observable` 이면서 `Observer` 이기도 한 객체입니다. Hot Observable 은 subscribe 하고 있는 모든 Observer 에게 모두 전파하게 되며 각각의 Observer 들은 side effect 가 발생하게 되며 이를 multicast 방식이라고 합니다.

unicast 방식일지 multicast 방식일지 구현 요구사항에 따라 Cold Observable 을 사용하거나 Hot Observable 을 사용하여 처리합니다.

여기서 Observable 의 간단한 사용법에 대해 알아보도록 하겠습니다.

```js
const eventHandler = event => console.log(event.currentTarget);
document.addEventListener('click', eventHandler);
```

기존의 DOM 이벤트를 사용하는 방식이 위와 같았다면,

```js
const click$ = Rx.Observable.fromEvent(document, 'click');
const observer = event => console.log(event.currentTarget);
click$.subscribe(observer);
```

`fromEvent` Operator 를 사용해 DOM 이벤트를 Observable 로 변환하여 DOM 요소에서 click 이벤트가 발생하면 이를 감지하여 연속적인 이벤트 스트림으로 만들고 이를 Notification 에 담아 Observer 에게 방출(emit)합니다. `subscribe` Operator 를 사용하여 Observer 가 Observable 을 `subscribe` 하도록 해야만 동작한다는 점입니다.

`Promise` 가 당신에게 건네지면, resolve 가 실행되는 것을 막을 수 있는 권한이 없어 취소할 수 없지만
`subscribe` 를 원하지 않는다면 `subscribe` 를 취소할 수 있습니다.

`Observable` 이전에는 뷰에서 이벤트가 발생하면 이벤트가 발생할 때마다 한 번씩 이벤트를 처리합니다. 예를 들어 click 이벤트는 연속적으로 발생하고 일반적인 자바스크립트 애플리케이션은 이벤트가 발생할 때마다 이벤트 핸들러를 호출합니다.

만약 click 이벤트가 발생될 때마다 서버에 요청을 보내는 경우 계속해서 서버에 요청을 보낼 것이며, 이러한 경우에 debounce 함수를 사용할 수도 있겠지만, 한 번 전송된 요청은 취소할 수 없기 때문에 불필요한 요청이 발생할 수 있습니다. `Observable` 은 이러한 단점을 보완하기 위해 발전된 해결 방법을 제시할 수 있습니다.

## Conclusion

제너레이터와 RxJS 의 데이터를 넘겨주는 방식은 비슷하지만, 시간 축(data stream)으로 데이터를 관리한다는 점에서 RxJS 의 Observable 은 신경 써야 할 부분이 줄어들었다는 느낌을 들게 합니다.

그와 더불어 Promise 와 Async/await 의 pull 방식보다 Observable 의 Push 방식이 좀 더 매력적으로 보이긴 합니다.

저도 아직 RxJS 를 알아가는 단계이지만 RxJS 를 한 번 경험해보시길 추천해 드립니다.

### References

- [Understanding Generators in ES6 JavaScript with Examples](https://codeburst.io/understanding-generators-in-es6-javascript-with-examples-6728834016d5)
- [Introduction to Functional Reactive Programming with RxJS](https://www.sitepoint.com/functional-reactive-programming-rxjs/)
- [Reactive Programming과 RxJS](https://poiemaweb.com/angular-RxJS)
- [Reactive Programming with Rxjs](https://medium.com/@lsh000124/reactive-programming-with-rxjs-2480c252fa9a)
