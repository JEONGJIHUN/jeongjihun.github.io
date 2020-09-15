---
title: Webpack
date: "2020-09-15"
template: "post"
draft: false
slug: "Webpack"
category: "Webpack"
tags:
  - "Webpack"
  - "bundler"
  - "javascript"
description: "하나의 html 파일 안에서 로딩해야하는 방식에서 IIFE 함수를 사용해 스코프를 만들어 스코프 외부와 이름 충돌을 막아서 사용했다고 한다. 그러다가 다양한 모듈 스펙들이 나왔고 대표적으로 AMD 와 CommonJS 다."
socialImage: ""
---

하나의 html 파일 안에서 로딩해야하는 방식에서 IIFE 함수를 사용해 스코프를 만들어 스코프 외부와 이름 충돌을 막아서 사용했다고 한다. 그러다가 다양한 모듈 스펙들이 나왔고 대표적으로 AMD 와 CommonJS 다.

CommonJS는 자바스크립트를 사용하는 모든 환경에서 모듈을 하는 것이 목표다. exports 키워드로 모듈을 만들고 require 함수로 불러 들이는 방식이다. 대표적으로 Node.js 에서 사용한다.

AMD는 비동기로 로딩되는 환경에서 모듈을 사용하는 것이 목표다. 주로 브라우져 환경이다. UMD는 AMD 기반으로 CommonJs 방식까지 지원하는 통합 형태이다. 그러다 ES2015에서 표준 모듈 시스템을 내놓았다. export 키워드로 모듈을 만들고 import 로 가져와 사용하는 방식이다.

하지만 모든 브라우져에서 모듈 시스템을 사용할 순 없다. (인터넷 익스플로러 및 몇 몇 브라우져)

브라우저에 무관하게 모듈을 사용하고 싶을 때 웹팩이란 것이 나왔다. 웹팩은 여러개 파일을 하나의 파일로 합쳐주는 번들러다. 하나의 시작점으로부터 의존적인 모듈을 전부 찾아내서 하나의 결과물을 만들어낸다.

웹팩에서 `--mode`, `--entry`, `--output` 세 개의 옵션을 사용해 하나의 번들 파일을 만들 수 있다.

- `--mode`는 웹팩 실행 모드는 의미한다.
- `--entry`는 시작점 경로를 지정하는 옵션이다.
- `--output`은 번들링 결과물을 위치할 경로이다.

이 옵션들을 `webpack.config.js` 파일에서 설정할 수 있다.

```js
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
};
```

`ouput`에 설정한 '[name]'은 entry에 추가한 main이 문자열로 들어오는 방식이다.

- `output.path`는 절대 경로를 사용하기 때문에 path 모듈의 resolve() 함수를 사용해서 계산했다. (path는 노드 코어 모듈 중 하나로 경로를 처리하는 기능을 제공한다)

모든 옵션을 웹팩 설정 파일로 옮겼기 때문에 단순히 webpack 명령어만 실행한다. 이제부터는 npm run build로 웹팩 작업을 지시할 수 있다.

웹팩은 스타일시트, 이미지, 폰트까지도 전부 모듈로 보기 때문에 import 구문을 사용하면 자바스크립트 코드 안으로 가져올 수 있다. 그러기 위해 로더를 사용한다.

```js
module: {
  rules: [{
    test: /\.js$/, // .js 확장자로 끝나는 모든 파일
    use: [path.resolve('./myloader.js')] // 방금 만든 로더를 적용한다
  }],
}
```

`module.rules` 배열에 모듈을 추가하는데 test와 use로 구성된 객체를 전달한다.

`test`에는 로딩에 적용할 파일을 지정한다. 파일명 뿐만아니라 파일 패턴을 정규표현식으로 지정할수 있는데 위 코드는 .js 확장자를 갖는 모든 파일을 처리하겠다는 의미다.

`use`에는 이 패턴에 해당하는 파일에 적용할 로더를 설정하는 부분이다.

자주 사용하는 로더는 `css-loader`, `style-loader`, `file-loader`, `url-loader` 정도이다.

`css-loader`는 CSS 파일을 모듈처럼 불러와 사용할 수 있게끔 해준다.

