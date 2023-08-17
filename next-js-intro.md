Next.js 사용하기 입문
======

# 설치방법

> npx create-next-app

Need to install the following packages:
  create-next-app@13.4.13
Ok to proceed? (y) y
√ What is your project named? ... next-js-app-starter
√ Would you like to use TypeScript? ... No / Yes
√ Would you like to use ESLint? ... No / Yes
√ Would you like to use Tailwind CSS? ... No / Yes
√ Would you like to use `src/` directory? ... No / Yes
√ Would you like to use App Router? (recommended) ... No / Yes
√ Would you like to customize the default import alias? ... No / Yes


# NextJS 는 Framework

__library__ 는 개발자로서 사용하는 하나의 도구로 사용하고 싶을때 원하는대로 사용할 수 있다면, __Framework__ 는 개발자가 정해진 환경안에서 특정한 규칙에 맞추어서 사용해야함.

NextJS 는 ReactJS 와는 달리 개발자가 할 수 있는 것은 pages 폴더 안에서 작업을 하는 것, 개발자가 커스텀할 수 있는 것이 많이 적음

- router 를 만들지 않아도 pages 에 따라 경로가 자동 설정됨.


# Router

**pages 폴더 안에 있는 파일명에 따라 route가 결정된다.**

pages/about.js 생성 ->
localhost:3000/about (O)
localhost:3000/about-us(X)

다만 **예외사항**으로, index.js의 경우에는
앱이 시작하는 파일이라고 보면 된다.
즉 localhost:3000 그 자체다 뒤에 /index 로 붙이면 안된다.

component 이름은 자유롭게 지을 수 있지만 export default 를 설정해주어야한다.

> 요약
- 파일명에 따라 router 가 자동설정된다.
- index.js 는 예외로 자동적으로 home 으로 설정된다.
- component 이름은 자유롭게 하되, export default 를 설정해준다.


# Pre-Rendering

Client-side rendering(CSR): 유저의 브라우저가 유저가 보는 전체 UI 를 만듦, ReactJS 로만 만들어진 웹을 보면, 소스코드에서는 작성한 코드가 보이지 않음.

브라우저가 React.js 를 다운받고, 개발자가 작성한 코드를 다운받아야 React.js 가 랜더링하면서 유저가 UI 를 볼 수 있음

따라서 인터넷이 느린 환경에서 웹페이지를 열경우 빈화면이 오랫동안 보일 수 있음
또한 JS 를 비활성화 시키면 빈화면만이 보이는 단점이 있다.

<hr/>

Pre-Rendering 을 통해 어플리케이션을 초기 상태를 미리 랜더링하여 유저에게 보여준다. 이후에 ReactJS 가 모두 다운받아질 때 ReactJS 어플리케이션이 된다.

인터넷이 느리거나 JS가 비활성화 된 상태라도 작성된 코드의 HTML 을 볼 수 있다.

> 정리
- 유저가 웹사이트방문시 초기 상태의 component 로 된 미리 랜더링된 HTML 페이지를 본다.
- 이후 웹사이트에서 ReactJS 와 코드를 다운받게 되면 ReactJS 앱으로써 잘 작동하게 된다


# Navigation(Routing)

**Components 폴더 생성 후 Component 관리**


## 1. ReactJS 처럼 Link 사용 (next/link)

NestJS 에서는 **anchor 태그를 사용해서만** Naviagting 하면 안됨.
- a 태그 사용시 페이지전체가 새로고침되므로 CSR 의 의미가 없어짐(속도느림)

```js
<Link href="/">
    <a>home</a>
</Link>
```

## 2. useRouter 사용 (next/router)

ReactJS 의 useLocation 과 같은 기능을 하여 현재 페이지의 경로에 대한 정보 제공


# CSS Modules

적용할 js 파일과 같은 명을 사용하고 적용할 **파일명.modules.css 사용**

