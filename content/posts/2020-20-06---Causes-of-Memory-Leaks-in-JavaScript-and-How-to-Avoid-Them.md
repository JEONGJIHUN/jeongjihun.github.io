---
title: JavaScript에서 메모리 누수의 원인 및 해결 방법
date: "2020-06-20"
template: "post"
draft: false
slug: "Causes-of-Memory-Leaks-in-JavaScript-and-How-to-Avoid-Them"
category: "Javascript"
tags:
  - "Javascript"
  - "Memory"
  - "Management"
description: "SPA (Single Page Application)의 등장으로 우리는 좋은 메모리 관련 코딩 방법에 더 많은 관심을 기울이게 되었습니다. SPA를 사용하면 같은 페이지에 훨씬 더 오래 머무를 수 있습니다. 완전히 다시 로드되지 않은 페이지가 점점 더 많은 메모리를 사용하여 점진적으로 시작되면 성능에 심각한 영향을 미치고 브라우저 탭이 충돌할 수도 있습니다."
socialImage: ""
---

[Causes of Memory Leaks in JavaScript and How to Avoid Them](https://www.ditdot.hr/en/causes-of-memory-leaks-in-javascript-and-how-to-avoid-them)

위의 블로그를 번역하였습니다.

SPA (Single Page Application)의 등장으로 우리는 좋은 메모리 관련 코딩 방법에 더 많은 관심을 기울이게 되었습니다. SPA를 사용하면 같은 페이지에 훨씬 더 오래 머무를 수 있습니다. 완전히 다시 로드되지 않은 페이지가 점점 더 많은 메모리를 사용하여 점진적으로 시작되면 성능에 심각한 영향을 미치고 브라우저 탭이 충돌할 수도 있습니다.

메모리 사용량을 확인하는 가장 빠른 방법은 브라우저 작업 관리자를 살펴 보는 것입니다.

개발자 도구는 보다 고급 메모리 관리 방법을 제공합니다. Chrome의 실적 도구로 기록하면 페이지가 실행될 때의 실적을 시각적으로 분석 할 수 있습니다.

## JavaScript 코드의 일반적인 메모리 누수 소스

1. **우발적 글로벌 변수**

   전역 변수는 항상 루트에서 사용할 수 있으며 가비지 수집되지 않습니다. 엄격하지 않은 모드에서는 일부 실수로 인해 로컬 범위에서 전역 범위로 변수가 누출됩니다.

   - 선언되지 않은 변수에 값을 할당
   - 전역 객체를 가리키는 'this'를 사용

   ```jsx
   function createGlobalVariables() {
     // 선언되지 않은 변수에 값을 할당
     leaking1 = "I leak into the global scope";
     // 전역 객체를 가리키는 'this'를 사용
     this.leaking2 = "I also leak into the global scope";
   }
   createGlobalVariables();
   window.leaking1;
   window.leaking2;
   ```

   **이를 방지하는 방법** : 엄격한 모드는 예제의 코드에서 오류가 발생하기 때문에 실수로 누출되는 것을 방지합니다.

2. **폐쇄**

   함수 범위 변수는 함수가 호출 스택을 종료 한 후 함수 외부에 변수를 가리키는 참조가 없는 경우 정리됩니다. 함수가 실행을 마치고 실행 컨텍스트와 변수 환경이 오래되었지만 클로저는 변수를 참조하고 활성 상태로 유지합니다.

   **이를 방지하는 방법 :** 클로저는 불가피하고 JavaScript에서 없어서는 안될 부분이므로 다음을 수행하는 것이 중요합니다.

   - 클로저가 언제 만들어졌으며 어떤 객체가 유지되는지 이해하고,
   - 클로저의 예상 수명과 사용량을 이해합니다 (특히 콜백으로 사용되는 경우).

3. **타이머**

   콜백에서 일부 객체를 참조하는 `setTimeout` 또는 `setInterval` 을 갖는 것이 객체가 가비지 수집되는 것을 방지하는 가장 일반적인 방법입니다. 코드에서 반복 타이머를 설정하면 콜백을 호출 할 수 없는 한 타이머 콜백의 객체에 대한 참조가 활성 상태를 유지합니다.

   아래 data에서 타이머를 해제 한 후에만 개체를 가비지 수집을 할 수 있습니다. `setInterval` 에 대한 참조가 없으므로 절대로 사용되지 않지만 앱을 중지 할 때까지 `setInterval` 절대로 지울 수 없으며 data.hugeString메모리에 유지됩니다.

   ```jsx
   function setCallback() {
     const data = {
       counter: 0,
       hugeString: new Array(100000).join("x"),
     };
     return function cb() {
       data.counter++; // data object is now part of the callback's scope
       console.log(data.counter);
     };
   }
   setInterval(setCallback(), 1000); // how do we stop it?
   ```

   **이를 방지하는 방법 :** 특히 콜백의 수명이 정의되지 않았거나 무기한 인 경우 :

   - 타이머의 콜백에서 참조 된 객체를 인식하고
   - 필요한 경우 타이머에서 반환 된 핸들을 사용하여 취소합니다.

   ```jsx
   function setCallback() {
     // 'unpacking' the data object
     let counter = 0;
     const hugeString = new Array(100000).join("x"); // gets removed when the setCallback returns
     return function cb() {
       counter++; // only counter is part of the callback's scope
       console.log(counter);
     };
   }

   const timerId = setInterval(setCallback(), 1000); // saving the interval ID

   // doing something ...

   clearInterval(timerId); // stopping the timer i.e. if button pressed
   ```

4. **이벤트 리스너**

   활성 이벤트 리스너는 해당 범위에서 캡처된 모든 변수가 가비지 수집되지 않도록 합니다. 추가되면 이벤트 리스너는 다음까지 계속 유지됩니다.

   - 명시 적으로 제거 `removeEventListener`
   - 연관된 DOM 요소가 제거됩니다.

   일부 유형의 이벤트의 경우 사용자가 여러 번 클릭해야하는 버튼과 같은 페이지를 떠날 때까지 유지됩니다. 그러나 때때로 이벤트 리스너가 정해진 횟수만큼 실행되기를 원합니다.

   익명 인라인 함수는 이벤트 리스너로 사용하게 되면 `removeEventListener`를 사용하여 삭제할 수 없습니다.

   **이를 방지하는 방법** : 이벤트 리스너는 더 이상 필요하지 않은 경우 이를 가리키는 참조를 작성하여 `removeEventListener`에 전달하여 항상 등록 해제해야 합니다.

   ```jsx
   function listener() {
     doSomething(hugeString);
   }
   document.addEventListener("keyup", listener); // named function can be referenced here...
   document.removeEventListener("keyup", listener); // ...and here
   ```

   이벤트 리스너가 한 번만 실행 되어야하는 경우 `addEventListener`에서 추가 옵션인 세 번째 매개 변수를 사용할 수 있습니다. `{once : true}`가 `addEventListener`에 세 번째 매개 변수로 전달되면 리스너 함수는 이벤트를 한 번 처리 한 후 자동으로 제거됩니다.

   ```jsx
   document.addEventListener(
     "keyup",
     function listener() {
       doSomething(hugeString);
     },
     { once: true }
   ); // listener will be removed after running once
   ```

5. **캐시**

   사용하지 않는 객체를 제거하지 않고 크기를 제한하는 논리가 없으면 캐시에 메모리를 계속 추가하면 캐시가 무한대로 커질 수 있습니다.

   **이를 방지하는 방법** : 이 문제를 해결하기 위해 `WeakMap`을 사용할 수 있습니다. 객체만 키로 받아들이는 약한 키 참조가 있는 데이터 구조입니다. 객체를 키로 사용하고 해당 객체에 대한 유일한 참조인 경우 관련 항목이 캐시에서 제거되고 가비지 수집됩니다. 예제에서 `user_1` 에 null 로 대체한 후 다음 가비지 콜렉션 후에 연관된 항목이 WeakMap에서 자동으로 삭제됩니다.

   ```jsx
   let user_1 = { name: "Peter", id: 12345 };
   let user_2 = { name: "Mark", id: 54321 };
   const weakMapCache = new WeakMap();

   function cache(obj) {
     if (!weakMapCache.has(obj)) {
       const value = `${obj.name} has an id of ${obj.id}`;
       weakMapCache.set(obj, value);

       return [value, "computed"];
     }

     return [weakMapCache.get(obj), "cached"];
   }

   cache(user_1); // ['Peter has an id of 12345', 'computed']
   cache(user_2); // ['Mark has an id of 54321', 'computed']
   console.log(weakMapCache); // ((…) => "Peter has an id of 12345", (…) => "Mark has an id of 54321"}
   user_1 = null; // removing the inactive user

   // Garbage Collector

   console.log(weakMapCache); // ((…) => "Mark has an id of 54321") - first entry gets garbage collected
   ```

6. **분리된 DOM 요소**

   DOM 노드에 JavaScript에서 직접 참조가 있는 경우 DOM 트리에서 노드를 제거한 후에도 가비지 수집을 방지할 수 있습니다.

   **이를 방지하는 방법** : 가능한 해결책 중 하나는 DOM 참조를 로컬 범위로 옮기는 것입니다. 아래 예제에서 `appendElement` 함수가 완료된 후 DOM 요소를 가리키는 변수가 제거됩니다.

   ```jsx
   function createElement() {
     const div = document.createElement("div");
     div.id = "detached";
     return div;
   }

   // DOM references are inside the function scope
   function appendElement() {
     const detachedDiv = createElement();
     document.body.appendChild(detachedDiv);
   }

   appendElement();

   function deleteElement() {
     document.body.removeChild(document.getElementById("detached"));
   }

   deleteElement(); // no detached div#detached elements in the Heap Snapshot
   ```

### 결론

사소한 앱을 다룰 때 JavaScript 메모리 문제를 식별하고 수정하는 것은 매우 어려운 작업으로 바뀔 수 있습니다. 이러한 이유로 메모리 관리 프로세스의 필수 부분은 일반적인 메모리 누수 소스를 이해하여 처음부터 발생하지 않도록 하는 것입니다. 결국, 메모리와 성능에 있어서는 사용자 경험이 위험에 처하며 이것이 가장 중요한 것입니다.
