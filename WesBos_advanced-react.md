# Notes on Fullstack Advanced React and GraphQL

Notes from the Wes Bos course at [advancedreact.com](https://advancedreact.com/)

## Resources:

+ [Stepped solutions](https://github.com/tyreer/advanced-react-wes-bos-course/tree/master/stepped-solutions)

## Lesson Notes

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

__backend/schema.graphql__

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
  + Things like charging a CC or sending an email would live here

### 15 - Setting Up Apollo Client with React

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

__frontend/pages/_app.js__
```js
import { ApolloProvider } from "react-apollo";
...
class MyApp extends App {
  ...

  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
```

+ __ApolloProvider__ generates the Apollo client
+ __withData()__ injects _apollo_ into props 

__frontend/pages/_app.js__

```js
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

   render() {
    const { Component, apollo, pageProps } = this.props;
```

+ __getInitialProps()__ is a Next.js lifecycle method that runs before the first render
  + It will expose things like the page number or product id that we get in the URL
  + By returning __pageProps__, we inject it into props

__Next.js docs on getInitialProps()__

+ __initial data population__

```js
import React from 'react'

export default class extends React.Component {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent }
  }

  render() {
    return (
      <div>
        Hello World {this.props.userAgent}
      </div>
    )
  }
}
```

> Notice that to load data when the page loads, we use getInitialProps which is an async static method. It can asynchronously fetch anything that resolves to a JavaScript plain Object, which populates props.

> For the initial page load, getInitialProps will execute on the server only. getInitialProps will only be executed on the client when navigating to a different route via the Link component or using the routing APIs.

+ https://github.com/zeit/next.js/#fetching-data-and-component-lifecycle


### 16 - React Meets GraphQL

__/frontend/components/Item.js__

```js
import Link from "next/link";

...

<Link
  href={{
    pathname: "/item",
    query: { id: item.id }
  }}
>
  <a>{item.title}</a>
</Link>
```

+ __next.js Link__ component accepting pathname + query in an object literal in _href_

__frontend/components/styles/ItemStyles.js__

```js
const ItemStyles = styled.div`
...
.buttonList {
  display: grid;
  width: 100%;
  border-top: 1px solid ${props => props.theme.lightgrey};
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 1px;
  background: ${props => props.theme.lightgrey};
  & > * {
    background: white;
    border: 0;
    font-size: 1rem;
    padding: 1rem;
  }
}
`
```

```js
<ItemStyles>
  
  ...

  <div className="buttonList">
    <Link
      href={{
        pathname: "update",
        query: { id: item.id }
      }}
    >
      <a>Edit ✏️</a>
    </Link>
    <button>Add To Cart</button>
    <button>Delete </button>
  </div>
</ItemStyles>
  ```
+ __ItemStyles__ is both a container div with style rules and a scope for classes
+ For instance, the __buttonList__ class is accessible within an ItemStyles component
  + Nice trick to use __grid-gap__ and a background color to handle the borders between the three boxes in the div

__frontend/components/Items.js__

```js
import gql from "graphql-tag";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

...

class Items extends Component {
  render() {
    return (
      <Center>
        <Query query={ALL_ITEMS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <ItemsList>
                {data.items.map(item => (
                  <Item item={item} key={item.id} />
                ))}
              </ItemsList>
            );
          }}
        </Query>
      </Center>
    );
  }
}
```

+ Nice compact model of a __Query__

### 17 - Creating Items with Mutations

__frontend/components/CreateItem.js__

```js
 handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };
```

+ Nice text input handler
  + Handles number inputs
  + Creates new state field based on input's name attribute, so can be reused a lot


__frontend/components/CreateItem.js__

```js
import { Mutation } from "react-apollo";

...

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;
```

+ Declaring the mutation we want to use on the frontend
+ Useful to revisit [Our First Query and Mutation](#13---our-first-query-and-mutation)
  + That's where we set up __createItem__ as a mutation on the backend

```js
import Router from "next/router";

...

render() {
  return (
    <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
      {(createItem, { loading, error }) => (
        <Form
          onSubmit={async e => {
            // Stop the form from submitting
            e.preventDefault();
            // call the mutation
            const res = await createItem();
            // change them to the single item page
            console.log(res);
            Router.push({
              pathname: "/item",
              query: { id: res.data.createItem.id }
            });
          }}
        >

        ...
  ```

+ __onSubmit__ invoking `createItem()`
  + Variables aren't passed in how I'd expect, but the parameter to _Mutation_ indicates to use _state_

```js
import Error from "./ErrorMessage";

...

<Error error={error} />
  <fieldset disabled={loading} aria-busy={loading}>
```

+ Interesting use of custom `<Error />`
  +  Want the form to remain mounted so that any errors can be corrected
+ __fieldset__ `disabled` state and styles via `aria-busy` seems super useful

__frontend/components/styles/Form.js__

```js
import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

fieldset {
  border: 0;
  padding: 0;

  &[disabled] {
    opacity: 0.5;
  }
  &::before {
    height: 10px;
    content: '';
    display: block;
    background-image: linear-gradient(to right, #ff3019 0%, #e2b04a 50%, #ff3019 100%);
  }
  &[aria-busy='true']::before {
    background-size: 50% auto;
    animation: ${loading} 0.5s linear infinite;
  }
}
```


### 18 - Uploading Images

__Cloudinary__
  + https://cloudinary.com/
  

__frontend/components/CreateItem.js__

```js
uploadFile = async e => {
  console.log("uploading file...");
  const files = e.target.files;
  const data = new FormData();
  data.append("file", files[0]);
  data.append("upload_preset", "sickfits");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/drh2gik6v/image/upload",
    {
      method: "POST",
      body: data
    }
  );
  const file = await res.json();
  console.log(file);
  this.setState({
    image: file.secure_url,
    largeImage: file.eager[0].secure_url
  });
};
```

+ __FormData__ object get file from input box appended to it

```js
<label htmlFor="file">
  Image
  <input
    type="file"
    id="file"
    name="file"
    placeholder="Upload an image"
    required
    onChange={this.uploadFile}
  />
  {this.state.image && (
    <img
      width="200"
      src={this.state.image}
      alt="Upload Preview"
    />
  )}
</label>
```

### 19 - Updating Items with Queries and Mutations

__Step 1: Add to the schema__

__/backend/src/schema.graphql__

```graphql
type Mutation {
  ...
  updateItem(id: ID!, title: String, description: String, price: Int): Item!
}
```

```graphql
type Query {
  ...
  item(where: ItemWhereUniqueInput!): Item
}
```

+ `where: ItemWhereUniqueInput!): Item` is copied from the generated __prisma.graphql__ file
  + This must be the CRUD abilities mentioned back in [Items Creation and Prisma Yoga Flow](#14---items-creation-and-prisma-yoga-flow)
  + Bos says he likes to keep close to those generated types whenever possible


__Step 2: Write the resolvers__

__/backend/src/resolvers/Query.js__

```js
const { forwardTo } = require("prisma-binding");

const Query = {
  ...
  item: forwardTo("db")
```

+ No custom logic so can just forward


__/backend/src/resolvers/Mutation.js__

```graphql
updateItem(parent, args, ctx, info) {
  // first take a copy of the updates
  const updates = { ...args };
  // remove the ID from the updates
  delete updates.id;
  // run the update method
  return ctx.db.mutation.updateItem(
    {
      data: updates,
      where: {
        id: args.id
      }
    },
    info
  );
}
```

+ `ctx.db.mutation.updateItem` 
  + `ctx` is context in the request 
  + `db` is how we expose the Prisma database
  + then we have access to our entire generated API from __prisma.graphql__

+ Second argument `info` is what data we want the mutation to return


__frontend/pages/_app.js__

```js
static async getInitialProps({ Component, ctx }) {
  
  ...
  
  // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps }
}
```

+ Because we pass the `query` in as above...

__frontend/pages/update.js__

```js
const Update = ({ query }) => (
  <div>
    <UpdateItem id={query.id} />
  </div>
);
```

+ ... our page components have access to our query
  + (although I don't know exactly what query, maybe query params from the URL?)


__/frontend/components/UpdateItem.js__

```js
render() {
  return (
    <Query
      query={SINGLE_ITEM_QUERY}
      variables={{
        id: this.props.id
      }}
    >
      {({ data, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (!data.item) return <p>No Item Found for ID {this.props.id}</p>;
        return (
          <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
            {(updateItem, { loading, error }) => (
              <Form onSubmit={e => this.updateItem(e, updateItem)}>
                <Error error={error} />
                <fieldset disabled={loading} aria-busy={loading}>
                  <label htmlFor="title">
                    Title
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Title"
                      required
                      defaultValue={data.item.title}
                      onChange={this.handleChange}
                    />
                  </label>
```

+ Query `SINGLE_ITEM_QUERY` populates the form fields' `defaultValue`
  + This combo of `defaultValue` and the `handleChange` function only populates state with whatever has changed
  + That's why we pass `variables={this.state}`into the `UPDATE_ITEM_MUTATION`

+ The form's __onSubmit__ function is a nice model of passing the __updateItem__ mutation method out onto a class method


```js
class UpdateItem extends Component {
  state = {};

  ...

  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });
  };
```

### 20 - Deleting Items

__Step 1: Add to the schema__

__/backend/src/schema.graphql__

```graphql
type Mutation {
  ...
  deleteItem(id: ID!): Item!
}
```

__Step 2: Write the resolver__

__/backend/src/resolvers/Mutation.js__

```js
async deleteItem(parent, args, ctx, info) {
  const where = { id: args.id };
  // 1. find the item
  const item = await ctx.db.query.item({ where }, `{ id title}`);
  // 2. Check if they own that item, or have the permissions
  // TODO
  // 3. Delete it!
  return ctx.db.mutation.deleteItem({ where }, info);
}
```

+ Interesting that the mutation resolver queries for the item `id` passed in
  + Second argument `{ id title}` is just graphql being sent in to specify what to return

__frontend/components/DeleteItem.js__

```js
const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;
```

```js
class DeleteItem extends Component {

  ...

  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteItem, { error }) => (
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this item?")) {
                deleteItem();
              }
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}
```

+ `variables={{ id: this.props.id }}` is being passed in via `Item` component
+ Never seen a __confirm prompt__ like this: `if (confirm("?")) { deleteItem();}`
+ __update__ method on mutation allows us to update the cache to reflect mutation changes

```js
class DeleteItem extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    // 2. Filter the deleted item out of the page
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    // 3. Put the items back!
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  ...

```

+ A mutation update recieves current `(cache, payload)`
  + Then manually reading the cache, manipulating the results, and writing the desired change back to the database


### 21 - Displaying Single Items

__frontend/components/Page.js__

```js
const theme = {
  red: "#FF0000",
  
  ...

  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)"
};
```

+ Theme values declared

__frontend/components/SingleItem.js__

```js
const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;
```

+ `box-shadow` accessing theme via _prop_ injected into component 
+ __object-fit__ handy for retaining proportions

```js
import Head from "next/head";

class SingleItem extends Component {
  
...

<Head>
  <title>Sick Fits | {item.title}</title>
</Head>
```

+ __Head__ component provides conenient way to update meta data in the head tag via _Next_

```js
if (!data.item) return <p>No Item Found for {this.props.id}</p>;
```

+ Could implement logic on backend to send an error
  + This is common way of dealing with that on the frontend

### 21 - Pagination

```graphql
query stupid {
  itemsConnection(where: {
    title_contains: "graph"
  }){
    aggregate{
      count
    }
  }
}
```

+ Sample GraphQL playground query to test new query
  + Query __itemsConnection__ came from generated _prisma.graphql_ file 
  + Added to _schema.graphql_ and query resolver

__/frontend/pages/index.js__

```js
import Items from "../components/Items";

const Home = props => (
  <div>
    <Items page={parseFloat(props.query.page) || 1} />
  </div>
);

export default Home;
```

+ __Query param__ is accessible via props on the root index file 


__frontend/components/Pagination.js__

```js
const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

...

const count = data.itemsConnection.aggregate.count;
```

+ Query provides count of all items via __aggregate__

```js
return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits! — Page {page} of {pages}
        </title>
      </Head>
      <Link
        prefetch
        href={{
          pathname: "items",
          query: { page: page - 1 }
        }}
      >
        <a className="prev" aria-disabled={page <= 1}>
          ← Prev
        </a>
      </Link>
```

+ __prefetch__ on the __Link__ will pull in the previous and next page so the data is available instantly in production
+ __query__ attribute being passed into the href on Next __Link__
+ __aria-disabled__ prop on the anchor tag

### 21 - Pagination and Cache Invalidation

__backend/schema.graphql__

```graphql
type Query {
  items(where: ItemWhereInput, orderBy: ItemOrderByInput, skip: Int, first: Int): [Item]!
  ...
}
```

+ Added __orderBy__, __skip__. and __first__ to schema

__frontend/components/Items.js__

```js
const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      ...
    }
  }
`;
```

+ Typing plus default value:  `$first: Int = ${perPage})`

__UPDATE NOTE:__
 
 + When an item is deleted or added, it creates a cache that's out of date with the desired set of items on a page
   + BUT, there's currently no way to add __partial cache invalidation in Apollo__
   + You can __refetch__, but then what values do you pass into `first` and `skip`? 
   + Bos says he'll update the video once this feature is implemented:
     + https://github.com/apollographql/apollo-feature-requests/issues/4


### 22 User Sign Up and Permission Flow

__backend/datamodel.graphql__

```graphql
enum Permission {
  ADMIN
  USER
  ITEMCREATE
  ITEMUPDATE
  ITEMDELETE
  PERMISSIONUPDATE
}

type User {
  id: ID! @unique
  name: String!
  email: String! @unique
  password: String!
  resetToken: String
  resetTokenExpiry: Float
  permissions: [Permission]
}
```

+ Added `@unique` __decorator__ to email to prevent multiple accounts with a single email
+ `resetToken`, `resetTokenExpiry`, `permissions` are all new fields on the user type
+ Because we've updated the data model, we need to __deploy__ the changes to Prisma

```graphql
# import * from './generated/prisma.graphql'

type Mutation {
  ...
  signup(email: String!, password: String!, name: String!): User! 
}}
```

+ New mutation types the return as `User`, which we're importing from _generated/prisma.graphql_ 
 + And that was generated in response to deploying after changing the datamodel


__backend/src/index.js__

```js
const cookieParser = require('cookie-parser');

...

server.express.use(cookieParser());
```

+ This index file runs in an Express context
+ Using cookies allows us to server render the pages for the authenticated user 
  + We'll send a JWT: JSON web token
+ Another way this could be done is through local storage rather than cookies
  + But that prevents limitations regarding server-side rendering

__backend/src/resolvers/Mutation.js__

```js
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

...

 async signup(parent, args, ctx, info) {
    // lowercase their email
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
    // create the user in the database
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] }
        }
      },
      info
    );
    // create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // We set the jwt as a cookie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
    // Finalllllly we return the user to the browser
    return user;
  }
  ```
  + Add __resolver__ for new mutation 
  + `permissions: { set: ["USER"] }` syntax because need to _set_ the value of the enum

### 25 User Sign Up in React

__frontend/pages/signup.js__

```js
  const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const SignupPage = props => (
  <Columns>
    <Signup />
    <Signup />
    <Signup />
  </Columns>
);
```

+ `grid-template-columns` value allows three columns because the layout has a max-width of 1000px
  + __repeat(auto-fit, ...)__

__frontend/components/Signup.js__

```js
class Signup extends Component {
  state = {
    name: "",
    password: "",
    email: ""
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await signup();
              this.setState({ name: "", email: "", password: "" });
            }}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign Up for An Account</h2>
              <Error error={error} />
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>
```
+ __saveToState__ using `[e.target.name]` to pull off the _input_ `name` attribute and match state field

+ Good practice to include __method="post"__ 
  + If JS fails, this will default to _get_ and the password will be in the url (history, server log)

```js
<fieldset disabled={loading} aria-busy={loading}>
```
 + Nice use of __loading__ to disable form/fieldset

### 26 Currently Logged In User with Middleware and Render Props

Middleware allows us to step in between a request or before a request and do a little bit of extra work

__backend/src/index.js__
```js
// decode the JWT so we can get the user Id on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put userId onto the request for future requests to access
    req.userId = userId;
  }
  next();
});
```

```js
const { token } = req.cookies;
```
+ Can send this JWT/token along with the request
  + This identifies the user, and could be done client-side via local storage
  + But the benefit of using the cookie is it allows server-side rendering to get user-specific content

_Where does the cookie on the response come from?_

__backend/src/resolvers/Mutation.js__

```js
async signup(parent, args, ctx, info) {
  
  ...

    // create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // We set the jwt as a cookie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
```

+ We attached the cookie on the response in the `signup` mutation
  + _But does this mean it would be on our future requests???_ 

__backend/src/schema.graphql__

```graphql
type Query {
  ...
  me: User
}
```
+ Add query to schema

__backend/src/resolvers/Query.js__

```js
me(parent, args, ctx, info) {
    // check if there is a current user id
    if(!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user({
      where: { id: ctx.request.userId }
    }, info) 
  }
```
+ Add resolver for query
+ We want to return `null` in case the user is not logged in, rather than any error
 + Because users might not be logged in

```graphql
user(where: UserWhereUniqueInput!): User
```
+ `user` query is defined in the _prisma.graphql_ file, which is why we're using the `where` argument
 + `ctx.request.userId` is accessible since we put the userId on the requests in our middleware
+ `info` is the actual query from the client side
  + Things like cart items, permission, name, etc.

__/frontend/components/User.js__

```js
const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);
```

+ `User` component has a __render prop__ or __function as children__ pattern

__/frontend/components/Nav.js__
```js
const Nav = () => (
  <NavStyles>
    <User>
      {({ data: { me } }) => {
        console.log(me);
        if (me) return <p>{me.name}</p>;
        return null;
      }}
    </User>
```
+ `{ data: { me } }` double layer destructuring of `props.payload.data.me`

### 27 Sign in Form and Custom Error Handling 

__backend/src/schema.graphql__

```js
type Mutation {
  ...
  signin(email: String!, password: String!): User!
}
```
+ New sign in mutation added to _schema_

__backend/src/resolvers/Mutation.js__
```js
async signin(parent, { email, password }, ctx, info) {
  // 1. Check if there is a user with that password
  const user = await ctx.db.query.user({ where: { email } });

  if (!user) {
    throw new Error(`No user found for email ${email}`);
  }

  // 2. Check if their password is correct
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Invalid password!");
  }

  // 3. generate the JWT Token
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  // 4. Set the cookie with the token
  ctx.response.cookie("token", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 365
  });

  // 5. Return the user
  return user;
}
```
+ New sign in _resolver_
+ Really not so complicated

```js
async signin(parent, { email, password }, ctx, info) {
```
+ Destructuring `email, password` from `args` right in __the signature of the function__

__frontend/components/Signin.js__
```js
<Mutation
    mutation={SIGNUP_MUTATION}
    variables={this.state}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
```
+ Because this is a React app, we're not reloading the page on changes
  + ...so need to tell Apollo to __refetch__ the `CURRENT_USER_QUERY` query to update the Apollo cache and any related UI (like the nav)


__frontend/components/Nav.js__

```js
const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles>
        <Link href="/items">
          <a>Shop</a>
        </Link>
        {me && (
          <>
            <Link href="/sell">
              <a>Sell</a>
            </Link>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
            <Link href="/me">
              <a>Account</a>
            </Link>
          </>
        )}
        {!me && (
          <Link href="/signup">
            <a>Sign In</a>
          </Link>
        )}
      </NavStyles>
    )}
  </User>
);
```
+ `Nav` using render prop in `User` to conditionally render nav elements

### 28 Sign Out Button

__backend/src/resolvers/Mutation.js__

```js
async signout(parent, args, ctx, info) {
  ctx.response.clearCookie("token");
  return { message: "Successfully logged out" };
}
```

+ Message isn't being used, but we specified `SuccessMessage` as a custom type in our schema
+ Can use `clearCookie` because we've got `cookieParser` on our Express server:

__backend/src/index.js__
```js
server.express.use(cookieParser());
```

__frontend/components/Signout.js__

```js
const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = props => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {signout => <button onClick={signout}>Sign Out</button>}
  </Mutation>
);
```
+ I thought this would need to use routing, as all the other nav elements are links
 + But since __links and buttons share styles in the nav__, it's easy to drop in the semantic button
 + Also, my initial thinking was that a route would trigger logic (like a mutation on CdM I suppose), but there's no real need for a new route as the app state and UI updates can all be affected without changing routes

+ __App design__ showing itself in how we're able to only run `refetchQueries` on a single meaningful query
  + In contrast to a scenario where you need to refetch loads of queries to update many UI components that reflect changes in app state (ie: logged in / logged out)

### 29 Backend Password Reset Flow

__backend/src/generated/prisma.graphql__

```graphql
type User implements Node {
  id: ID!
  name: String!
  email: String!
  password: String!
  resetToken: String
  resetTokenExpiry: Float
  permissions: [Permission!]!
}
```

+ We take this user type from the prisma schema...

__backend/src/schema.graphql__

```graphql
type User implements Node {
  id: ID!
  name: String!
  email: String!
  permissions: [Permission!]!
}
```

+ ...and adapt it for our frontend facing Yoga server schema
 +  Removing the `resetToken` and other things that should be backend only
+ __Really important__ to adapt this _type_ because it would be a security risk otherwise

```js
const { randomBytes } = require("crypto");
```
+ Built into Node, allows solid cryptographic hashing of reset token

```js
const { promisify } = require("util");
```
+ Also built into Node, converts callback-based functions into _promise_ syntax

__backend/src/resolvers/Mutation.js__

```js
async requestReset(parent, { email }, ctx, info) {
  // 1. Check if they're a real user
  const user = await ctx.db.query.user({ where: { email } });

  if (!user) {
    throw new Error(`No user found for email ${email}`);
  }

  // 2. Set a reset token and expiry on that user
  const randomBytesPromise = promisify(randomBytes);
  const resetToken = (await randomBytesPromise(20)).toString("hex");
  const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
  const res = await ctx.db.mutation.updateUser({
    where: { email },
    data: { resetToken, resetTokenExpiry }
  });
  return { message: "Thanks!" };
}
```
+ `randomBytesPromise` will return a _buffer_, which we're converting to string (via hex?)
+ All we're really doing with `requestReset` at this point is adding the `resetToken` and `resetTokenExpiry` fields

__backend/src/resolvers/Mutation.js__

```js
async resetPassword( parent,{ resetToken, password, confirmPassword }, ctx, info) {
    ...
    // 2. check if it's a legit reset token
    // 3. check if it's expired
    const [user] = ctx.db.users({
      where: { resetToken, resetTokenExpiry_gte: Date.now() - 3600000 }
    });
```

+ In the mutation, we need to get the user, but the singular `user` query has a limited type accepted by its `where:` parameter
  + We don't have either the `id` or `email`
  + But we can use the `users` query,which has a `where` parameter that accepts almost everything, then use just the first/only response
  + Here `resetTokenExpiry_gte` = _greater than or equal to_

__backend/src/generated/prisma.graphql__

```graphql
type Query {
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  ...
  user(where: UserWhereUniqueInput!): User
  ...
}

input UserWhereInput {
  ... literally 300 lines, and where resetTokenExpiry_gte comes from...
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
```
### 30 Frontend Password Reset Flow

__frontend/components/RequestReset.js__

```js
return (
  <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
    {(reset, { error, loading, called }) => (
      <Form
        method="post"
        onSubmit={async e => {
          e.preventDefault();
          await reset();
          this.setState({ email: "" });
        }}
      >
        <fieldset disabled={loading} aria-busy={loading}>
          <h2>Request a password reset</h2>
          <Error error={error} />
          {!error && !loading && called && (
            <p>Success! Check your email for a reset link!</p>
          )}
```

+ `called` attribute can be used within mutation 
  + Here it's affirming that the user's request was received
+ This form just takes an email and then updates the user in the database to have a reset token and expiry time on their account


__frontend/pages/reset.js__
```js
import Reset from "../components/Reset";

const PasswordReset = props => (
  <div>
    <p>Reset Your Password {props.query.resetToken}</p>
    <Reset resetToken={props.query.resetToken} />
  </div>
);

export default PasswordReset;
```

+ Adding this page to the `/pages` directory generates the route 
+ We're currently pulling the reset token off the __url query parameter__


__frontend/components/Reset.js__

```js
const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
      name
    }
  }
`;

class Reset extends Component {
  static propTypes = {
    resetToken: PropTypes.string.isRequired
  };
  state = {
    password: "",
    confirmPassword: ""
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation
        mutation={RESET_MUTATION}
        variables={{
          resetToken: this.props.resetToken,
          password: this.state.password,
          confirmPassword: this.state.confirmPassword
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(reset, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await reset();
              this.setState({ password: "", confirmPassword: "" });
            }}
          >
```

+ The `Reset` component sends the required variables to the reset mutation 
+ And it __refetches__ the current user


```js
ctx.response.cookie("token", token, {
```
+ Pretty sure line from the `resetPassword` mutation adds a cookie with an updated JWT 

### 31 Sending Email

+ __Mailtrap__ is a fake SMTP server
+ Would need to swap credentials to something like `Postmark` to send real emails

__backend/src/mail.js__

```js
const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  ...
});

const makeANiceEmail = text => `
  <div className="email" style="
  ...
`;

exports.transport = transport;
exports.makeANiceEmail = makeANiceEmail;
```
+ __nodemailer__ api
+ Nice model of CommonJS `exports`, which are then `require` -ed in...

__backend/src/resolvers/Mutation.js__

```js
const { transport, makeANiceEmail } = require("../mail");
...
// 3. Email them that reset token
    const mailRes = await transport.sendMail({
      from: "winner@bestwin.yas",
      to: user.email,
      subject: "Your Password Reset Token",
      html: makeANiceEmail(`Your Password Reset Token is here!
      \n\n
      <a href="${
        process.env.FRONTEND_URL
      }/reset?resetToken=${resetToken}">Click Here to Reset</a>`)
    });
