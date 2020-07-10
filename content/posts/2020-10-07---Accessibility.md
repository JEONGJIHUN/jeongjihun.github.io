---
title: Accessibility
date: "2020-07-10"
template: "post"
draft: false
slug: "Accessibility"
category: "Web"
tags:
  - "Javascript"
  - "Web"
  - "a11y"
  - "WCAG"
  - "WAI-ARIA"
description: "WCAG 는 Web Content Accessibility Guildlines로 접근성 높은 웹 사이트를 만들기 위한 네 가지 원칙으로 구성된 13가지 지침으로 이루어져 있고, 각 지침에는 테스트 가능한 성공 기준을 제공한다. 각 성공 기준은 서로 다른 상황의 요구를 충족시키기 위해 페이지 디자인이나 시각적 표현에 미친 영향을 기반으로 3가지 적합성 수준(A, AA, AAA)으로 분류한다."
socialImage: ""
---

## 웹 접근성은 모든 사람이 사용할 수 있는 웹 사이트의 디자인 및 제작이다

`WCAG` 는 [Web Content Accessibility Guildlines](https://www.w3.org/WAI/intro/wcag) 로 접근성 높은 웹 사이트를 만들기 위한 네 가지 원칙으로 구성된 13가지 지침으로 이루어져 있고, 각 지침에는 테스트 가능한 성공 기준을 제공한다. 각 성공 기준은 서로 다른 상황의 요구를 충족시키기 위해 페이지 디자인이나 시각적 표현에 미친 영향을 기반으로 3가지 적합성 수준(A, AA, AAA)으로 분류한다.

<table>
  <thead>
    <tr>
      <th>수준</th>
      <th>설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td >A</td>
      <td >최소 수준의 적합성 (광범위한 접근성을 달성 하지는 못함)</td>
    </tr>
    <tr>
      <td >AA</td>
      <td >가장 일반적인 수준의 적합성 (대부분의 법률 및 공식 요구 사항으로 준수를 권장)</td>
    </tr>
    <tr>
      <td >AAA</td>
      <td >어려운 수준의 적합성 (매우 까다롭고, 구현에 많은 시간이 요구됨)</td>
    </tr>
  </tbody>
</table>

### Perceivable

정보 및 사용자 인터페이스 구성 요소는 사용자가 인식 할 수 있는 방식으로 사용자에게 제공 될 수 있어야 한다.

- 1.1 : 텍스트 이외의 내용에 대한 대체 텍스트를 제공하여 큰 글씨, 점자, 연설, 기호 또는 더 간단한 언어와 같이 사람들이 필요로 하는 다른 형태로 변경할 수 있다.
- 1.2 : 시간 기반 미디어 : 시간 기반 미디어에 대한 대안을 제공한다.
- 1.3 : 정보나 구조를 잃지 않으면서 다른 방식 (예 : 더 간단한 레이아웃)으로 표현할 수 있는 컨텐츠를 만든다.
- 1.4 : 사용자가 전경과 배경을 분리하는 것을 포함하여 콘텐츠를보다 쉽게 보고 들을 수 있게 만든다.

### Operable

사용자 인터페이스 구성 요소 및 탐색이 작동 가능해야한다.

- 2.1 : 모든 기능을 키보드에서 사용할 수 있도록 한다.
- 2.2 : 사용자에게 콘텐츠를 읽고 사용할 수 있는 충분한 시간을 제공한다.
- 2.3 : 발작을 일으키는 것으로 알려진 방식으로 콘텐츠를 디자인하지 마라.
- 2.4 : 사용자가 탐색하고 내용을 찾고 위치를 파악할 수 있는 방법을 제공한다.
- 2.5 : 사용자가 키보드 이외의 다양한 입력을 통해 기능을 쉽게 조작 할 수 있도록한다.

### Understandable

사용자 인터페이스의 정보와 작동은 이해할 수 있어야 한다.

- 3.1 : 텍스트 내용을 읽고 이해하기 쉽게 만든다.
- 3.2 : 웹 페이지가 나타나고 예측 가능한 방식으로 작동한다.
- 3.3 : 사용자가 실수를 피하고 수정하도록 도와준다.

### Robust

보조 기술을 포함하여 다양한 사용자 에이전트가 컨텐츠를 안정적으로 해석 할 수 있을만큼 내용이 강력해야 한다.

- 4.1 : 보조 기술을 포함하여 현재 및 미래의 사용자 에이전트와의 호환성을 최대화한다.

## WAI-ARIA 는 장애인이 웹 컨텐츠 및 웹 애플리케이션에 보다 쉽게 ​​액세스 할 수 있는 방법을 정의한다

`WAI-ARIA`는 W3C에 의해 제정된 RIA(Rich Internet Applications)의 웹 접근성에 대한 표준 기술 규격을 의미한다.

```md
**RIA(Rich Internet Applications)란?**
정적인 HTMl과 단순한 자바스크립트 환경의 웹이 아닌 동적인 자바스크립트와 Ajax와 같은 기술을 사용한 환경에서 수준 높은 UX(User eXperience)를 제공하는 웹 애플리케이션
```

RIA는 화려하고 편리한 웹 애플리케이션이지만 스크린 리더와 같은 보조기술을 사용하는 장애인들이 접근하기에 취약하다. 그렇기에 `WAI-ARIA`는 RIA에서 스크린리더 및 보조기기 등에서 접근성 및 상호 운용성을 향상시키기 위한 목적으로 탄생 했으며 `Role`, `Property`, `State` 이렇게 크게 3가지의 속성으로 가지고 있고 이 속성을 토대로 마크업에 `WAI-ARIA`을 적용할 수 있다.

### Role

- 유저 인터페이스(User Interface, 이하 UI)에 포함된 slider, menu bar, dialog와 같은 HTML4에서 사용하지 못하는 특정 컴포넌트의 역할을 정의
- Abstract Roles, Widget Roles, Document Structure Roles, Landmark Roles 로 분류

### Property

해당 컴포넌트의 특징이나 상황을 정의하며 속성명으로 접두사 “aria-“를 사용

### State

해당 컴포넌트의 상태 정보를 정의

### 유의사항

- W3C에서는 HTML5 섹션 관련 요소와 WAI-ARIA 규칙을 함께 사용할 경우 해당 기능이 무효화 되거나 충돌이 발생할 수 있으므로 중복해서 사용하지 않도록 주의를 요한다.
- 모든 RIA 컨텐츠는 키보드를 사용하여 접근할 수 있어야 한다.
- 모든 브라우저와 보조기기가 WAI-ARIA를 지원하지 않기 때문에 지원하는 브라우저와 기기 정보를 확인하고 적용해야한다.

## Semantic HTML

Semantic HTML은 웹 애플리케이션에서 접근성의 기초다.

[MDN-HTML Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)에서 확인해보면 각 기능(의미)에 맞는 Tag를 사용하는 것이 가장 손쉽게 접근성을 높일 수 있다.

React 에서는 `Fragment` 를 사용해 무분별한 `div` tag 를 사용하는 것을 방지할 수 있다. 또한 [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) 플러그인을 사용해 접근성에 대해 lint 로 피드백을 제공한다.

라벨링, 오류 알림, 포커스 컨트롤, 마우스 및 포인터 이벤트 등에 접근성을 고려한 방법들은 이후에 작성해 보려한다.

**Ref**

- [wiki-WCAG](https://en.wikipedia.org/wiki/Web_Content_Accessibility_Guidelines)
- [eatdesignlove-WAI-ARIA](https://eatdesignlove.github.io/post/first-WAI-ARIA)
- [biew-WAI-ARIA](https://www.biew.co.kr/entry/WAI-ARIA-%EC%9B%B9%ED%8D%BC%EB%B8%94%EB%A6%AC%EC%8B%B1)
- [W3C-WAI-ARIA](https://w3c.github.io/using-aria/)
- [yamoo9-WCAG 2.1](https://yamoo9.gitbook.io/wcag/new-in-wcag-2.1)
- [react-accessibility](https://reactjs.org/docs/accessibility.html)