`style-loader`는 자바스크립트로 변경된 스타일을 동적으로 돔에 추가하는 로더이다. CSS를 번들링하기 위해서는 css-loader와 style-loader를 함께 사용한다. 배열로 설정하면 뒤에서부터 앞으로 순서대로 로더가 동작한다. 위 설정은 모든 .css 확장자로 끝나는 모듈을 읽어 들여 css-loader를 적용하고 그 다음 style-loader를 적용한다.

`file-loader`는 파일을 모듈 형태로 지원하고 웹팩 아웃풋에 파일을 옮겨준다. CSS를 로딩하면 background-image: url(bg.png) 코드에 의해 동일 폴더에서 이미지를 찾으려고 시도할 것이다. 그러나 웹팩으로 빌드한 이미지 파일은 output인 dist 폴더 아래로 이동했기 때문에 이미지 로딩에 실패할 것이다.

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.png$/, // .png 확장자로 마치는 모든 파일
        loader: "file-loader",
        options: {
          publicPath: "./dist/", // prefix를 아웃풋 경로로 지정
          name: "[name].[ext]?[hash]", // 파일명 형식
        },
      },
    ],
  },
};
```

`publicPath` 옵션은 file-loader가 처리하는 파일을 모듈로 사용할 때 경로 앞에 추가되는 문자열이다. output에 설정한 'dist' 폴더에 이미지 파일을 옮길 것이므로 publicPath 값을 이것으로로 지정했다. 파일을 사용하는 측에서는 'bg.png'를 'dist/bg.png'로 변경하여 사용할 것이다.

또한 `name` 옵션을 사용했는데 이것은 로더가 파일을 아웃풋에 복사할때 사용하는 파일 이름이다. 기본적으로 설정된 해쉬값을 쿼리스트링으로 옮겨서 'bg.png?6453a9c65953c5c28aa2130dd437bbde' 형식으로 파일을 요청하도록 변경했다.

`url-loader`는 이미지를 Base64로 인코딩하여 문자열 형태로 소스코드에 넣는 형식을 자동화해준다.

```js
{
  test: /\.png$/,
  use: {
    loader: 'url-loader', // url 로더를 설정한다
    options: {
      publicPath: './dist/', // file-loader와 동일
      name: '[name].[ext]?[hash]', // file-loader와 동일
      limit: 5000 // 5kb 미만 파일만 data url로 처리
    }
  }
}
```

file-loader와 옵션 설정이 거의 비슷하고 마지막 limit 속성만 추가했다. 모듈로 사용한 파일중 크기가 5kb 미만인 파일만 url-loader를 적용하는 설정이다. 만약 이보다 크면 file-loader가 처리하는데 옵션 중 fallback 기본값이 file-loader이기 때문이다.

아이콘처럼 용량이 작거나 사용 빈도가 높은 이미지는 파일을 그대로 사용하기 보다는 Data URI Scheeme을 적용하기 위해 url-loader를 사용하면 좋겠다.

웹팩에서 알아야 할 마지막 기본 개념이 플러그인이다. 로더가 파일 단위로 처리하는 반면 플러그인은 번들된 결과물을 처리한다. 번들된 자바스크립트를 난독화 한다거나 특정 텍스트를 추출하는 용도로 사용한다.

로더와 다르게 플러그인은 클래스로 제작한다.

웹팩에서 직접 제공하는 플러그인을 사용하거나 써드파티 라이브러리를 찾아 사용하는데 자주 사용하는 플러그인에 대해 알아보자.

`BannerPlugin`는 결과물에 빌드 정보나 커밋 버전같은 걸 추가할 수 있다.

```js
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.BannerPlugin({
      banner: '이것은 배너 입니다',
    })
  ]
```

생성자 함수에 전달하는 옵션 객체의 banner 속성에 문자열을 전달한다. 웹팩 컴파일 타임에 얻을 수 있는 정보, 가령 빌드 시간이나 커밋정보를 전달하기위해 함수로 전달할 수도 있다.

```js
new webpack.BannerPlugin({
  banner: () => `빌드 날짜: ${new Date().toLocaleString()}`,
});
```

배너 정보가 많다면 별로 파일로 분리하자.

```js
const banner = require("./banner.js");