```

+ ... and used in the `requestReset` mutation
+ `process.env.FRONTEND_URL` allows localhost to be used during development and then swapped out for the real hosted URL later
+ This is how the `resetToken` gets to the frontend, via an href

### 32 Data Relationships

__backend/datamodel.graphql__

```graphql
type Item {
  id: ID! @unique
  title: String!
  ...
  user: User!
} 
```
+ We add a required `user` field to an `Item` in our data model and then deploy those changes 

```js
const Mutations = {
  async createItem(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to create an item");
    }

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          // Creates a relationship between an Item and a User
          user: {
            connect: { id: ctx.request.userId }
          },
          ...args
        }
      },
      info
    );
    return item;
  },
```
+ In our mutation the `connect` key creates the relationship 

### 33 Creating a Gated Sign In Component

```js
import { CURRENT_USER_QUERY } from "./User";
import Signin from "./Signin";

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>;
      if (!data.me) {
        return (
          <div>
            <p>Please Sign In before Continuing</p>
            <Signin />
          </div>
        );
      }
      return props.children;
    }}
  </Query>
);
```
+ Simple component allows us to check for signed in user on pages that should only be accessible to logged in users

```js
const Sell = props => (
  <div>
    <PleaseSignIn>
      <CreateItem />
    </PleaseSignIn>
  </div>
);
```
+ Used on the `Sell` page like so

### 34 Permissions Management

__backend/src/schema.graphql__

```graphql
type Query {
  ...
  users: [User]!
  }
