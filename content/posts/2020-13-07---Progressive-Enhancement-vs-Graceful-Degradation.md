---
title: Progressive-Enhancement-vs-Graceful-Degradation
date: "2020-07-13"
template: "post"
draft: false
slug: "strategy"
category: "Strategy"
tags:
  - "Progressive Enhancement"
  - "Graceful Degradation"
  - "점진적 향상법"
  - "우아한 성능 저하"
  - "WAI-ARIA"
description: "점진적 향상법 is a strategy for web design that emphasizes core web page content first."
socialImage: ""
---

## Progressive enhancement

점진적 향상법 is a strategy for web design that emphasizes core web page content first.

이 전략은 최종 사용자의 브라우저 / 인터넷 연결이 허용하는대로 컨텐츠 위에 미묘하고 기술적으로 엄격한 프리젠 테이션 및 기능 레이어를 점진적으로 추가합니다. 이 전략의 제안된 이점은 모든 브라우저 또는 인터넷 연결을 사용하여 **모든 사람이 웹 페이지의 기본 컨텐츠 및 기능에 액세스**하는 동시에 **고급 브라우저 소프트웨어 또는 더 넓은 대역폭을 가진 사용자에게 향상된 버전의 페이지를 제공** 할 수 있다는 것입니다.

- 모든 웹 브라우저에서 기본 컨텐츠에 액세스 할 수 있어야합니다.
- 기본 기능은 모든 웹 브라우저에서 액세스 할 수 있어야 합니다

**e.g.)** 웹툰에서 기본 기능을 보여주되 성능에 따라 효과가 추가될 수 있는 것.

## Graceful degradation

우아한 성능 저하 is the practice of building your web functionality so that it provides a certain level of user experience in more modern browsers, but it will also degrade gracefully to a lower level of user in experience in older browsers.

## An example of graceful degradation versus progressive enhancement

### "이 페이지 인쇄"

"이 페이지 인쇄"링크의 문제점은 HTML에서 브라우저의 인쇄 단추에 링크 할 수 있는 방법이 없다는 것입니다. 이를 위해서는 JavaScript가 필요합니다. JavaScript에서는 쉽습니다 `window`. 브라우저 의 개체 `print()`에는 인쇄를 시작하기 위해 호출할 수 있는 메서드가 있습니다. 아마도 가장 일반적인 방법은 `javascript:` 의사 프로토콜 을 사용하는 것 입니다.

```html
<p id = "printthis">
  <a href="javascript:window.print()">이 페이지 인쇄 </a>
</p>
```

JavaScript가 사용 가능하고 브라우저가 `print` 명령을 지원할 때 작동합니다. 그러나 JavaScript를 사용할 수 없는 경우 (예 : 일부 모바일 장치에서) 링크는 작동하지 않습니다. 클릭하면 아무 것도 수행되지 않습니다. 사이트 개발자는 방문자에게 이 기능을 약속하므로 문제가 발생합니다. 링크를 클릭해도 작동하지 않으면 혼란스러워하고 속았다는 느낌이 들 것이며 좋지 않은 사용자 경험을 제공한 것에 대해 비난 받을 수 있습니다.

문제를 줄이기 위해 사이트 개발자는 일반적으로 **우아한 성능 저하** 접근 방식을 사용합니다. 링크가 작동하지 않을 수 있고 그 이유가 무엇인지 알려주고 원하는 것을 달성하기 위한 대체 솔루션을 제안할 수도 있습니다. 일반적인 트릭은 `noscript` 요소를 사용하는 것 입니다. JavaScript를 사용할 수 없는 경우 이 요소 내부의 모든 것이 최종 사용자에게 표시됩니다.

```html
<p id="printthis">
  <a href="javascript:window.print()">이 페이지 인쇄 </a>
</p>
<noscript>
  <p class="scriptwarning">
    페이지를 인쇄하려면 JavaScript가 필요합니다 활성화되어 있습니다.
    브라우저에서 켜십시오.
  </p>
</noscript>
```

이는 정상적으로 성능이 저하된 것으로 간주됩니다. 사용자에게 문제가 있음을 설명하고 문제를 해결하는 방법을 설명합니다. 그러나 이것은 귀하의 사이트 방문자가 다음을 가정합니다.

- JavaScript가 무엇인지 알고
- 그것을 활성화하는 방법을 알고
- 사용 권한과 옵션이 있어야 합니다
- 문서를 인쇄하기 위해 JavaScript를 실행하는 것에 만족

약간 더 나은 접근법은:

```html
<p id="printthis">
  <a href="javascript:window.print()">이 페이지 인쇄 </a>
</p>
<noscript>
  <p class="scriptwarning">
    확인 사본 인쇄.
    브라우저에서 "인쇄" 아이콘을
    선택하거나 "파일" 메뉴에서 "인쇄"를 선택하십시오.
  </p>
</noscript>
```

