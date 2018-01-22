## Introduction to GraphQl
https://teamtreehouse.com/library/introduction-to-graphql

+ GraphQl allows us to nest complex data in a single request rather than having to hit multiple endpoints
+ __Declaration__ The keyword which starts every GraphQL query
+ __Endpoint__ A section of a GraphQL backend responsible for returning a specific piece of all the data available

+ https://building.buildkite.com/tutorial-getting-started-with-graphql-queries-and-mutations-11211dfe5d64
+ https://www.apollographql.com/
+ https://dev-blog.apollodata.com/graphql-vs-rest-5d425123e34b
+ https://launchpad.graphql.com/new

+ Final Launchpad: https://launchpad.graphql.com/5xqj0mpm9

```
query {
  allMovies {
    id
    title
    tagline
  }
}
```

```
query {
  topMovieByRevenue {
    title
    studio {
      name
    }
  }
}
```

```
query {
  allMovies {
    title
    tagline
    studio {
      name
    }
  }
}
```

```JavaScript
mutation {
  createMovie (
    tagline: "pizza is best"
    title: "BEST YUM"
  ) {
    id
    title
    tagline
  }
}
```

+ Mutation with scalar type

```
mutation($directorToAdd: DirectorInput!) {
  addDirectorToMovie (
    movieId: "movie_0",
    director: $directorToAdd
  ) {
    title
    tagline
    directors {
      id
      name
    }
  }
}
...
// Query variables
{
  "directorToAdd": {
    "name": "Rob"
  }
}
```
+ Mutation with input object type