new webpack.BannerPlugin(banner);
```

빌드 날짜 외에서 커밋 해쉬와 빌드한 유저 정보까지 추가해 보자.

```js
//banner.js
const childProcess = require("child_process");

module.exports = function banner() {
  const commit = childProcess.execSync("git rev-parse --short HEAD");
  const user = childProcess.execSync("git config user.name");
  const date = new Date().toLocaleString();

  return (
    `commitVersion: ${commit}` + `Build Date: ${date}\n` + `Author: ${user}`
  );
};
```

웹팩은 환경 정보를 제공하기 위해 `DefinePlugin`을 사용한다.

`HtmlWebpackPlugin`은 HTML 파일을 후처리하는데 사용한다. 빌드 타임의 값을 넣거나 코드를 압축할 수 있다.

```html
//src/index.html
<!DOCTYPE html>
<html>
  <head>
    <title>타이틀<%= env %></title>
  </head>
  <body>
    <!-- 로딩 스크립트 제거 -->
    <!-- <script src="dist/main.js"></script> -->
  </body>
</html>
```

타이틀 부분에 ejs 문법을 이용하는데 `<%= env %>` 는 전달받은 env 변수 값을 출력한다. HtmlWebpackPlugin은 이 변수에 데이터를 주입시켜 동적으로 HTML 코드를 생성한다.

뿐만 아니라 웹팩으로 빌드한 결과물을 자동으로 로딩하는 코드를 주입해 준다. 때문에 스크립트 로딩 코드도 제거했다.

```js
//webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports {
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 템플릿 경로를 지정
      templateParameters: { // 템플릿에 주입할 파라매터 변수 지정
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
      },
    })
  ]
}
```

개발 환경과 달리 운영 환경에서는 파일을 압축하고 불필요한 주석을 제거하는 것이 좋다.

```js
//webpack.config.js
new HtmlWebpackPlugin({
  minify: process.env.NODE_ENV === 'production' ? {
    collapseWhitespace: true, // 빈칸 제거
    removeComments: true, // 주석 제거
  } : false,
}

//(문서에는 minifiy 옵션이 웹팩 버전 3 기준으로 되어 있다)
```

정적파일을 배포하면 즉각 브라우져에 반영되지 않는 경우가 있다. 브라우져 캐쉬가 원인일 경우가 있는데 이를 위한 예방 옵션도 있다.

```js
new HtmlWebpackPlugin({
  hash: true, // 정적 파일을 불러올때 쿼리문자열에 웹팩 해쉬값을 추가한다
});
```

`CleanWebpackPlugin`은 빌드 이전 결과물을 제거하는 플러그인이다. 빌드 결과물은 아웃풋 경로에 모이는데 과거 파일이 남아 있을수 있다. 이전 빌드내용이 덮여 씌여지면 상관없지만 그렇지 않으면 아웃풋 폴더에 여전히 남아 있을 수 있다.

```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  plugins: [new CleanWebpackPlugin()],
};
```

`MiniCssExtractPlugin`은 CSS를 별로 파일로 뽑아내는 플러그인이다.

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [
    ...(process.env.NODE_ENV === "production"
      ? [new MiniCssExtractPlugin({ filename: `[name].css` })]
      : []),
  ],
};
```

개발 환경에서는 css-loader에의해 자바스크립트 모듈로 변경된 스타일시트를 적용하기위해 style-loader를 사용했다. 반면 프로덕션 환경에서는 별도의 CSS 파일으로 추출하는 플러그인을 적용했으므로 다른 로더가 필요하다.

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader // 프로덕션 환경
            : "style-loader", // 개발 환경
          "css-loader",
        ],
      },
    ],
  },
};
```

플러그인에서 제공하는 MiniCssExtractPlugin.loader 로더를 추가한다.

그 외에 `TerserWebpackPlugin`은 자바스크립트 코드를 난독화하고 debugger 구문을 제거한다. 기본 설정 외에도 콘솔 로그를 제거하는 옵션도 있는데 배포 버전에는 로그를 감추는 것이 좋을 수도 있기 때문이다.

```js
// webpack.config.js:
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  optimization: {
    minimizer:
      mode === "production"
        ? [
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true, // 콘솔 로그를 제거한다
                },
              },
            }),
          ]
        : [],
  },
};
```

### **References**

- [https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html](https://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html)