```
+ Add `users` query to schema that must return an array, which can be empty but otherwise has `User` types

__backend/src/index.js__

```js
// add middleware to attach the user on each request if logged in
server.express.use(async (req, res, next) => {
  // If not logged in, just skip
  if (!req.userId) return next();

  const user = await db.query.user(
    { where: { id: req.userId } },
    `{id, permissions, email, name}`
  );

  req.user = user;
  next();
});
```
+ Need to have the `user` on each request for the query below
+ _Does this add a query to every request?_
  + _Would Apollo reference the cache to avoid a network request?_

__backend/src/resolvers/Query.js__

```js
async users(parent, args, ctx, info) {
  // 1. Check if logged in
  if (!ctx.request.userId) {
    throw new Error("Please log in");
  }

  // 2. Check if user has permissions to query all users
  hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);

  // 3. if they do, query all the users!
  return ctx.db.query.users({}, info);
}
```
+ `hasPermission` is simple util that takes a user and a set of required permissions and checks if they exists on the user
+ `ctx.db.query.users({}, info)` the `info` here contains the GraphQL query with the fields we're requesting

__frontend/components/Permissions.js__

```js
const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;
```
+ This video makes a mock table driven by data in our new `users` query

### 35 Updating Permissions in Local State

__frontend/components/Permissions.js__
```js
  state = {
    permissions: this.props.user.permissions,
  };
