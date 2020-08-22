---
title: Service worker & Web worker
date: "2020-08-22"
template: "post"
draft: false
slug: "service-worker-and-web-worker"
category: "web"
tags:
  - "service worker"
  - "web"
  - "worker"
  - "api"
description: "Web Worker는 script 실행을 메인 쓰레드가 아니라 백그라운드 쓰레드에서 실행할 수 있도록 해주는 기술 입니다. 이 기술을 통해 무거운 작업을 분리된 쓰레드에서 처리할 수 있으며, 이를 통해 메인 쓰레드(일반적으로 UI 쓰레드)는 멈춤, 속도저하 없이 동작할 수 있게 됩니다."
socialImage: ""
---

## Service worker & Web worker

### Web worker

Web Worker는 script 실행을 메인 쓰레드가 아니라 백그라운드 쓰레드에서 실행할 수 있도록 해주는 기술 입니다. 이 기술을 통해 무거운 작업을 분리된 쓰레드에서 처리할 수 있으며, 이를 통해 메인 쓰레드(일반적으로 UI 쓰레드)는 멈춤, 속도저하 없이 동작할 수 있게 됩니다.

**_즉, 병렬 스크립트 실행을 위한 API_**

- 런타임에 워커를 생성하고 조작 가능
- 생선된 워커는 페이지나 브라우저가 로딩되고 생성된 뒤에만 동작 가능
- 페이지가 새로 로딩될 때마다 새로 생성하여 사용해야 함

#### basic rule

- 전용 글로벌 스코프
- DOM에 직접 접근 불가
- window 스코프의 메소드와 속성들을 모두 사용할 수는 없음

### Service worker

Service worker는 기본적으로 웹 응용 프로그램, 브라우저 및 네트워크 (사용 가능한 경우) 사이에 있는 프록시 서버의 역할을 합니다. 또한 효과적인 오프라인 환경을 만들고 네트워크 요청을 가로 채고 네트워크 사용 가능 여부에 따라 적절한 조치를 취하고 서버에 있는 자산을 업데이트 하기 위한 것입니다. 또한 푸시 알림 및 백그라운드 동기화 API에 대한 액세스를 허용합니다.
**오프라인 상태에서도 웹 앱의 구동이 가능하도록 하는 기능을 포함하고 있습니다.**

- 웹페이지 및 브라우저의 생명 주기와는 무관
- 시스템에서 버전 관리를 위한 업데이트 기능 제공
- 원격 푸시 알림, 백그라운드 동기화 등에 대한 최초 진입점으로 적합

#### lifecycle

1. Download
2. Install
3. Activate

service worker는 사용자가 service worker가 제어하는 ​​사이트 / 페이지에 처음 액세스 할 때 즉시 다운로드됩니다.

그 후 24 시간마다 다운로드됩니다. 더 자주 다운로드 될 수 있지만 잘못된 스크립트 때문에 너무 오래 걸리는 것을 방지하기위해 24 시간마다 다운로드해야합니다.

다운로드 한 파일이 기존 service worker와 다르거나(바이트 단위로 비교 한 경우) 페이지(사이트)의 첫 번째 service worker와 만난 경우 설치가 시도됩니다.

service worker가 다운로드 되면 설치가 시작되고 설치가 완료된 후 service worker가 활성화됩니다.

### 웹앱 메니페스트

- 실제 로딩된 페이지 리소스와의 상호작용 대신 메터데이터를 가진 단일 JSON 파일로부터 웹앱을 관리하기 위한 앱 정보의 조회하는 기능 제공
- 홈화면 상에 앱 아이콘과 이름 표시
- 설치 아이콘의 클릭을 통해 원하는 URL을 실행

### Ref

- https://www.slideshare.net/cwdoh/service-worker-201
- https://developer.mozilla.org/ko/docs/Web/API/Service_Worker_API
- https://developer.mozilla.org/ko/docs/Web/API/Web_Workers_API
