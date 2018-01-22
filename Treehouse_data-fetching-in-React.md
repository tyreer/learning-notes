## Data fetching in React
https://teamtreehouse.com/library/data-fetching-in-react

__Fetch__
```JavaScript
componentDidMount() {
  fetch('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
    .then(response => response.json())
    .then(responseData => {
      this.setState({ gifs: responseData.data })
    })
    .catch( error => {
      console.log('Error of type', error);
    });
}
```
+ Polyfill https://github.com/github/fetch

__Axios__
```JavaScript
componentDidMount() {
  axios.get('http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC')
    .then(response => {
      this.setState({
        gifs: response.data.data
      });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
}
```
+ Better browser support and a few other advantages
+ https://github.com/axios/axios/issues/314

```JavaScript
const GifList = props => {
  const results = props.gifData;
  const gifs = results.map(gif =>
    <Gif
      src={gif.images.fixed_height.url}
      key={gif.id} />
  )
  return(
    <ul className="gif-list">
      {gifs}
    </ul>
  );
}
export default GifList;
```

```JavaScript
const Gif = props => (
  <li className="gif-wrap">
    <img src={props.src} alt=""/>
  </li>
);
export default Gif;
```

+ __App__ is _container component_ dealing with API call and passing data down to presentational components
+ __GifList__ maps over the returned data and provides the __Gif__ list items with the data bits it needs
+ __key__ attribute is on the _Gif_ component, not on the _li_, which I thought was needed
+ The _GifList ul_ gets the JSX bracketed variable for gifs and renders that

```JavaScript
getSearch = (userQuery) => {
axios.get(`http://api.giphy.com/v1/gifs/search?q=${userQuery}&limit=24&api_key=dc6zaTOxFJmzC`)
  .then(response => {
    this.setState({
      gifs: response.data.data
    });
  })
  .catch(error => {
    console.log('Error fetching and parsing data', error);
  });
}
render() {
  return (
    <div>
      <div className="main-header">
        <div className="inner">
          <h1 className="main-title">GifSearch</h1>
          <SearchForm onSearch={this.getSearch} />
        </div>
      </div>
  ```
+ Search call defined in container component (_App_) and passed into __SearchForm__, where it's placed on the button to submit search
+ In Redux this would be a _bound action creator_
+ For an unknown reason, _fetch_ returned a CORS error, while Axios worked just fine...

```JavaScript
return(
  <ul className="gif-list">
    { (gifs.length > 1) && gifs }
    { (gifs.length < 1) && <NoGifs />}
  </ul>
);
```
+ __Handle no results__ inside GifList
+ My initial approach was to use an _Inline If with Logical && Operator_

```JavaScript
return(
  <ul className="gif-list">
    {gifs.length > 1 ? gifs : <NoGifs />}
  </ul>
);
```
+ But __Inline If-Else with Conditional Operator__ is so much better

```JavaScript
componentDidMount() {
  this.getSearch();
}
getSearch = (userQuery = 'cats') => {
axios.get(`URL`)
... }
```
+ __Provide default initial view__ via _componentDidMount_
+ __Provide default argument value__ _(userQuery = 'cats')_

```JavaScript
handleSubmit = e => {
  this.props.onSearch(this.query.value);
}
render() {
  return (
    <form className="search-form" onSubmit={this.handleSubmit} >
      <input type="search"
             onChange={this.onSearchChange}
             name="search"
             ref={(input) => this.query = input}
              />
 ```
 + __ref__ instead of local state
 + https://reactjs.org/docs/refs-and-the-dom.html

```JavaScript
this.state = {
 gifs: [],
 loading: true
}
...
axios.get(`URL`)
 .then(response => {
   this.setState({
     gifs: response.data.data,
     loading: false
   });
 })
...
<div className="main-content">
  {
    (this.state.loading)
     ? <p>Loading...</p>
     : <GifList data={this.state.gifs} />
  }          
</div>
```
 + Use a __loading flag__ + ternary for conditional render