```
+ Normally this is a red flag to mirror props in state
  + But here it's fine because we're __seeding__ the state, which would then be updated in the component and saved to the backend/server via a mutation

```js
handlePermissionChange = e => {
  const checkbox = e.target;
  let updatedPermissions = [...this.state.permissions];

  if (checkbox.checked) {
    updatedPermissions.push(checkbox.value);
  } else {
    updatedPermissions = updatedPermissions.filter(
      permission => permission !== checkbox.value
    );
  }
  this.setState({ permissions: updatedPermissions });
  console.log(updatedPermissions);
};
```

```js
<td key={permission}>
  <label htmlFor={`${user.id}-permission-${permission}`}>
    <input
      type="checkbox"
      checked={this.state.permissions.includes(permission)}
      value={permission}
      onChange={this.handlePermissionChange}
    />
  </label>
</td>
```
+ `value` attribute on input accessed as `e.target.value` in change handler

### 36 Updating Permissions on the Server

__/backend/src/schema.graphql__

```graphql
type Mutation {
  ...
  updatePermissions(permissions:[Permission], userId: ID!): User
}
```

__backend/src/resolvers/Mutations.js__

```js
async updatePermissions(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to update permissions");
    }

    // 2. Query the current user
    const currentUser = ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId
        }
      },
      info
    );

    // 3. Check if they have permissions to do this
    hasPermission(currentUser, ["ADMIN", "PERMISSIONUPDATE"]);

    // 4. Update the permissions
    return ctx.db.mutation.updateUser(
      {
        data: {
          permissions: {
            set: args.permissions
          }
        },
        where: {
          id: args.userId
        }
      },
      info
    );
  }
