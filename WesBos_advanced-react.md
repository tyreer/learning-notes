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


### 09 - Fixing Styled Components Flicker on Server Render

+ When just hitting refresh, a splash of unstyled content appears
+ Solution:
  + https://www.styled-components.com/docs/advanced#nextjs
  + https://github.com/zeit/next.js#custom-document  
  + Walk/crawl the component tree and collect all the styles
  + Then inject the server-side rendered styles as a style tag into the `<head>`
  + Think the `getInitialProps` function is helping


### 11 - Getting Setup with Prisma

Initializing Prisma createas two files:
+ prisma.yml: Prisma service definition
+ datamodel.graphql: GraphQL SDL-based datamodel (foundation for database)

__backend/prisma.yml__

```yml
endpoint: ${env:PRISMA_ENDPOINT}
```

+ .env file interpolation

```yml
hooks: 
  post-deploy:
    -graphql get-schema -p prisma
```

+ Post-deploy hook to return updated schema

+ Creating a new database would use Docker

__backend/datamodel.graphql__

```graphql
type User {
  id: ID! @unique
  name: String!
}
```

+ `@unique` is a a __directive__
  + https://www.prisma.io/docs/data-model-and-migrations/data-model-knul/#sdl-directives


```graphql
query {
  usersConnection(first:1) {
    pageInfo {
    hasNextPage
      hasPreviousPage
  }
    aggregate {
      count
    }
  }
}
```

### 12 - Getting our GraphQL Yoga Server Running

__src/db.js__

```js
// This file connects to the remote prisma DB and gives us the ability to query it with JS

const { Prisma } = require("prisma-binding");

const db = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: false
});

module.exports = db;
```

+ Connect to database + enable JS bindings
+ https://github.com/prisma/prisma-binding


__src/createServer.js__

```js
const { GraphQLServer } = require("graphql-yoga");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const db = require("./db");

// Create the GraphQL Yoga Server

function createServer() {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: {
      Mutation,
      Query
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({ ...req, db })
  });
}

module.exports = createServer;
```

+ Set up server
  + Ingests a schema and pairs schema with _mutation_ or _query_ resolvers
+ Context so requests have access to the database ("surfaces" the database)
+ https://github.com/prisma/graphql-yoga

__backend/package.json__

```json
"dev": "nodemon -e js,graphql -x node --inspect src/index.js",
```
+ __nodemon__ watches for changes and restarts server
  + only specifying `-e` flag because of graphql changes

__src/schema.graphql__

```graphql
type Mutation {
  hi: String
}

type Query {
  hi: String
}
```

+ Need to provide these mock values in our schema as the server needs something to resolve to
+ In next steps, we'll specify which parts of our Prisma schema we want to expose

### 13 - Our first Query and Mutation

```js
const Query = {
  dogs(parent, args, ctx, info) {
    return [{ name: "cuteDoge" }, { name: "superCuteDoge" }];
  }
};

module.exports = Query;
```

+ Each time a request is coming in you'll get the signature of the four variables: _parent, args, ctx, info_
+ What we're returning here could be from a REST api or a CSV file or whatever
  + Pretty sure in the course we'll be returning from the Prisma database
+ Anytime you add a _query_ or a _mutation_ __resolver__ you need to mirror it in the schema

### 14 - Items Creation and Prisma Yoga Flow

__datamodel.graphql__

```graphql
type Item {
  id: ID! @unique
  title: String!
  description: String!
  image: String
  largeImage: String
  price: Int!
  # createAt: DateTime!
  # updatedAt: DateTime!
  # user: User!
} 
```

+ Anytime a change is made to the _datamodel_, like the addition of the item above, we need to deploy the changes to Prisma
  + __datamodel.graphql__ is just for Prisma
+ The post-deploy hook that creates and pulls down the Prisma Graphql schema includes all sorts of __filtering__ abilities 
  + That __schema.graphql__ is public facing

__src/schema.graphql__

```graphql
# import * from './generated/prisma.graphql'

type Mutation {
  createItem(title: String, description: String, price: Int, image: String, largeImage: String): Item!
}
```

+ This mutation returns an _Item_ type which is imported from the Prisma schema via the strange comment syntax

__src/resolvers/Mutation.js__ 

```js
const Mutations = {
  async createItem(parent, args, ctx, info) {
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      info
    );
    return item;
  }
};

module.exports = Mutations;
```

+ __createItem()__ was generated in the Prisma Graphql schema and is being accessed by context as _ctx_ 

__src/resolvers/Query.js__

```js
const { forwardTo } = require('prisma-binding');

const Query = {
  items: forwardTo('db'),
  // async items(parent, args, ctx, info) {
  //   const items = await ctx.db.query.items();
  //   return items;
  // },
};
```

+ Useful to use __forwardTo__ if there's no custom logic on the front end of the request

__Recap:__
+ Add new type to _data model_ at __datamodel.graphql__ 
+ Deploy to Prisma
+ This returns new __prisma.graphql__ schema which contains all queries and mutations (CRUD abilities I assume) as well as filters related to that new item
+ In our public __schema.graphql__ we expose the functions we want to be accessible to users of our API
+ All the mutations and queries in the _schema_ need to be matched via resolvers 
+ The _resolvers_ complete any custom logic we want to implement
  + Things like charing a CC or sending an email would live here

###15 - Setting Up Apollo Client with React

__frontend/lib/withData.js__

```js
import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
  });
}

export default withApollo(createClient);
```

+ Using __Apollo Boost__, which provides many utilities in one module https://www.apollographql.com/docs/react/essentials/get-started.html#packages
  + apollo-client: Where all the magic happens
  + apollo-cache-inmemory: Our recommended cache
  + apollo-link-http: An Apollo Link for remote data fetching
  + apollo-link-error: An Apollo Link for error handling
  + apollo-link-state: An Apollo Link for local state management

+ __fetchOptions__ including credentials allows any cookies in the browser to be included