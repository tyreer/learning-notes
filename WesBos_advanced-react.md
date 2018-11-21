### 03 - An Intro to Next.js, Tooling and Routing

+ __Next.js__ takes care of 
  + Webpack tooling
  + Code splitting
  + Routing
  + SSR (SEO, instant loading, preloading)
  + getInitialProps

+ We want to use __HTML5 push state__ to route between pages 
  + w/o refreshing the page, which would clear our cache and require us to refetch data from the server
  + Will be important when there's data in our cache

+ [Reactjs Code Snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets)

+ [__next/Head__](https://github.com/zeit/next.js#populating-head) for populating `<head>` element


### 04 - Custom _app.js Layout

```js
// pages/_app.js

import App, { Container } from "next/app";
import Page from "../components/Page";

class MyApp extends App {
  render() {
    const { Component } = this.props;

    return (
      <Container>
        <Page>
          <Component />
        </Page>
      </Container>
    );
  }
}
```
+ [Custom <App>](https://github.com/zeit/next.js#custom-app) component allows control over page initialization

```js
// components/Page.js

import Header from "./Header";
import Meta from "./Meta";

class Page extends Component {
  render() {
    return (
      <div>
        <Meta />
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default Page;
```

+ `<Page>` component allows `<Meta>` + `<Header>` to be shared across pages
+ Renders child component it wraps

### 05 - An Intro to Styled Components

```js
const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;
```

+ These are just [tagged template literals](https://github.com/tyreer/learning-notes/blob/master/WesBos_es6-for-everyone.md#14---tagged-template-literals)
  + `styled.div` must reference a function that's run on the styles in the string literal


### 06 - Themes and Layout with Styled Components

```js
const Logo = styled.h1`
  ...
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: ${props => props.theme.red};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;
```

```js
<Logo>
  <Link href="/">
    <a>Sick Fits</a>
  </Link>
</Logo>
```

+ __Nesting__ the `a` selector within the styled component
+ __Media query__ within the template literal
+ `transform: skew(-7deg)` to tilt the text and background container

### 07 - Global Styling and Typography with Styled Components

```js
// components/Page.js

import styled, { ThemeProvider, injectGlobal } from "styled-components";

...

injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  html {
  }
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
  line-height: 2;
  font-family: 'radnika_next';
}
```
+ Normalizing via __injectGlobal__
+ __border-box__ method is a best practice
+ `font-size: 10px;` allows __rem__ units in base 10 throughout

```js
const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
```

+  `grid-template-columns` going from a single column to double column

__components/styles/NavStyles.js__

```js
a,
button {
  padding: 1rem 3rem;
```
+ Standardizing buttons and anchors in the nav

```js
 &:after {
      height: 2px;
      background: red;
      content: "";
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2rem;
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 60px);
      }
    }
```

+ Nice __animated hover state__ on nav links
  + Strange to me to use `margin-top` for vertical positioning
  + Removing gives trendy strike-through positioning 

### 08 - Visualizing Route Changes 

```js
// components/Header.js 
// (but can go anywhere)

import Router from "next/router";
import NProgress from "nprogress";

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};
```

+ [NProgress](https://github.com/rstacruz/nprogress) shows slim progress bar at top of screen
+ __next/router__ exposes handy [router events](https://github.com/zeit/next.js#router-events)
  + In development, can expect a minor lag between pages, but not on production