```

+ `args` comes from `variables` on frontend
+  `id: args.userId` because might be updating another user, not signed in user as in `id: ctx.request.userId`

__/frontend/components/Permissions.js__

```js
const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;
```

```js
 render() {
    const user = this.props.user;
    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{
          permissions: this.state.permissions,
          userId: this.props.user.id
        }}
      >
        {(updatePermissions, { loading, error }) => (
          <>
            {error && (
              <tr>
                <td colspan="8">
                  <Error error={error} />
                </td>
              </tr>
            )}
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {possiblePermissions.map(permission => (
                <td key={permission}>
                  <label htmlFor={`${user.id}-permission-${permission}`}>
                    <input
                      id={`${user.id}-permission-${permission}`}
                      type="checkbox"
                      checked={this.state.permissions.includes(permission)}
                      value={permission}
                      onChange={this.handlePermissionChange}
                    />
                  </label>
                </td>
              ))}
              <td>
                <SickButton
                  type="button"
                  disabled={loading}
                  onClick={updatePermissions}
                >
                  Updat{loading ? "ing" : "e"}
                </SickButton>
              </td>
            </tr>
          </>
        )}
      </Mutation>
    );
  }
}
```

### 37 Locking Down DeleteItem Permissions

__frontend/components/DeleteItem.js__

```js
<button
  onClick={() => {
    if (confirm("Are you sure you want to delete this item?")) {
      deleteItem().catch(err => {
        alert(err.message)
      });
    }
  }}
