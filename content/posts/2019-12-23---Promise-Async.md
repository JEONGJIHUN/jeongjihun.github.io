---
title: Promise & Async/await
date: "2019-12-23"
template: "post"
draft: false
slug: "Promise & Async/await"
category: "Javascript"
tags:
  - "Javascript"
  - "Promise"
  - "Async/await"
description: "WCAG 는 Web Content Accessibility Guildlines로 접근성 높은 웹 사이트를 만들기 위한 네 가지 원칙으로 구성된 13가지 지침으로 이루어져 있고, 각 지침에는 테스트 가능한 성공 기준을 제공한다. 각 성공 기준은 서로 다른 상황의 요구를 충족시키기 위해 페이지 디자인이나 시각적 표현에 미친 영향을 기반으로 3가지 적합성 수준(A, AA, AAA)으로 분류한다."
socialImage: ""
---

## Index

- **[Intro Javascript briefly](#intro-javascript-briefly)**
- **[Callback function](#callback-function)**
- **[Promise](#promise)**
  - [Promise.all](#promiseall)
  - [Promise.allSettled](#promiseallsettled)
  - [Promise.race](#promiserace)
- **[Async/await](#asyncawait)**

## **Intro**

### Intro Javascript briefly

자바스크립트에 대한 간략한 설명과 callback 에 대해 설명.그 후, Promise 와 Async/await 에 대해 알아보려고 합니다.

## **Main**

자바스크립트는 **`A single threaded non-blocking asynchronous concurrent language`** 로써 대부분의 액션이 비동기로 처리됩니다.

![orderOfExecution](https://user-images.githubusercontent.com/29101760/55602783-3fe80700-57a2-11e9-9c27-3d87200694f2.png)

setTimeout 을 사용 시 비동기로 동작하기 때문에 wait time 은 큐에 들어갔을 때부터 실행됩니다. 비동기적으로 동작하는 함수들은 완료 시점을 알 수 없기 떄문에 콜백 함수를 사용해 함수 내 동작이 모두 처리된 후 실행되어야 하는 함수가 들어갈 콜백을 인수로 반드시 제공해야 합니다.

### Callback function

```js
const getData = (callback) => {
  fetch("https://www.domain.com/artist/artistName/", (response) => {
    callback(response);
  });
};

getData((favoriteData) => {
  console.log(favoriteData);
});
```

콜백 함수의 콜백을 부르고 싶다면?!

```js
getData(favoriteData => {
  someFn1(favoriteData, someFn2 => {
    foo(someFn2, result => {
      bar(result, blabla => {
          ......
      });
    });
  });
});
```

위와 같이 콜백을 부르는 횟수가 많아진다면, 다들 아시는 콜백 지옥(Callback Hell)을 맛볼 수 있습니다. 각각의 독립적인 함수로 만들어 조금 더 깔끔해 보일 수 있지만, 콜백 패턴이 처리순서를 보장할 수 없는 문제점들을 개선하기 위해 Promise 라는 개념을 도입했습니다.

### Promise

> Promise 객체는 비동기 연산의 최종 완료(또는 실패)와 그 결과값을 나타냅니다.

MDN 에서 정의하는 Promise 입니다.

> new Promise(executor) 에서 executor 라는 파라미터는 `resolve` 와 `reject` 인수를 전달할 실행함수로 보통 어떤 비동기 작업을 시작한 후 모든 작업을 끝내면 resolve를 호출해 프로미스를 `fulfilled` 하고, 오류가 발생한 경우 reject를 호출해 `rejected` 합니다. 실행 함수에서 오류를 던지면 프로미스는 거부됩니다. 실행 함수의 반환 값은 무시됩니다.

프로미스는 하나의 객체로 미래의 특정 값을 생성하며 3가지의 상태 값을 가지고 있습니다.

- Pending(대기) : 비동기 처리 로직이 아직 완료되지 않은 상태
- Fullfilled(이행) : 비동기 처리가 완료되어 프로미스가 결과값을 반환해 준 상태
- Rejected(거부) : 비동기 처리가 실패하거나 오류가 발생한 상태

![promise](https://user-images.githubusercontent.com/29101760/70390663-73a1bd80-1a10-11ea-8f41-1de1d32c2ff8.png)

> [MDN 참조](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

프로미스의 내부 프로퍼티는 state 와 result 가 있고 처음엔 state 는 `pending` 상태에서 `fulfilled` 또는 `rejected` 상태로 변하고, result 는 처음엔 `undefined` 상태에서 `value` 또는 `error` 상태로 변합니다. executor 는 둘 중 하나의 상태로만 변경시킵니다. state 와 result 는 내부 프로퍼티이므로 직접 접근할 수 없고 `then, catch, finally` 메서드로 접근할 수 있습니다.

```js
new Promise((resolve,reject) => {
    ...
    resolve(result);
    reject(error);
}).then(
    result => { ... },
    error => { ... },
)
```

then 의 첫 번째 인수는 프로미스가 이행되었을 때 실행되는 함수이고, result를 받습니다.
두 번째 인수는 프로미스가 거부되었을 때 실행되는 함수이고, error를 받습니다.

```js
const getArtistData = (url) => {
  return new Promise((resolve, reject) => {
    let artist;
    artist.data = resolve(fetch(url));
    artist.dataDidNotFetch = reject(
      new Error("아티스트 데이터를 가져오지 못했습니다.")
    );
  });
};

getArtistData.then(
  (artist) => console.log(`${artist.data}를 불러왔습니다.`),
  (error) => console.log(`Error: ${error.message}`)
);
```

프로미스를 사용하면 콜백 함수를 사용하지 않고 해당 함수의 실행이 끝났을 때 그 결과값에 따라 `then` 으로 핸들러를 추가할 수 있습니다. 프로미스 체이닝을 사용해 보겠습니다.

```js
...
// then/catch
getArtistData.then(response => {
    return response.json();
}).then(artist => console.log(artist.name))
.catch(error => console.log(`${error.message}가 발생했습니다.`));

//then(result,error)
getArtistData.then(response => {
    return response.json();
}, error => console.log(`${error.message}가 발생했습니다.`))
.then(artist => console.log(artist.name));
...
```

여기서 데이터를 가져올 수 없는 상항이 발생했을 때 `catch` 문을 사용할 수 있습니다. `catch(foo)` 와 `then(null,foo)` 는 완벽하게 동일합니다. catch 문이 간결하고 직관적이라 error handling 시 자주 사용합니다.

#### **Promise.all**

`Promise.all(iterable)` 은 iterable 내의 모든 프로미스가 이행한 뒤 이행하고, 어떤 프로미스가 거부하면 즉시 거부하는 프로미스를 반환합니다.

```js
const resolvedvalue = (value, time) => {
  return new Promise((resolve) => setTimeout(() => resolve(value), time));
};
const rejectedvalue = (value, time) => {
  return new Promise((reject) => setTimeout(() => reject(value), time));
};

Promise.all([
  resolvedvalue(1, 3000),
  resolvedvalue(2, 2000),
  resolvedvalue(3, 1000),
]).then((data) => console.log(data));

/*
  after 3 sec
  [1, 2, 3]
*/
```

위의 반환되는 프로미스는 [1,2,3] 으로 첫 번쨰 프로미스가 가장 늦게 이행되더라도 결과는 배열의 첫 번째 요소로 저장됩니다.

#### **Promise.allSettled**

먼저 브라우저 호환성을 확인하시고 사용하시길 바랍니다.
모든 프로미스가 처리될 때까지 기다립니다. 내부 프로퍼티는 `status` 와 `value/reason` 을 가지고 있습니다.
`status` 는 `fulfilled` 와 `rejected` 가 있고 이행됐을 시 `value` 값을 가지고 거부됐을 시 `reason` 값을 가집니다. 예를 들면

```js
const urls = [artistUrlA, artistUrlB, artistUrlC];

new Promise.allSettled(urls.map((url) => fetch(url))).then((results) => {
  results.forEach((result, index) => {
    if (result.status == "fulfilled") {
      console.log(`${urls[index]}: ${result.value.status}`);
    }
    if (result.status == "rejected") {
      console.log(`${urls[index]}: ${result.reason}`);
    }
  });
});
```

#### **Promise.race**

가장 먼저 처리되는 프로미스의 결과값을 반환합니다.

```js
...
new Promise.race([
  resolvedvalue(3, 3000),
  rejectedvalue(new Error('error'), 2000),
  resolvedvalue(1, 1000),
]);

/*
  제일 처음 반환하는 값인
  1 이 반환됩니다.
*/
...
```

위의 결과는 가장 빨리 처리된 첫 번째 프로미스의 결과 값을 보여줍니다.

`Promise.resolve(value)` – 주어진 값을 사용해 이행 상태의 프로미스를 만듭니다.  
`Promise.reject(error` – 주어진 에러를 사용해 거부 상태의 프로미스를 만듭니다.

이것으로 Promise 의 소개를 마치고 Async/await 를 알아보겠습니다.

### Async/await

비동기 코드의 겉모습과 동작을 좀 더 동기 코드와 유사하게 만들어 줍니다. 이것이 async/await의 가장 큰 장점입니다. **async 함수는 프로미스 값을 반환합니다.** 프로미스가 아닌 값을 반환하더라도 resolve 로 감싸 프로미스로 변환 후 반환합니다.

await 는 async 함수 안에서만 사용 가능합니다. Promise.then 보다 가독성이 좋습니다.
async/await를 사용하면 promise.then/catch가 거의 필요 없습니다. 하지만 가끔 promise 를 써야만 하는 경우가 생깁니다. (가장 바깥 스코프에서 비동기 처리가 필요하다거나)

async/await 를 사용하면 제너레이터와 이터레이터가 빠질 수 없습니다. generator function 은 Generator 객체를 반환합니다. Generator 는 빠져나갔다가 나중에 돌아올 수 있는 함수입니다. 이때 컨텍스트는 저장된 상태로 남아 있습니다.

![generator](https://user-images.githubusercontent.com/29101760/70849872-9546ed00-1ec7-11ea-9db4-8ae75b7b068d.png)

**&#10112;** Generator 함수는 호출되어도 즉시 실행되지 않고, 대신 함수를 위한 Iterator 객체가 반환됩니다.

**&#10113;** Iterator 의 next() 메서드를 호출하면 Generator 함수가 실행되어 yield 문을 만날 때까지 진행하고, 해당 표현 식이 명시하는 Iterator 로부터의 반환값을 반환합니다. `yield*` 표현식을 마주칠 경우, 다른 Generator 함수가 위임되어 진행됩니다.

**&#10114;** 이후 `next()` 메서드가 호출되면 진행이 멈췄던 위치에서부터 재실행합니다. `next()` 가 반환하는 객체는 yield 문이 반환할 값을 나타내는 `value` 속성과, Generator 함수 안의 모든 yield 문의 실행 여부를 표시하는 boolean 타입의 `done` 속성을 갖습니다. 예) "{value:`value`, done:true || false}"

**&#10115;** `next()` 를 인자값과 함께 호출할 경우, 진행을 멈췄던 위치의 yield 문을 `next()` 메서드에서 받은 인자값으로 치환하고 그 위치에서 다시 실행하게 됩니다.

그렇기에 제너레이터는 일종의 코루틴으로 돌아갈 위치를 직접 지정할 수 없고, 단순히 호출자에게 제어권을 넘겨주기 때문에 세미 코루틴이라 불립니다.

제너레이터는 이터레이터입니다. 모든 제너레이터에서는 `next()` 와 `[symbol.iterator]()` 를 내장하고 있습니다.

제너레이터의 경우 리턴값이 이터레이터이므로, 각 yield에서 작업이 중단되면 `next()` 를 통해 다음의 작업으로 넘어가야 하지만

Async-await의 경우 promise의 resolve가 반환될때 까지 기다려주기 때문에 별도의 모듈을 사용할 필요가 없습니다.

- Generator: "{value:`value`, done:true || false}" 형태의 이터레이션 객체를 반환합니다.
- Async/await: 프로미스가 아닌 값을 반환하더라도 resolve 로 감싸 프로미스로 변환 후 반환합니다. await 는 프로미스가 처리될 때까지 기다린 후 결과값을 반환합니다.

제너레이터는 2부에서 더 알아보도록 하겠습니다.

## **Conclusion**

- **Promise => structured callback**
- **Async/await => generator,iterator + promise**

**async 가 직관적이긴하나, 성능 향상에 대해서 생각한다면 promise 와 async/await 를 어떻게 사용하면 적시 적소에 _(한 번에 여러 개의 프로미스를 기다릴 수 없기 때문에 병렬적으로 처리해야 할 때는 `new Promise.all` 을 사용한다든지 상황에)_ 맞게 사용할 수 있을지 고민해보고 판단하여 사용하길 바랍니다.**

<p style="color:#ddd"> 시간이 된다면 다음 편으로 Python 의 async/await 와 Javascript 의 async/await 를 비교기를 작성하고 싶다..</p>

### **References**

- [MDN](https://developer.mozilla.org/)
- [The Modern JavaScript Tutorial](https://javascript.info)
- [Understanding Generators in ES6 JavaScript with Examples](https://codeburst.io/understanding-generators-in-es6-javascript-with-examples-6728834016d5)
