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