>
```

+ Can `catch()` errors off a _promise_
  + Here `deleteItem` is the mutation function, which returns a promise


```js
async deleteItem(parent, args, ctx, info) {
  const where = { id: args.id };
  // 1. find the item
  const item = await ctx.db.query.item({ where }, `{ id title user { id }}`);

  // 2. Check if they own that item, or have the permissions
  const ownsItem = item.user.id === ctx.request.userId;
  const hasPermissions = ctx.request.user.permissions.some(permission =>
    ["ADMIN", "ITEMDELETE"].includes(permission)
  );

  if (!ownsItem && !hasPermissions) {
    throw new Error("You don't have permission to do that!");
  }
  
  ...
},
```
+ Had to add this field, `user { id }`, to the `item` query to access the `item.user.id` 

### 39 Apollo Local State and Mutations

+ Very different topic now, videos 38 + 39 focus on __local state__
  +  As in React state that would otherwise be distributed by _React context_ or Redux or the like
  +  No server calls, just client-side data moving
  + _PRESENT TTW_

__frontend/lib/withData.js__

```js
import withApollo from "next-with-apollo";
import ApolloClient from "apollo-boost";
...
import { LOCAL_STATE_QUERY } from "../components/Cart";

function createClient({ headers }) {
  return new ApolloClient({
    ...
    // local data
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            // read the cartOpen value from the cache
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY
            });
            // Write the cart State to the opposite
            const data = {
              data: { cartOpen: !cartOpen }
            };
            cache.writeData(data);
            return data;
          }
        }
      },
      defaults: {
        cartOpen: false
      }
    }
  });
}

