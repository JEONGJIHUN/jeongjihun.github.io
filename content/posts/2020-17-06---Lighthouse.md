---
title: Light house
date: "2020-06-17"
template: "post"
draft: false
slug: "Light house"
category: "Javascript"
tags:
  - "Lighthouse"
  - "Javascript"
  - "Google"
  - "Chrome"
description: "라이트 하우스는 웹페이지의 성능 측정을 위한 오픈소스 자동화 도구로써, 크롬 익스텐션을 사용하면 쉽게 사용할 수 있습니다. 큰 틀에서 각각 perfomance, accessibility, best practice, seo, pwa 를 측정합니다."
socialImage: ""
---

## Light house

라이트 하우스는 웹페이지의 성능 측정을 위한 오픈소스 자동화 도구로써, 크롬 익스텐션을 사용하면 쉽게 사용할 수 있습니다. 큰 틀에서 각각 perfomance, accessibility, best practice, seo, pwa 를 측정합니다.

### Perfomance

> 성능을 측정하고 페이지 로드 속도를 개선할 수 있도록 도와주는 항목

#### First Contentful Paint

FCP는 사용자가 페이지를 탐색 한 후 브라우저에서 첫 번째 DOM 컨텐츠를 렌더링하는데 걸리는 시간을 측정합니다. FCP 점수를 향상시키기 위한 중요한 문제 중 하나인 글꼴로드 시간입니다. 로드 시간을 줄이기 위해선,

글꼴 파일을 일찍 가져올 수 있도록 `<link rel="preload">` 를 사용합니다.

구글 폰트를 사용할 경우 `&display=swap` 를 추가하여 줍니다.

```html
<link
  href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap"
  rel="stylesheet"
/>
```

사용자 정의 글꼴이 로드되는 동안 보이지 않는 텍스트를 표시하지 않는 가장 쉬운 방법은 시스템 글꼴을 일시적으로 표시하는 것입니다. `font-display: swap` 을 사용하여 보이지 않는 텍스트를 방지할 수 있습니다.

모든 브라우저에서 지원하는 것은 아니므로 아래의 링크를 확인하여 해결할 수 있습니다.

[Avoid flash of invisible text](https://web.dev/codelab-avoid-invisible-text/)

#### Time to Interactive

사용자가 페이지를 완전히 사용할 수 있는데 걸리는 시간을 측정합니다. TTI 점수를 향상시키기 위해선 불필요한 JavaScript 작업을 연기하거나 제거하는 것입니다. 코드 분할로 JavaScript 페이로드 감소시키거나 PRPL 패턴을 즉시 로딩 적용하는 것입니다. PRPL 은 `Push`, `Render`, `Pre-cache`, `Lazy-load` 의 약자입니다.

`Push`: 초기 URL에서 가장 중요한 리소스만 푸시합니다.
`Render`: 초기 경로를 먼저 렌더링 합니다.
`Pre-cache`: 남은 경로를 사전에 미리 캐시합니다.
`Lazy-load`: 요청에 따라 필요 시 남은 경로를 로드하고 다음 루트를 만들어 보여줍니다.

[Reduce javascript payloads with code-splitting](https://web.dev/reduce-javascript-payloads-with-code-splitting/)

[Apply instant loading with PRPL](https://web.dev/apply-instant-loading-with-prpl/)

#### Speed Index

페이지를 로드하는 동안 컨텐츠가 시각적으로 얼마나 빨리 표시되는지 측정합니다. 속도 지수 점수를 향상시키기 위해선 글꼴 로드 시간을 줄이거나 실행 시간 단축을 해야합니다. 아래의 링크를 확인하여 해결할 수 있습니다.

[실행 시간 단축](https://web.dev/bootup-time/)
[웹 폰트](https://web.dev/font-display/)

#### Total Blocking Time

TBT는 마우스 클릭, 화면 탭 또는 키보드 누름과 같이 페이지가 사용자 입력에 응답하지 못하는 총 ​​시간을 측정합니다. TBT 점수를 향상시키는 위해선 일반적으로 긴 작업을 확인해야합니다. 크게 두가지로 확인할 수 있는데

- 불필요한 JavaScript로드, 구문 분석 또는 실행 성능 패널에서 코드를 분석하는 동안 주 스레드가 실제로 페이지를로드하는 데 필요하지 않은 작업을 수행하고 있음을 발견 할 수 있습니다. 코드 분할 , 사용하지 않는 코드 제거 또는 타사 JavaScript를 효율적으로로드 하여 JavaScript 페이로드를 줄이면 TBT 점수가 향상됩니다.

- 비효율적인 JavaScript 문. 예를 들어, 성능 패널에서 코드를 분석 한 후 호출이 `document.querySelectorAll('a')` 를 2000 개의 노드를 반환한다고 가정하십시오. 10개의 노드만 반환하는 것보다 구체적인 selector 를 사용하도록 코드를 리팩터링하면 TBT 점수가 향상됩니다.

#### Largest Contentful Paint

LCP는 뷰포트에서 가장 큰 내용 요소가 화면에 렌더링되는 시점을 측정합니다. LCP는 페이지의 주요 콘텐츠가 로드 될 가능성이 있을 때 페이지로드 타임 라인의 포인트를 표시하기 때문에 인식되는 로드 속도를 측정하는데 중요한 사용자 중심의 지표입니다. 빠른 LCP는 페이지가 유용하다는 것을 사용자에게 확신시켜줍니다.

#### Cumulative Layout Shift

CLS는 컨텐츠가 화면에서 얼마나 많이 움직이는지를 수치화 지표다. 이 지표는 사용자 중심의 성능 지표로서 컨텐츠가 화면에서 이리저리 움직이는 것이 불편을 초래할 수 있기 때문에 제공하는 자료다.

### Accessibility

> 이 검사는 웹 앱의 접근성을 향상시킬 수있는 기회를 강조합니다. 일부 접근성 문제 만 자동으로 감지 할 수 있으므로 수동 테스트도 권장됩니다.

[Accessibility](https://web.dev/lighthouse-accessibility/)

### Best Practice

> 이 검사는 웹앱의 전반적인 코드 상태를 개선 할 수있는 기회를 강조합니다.

[Best Practice](https://web.dev/lighthouse-best-practices/)

### SEO

> 페이지가 검색 엔진 결과 순위에 최적화되어 있는지 확인합니다.

[SEO](https://web.dev/lighthouse-seo/)

### PWA

> Progressive Web App의 측면을 확인합니다.

[PWA](https://web.dev/lighthouse-pwa/)

**Ref**

- [Google Lighthouse](https://web.dev/learn/#lighthouse)
- [라이트하우스 6.0에서 바뀐 성능 지표변화](https://meetup.toast.com/posts/242?utm_source=gaerae.com&utm_campaign=%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%8A%A4%EB%9F%BD%EB%8B%A4&utm_medium=social)
