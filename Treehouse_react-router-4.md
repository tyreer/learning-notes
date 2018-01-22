## React Router 4
https://teamtreehouse.com/library/react-router-4-basics-2

```JavaScript
  <Route path="/about" render = { () => <About title="Absolutely any title I want" /> } />
  ```
+ __Render prop__ used to pass in data via props
+ __Route__ is just a regular component

```JavaScript
<ul className="main-nav">
  <li><NavLink exact to="/">Home</NavLink></li>
  <li><NavLink to="/about">About</NavLink></li>
  <li><NavLink to="/teachers">Teachers</NavLink></li>
  <li><NavLink to="/courses">Courses</NavLink></li>
</ul>
```
 + __NavLink__ adds _active_ class to any link that matches the current URL
 + https://reacttraining.com/react-router/web/api/NavLink/activeStyle-object
 + https://reacttraining.com/react-router/web/api/NavLink/activeClassName-string


```JavaScript
import { Route, NavLink, Redirect } from 'react-router-dom';
...
<Route exact path="/courses" render = { () => <Redirect to="/courses/html" /> } />
<Route path="/courses/html" component={HTML} />
<Route path="/courses/css" component={CSS} />
<Route path="/courses/javascript" component={JavaScript} />
```
+ __Redirect__ in render prop allows for initial view of nested nav elements to load a default component, while maintaining expected router behaviour

```JavaScript
import { BrowserRouter, Route, Switch } from 'react-router-dom';
...
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" render = { () => <About title="About PROP" /> } />
  <Route path="/teachers" component={Teachers} />
  <Route path="/courses" component={Courses} />
  <Route component={NotFound} />
</Switch>
```
+ __Switch__ renders only the first component that matches the URL and allows us to display a 404 component if no paths match


```JavaScript
const Courses = ({match}) => (
  <div className="main-content courses">
    <div className="course-header group">
      <h2>Courses</h2>
      <ul className="course-nav">
        <li><NavLink to={`${match.url}/html`}>HTML</NavLink></li>
        <li><NavLink to={`${match.url}/css`}>CSS</NavLink></li>
        <li><NavLink to={`${match.url}/javascript`}>JavaScript</NavLink></li>
      </ul>
    </div>
      <Route exact path={`${match.path}/`} render = { () => <Redirect to={`${match.path}/html`} /> } />
      <Route path={`${match.path}/html`} component={HTML} />
      <Route path={`${match.path}/css`} component={CSS} />
      <Route path={`${match.path}/javascript`} component={JavaScript} />
  </div>
);
```
+ __match object__ allows us to dynamically set the root path
+ https://reacttraining.com/react-router/web/api/match
+ Relationship between _NavLink_ and the determinination of the _Route_ elements below

```JavaScript
import { HTMLCourses, CSSCourses, JSCourses } from '../data/courses';
...
<Route
  exact path={`${match.path}/`}
  render = { () => <Redirect to={`${match.path}/html`} /> }
/>
<Route
  path={`${match.path}/html`}
  render={ () => <CourseContainer data={HTMLCourses} /> }
/>
<Route
  path={`${match.path}/css`}
  render={ () => <CourseContainer data={CSSCourses} /> }
/>
<Route
  path={`${match.path}/javascript`}
  render={ () => <CourseContainer data={JSCourses} /> }
/>
```
+ Refactored into CourseContainer and pass specific course data into render props

```JavaScript
const CourseContainer = (props) => {
  let courses = props.data.map((course) => {
    return <Course title={course.title}
                   desc={course.description}
                   img={course.img_src}
                   key={course.id} />
  });
  return (
    <div>
      <ul>
        {courses}    
      </ul>
    </div>
  );
}
```
+ Pattern of mapping over an array to generate a new array of _li_ elements, then used as JSX variable

```JavaScript
  <Route path="/teachers/:topic/:fname-:lname" component={Featured} />
```
```JavaScript
const Featured = ({match}) => {
  let name = `${match.params.fname} ${match.params.lname}`;
  let topic = match.params.topic;
  return (
    <div className="main-content">
      <h2>{name}</h2>
      <p>Introducing <strong>{name}</strong>, a teacher who loves teaching courses about <strong>{topic}</strong>!</p>
    </div>
  );
```

+ https://reacttraining.com/react-router/web/example/url-params
