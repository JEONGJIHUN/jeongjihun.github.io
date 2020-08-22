---
title: Setup HTTPS with cra
date: "2020-08-19"
template: "post"
draft: false
slug: "setup-https-with-cra"
category: "React"
tags:
  - "Javascript"
  - "React"
  - "HTTPS"
  - "SSL"
description: "맥os 환경에서 cra localhost 를 http에서 https로 변경 시켜주는 작업입니다. HTTPS를 통해 요청을 처리하는 API를 사용해야 하는 경우 개발에서 HTTPS를 실행하면 유용합니다."
socialImage: ""
---

## Setup HTTPS with cra

맥os 환경에서 cra `localhost` 를 http에서 https로 변경 시켜주는 작업입니다.

HTTPS를 통해 요청을 처리하는 API를 사용해야 하는 경우 개발에서 HTTPS를 실행하면 유용합니다.

SSL 인증서를 생성하고 생성된 인증서를 가지고 스크립트를 실행하면 https setup을 완료할 수 있습니다. 그러기 위해서 `brew`를 이용해 `mkcert`를 설치하는 방법입니다.

`[mkcert](https://github.com/FiloSottile/mkcert)` is a simple tool for making locally-trusted development certificates.

```bash
# mkcert tool을 설치합니다.
brew install mkcert

# Firefox를 사용하면 설치합니다.
brew install nss

# mkcert를 setup 합니다.
mkcert -install
```

그 다음, cra를 설치한 후 다음 스크립트를 실행합니다.

```bash
# .cert directory를 만듭니다.
mkdir -p .cert

# 인증서를 생성합니다.
mkcert -key-file ./.cert/cert.key -cert-file ./.cert/cert.crt "localhost"
```

**`생성된 인증서를 가지고 있는 .cert파일은 .gitignore에 포함시켜야 합니다.`**

마지막으로 `package.json`에 scripts를 수정합니다. 그리고 스크립트를 실행시켜 아래 이미지와 같이 HTTPS가 적용된 것을 확인할 수 있습니다.

```json
"scripts": {
    "start": "HTTPS=true SSL_CRT_FILE=./.cert/cert.crt SSL_KEY_FILE=./.cert/cert.key react-scripts start",
		...
  },
```

 

<img width="350" style="margin:0 auto;" alt="cra screenshot about adopted HTTPS" src="https://user-images.githubusercontent.com/29101760/90650403-ceb1d280-e276-11ea-9d04-d2b4426a06cf.png">

- **ref**
  - [https://www.freecodecamp.org/news/how-to-set-up-https-locally-with-create-react-app/](https://www.freecodecamp.org/news/how-to-set-up-https-locally-with-create-react-app/)