```css
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

className 작성시 string 이 아니라 js object 의 property 형식으로 작성
```js
import styles from "./NavBar.module.css"
<nav className={styles.nav}>
</nav>
```

# Styles JSX

component 내 사용. 범위가 component 내부로 한정됨
```js
<style jsx>{`
    span {
        background-color: blue;
    }

`}</style>
```



# Custom App [docs](https://nextjs.org/docs/advanced-features/custom-app)

Next.js는 App 컴포넌트를 사용하여 page를 초기화. 이를 재정의하고 페이지 초기화를 제어할 수 있다. 이를 통해 다음과 같은 작업 가능

1. 페이지 변경 간에 레이아웃 유지
2. 페이지 탐색 시 state 유지
3. componentDidCatch를 사용한 Custom 에러 처리
4. 페이지에 추가 데이터 삽입
5. Global CSS 추가 (_app.js 이외의 파일에서는 import 못함)

기본 App을 재정의하려면 아래와 같이 ./pages/_app.js 파일을 만듭니다.

```js
export default function MyApp({ Component, pageProps }) {
return (
    <>
        <Component {...pageProps} />
        <style jsx global>{`
        `}</style>
    </>
)
}
```


# header 

기본적으로 import Head from "next/head" 제공


# nextjs 에서 react-query 사용하기

[참고](https://kir93.tistory.com/entry/NextJS%EC%97%90%EC%84%9C-react-query-SSR-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)


# Redirect and Rewrite

## 1. [Redirect - NextJS](https://nextjs.org/docs/api-reference/next.config.js/redirects)

next.config.js 에서 설정

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
        {
            source: "/contact",
            destination: "/form",
            permanent: false,
        }
    ]
  }
}

module.exports = nextConfig
```

> Source 로 url 접속하면 destination 으로 이동(redirect)

1. async redirects() {} 작성
2. source -> 들어오는 request 경로 패턴(request 경로)
3. destination -> Routing 하려는 경로(redirect 경로)
4. permanent -> 
    - true인 경우 클라이언트와 search 엔진에 redirect를 영구적으로 cache하도록 지시하는 308 status code를 사용
    - false인 경우 일시적이고 cache되지 않은 307 status code를 사용.


## 2. [Rewrite - NextJS](https://nextjs.org/docs/api-reference/next.config.js/rewrites)

> source, destination 및 permanent 속성이 있는 객체를 포함하는 배열을 반환하는 비동기 함수.

> 

```js
/** @type {import('next').NextConfig} */

const API_KEY = "abcdefg";

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
        {
            source: "/api/movies",
            destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
        }
    ]
  }
}

module.exports = nextConfig
```


## Server Side Rendering

[공식문서](htps://nextjs.org/docs/basic-features/data-fetching/get-server-side-props)

1. **getServerSideProps(-레거시됨-)**

page에서 서버 측 랜더링 함수인 getServerSideProps함수를 export하는 경우 Next.js는 getServerSideProps에서 반환된 데이터를 사용하여 각 request에서 이 페이지를 pre-render합니다. getServerSideProps는 서버 측에서만 실행되며 브라우저에서는 실행되지 않습니다.

getServerSideProps를 사용하여 request시 데이터 fetch하기
다음 예는 request 시 데이터를 fetch하고 결과를 pre-render하는 방법을 보여줍니다.


2. **fetch option(no-store)**
[공식문서](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating)

```js
async function fetchData() {
const res = await fetch('http://localhost:3000/api/movies', {
cache: 'no-store',
})
const { results } = await res.json()
return results
}
```

## Dynamic Routes

NextJS 에서는 Route 에 대한 설정을 할 수 없으므로 page 폴더안에서 작업.

- 만약 /movies/{movie-id} 경로로 가려고하면 
movies 라는 폴더안에 [movie-id].js 를 작성

- /movies 경로로 가고 싶으면 
movies 라는 폴더안에 index.js 를 작성

### Catch-all URL 
 
**만약 복수의 url 변수**를 사용하고 싶다면 [...params].js 등으로 작성하면 된다

URL 에 있는 모든 정보를 캐치할 수 있음.
onClick 등 이벤트로 페이지를 이동하지 않더라도 url 검색으로 페이지 이동이 가능

[..params].js 등으로 작성한 페이지에서 useRoute.query 에서 url 변수확인가능

### getStaticProps

SSR 을 활용하기 위한 함수 (Next 13)
CSR 의 경우 JS 파일을 모두 다운받지 않으면 useRouter 를 통해 정보를 가져올 수 없기 때문에 로딩시간동안 빈화면을 보여줄 수 있음.

```js
export async function getStaticProps({ params }:Params) { // params 는 dynamic route prop 을 져옮
    return {
    props: { params },
};
}
export async function getStaticPaths() {
return {
    paths: [], // 동적 경로가 없으므로 빈 배열로 설정
    fallback: 'blocking', // 다른 경로로의 접근은 서버 사이드에서 대기
};
}
```