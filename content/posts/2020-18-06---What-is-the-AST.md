---
title: AST란 무엇일까요?
date: "2020-06-18"
template: "post"
draft: false
slug: "What-is-the-AST?"
category: "Javascript"
tags:
  - "AST"
  - "Javascript"
description: "프로그래밍 언어의 문법에 따라 소스 코드 구조를 표시하는 계층적 프로그램 표현입니다. Lexical and Syntax Analysis, 두 단계는 코드를 기반으로 AST를 생성하는 데 있어 주요 역할을 담당하고 있습니다."
socialImage: ""
---

## AST란 무엇일까요?

프로그래밍 언어의 문법에 따라 소스 코드 구조를 표시하는 계층적 프로그램 표현입니다.

Lexical and Syntax Analysis, 두 단계는 코드를 기반으로 AST를 생성하는 데 있어 주요 역할을 담당하고 있습니다.

**Lexical analyzer(Scanner)**

- 정의 된 규칙을 사용하여 문자 스트림(코드)을 읽고 이를 토큰으로 결합합니다. 공백 문자, 주석 등도 제거합니다. 결국 전체 코드 문자열이 토큰 목록으로 분할됩니다.
- 소스 코드를 읽을 때 코드를 문자 단위로 하나하나 스캔하며 공백, 연산자 기호 또는 특수 기호를 발견하면 단어가 완성되었다고 봅니다.

**Syntax analyzer(Parser)**

- 어휘 분석 후 만들어진 플랫한 토큰 목록을 가져 와서 언어 구문을 검증하고 (구문 오류가 있다면 에러를 표시하는) 트리 구조로 변환합니다.

[자바스크립트 개발자를 위한 AST(번역)](https://gyujincho.github.io/2018-06-19/AST-for-JS-devlopers)