이 것은 위에서 설명한 일부 문제를 제거하지만 모든 브라우저에서 브라우저 인쇄 기능이 동일하다고 가정합니다. 게다가 이러한 유형의 접근 방식의 문제는 **작동하지 않을 수 있음을 완전히 알고 몇 가지 기능을 제공해야한다는 것**입니다. 기술적으로 “인쇄” 버튼이 필요하지 않으므로 동일한 문제에 대한 점진적 향상법이 작동한다고 가정하지 않습니다.

**점진적 향상법**을 사용하여 이 문제를 해결하려면 첫 번째 단계는 페이지를 인쇄하는 스크립팅 방법이 없는지 확인하는 것입니다. 실제로는 링크가 사용할 HTML 요소를 잘못 선택했음을 의미합니다. JavaScript에서만 사용할 수 있는 기능을 제공하려면 버튼을 사용해야 합니다. 정의에 따라 [버튼은 스크립팅 기능을 지원합니다](http://www.w3.org/TR/html401/interact/forms.html#push-button) . W3C 사양에서는 다음과 같이 말합니다.

> 푸시 버튼 : 푸시 버튼에는 기본 동작이 없습니다. 각 푸시 버튼에는 요소의 이벤트 속성과 관련된 클라이언트 측 스크립트가 있을 수 있습니다. 이벤트가 발생하면 (예 : 사용자가 버튼을 눌렀다 놓기 등) 관련 스크립트가 트리거됩니다.

두 번째 단계는 사용자에게 JavaScript가 활성화되어 있고 브라우저가 인쇄 할 수 있다고 가정하지 않는 것입니다. 대신 사용자에게 문서를 인쇄하고 "방법"을 그대로 두어야한다고 알려주십시오.

```html
<p id = "printthis">
	주문해 주셔서 감사합니다. 기록을 위해 이 페이지를 인쇄하십시오.
</p>
```

이 것은 어떤 경우에도 작동합니다. 나머지 기능의 경우 브라우저가 지원하는 경우에만 [눈에 잘 띄지 않는 JavaScript](http://www.w3.org/wiki/The_principles_of_unobtrusive_JavaScript) 를 사용하여 인쇄 버튼을 추가합니다.

```js
<p id="printthis"> 주문해 주셔서 감사합니다. 이 페이지를 인쇄하여 기록하십시오. </p>
<script type="text/javascript">
(function () {
  if (document.getElementById) {
    var pt = document.getElementById ('printthis');
    if (pt && typeof window.print === 'function') {
      var but = document.createElement ( 'input');
      but.setAttribute ( 'type', 'button');
      but.setAttribute ( 'value', '지금 인쇄' );
      but.onclick = function () {
        window.print ();
      };
      pt.appendChild (but);
    }
  }
})();
</script>
```

스크립트가 얼마나 방어적인지 살펴보십시오. 우리는 아무 것도 가정하지 않습니다.

- 전체 기능을 익명 함수로 감싸서 즉시 실행함으로써 `(function(){})()` 전역 변수를 남기지 않습니다.
- DOM 지원을 테스트하고 버튼을 추가하려는 요소를 가져오려고 합니다.
- 그런 다음 요소가 존재하고 브라우저에 `window` 객체와 `print` 메소드가 있는지 테스트합니다 (이 속성의 유형이 함수인지 테스트함으로서).
- 둘 다 참이면 새 클릭 버튼을 만들고 `window.print()` 클릭 이벤트 처리기로 적용합니다.
- 마지막 단계는 단락에 버튼을 추가하는 것입니다.

기술 환경에 관계없이 모든 사용자에게 적용됩니다. 우리는 사용자에게 작동하지 않는 인터페이스 요소를 약속하지 않습니다. 대신 작동할 때만 표시합니다.

### Summary

점진적인 향상과 우아한 성능 저하는 모두 동일한 작업을 수행하려고 합니다. 모든 사용자에게 제품을 유용하게 유지하십시오. 점진적 향상법은 보다 정교하고 동시에 안정적인 방법이지만 더 많은 시간과 노력이 필요합니다. 기존의 제품에 대한 패치로 우아한 성능 저하를 보다 쉽게 사용할 수 있습니다. 나중에 유지 관리가 더 어려워 지지만 초기 작업이 덜 필요합니다.

**적재적소에 맞는 개발 방식을 택하는 것이 중요하며 개발 기간, 비용 등을 종합적으로 합산해 판단하는 것을 추천한다.**

**Ref**

[Graceful degradation versus progressive enhancement](https://www.w3.org/wiki/Graceful_degradation_versus_progressive_enhancement)