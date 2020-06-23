---
title: JavaScript Naming Convention Best Practices
date: "2020-06-23"
template: "post"
draft: false
slug: "JavaScript-Naming-Convention-Best-Practices"
category: "Javascript"
tags:
  - "Javascript"
  - "Convention"
  - "Best Practices"
description: "Javascript Naming Convention 에 대해 알아보겠습니다."
socialImage: ""
---

## Variables

**JavaScript 변수는 대소문자를 구분한다.** 따라서 소문자와 대문자를 가진 JavaScript 변수가 서로 다르다.

```jsx
var NAME = "Jeong Jihun";

var Name = "Jeong Jihun";

var name = "Jeong Jihun";
```

**JavaScript 변수는 자기 설명적이어야 한다.** 변수에 추가 문서화를 위한 설명을 추가할 필요는 없다.

```jsx
// bad
var value = 'Jihun';
 
// bad
var val = 'Jihun';

// good
var firstName = 'Jihun';
```

대부분의 경우 JavaScript 변수는 **camelCase** , 변수 이름 및 소문자로 선언된다.

```jsx
// bad
var firstname = 'Jihun';
 
// bad
var first_name = 'Jihun';
 
// bad
var FIRSTNAME = 'Jihun';
 
// bad
var FIRST_NAME = 'Jihun';
 
// good
var firstName = 'Jihun';
```

## Boolean

`is` , `are` , `has` 와 같은 접두사는 모든 JavaScript 개발자가 boolean 과 다른 변수를 보기만 해도 구별할 수 있도록 도와준다.

```jsx
// bad
var visible = true;
 
// good
var isVisible = true;
 
// bad
var equal = false;
 
// good
var areEqual = false;
 
// bad
var encryption = true;
 
// good
var hasEncryption = true;
```

## Function

자바스크립트 함수도 **camelCase**로 작성되는데, ***함수 이름에 접두사로 동사를 주어*** 함수가 무엇을 하고 있는지 실제로 알려주는 것이 가장 좋은 방법이다.

```jsx
// bad
function name(firstName, lastName) {
  return `${firstName} ${lastName}`;
}
 
// good
function getName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}
```

## Class

JavaScript 클래스는 다른 JavaScript 데이터 구조와 대조적으로 **PascalCase**로 선언한다.

```jsx
class SoftwareDeveloper {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
 
var me = new SoftwareDeveloper('Jihun', 'Jeong');
```

## Component

컴포넌트도 **PascalCase** 로 선언한다.

```jsx
// bad
function userProfile(user) {
  return (
    <div>
      <span>First Name: {user.firstName}</span>
      <span>Last Name: {user.lastName}</span>
    </div>
  );
}
 
// good
function UserProfile(user) {
  return (
    <div>
      <span>First Name: {user.firstName}</span>
      <span>Last Name: {user.lastName}</span>
    </div>
  );
}
```

## Methods

자바스크립트 함수와 마찬가지로 자바스크립트 클래스의 메서드는 **camelCase**로 선언된다. 또한 메서드 이름을 자기 설명적으로 만들기 위해 ***접두사로 동사를 추가***한다

```jsx
class SoftwareDeveloper {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
 
  getName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
 
var me = new SoftwareDeveloper('Jihun', 'Jeong');
 
console.log(me.getName());
// "Jihun Jeong"
```

## Private

자바스크립트에서 **underscore (_)** 는 private 변수를 위해 사용한다. 예를 들어, 클래스의 private 메소드는 클래스에 의해 내부적으로만 사용되어야 하지만 클래스의 인스턴스에는 사용하지 않아야 한다

```jsx
class SoftwareDeveloper {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.name = _getName(firstName, lastName);
  }
 
  _getName(firstName, lastName) {
    return `${firstName} ${lastName}`;
  }
}
 
var me = new SoftwareDeveloper('GP', 'LEE');
 
// good
var name = me.name;
console.log(name);
// "Jihun Jeong"
 
// bad
name = me._getName(me.firstName, me.lastName);
console.log(name);
// "Jihun Jeong"
```

## Constant

변경되지 않는 변수를 위한 Constants 는 JavaScript에서 **대문자(UPERCASE)**로 작성한다.

```jsx
var SECONDS = 60;
var MINUTES = 60;
var HOURS = 24;
 
var DAY = SECONDS * MINUTES * HOURS;
```

# Conclusion

**Variable** : camelCase

```jsx
var firstName = "Jihun";
```

**Boolean** : a prefix like `is` `are` `has`

```jsx
var isVisible = true;  
var areEqual = false;  
var hasEncryption = true;
```

**Function** : camelCase

```jsx
function getName(firstName, lastName) {
  return `${firstName} ${lastName}`;
}
```

**Class** : PascalCase

```jsx
class SoftwareDeveloper {
  constructor(firstName,lastName) {
    this.firstName = firstName;     this.lastName = lastName;
  }
}
```

**Component** : PascalCase

```jsx
function UserProfile(user) {
  return ( ... );
}
```

**Methods** : camelCase

```jsx
class SoftwareDeveloper {
  getName() { return `` };
}
```

**Private** : underscore ( _ )

```jsx
class SoftwareDeveloper {
  constructor(firstName, lastName) {
    this.name = _getName(firstName, lastName);
  }
  _getName(firstName, lastName) {
    return `${firstName} ${lastName}`;
  }
}
```

**Constant** : Capital letters (UPPERCASE)

```jsx
var SECONDS = 60;
var MINUTES = 60;
var HOURS = 24;  
var DAY = SECONDS * MINUTES * HOURS;
```

### Ref

[JavaScript Naming Convention Best Practices](https://medium.com/javascript-in-plain-english/javascript-naming-convention-best-practices-b2065694b7d)