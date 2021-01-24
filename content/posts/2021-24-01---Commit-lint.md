---
title: Commit lint
date: "2021-01-24"
template: "post"
draft: false
slug: "commit-lint"
category: "lint"
tags:
  - "commit-lint"
  - "husky"
  - "link-staged
description: "eslint, prettier 와 함께 lint-staged, commit lint 적용법에 대해 간단히 작성해보려한다."
socialImage: ""
---

eslint, prettier 와 함께 lint-staged, commit lint 적용법에 대해 간단히 작성해보려한다. 

### link-staged

먼저 eslint 와 prettier 가 적용되어 있다는 가정하에, eslint,prettier 로 syntax 및 포매팅 스타일 정리가 잘 끝났는지 확인해주는 도구다. 자동 저장으로 어느 정도 실수를 잡아줄 수 있겠지만 좀 더 확실히 staged 된 파일을 체크함으로서, lint 를 통과하지 못하면 커밋을 막아준다. 자세한 설명을 생략하겠지만 lint-staged 와 함께 사용하는 githooks 를 도와주는 husky 로 **공통된 스타일 푸시함으로써 협업에서 코드 리뷰나 타임 로스를 잡을 수 있다.** 

### Commit lint

이와 함께 commit lint 를 사용해 정해둔 커밋 컨벤션에 맞춰 커밋을 하지 않을 경우 커밋을 막아주는 도구도 추천한다. 크게 type, scope, subject 를 사용하며 body 와 footer에도 규칙을 적용할 수 있다. 타입의 규칙에는 일반적으로 아래와 같은 흐름으로 사용할 것이라고 생각한다.

```bash
type(scope?): subject
body?
footer?
```

- 기능(feat): 새로운 기능을 추가
- 버그(fix): 버그 수정
- 리팩토링(refactor): 코드 리팩토링
- 형식(style): 코드 형식, 정렬, 주석 등의 변경(동작에 영향을 주는 코드 변경 없음)
- 테스트(test): 테스트 추가, 테스트 리팩토링(제품 코드 수정 없음, 테스트 코드에 관련된 모든 변경에 해당)
- 문서(docs): 문서 수정(제품 코드 수정 없음)
- 기타(chore): 빌드 업무 수정, 패키지 매니저 설정 등 위에 해당되지 않는 모든 변경(제품 코드 수정 없음)

예를 들어 새로운 커밋 lint 를 적용하는 커밋을 추가하려고 할 때, 아래와 같이 사용하면 된다.  

```bash
// 보통 scope 에는 nickname 과 각종 지라 티켓 네임을 함께 사용하고 있다.
feat(ticketname): apply commit lint
```

commit lint 를 사용함으로서, 팀원의 커밋을 내용을 직관적으로 파악할 수 있으며 d이것 또한 불필요한 타임 로스를 줄이며 생산성 향상에 도움을 준다고 판단해 사용하고 있다.

스타일 부분은 주관적일 수도 있기에 팀원과의 충분한 상의를 거친 뒤에 적용해보길 바란다.

```json
//package.json  
"husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "eslint --fix",
      "prettier --parser typescript --write",
      "git add"
    ]
  }
```

```js
//commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'always', 'sentence-case'],
    'type-enum': [2, 'always', ['feat', 'fix', 'hot_fix', 'docs', 'style', 'refactor', 'test', 'chore', 'wording']],
  },
};
```

### **References**

- [https://commitlint.js.org/](https://commitlint.js.org/#/)