export default withApollo(createClient);
```

+ __clientState__ comes from `apollo-link-state` via __Apollo Boost__
  + We're basically accessing `cache` off the client, reading from it and then writing the new value back to it
  + https://www.apollographql.com/docs/react/essentials/local-state.html

> apollo-link-state, our solution for managing local data in Apollo Client. apollo-link-state allows you to store your local data inside the Apollo cache alongside your remote data

__frontend/components/Cart.js__

```js
const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

...

export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
```
+ `@client` directive tells Apollo Client’s network stack to fetch the query from the cache instead of sending it to our GraphQL server."
+ `export` the query and mutation so they're easy to use elsewhere
  + Like in the nav where the other toggle is invoked

```js
const Cart = () => (
  <Mutation mutation={TOGGLE_CART_MUTATION}>
    {toggleCart => (
      <Query query={LOCAL_STATE_QUERY}>
        {({ data }) => (
```
+ Think this gets revised soon, but for now accessing local state management requires nesting the `mutation` and `query`

```js
<CloseButton onClick={toggleCart} title="close">
  &times;
</CloseButton>
```
+ `toggleCart` is used in a pretty straightforward way in the UI

```js
<CartStyles open={data.cartOpen}>
```

__frontend/components/styles/CartStyles.js__

```js
import styled from 'styled-components';

const CartStyles = styled.div`
  ...
  ${props => props.open && `transform: translateX(0);`};
```
+ Side note on __Styled Components__ accepting props and dynamically setting styles

### 40 Server Side Add To Cart

__backend/datamodel.graphql__
```graphql
type User {
  ...
  cart: [CartItem!]!
}

type CartItem {
  id: ID! @unique
  quantity: Int! @default(value: 1)
  item: Item! #relationship to an item
  user: User! #relationship to a user
}
```
+ Changed datamodel, so we need to redeploy

__backend/src/schema.graphql__

```graphql
type User {
  ...
  cart: [CartItem!]!
}
```
+ Add to schema because we want it to be available both server side and client side
+ Changed schema, so we need to write a resolver

__backend/src/resolvers/Mutation.js__

```js
// 2. Query the user's current cart
const [existingCartItem] = await ctx.db.query.cartItems({
  where: {
    user: { id: userId },
    item: { id: args.id }
  }
});
```
+ `cartItems` was generated by Prisma when we deployed changes to the data model
 + It allows for more flexible query parameters/arguments to find items
 + Weird to me that we only added `cartItem` to data model but Prisma infers and exposes a plural query

__backend/src/generated/prisma.graphql__

```graphql
type Query {
  ...
  cartItems(where: CartItemWhereInput, orderBy: CartItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [CartItem]!
  cartItem(where: CartItemWhereUniqueInput!): CartItem
}

input CartItemWhereInput {
  """Logical AND on all given filters."""
  AND: [CartItemWhereInput!]

  """Logical OR on all given filters."""
  OR: [CartItemWhereInput!]
  ...
  # LOADS MORE OPTIONS FOR WHERE QUERY PARAMS
}

input CartItemWhereUniqueInput {
  id: ID
}
```

__backend/src/resolvers/Mutation.js__
```js
 // 3. Check if item is already in cart and increment by 1
if (existingCartItem) {
  return ctx.db.mutation.updateCartItem(
    {
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + 1 }
    },
    info
  );
}
```
+ The quantity field is specified on the `CartItem` type, which is returned from the `cartItems` query

__backend/src/generated/prisma.graphql__
```graphql
input CartItemUpdateInput {
  quantity: Int
  item: ItemUpdateOneRequiredInput
  user: UserUpdateOneRequiredWithoutCartInput
}
```
+ These fields are from the CartItem that we specified in video 40
+ `item` and `user` make sense because we've set up a relationship to those types when defining the type in our own data model
+ `quantity` is on there because we also included that field at definition

__backend/src/resolvers/Mutation.js__
```js
// 4. If not create a new cartItem for the user
return ctx.db.mutation.createCartItem(
  {
    data: {
      user: {
        connect: { id: userId }
      },
      item: {
        connect: { id: args.id }
      }
    }
  },
  info
);
```
+ `connect` is how we communicate the relationship between the data objects in Prisma
+ The user in the database will now have a `cart` field

### 41 Displaying Cart Items and Totals

```js
const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      cart {
        id
        quantity
        item {
          id
          price
          image
          title
          description
        }
      }
    }
  }
`;

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired
};

export default User;
export { CURRENT_USER_QUERY };
```
+ Adding `cart` fields that are passed through to components wrapped in a `User` component

```js
import { CURRENT_USER_QUERY } from "./User";

...

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

class AddToCart extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={ADD_TO_CART_MUTATION}
        variables={{
          id
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(addToCart, { loading }) => (
          <button disabled={loading} onClick={addToCart}>
            Add{loading && "ing"} To Cart 🛒
          </button>
        )}
      </Mutation>
    );
  }
}
```
+ `refetchQueries` is effective here because we've added the cart fields to the `CURRENT_USER_QUERY`
 + composition of the queries allows that _user_ query to take care of the updates which need refetching

### 42 Removing Cart Items

__src/resolvers/Mutation.js__ 

```js
async removeFromCart(parent, args, ctx, info) {
  // 1. Find the cart item
  const cartItem = await ctx.db.query.cartItem(
    {
      where: {
        id: args.id
      }
    },
    `{ id, user { id }}`
  );
```
+ We want to get the `user { id }` off the `CartItem` type returned by `query.cartItem`
 + Why do we have to query for it in the second parameter?
 + Are we just specifying the shape of the returned data we want?

```js
// 2. Make sure they own that cart item
if (cartItem.user.id !== ctx.request.userId) {
  throw new Error("Cheatin huhhhh");
}
```
+ Query in first code snippet allows us to make this comparison in the if statement

### 43 Optimistic Response && Cache Updates with Apollo

+ Could refetch `CURRENT_USER_QUERY`, but that has a bit too much lag 
  + Choosing instead to update cache manually

__frontend/components/RemoveFromCart.js__
```js
// This gets called as soon as we get a response back from the server after a mutation has been performed
update = (cache, payload) => {
  // 1. first read the cache
  const data = cache.readQuery({ query: CURRENT_USER_QUERY });
  // 2. remove that item from the cart
  const cartItemId = payload.data.removeFromCart.id;
  data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
  // 3. write it back to the cache
  cache.writeQuery({ query: CURRENT_USER_QUERY, data });
};

render() {
  return (
    <Mutation
      mutation={REMOVE_FROM_CART_MUTATION}
      variables={{ id: this.props.id }}
      update={this.update}
    >
```
+ `payload` is coming from the mutation, which gives us the removed item id
 + The `data` value is coming from the cache, as queried by an imported query
 + We're combining the two sources to manually update the cache
 + We've done this before in the `DeleteItem` component

 ```js
<Mutation
  mutation={REMOVE_FROM_CART_MUTATION}
  variables={{ id: this.props.id }}
  update={this.update}
  optimisticResponse={{
    __typename: "Mutation",
    removeFromCart: {
      __typename: "CartItem",
      id: this.props.id
    }
  }}
>
```
+ `optimisticResponse` requires types on the client side
  + This allows for an immediate front end response, which the update to the cache will take slightly longer  
  + https://www.apollographql.com/docs/react/features/optimistic-ui.html#optimistic-advanced

> optimistic UI is a pattern that you can use to simulate the results of a mutation and update the UI even before receiving a response from the server. Once the response is received from the server, the optimistic result is thrown away and replaced with the actual result.

### 44 Animating our Cart Count Component

__frontend/components/CartCount.js__

```js
const Dot = styled.div`
  ...
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
`;
```
+ `font-feature-settings` always allot the same amount of space to a number, regardless of if it's fat or skinny (1 vs 2)
 + So div/background won't resize between numbers


```js
import { TransitionGroup, CSSTransition } from "react-transition-group";

...

const AnimationStyles = styled.span`
  position: relative;
  .count {
    display: block;
    position: relative;
    transition: all 0.4s;
    backface-visibility: hidden;
  }

  .count-enter {
    transform: scale(4) rotateX(0.5turn);
  }
  .count-enter-active {
    transform: rotateX(0);
  }
  .count-exit {
    top: 0;
    position: absolute;
    transform: rotateX(0);
  }
  .count-exit-active {
    transform: scale(4) rotateX(0.5turn);
  }
`;

...

const CartCount = ({ count }) => (
  <AnimationStyles>
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        className="count"
        classNames="count"
        key={count}
        timeout={{ enter: 400, exit: 400 }}
      >
        <Dot>{count}</Dot>
      </CSSTransition>
    </TransitionGroup>
  </AnimationStyles>
);
```

+ Allow us to transition out/in components (mount, transition in, remove transition classes, unmount outgoing element)
+ `classNames` auto generates things like `.count-enter-active`

### 46 Cleaning up this Render Prop Mess

__/frontend/components/Cart.js__
```js
import { adopt } from "react-adopt";

...

const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toggleCart: ({ render }) => (
    <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>
});

...

const Cart = () => (
  <Composed>
    {({ user, toggleCart, localState }) => {
      const me = user.data.me;
      if (!me) return null;
      return (
        <CartStyles open={localState.data.cartOpen}>
        ...

```
+ __react-adopt__ allows us to compose several layers of components with nested render props into one 
+ payload allows us to destructure the three render prop components into a single composed render prop component


__BEFORE REFACTOR:__
```js
const Cart = () => (
  <User>
    {({ data: { me } }) => {
      if (!me) return null;
      return (
        <Mutation mutation={TOGGLE_CART_MUTATION}>
          {toggleCart => (
            <Query query={LOCAL_STATE_QUERY}>
              {({ data }) => (
                <CartStyles open={data.cartOpen}>
                  <header>
                    ...
  </User>
);
```

### 47 Search Dropdown Autocomplete

__/frontend/components/Search.js__

```js
const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    item(
      where: {
        OR: [
          { title_contains: $searchTerm }
          { description_contains: $searchTerm }
        ]
      }
    ) {
      id
      image
      title
    }
  }
`;
```

__backend/src/schema.graphql__

```graphql
type Query {
  items(where: ItemWhereInput, orderBy: ItemOrderByInput, skip: Int, first: Int): [Item]!
```

+ `items` query as specified in our schema accepts `ItemWhereInput` type `where` parameter
 + This is generated by prisma and allows a set of query tools like `contains` on each field of the returned type (here an `Item`)

```js
import { ApolloConsumer } from "react-apollo";

...

class AutoComplete extends React.Component {
  state = {
    items: [],
    loading: false
  };
  onChange = debounce(async (e, client) => {
    // turn loading on
    this.setState({ loading: true });
    // Manually query apollo client
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: e.target.value }
    });
    this.setState({
      items: res.data.items,
      loading: false
    });
  }, 350);
  render() {
    return (
      <SearchStyles>
        <div>
          <ApolloConsumer>
            {client => (
              <input
                type="search"
                onChange={e => {
                  e.persist();
                  this.onChange(e, client);
                }}
              />
            )}
          </ApolloConsumer>
```

+ Importing __ApolloConsumer__ directly allows us to choose when to fire the query
  + As opposed to it happening on page load, as with the `Query` component
  + We then need to handle our own loading state
+ `debounce` pauses queries just long enough (350ms here) to avoid fast typing sending queries one after the other too quickly, which could DDoS your own site