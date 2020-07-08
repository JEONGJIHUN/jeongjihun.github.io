---
title: Clean Code Typescript
date: "2020-04-25"
template: "post"
draft: false
slug: "Typescript"
category: "Typescript"
tags:
  - "Typescript"
  - "type"
  - "interface"
description: "TDD 의 세가지 법칙. 1. 실패하는 단위 테스트를 작성하기 전에는 실제 코드를 작성하지 마세요. 2. 컴파일은 실패하지 않으면서 실행이 실패하는 정도로만 단위 테스트를 작성하세요. 3. 실패하는 단위 테스트를 통과할 정도로만 실제 코드를 작성하세요."
socialImage: ""
---

## 읽기 전용

- `interface/class` 의 개별 속성을 readonly

```js
interface Config {
  readonly host: string;
  readonly port: string;
  readonly db: string;
}
```

- 읽기 전용 배열 `ReadonlyArray<T>`

- 읽기 전용의 매개변수를 선언

```js
function hoge(args: readonly string[]) {
  args.push(1); // 에러
}
```

```js
// 읽기 전용 객체
const config = {
  hello: 'world'
} as const;
config.hello = 'world'; // 에러

// 읽기 전용 배열
const array  = [ 1, 3, 5 ] as const;
array[0] = 10; // 에러

// 읽기 전용 객체를 반활할 수 있습니다
function readonlyData(value: number) {
  return { value } as const;
}

const result = readonlyData(100);
result.value = 200; // 에러
```

## 타입 vs 인터페이스

`합집합` 또는 `교집합`이 필요할 때 **타입을** 사용하세요. `extends` 또는 `implements`가 필요할 때 **인터페이스**를 사용하세요.

```js
type EmailConfig = {
  // ...
};

type DbConfig = {
  // ...
};

type Config = EmailConfig | DbConfig;

// ...

interface Shape {
  // ...
}

class Circle implements Shape {
  // ...
}

class Square implements Shape {
  // ...
}
```

## TDD 의 세가지 법칙

1. 실패하는 단위 테스트를 작성하기 전에는 실제 코드를 작성하지 마세요.

2. 컴파일은 실패하지 않으면서 실행이 실패하는 정도로만 단위 테스트를 작성하세요.

3. 실패하는 단위 테스트를 통과할 정도로만 실제 코드를 작성하세요.

## F.I.R.S.T 규칙

명료한 테스트는 다음 규칙을 따라야 합니다:

- **Fast** 테스트는 빈번하게 실행되므로 빨라야 합니다.

- **Independent** 테스트는 서로 종속적이지 않습니다. 독립적으로 실행하든지 순서 상관없이 모두 실행하든지 동일한 결과가 나와야 합니다.

- **Repeatable** 테스트는 어떤 환경에서든 반복될 수 있습니다. 테스트가 실패하는데에 이유가 없어야 합니다.

- **Self-Validating** 테스트는 통과 혹은 실패로 답해야 합니다. 테스트가 통과되었다면 로그 파일을 보며 비교할 필요는 없습니다.

- **Timely** 단위 테스트는 실제 코드를 작성하기 전에 작성해야 합니다. 실제 코드를 작성한 후에 테스트를 작성한다면, 테스트를 작성하는 것이 너무 고단하게 느껴질 것입니다.

## Failable 사용자 객체

```js
type Result<R> = { isError: false, value: R };
type Failure<E> = { isError: true, error: E };
type Failable<R, E> = Result<R> | Failure<E>;

function calculateTotal(items: Item[]): Failable<number, "empty"> {
  if (items.length === 0) {
    return { isError: true, error: "empty" };
  }

  // ...
  return { isError: false, value: 42 };
}
```

## Add logger something in catch

````js
import { logger } from './logging'

try {
  functionThatMightThrow();
} catch (error) {
  logger.log(error);
}```
````

## import 구문 순서 정리

- import 구문은 알파벳 순서대로 배열하고 그룹화해야 합니다.
- 사용하지 않은 import 구문은 제거되어야 합니다.
- 이름이 있는 import 구문은 알파벳 순서대로 배열해야 합니다. (예: import {A, B, C} from 'foo';)
- import 하는 소스코드는 그룹 내에서 알파벳 순서대로 배열해야 합니다. (예: import _ as foo from 'a'; import _ as bar from 'b';)
- import 구문의 그룹은 빈 줄로 구분되어야 합니다.
- 그룹은 다음 순서를 준수해야 합니다:
  - 폴리필 (예: import 'reflect-metadata';)
  - Node 내장 모듈 (예: import fs from 'fs';)
  - 외부 모듈 (예: import { query } from 'itiriri';)
  - 내부 모듈 (예: import { UserService } from 'src/services/userService';)
  - 상위 디렉토리에서 불러오는 모듈 (예: import foo from '../foo'; import qux from '../../foo/qux';)
  - 동일한 계층의 디렉토리에서 불러오는 모듈 (예: import bar from './bar'; import baz from './bar/baz';)

```js
// 예시
import "reflect-metadata";

import fs from "fs";
import { BindingScopeEnum, Container } from "inversify";

import { AttributeTypes } from "../model/attribute";
import { TypeDefinition } from "../types/typeDefinition";

import { ApiCredentials, Adapters } from "./common/api/authorization";
import { ConfigPlugin } from "./plugins/config/configPlugin";
```

## 타입스크립트 앨리어스

```js
import { UserService } from "@services/UserService";
```

```js
// tsconfig.json
...
  "compilerOptions": {
    ...
    "baseUrl": "src",
    "paths": {
      "@services": ["services/*"]
    }
    ...
  }
...
```
