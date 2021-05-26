---
title: Network (Basic)
date: "2021-02-14"
template: "post"
draft: false
slug: "network"
category: "network"
tags:
  - "network"
  - "port"
  - "LAN"
  - "WAN"
description: "기본적인 네트워크에 대해 기록을 남겨보려한다."
socialImage: ""
---

기본적인 네트워크에 대해 기록을 남겨보려한다. 이 글은 지하철 승객님의 글을 읽고 요약 정리한 글이다. 쉽게 이해할 수 있어 기록해두게 되었다.

### 네트워크

처음 컴퓨터는 각자 따로노는 기계들이었다. 정보 공유를 위해서는 플로피 디스켓을 이용해 복사/붙여넣기 방식을 사용했으나 대부분 번거롭거나 반복적인 일들은 누군가에 의해 개선되어져 왔다. 그리허여 시리얼 포트라고 하는 통신 포트(두 컴퓨터를 이어주는 연걸선)를 만들어 통신하게 될 수 있게 되었다.

하지만 컴퓨터 갯수가 늘어나게 된다면 (n-1)!개의 포트 수가 필요하게 된다. 그러다보니 컴퓨터 간의 연결을 담당하는 전용 기계(HUB)가 생기게 된다. 이 허브를 사용하면 컴퓨터 갯수(n)만큼의 케이블만 추가하면 된다.

하지만 새로운 변화가 생길 때에는 문제가 따라 오기 마련이다.(사소하더라도) 이제는 통신을 하기 위해 식별할 수 있는 이름이 필요하게 된것이다. 이 것이 물리 주소(MAC Address)라고 불리오는 고유의 이름이다. 물리 주소는 12자리로 된 16진수 숫자의 주소 값을 갖는다. 이렇게 구성된 네트워크를 Local Area Network ( LAN)이라고 부르게 된다.

LAN 통신의 기본적인 방식은 A 컴퓨터가 D 컴퓨터와 통신을 하려면 허브에 메세지를 보내고 모든 컴퓨터가 그 메세지를 수신한다. 그러면 물리주소를 확인해 수신자만 응답을 하고 나머지는 무시하게 된다. 이 방식이 Ethernet(이더넷)이며 가성비로 인해 지금까지 사용하고 있단다.

각각의 LAN 들을 연결하는 것을 WAN(Wide Area Network)라고 불린다. 이런 구조에서는 LAN 안에는 여러 대의 컴퓨터가 있을 것이고 WAN 바깥으로는 하나의 연결 통로만 있으면 된다.그래서 WAN 포트는 1개고 LAN 포트는 여러개가 됩다.

여기서 또 문제가 발생한다. 각 로컬에서 같은 이름의 주소가 존재할 시 누구에게 보낼 지 알 수 없게 된다. 이 문제를 해결하기 위해 IANA(Internet Assigned Numbers Authority = 인터넷 번호 할당 기관) 라는 기관이 세워지게 된다. 여기서 IP 주소를 관리하게 됩다. 그래서 각 국가별로 IP를 관리하는 기관이 설립되고, 그 위에 대륙별로 IP를 관리하는 기관이 있고 최상위에 IANA가 IP 주소를 총괄하는 형태로 인터넷 주소 체계의 관리가 이루어지게 된다!

이렇게 되면 중복적인 이름을 방지할 수 있다. 하지만 허브가 주소를 가지게 되면서 모든 컴퓨터가 내 메세지를 듣는 방식을 사용하는 것이 불가능해 질 것이라는 것을 짐작할 수 있다. 허브가 WAN으로 메시지를 전달하는 역할을 전담하는 게이트웨이(혹은 라우터)의 역할을 맡게 된 것이다.

평소 LAN의 방식대로 라우터주소.1 번 컴퓨터가 로컬 네트워크에 응답하라는 메시지를 확 뿌려버리면 LAN에 있는 다른 컴퓨터들은 모두 자기랑 상관없는 메시지니 무시하지만 게이트웨이는 우리 네트워크의 메시지가 아니니 WAN 으로 메시지를 돌려버린다. 그러면 WAN으로 연결되어 네트워크의 게이트웨이가 우리쪽으로 보낸 메시지를 확인하고 로컬 네트워크에 쫙 메시지를 뿌린다. 그러면 최종 목적지인 목적지라우터주소.3 컴퓨터에게 메시지가 도달하게 된다.

실제로는 더 많은 단계로 구성이 되지만 기본적으로는 이런 방식으로 IP 주소를 통한 통신이 이루어지게 됩다.

다음 편은 포트편을 기록해보도록 하겠다.

### **References**

- [https://www.clien.net/service/board/lecture/15872844](https://www.clien.net/service/board/lecture/15872844)