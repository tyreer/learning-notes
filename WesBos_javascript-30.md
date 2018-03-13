# JavaScript30
https://JavaScript30.com

### Incomplete Index

#### Array methods
+ filter()
  + [04 - Array Cardio Day 1](#04---array-cardio-day-1)
  + [06 - Type Ahead](#06---type-ahead)
  + [23 - Speech Synthesis](#23---speech-synthesis)


+ sort()
  + [04 - Array Cardio Day 1](#04---array-cardio-day-1)
  + [17 - Sort Without Articles](#17---sort-without-articles)


+ reduce()
  + [04 - Array Cardio Day 1](#04---array-cardio-day-1)
  + [18 - Adding Up Times with Reduce](#18---adding-up-times-with-reduce)


+ some()
+ every()
  + [07 - Array Cardio 💪💪 Day 2](#07---array-cardio--day-2)


+ find()
  + [07 - Array Cardio 💪💪 Day 2](#07---array-cardio--day-2)
  + [23 - Speech Synthesis](#23---speech-synthesis)


+ slice()
  + [07 - Array Cardio 💪💪 Day 2](#07---array-cardio--day-2)
  + [12 - Key Sequence Detection](#12---key-sequence-detection)

#### String methods
+ match()
  + [06 - Type Ahead](#06---type-ahead)


+ replace()
  + [06 - Type Ahead](#06---type-ahead)
  + [17 - Sort Without Articles](#17---sort-without-articles)


+ includes()
  + [12 - Key Sequence Detection](#12---key-sequence-detection)
  + [20 - Speech Detection](#20---speech-detection)


+ split()
  + [18 - Adding Up Times with Reduce](#18---adding-up-times-with-reduce)

#### Event listener types
+ transitionend
  + [01 - JavaScript Drum Kit](#01---javascript-drum-kit)


+ canplay
  + [19 - Webcam Fun](#19---webcam-fun)

+ end
  + [20 - Speech Detection](#20---speech-detection)

#### Other
+ Date()
  + [02 - JS and CSS Clock](#02---js-and-css-clock)


+ Data attribute use cases
  + [03 - CSS Variables](#03---css-variables)
  + [11 - Custom Video Player](#11---custom-video-player)


+ JS to set style attributes
  + [03 - CSS Variables](#03---css-variables)


+ toggle()
  + [05 - Flex Panel Gallery](#05---flex-panel-gallery)


+ regex
  + [06 - Type Ahead](#06---type-ahead)
  + [17 - Sort Without Articles](#17---sort-without-articles)


+ passing parameter into a callback
  + [23 - Speech Synthesis](#23---speech-synthesis)


### 01 - JavaScript Drum Kit
```JavaScript
function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) return;

  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
```

_addEventListener.(’__transitionend__’, removeTransition)_
+ On all divs with .key classes, listen for the _transition end_ and do a callback.

```JavaScript
e.propertyName
```

+ All the properties that are transitioning.
Here just choosing the longest one associated with the div the transitions are taking place on.
+ _return_ allow instant ignore bc we only care about the longest one

_document.querySelector(__audio[data-key="${e.keyCode}"]__);_

_document.querySelector(__div[data-key=“${e.keyCode}"]__);_

+ Allows us to target just the first (here only) element of the type indicated and with the data attribute of the same value as the keyCode firing the event.
+ Visible UI element and desired audio file __associated with shared data attribute (data-key)__

_if (!audio) __return__;_

+ Instant end if no audio element (a keyboard key without a reason to be considered).

```JavaScript
if(condition) return;
```
+ Super terse w/o brackets or newline

```js
audio.currentTime = 0;
```

+ Prevents needing to wait until audio element finishes to fire a new _play()_ action.

```JavaScript
<kbd>A</kbd>
```
> __kbd__: The HTML Keyboard Input element represents a span of inline text denoting textual user input from a keyboard, voice input, or any other text entry device.

#### Robert's solution
+ Breaks out the sound and styling operations into two distinct functions

### 02 - JS and CSS Clock

```JavaScript
function setDate() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  const hour = now.getHours();
  const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDate, 1000);

setDate();
```

__const secondsDegrees = ((seconds / 60) * 360) + 90;__

+ Easy to logically follow at a glance

__setInterval__(setDate, 1000);

+ No need to add _window._ before hand

#### Robert's solution
+ Calls the minute and hour setters only when necessary rather than every second


### 03 - CSS Variables
```HTML
<div class="controls">
  <label for="spacing">Spacing:</label>
  <input id="spacing" type="range" name="spacing" min="10" max="200" value="10" data-sizing="px">

  <label for="blur">Blur:</label>
  <input id="blur" type="range" name="blur" min="0" max="25" value="10" data-sizing="px">

  <label for="base">Base Color</label>
  <input id="base" type="color" name="base" value="#ffc600">
</div>

<img src="https://source.unsplash.com/7bwQXzbF6KE/800x500">

<style>
  :root {
    --base: #ffc600;
    --spacing: 10px;
    --blur: 10px;
  }

  img {
    padding: var(--spacing);
    background: var(--base);
    filter: blur(var(--blur));
  }

  .hl {
    color: var(--base);
  }
```

```JavaScript
const inputs = document.querySelectorAll('.controls input');

function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));
```

+ Declare CSS variables on __:root__

+ __filter: blur(var(--blur))__;

+ Filter style attribute on _img_ elements

+ UI element and desired variable __associated with shared name attribute (`--${this.name}`)__

inputs.forEach(input => input.addEventListener(__'mousemove'__, handleUpdate));

+ Even though the _inputs_ object is still a NodeList and not a proper array, can call _forEach_ on it
+ _mousemove_ event triggers anytime mouse hovers over element. Used here to handle dragging the sliders and updating the UI

```JavaScript
const suffix = this.dataset.sizing || '';
document.documentElement.style.setProperty(--${this.name}, this.value + suffix);
```

+ Reaching into document to set the variable with the changed input's value

#### Robert notes
+ _mousemove_ seems to be calling JS to set the property unnecessarily. The variable value and thus UI is still only being updated once the value changes, but might be preferable to only trigger handleUpdate if mouse/touch down event is active.

### 04 - Array Cardio Day 1

const birthdateInventors = inventors.__filter__(inventor => (inventor.year >= 1500 && inventor.year < 1600));

+ Pass filter() a function with a test to implement on all items in an array. Returns new array with passing elements.

const fullNameInventors = inventors.__map__(inventor => `${inventor.first} ${inventor.last}`)

+ Pass map() a function and it will return a new array with the function executed on each element of the original array

const ordered = inventors.__sort__((a, b) => a.year > b.year ? 1 : -1);

+ Compares two items in an array and explicitly says a larger year should be sorted at a later index (returns greater than 0, or 1)

const totalYears = inventors.__reduce__((total, inventor) => {
  return total + (inventor.passed - inventor.year);
}__, 0__);

+ The second _initialValue_ parameter is key for a reliable reduce

const category = document.querySelector('.mw-category');

const links = Array.from(__category.querySelectorAll('a')__);

const de = links
.map(link => __link.textContent__)
.filter(streetName => __streetName.includes('de')__);

+ Nice demo of targeting via the console.
+ _querySelectorAll_ is getting called to further filter through the category results
+ I'd probably just write
```JavaScript
const category = document.querySelectorAll('.mw-category a');
```
+ And use:
```JavaScript
[...category].map()
```

```JavaScript
const people = ['Beck, Glenn', 'Becker, Carl']
const alpha = people.sort((lastOne, nextOne) => {
  const [aLast, aFirst] = lastOne.split(', ');
  const [bLast, bFirst] = nextOne.split(', ');
  return aLast > bLast ? 1 : -1;
});
```
+ Elegant munging into a two-index array via split

```JavaScript
const transportation = data.reduce((obj, item) => {
  if (!obj[item]) {
    obj[item] = 0;
  }
  obj[item]++;
  return obj;
}, {});
```

+ _reduce_ with an empty object as _initialValue_
+ Both adding up instances and constructing a data object

#### Robert solutions

const sortedInventors = inventors.__sort__((inventorA, inventorB) => inventorA.year - inventorB.year);

+ Sort can determine order based on any returned value greater than 0 or less than 0. In this case, simply testing if one year has a higher number than another _would at first seem_ preferable if a bit less transparent than explicitly returning -1 or 1.

+ YET, MDN indicates that not only do browsers have varying algorithms to execute sort, but...
>"If _compareFunction_ is not supplied, elements are sorted by converting them to strings and comparing strings in Unicode code point order...because numbers are converted to strings, "80" comes before "9" in Unicode order."

+ At a minimum then, if I want to avoid the ternary and explicitly returning -1 vs 1, I'd need to pass in a basic _compareFunction_ as below:

```JavaScript
var mixedNumericArray = ['80', '9', '700', 40, 1, 5, 200];
function compareNumbers(a, b) {
  return parseInt(a) - parseInt(b);
}
mixedNumericArray.sort(compareNumbers);
```

+ Bos's solution for (7) sort by last name is still a bit baffling to me. Since all the names start with their last name first and we're comparing strings, can't we simply run the default sort?

```JavaScript
const sortedPeople = people.sort();
```

### 05 - Flex Panel Gallery

+ Nesting flex containers is maybe not as dirty as it feels? Display flex on both outer and inner divs.

+ One value of number type = flex-grow
```css
flex: 1;
```
+ Might be desirable to use auto which means both
```css
flex: auto;
flex: 1 1 auto;
```
+ Or just explicitly say
```css
flex-grow: 1;
```
+ flex: _grow, shrink, basis_

+ Five times other flex items with _flex: 1_
```css
.panel.open {
  flex: 5;
  font-size:40px;
}
```
+ Universal selector allows general first-child in a context
```css
.panel > *:first-child {
  transform: translateY(-100%);
}
```
+ Transform to start an animation off screen (_still problematic for screen readers though_)

+ __Toggle()__ is pretty widely supported, but only accepts one value at a time
```JavaScript
function toggleClass() {
  this.classList.toggle('open')
  this.classList.toggle('open-active')
}
```

#### Robert solutions

+ This works because __event.currentTarget__:

> always refers to the element to which the event handler has been attached, as opposed to event.target which identifies the element on which the event occurred.

```JavaScript
const toggleClass = (e) => {
  e.currentTarget.classList.contains('open')
  ?  e.currentTarget.classList.remove('open', 'open-active')
  :  e.currentTarget.classList.add('open', 'open-active')
  }
  ```

+ Initially tried __event.target__ but that only hit the <p> tags that were being clicked, which didn't works
+ Arrow function won't allow use of __this__, so to use Bos solution need a _named_ function

### 06 - Type Ahead

```JavaScript
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
fetch(endpoint)
  .then(data => data.json())
  .then(data =>  cities.push(...data));
  ```
+ Endpoint in const allows _fetch()_ to read much cleaner
+ _cities_ gets type definition and const and then has __JSON object translated into array__ via __push() + spread__
  + Spread syntax here is the key to getting a useful array from a JSON object
+ _fetch()_ promise handling with _then()_    

```JavaScript
function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi')
    return place.city.match(regex) || place.state.match(regex);
  });
}
```
+ __filter()__ on data array
+ __new RegExp(wordToMatch, 'gi')__ useful way to make a regex. _g_ = global (Across entire string). _i_ = insensitive to case
+ __match()__ condition in _filter()_ satisfies its functionality in a bit of weird way. The return only matters if it is interpreted as _true_ or _null_. The actual matched array from the _match()_ call is only used to say, "yes any match exists, so include this object from the _cities_ array in the returned filtered array"

```JavaScript
function displayMatches() {
  const matchArray = findMatches(this.value, cities)
  const html = matchArray.map(match => {
    const regex = new RegExp(this.value, 'gi');
    const cityMatch = match.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateMatch = match.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
    <li>
      <span class="name">${cityMatch}, ${stateMatch}</span>
      <span class="population">${match.population}</span>
    </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}
  ```
+ _this.value_ is the input value and _displayMatches()_ is called on _keyup_
+ __map()__ on a data array to generate markup feels similar to React
+ __return a string literal__ of markup is blowing my mind
+ __join('')__ is necessary to translate from the array of _map()_ into one big string of HTML
+ __innerHTML__ used on a _ul_ to populate a list
+ __replace()__ used to wrap the matched input from the text box in the highlight span

### 07 - Array Cardio 💪💪 Day 2
```JavaScript
const people = [
  { name: 'Wes', year: 1988 },
  { name: 'Kait', year: 1986 },
  ... ]
```

```JavaScript
const hasAdult = people.some(person => ((new Date()).getFullYear()) - person.year >= 19);
const allAdults = people.every(person => ((new Date()).getFullYear()) - person.year >= 19);
```
+ __some()__ checks each element in array and returns boolean if condition is _ever_ true in set
+ __every()__ checks each element in array and returns boolean if condition is _always_ true in set
+ Both array methods have thorough browser support
+ __new Date().getFullYear()__ gives current year

```JavaScript
const comments = [
  { text: 'Love this!', id: 523423 },
  { text: 'Super good', id: 823423 },
  ... ]
  ```
```JavaScript
const comment = comments.find(comment => comment.id === 823423);
const index = comments.findIndex(comment => comment.id === 823423);
```
+ __find()__ returns value of _first_ element in an array where a condition is true. In this case, the element is the two-attribute object.
+ __findIndex()__ returns the index of the _first_ element to satisfy a condition
+ No IE support currently on these two, but full support otherwise and polyfill on MDN.

```JavaScript
const newComments = [
  ...comments.slice(0, index),
  ...comments.slice(index + 1)
];
```
+ __Remove an element__ from an array using __slice()__
+ One parameter = begin at this index and go to end of array
+ Two parameters =  return a shallow copy of the portion of the array from index of first value to the second (non-inclusive)
+ __Pure function__ so original array isn't changed and it __always returns the same results given the same arguments__.
+ Useful in Redux
+ In contrast, _splice()_ mutates the original array, which is bad

### 08 - HTML5 Canvas
```JavaScript
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
```
+ Probably more reliable than 100vh x 100vw

```JavaScript
function draw(e) {
  if (!isDrawing) return; // stop the fn from running when they are not moused down
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ...
  [lastX, lastY] = [e.offsetX, e.offsetY];
```

+ __if (condition) return__ = nice pattern to use with isHavingState _flag_ to ensure function stops if desired
+ __hsl()__ color option allows rainbows since the hue can endlessly roll on through ROYGBIV
+ Setting multiple values via array destructuring

```JavaScript
if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
  direction = !direction;
}
```
+ Interesting way to toggle a flag

```JavaScript
canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
```

+ Coordinating _isDrawing_ flag at beginning of _draw_ with _mousedown_ and _mouseup/mouseout_ to make draw on __drag__ only.

### 09 - Dev Tools Domination

+ In _Elements_ panel of dev tools: __Break on... attribute modification__ to step through JS that changes any attributes

```JavaScript
console.assert(p.classList.contains('ouch'), 'This element does not have ouch!');
```
+ __console.assert()__ Assertion testing will flag if failing but remain silent if condition is met.

```JavaScript
console.dir(p);
```
+ __console.dir()__ allows dom element to be inspected for methods and attributes

```JavaScript
dogs.forEach(dog => {
  console.groupCollapsed(`${dog.name}`);
  console.log(`This is ${dog.name}`);
  console.log(`${dog.name} is ${dog.age} years old`);
  console.log(`${dog.name} is ${dog.age * 7} dog years old`);
  console.groupEnd(`${dog.name}`);
});
```
+ __console.group()__ useful in ordering large outputs that iterate over data

```JavaScript
console.time('fetching data');
fetch('https://api.github.com/users/wesbos')
  .then(data => data.json())
  .then(data => {
    console.timeEnd('fetching data');
    console.log(data);
  });
```
+ __console.time()__ gives execution time

### 10 - Hold Shift ⬇️ to Check Multiple Checkboxes

+ Not sure I follow what the fragility liability is in my solution
+ Bos solution is an insightful use of flags to switch behaviour within a forEach() loop.

```JavaScript
const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
```
+ This is much more specific than what I used, which was simply _'input'_. Ensures desired selector scope.

```JavaScript
if (e.shiftKey && this.checked) {
  ```
+ __clickEvent.shiftKey__ avoids the need for keydown event listener on window

> The MouseEvent.shiftKey read-only property indicates if the shift key was pressed (true) or not (false) when the event occurred.

+ __this.checked__ = only execute if this checkbox is being checked at time of click

```JavaScript
checkboxes.forEach(checkbox => {
  if (checkbox === this || checkbox === lastChecked) {
    inBetween = !inBetween;
  }
  if (inBetween) {
    checkbox.checked = true;
  }
});
```
+ First _if_ condition allows either checked box to trigger toggle to true and the box further along the index to toggle to false.
+ __A toggle and a conditional execution__ both inside a _forEach()_ loop

### 11 - Custom Video Player

```HTML
<button data-skip="-10" class="player__button">« 10s</button>
<button data-skip="25" class="player__button">25s »</button>
```
```JavaScript
const skipButtons = player.querySelectorAll('[data-skip]');
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}
skipButtons.forEach(button => button.addEventListener('click', skip));
```
+ Using __data attributes__ to query select DOM elements
+ Using __this.dataset__ to specify outcome—as in, it doesn't matter if this is the fast forward or rewind button, all that matters is the value in the data attribute _skip_
+ My instinct was to use parseInt(), but really __parseFloat()__ is a more sensible default since it will preserve decibels

```HTML
<input type="range" name="volume" class="player__slider" min="0" max="1" step="0.05" value="1">
<input type="range" name="playbackRate" class="player__slider" min="0.5" max="2" step="0.1" value="1">
```
```JavaScript
const ranges = player.querySelectorAll('.player__slider');
function handleRangeUpdate() {
  video[this.name] = this.value;
}
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
```
+ __Bracket notation__ allows the clicked DOM element to provide the property to update on the target _video_ element.
+ For this to work, the __name attribute__ of the input elements needs to correspond with a property that exists on the target video element.
+ Why is _time_ a "property" rather than an "attribute" in both _video[time]_ +  _video.time_?

```JavaScript
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}
```
+ __Setting _const_ with ternary__
+ __Bracket notation__ again used to determine which method to call on _video_

```JavaScript
const togglePlay = () => {
  video.paused
  ? video.play()
  : video.pause();
}
```
+ This was my solution

```JavaScript
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}
```
+ __textContent__ used to set the content of the button

```JavaScript
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}
video.addEventListener('timeupdate', handleProgress);
```
+ __timeupdate__ fires every time the video progresses
+ __Setting style via dot notation__

```JavaScript
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
```
+ __mouseEvent.offsetX__ gives the mouse position within the target node
+ Not knowing about that, I manually calculated using __this.getBoundingClientRect().x__, which is also worth knowing about
+ __progress.offsetWidth__ gives the width of the DOM element
+ Callbacks harness a _mousedown_ __flag and shortcircuiting__

### 12 - Key Sequence Detection

__My solution__
```JavaScript
const userKeySequence = [];
const code = 'win'

window.addEventListener('keyup', e => {
  userKeySequence.push(e.key)

  const userCode = [
    ...userKeySequence.slice(-code.length)
  ].join('');

  if (userCode.includes(code)) {
    console.log('boo yah');
  }
})
  ```
Bos uses __splice__ in an interesting way.

```JavaScript
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  ```
  + First parameter is starting index, second parameter is how many elements to remove
  + A negative first parameter will start at the end of an array and move backward
    + _-secretCode.length - 1_ could just be replaced by _0_ because the _pressed_ array is never allowed to get longer than the code
    + _pressed.length - secretCode.length_ will evaluate to a negative number and have no effect until _pressed_ is 1 longer than _secretCode_, which will trigger the removal of the value at index 0

I find my solution easier to reason about and I understand that __slice__ not mutating the exiting array hedges against potential bugs.

### 13 -  Slide in on Scroll
__My solution__
```JavaScript
const imgs = document.querySelectorAll('.slide-in');

const checkScroll = () => {
    imgs.forEach(img => {
      const isOnScreen = (window.scrollY + window.innerHeight) > (img.offsetTop - (img.height/2));
      const isActive = img.classList.contains('.active');

      if (isOnScreen && !isActive) {
        img.classList.add('active')
      }
    })
  }

window.addEventListener('scroll', debounce(checkScroll))
```
+ I chose not to implement a reappear on scroll up
+ I can see a benefit to breaking out the _const_ declarations into even smaller bits in terms of readability
+ __offsetTop__

__Bos solution__
```JavaScript
function checkSlide() {
  sliderImages.forEach(sliderImage => {
    // half way through the image
    const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
    // bottom of the image
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(checkSlide));
```
+ __debounce__ allows control over how frequently an event fires
  + Elevator pausing to allow more people on is good analogy from here https://css-tricks.com/debouncing-throttling-explained-examples/
+ __(window.scrollY + window.innerHeight)__ = scroll position at bottom of window
+ Not bothered by calling add/remove more than once. Is this a performance consideration or a concern I'm just making up?

__CSS__
Nice model of coordinating __opacity__, __translateX__ + __scale__ in animation

```css
.slide-in {
  opacity:0;
  transition:all .5s;
}
.align-left.slide-in {
  transform:translateX(-30%) scale(0.95);
}
.align-right.slide-in {
  transform:translateX(30%) scale(0.95);
}
.slide-in.active {
  opacity:1;
  transform:translateX(0%) scale(1);
}
```
### 14 - JS Reference VS Copy
```JavaScript
const players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
const team = players;
team[3] = 'Lux';
console.log(players) // -> ['Wes', 'Sarah', 'Ryan', 'Lux'];
```
+ Because _team_ is a __reference__ rather than a _copy_, it mutates the original _players_ array!

__Array copying techniques__
```JavaScript
const team2 = players.slice();
const team3 = [].concat(players);
const team4 = [...players];
const team5 = Array.from(players);
```
+ __spread__ and __Array.from__ seem like go-to solutions

```JavaScript
const person = {
  name: 'Wes Bos',
  age: 80
};
const captain = person;
captain.age = 99;
console.log(person) // -> {name: "Wes Bos", age: 99}
```
+ Again _captain_ is a __reference__, so it mutates the original _person_ object

__Object copy techniques__
```JavaScript
const cap2 = Object.assign({}, person, { number: 99, age: 12 });
const cap3 = {...person};
```
+ Pretty sure __object spread__ will make it into JS, but still not 100% confirmed

+ Array and Object copy methods above are all only 1 level deep
+ _lodash_ has __cloneDeep__ method

```JavaScript
const dev2 = JSON.parse(JSON.stringify(wes));
```
+ "Poor man's cloneDeep" converts object to a string then immediately parses it back into an object
+ Questionable performance

### 15 - Local Storage + Event Delegation

+ __DevTools: Preserve Log__ to prevent page refresh from deleting console logs

```JavaScript
function handleAdd(e) {
  e.preventDefault();
  const input = this.querySelector('input[type="text"]');
  ```
  + Helpful to narrow down search to the form we're interacting with. If there were several forms on the page, _this_ allows us to ignore the ones we don't care about
    + Here, an arrow function would eliminate access to the utility of _this_

  + __DevTools -> Application -> LocalStorage__
    + Can also delete localStorage to reset

```JavaScript
function populateList(incomingItems = [], targetList) {
```
  + Default value for argument prevents JS breaking if we forget to pass in an array.

```JavaScript
const listHTML = incomingItems.map((item, index) => {
  return `
    <li>
      <input type="checkbox" id="item${index}" data-index=${index}
      ${item.done ? 'checked' : ''}>
      <label for="item${index}">${item.inputText}</label>
    </li>
  `;
}).join('')
```
+ Ternary to set checked attribute
  + Used ng-if in AngularJS for this, but interpolation within template literals allows native JS to pull off similar functionality.

```JavaScript
localStorage.setItem('items', JSON.stringify(items))
```
+ localStorage can only store strings, so need to run __JSON.stringify()__ to convert objects
+ Will need to tun __JSON.parse()__ when retrieving from localStorage

```JavaScript
const items = JSON.parse(localStorage.items) || [];
```
+ Sets items using localStorage in the initial declaration on page load
  + He uses _JSON.parse(localStorage.__getItem('items')__)_, but I'm not sure why that's beneficial

__Event delegation__

+ Problem to solve is that listening for click or change events won't work on these _li_ elements because they might not exist in the DOM at run time
  + One option for dealing with this is to attach an event listener to a parent element (here the _ul_) that you know will be there, and then determine which children objects to modify from that parent context

+ Can think of as very responsible parents, but negligent children who aren't bothered by events on them
  + Tell the parent to pass on the event to its child
  + Parent, you're the only one that is responsible here
  + The event is on something higher, so we need to manage what within that parent we actually want to affect

```JavaScript
if(!e.target.matches('input')) return;
```
+ Here, we're saying if the clicked item is not an _input_ (as in, if it's an _li_ or _label_), then __just stop the function and return__
+ __matches()__ is a new API

```JavaScript
  function handleToggle(e) {
    if(!e.target.matches('input')) return;
    const clickedIndex = e.target.dataset.index;
    items[clickedIndex].done = !items[clickedIndex].done;
    localStorage.setItem('items', JSON.stringify(items))
    populateList(items, itemsList);
  }
  ```
  + Feels like a basic version of React _setState_ without the diff
  + Feels a bit cumbersome to have to set localStorage with the updated data (_setItem()_) and then rerender the DOM (_populateList()_). Native checkbox input can handle the clicked state without the rerender. But on principle I can understand wanting the localStorage data object to match the rendered DOM elements

### 16 - Mouse Move Shadow

```JavaScript
<script>
  const hero = document.querySelector('.hero');
  const headerText = hero.querySelector('h1');
  const magnitude = 50;

  function animateShadow(e) {
    const { offsetWidth: width, offsetHeight: height } = hero;
    let { offsetX: x, offsetY: y } = e;

    if (this !== e.target) {
      x = x + e.target.offsetLeft;
      y = y + e.target.offsetTop;
    }

    const xThrow = Math.round((x / width * magnitude) - (magnitude / 2));
    const yThrow = Math.round((y / height * magnitude) - (magnitude / 2));

    headerText.style.textShadow = `
      ${xThrow*-1}px ${yThrow*-1}px 0 rgba(255,0,255,0.7)
    `;

  }

  hero.addEventListener('mousemove', animateShadow);
</script>
```

+ __Destructuring attributes off an element__: _const { offsetWidth: width, offsetHeight: height } = hero;_
+ __offsetX__ and __offsetY__ will return position within target DOM node, so the values reset when hovering over the _H1_
  + _(this !== e.target)_ means if the element triggering the event (_this_) does not equal the mouse event target, then add the coordinates that offset the child element to the total x + y value to maintain a coherent coordinate system.
+ __Math.round()__

### 17 - Sort Without Articles

__My solution__
```JavaScript
const regex = new RegExp('The |a |an ', 'i');

const deArticle = (input) => input.replace(regex, '');

const sortedBands = bands.sort((a, b) => deArticle(a) < deArticle(b) ? -1 : 1);
const listHTML = sortedBands.map(band => {
  return `
  <li>${band}</li>
  `
}).join('');

list.innerHTML = listHTML;
```
+ Initially had _g_ in regex, but since alphabetizing, only the first instance matters

__array.sort()__
+ Nice to use an inline ternary
+ Initially, I had the _deArticle_ logic inside the sort block, but it's a nice separation to move it outside

__Regex__
```JavaScript
bandName.replace(/^(a |the |an )/i, '').trim();
```
+ His __inline regex__ is nice
+ __trim()__: removes whitespace from both ends of a string

### 18 - Adding Up Times with Reduce

+ convertTime() function within __reduce()__
  + Nice to separate out the munging logic

__Hybrid solution__
```JavaScript
const videos = [...document.querySelectorAll('[data-time]')];

const convertTime = (minSec) => {
  const [mins, secs] = minSec.split(':').map(parseFloat);
  return (mins * 60) + secs;
}

const timeSum = videos.reduce((acc, cur) => {
  return convertTime(cur.dataset.time) + acc;
}, 0);

let secondsLeft = timeSum;
const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;

const mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

console.log(hours, mins, secondsLeft);
```
```JavaScript
const videos = [...document.querySelectorAll('[data-time]')];
```
+ No need to mess around with anything but these elements with these __data attributes__

```JavaScript
const [mins, secs] = minSec.split(':').map(parseFloat)
```
+ __Destructuring to declare variables__ from returned _spilt()_ value
+ __map(parseFloat)__ runs _parseFloat_ on every item in the array

__Modulo/Remainder__

+ _73 % 60 = 13_
  + As in, _how many seconds remain beyond whole minutes_
  + __secondsLeft__ above

### 19 - Webcam Fun

__See projects files.__ A bit niche but a great demo

__Take aways:__
+ Using __canvas__ with a video stream source
  + _getContext()_, _drawImage()_, _toDataURL()_, _getImageData()_, _putImageData()_
+ __video stream__ from webcam
  + _getUserMedia()_
+ __debugger__ to prevent logs of repeat executions

```html
<div class="rgb">
  <label for="rmin">Red Min:</label>
  <input type="range" min=0 max=255 name="rmin">
  <label for="rmax">Red Max:</label>
  <input type="range" min=0 max=255 name="rmax">
```

```js
document.querySelectorAll('.rgb input').forEach((input) => {
  levels[input.name] = input.value;
});
...
for (i = 0; i < pixels.data.length; i = i + 4) {
  red = pixels.data[i + 0];
  green = pixels.data[i + 1];

  if (red >= levels.rmin
    && green >= levels.gmin
...
```

+ Grabbing pixels off a canvas and modifying RGBA values to create a filter effect
+ Nice model of coordinating and utilising UI _input_ names and values with canvas pixels in __greenScreen()__


```json
"scripts": {
  "start": "browser-sync start --server --files \"*.css, *.html, *.js\""
},
"devDependencies": {
  "browser-sync": "^2.12.5"
}
```
+ __Browser sync__ start script!
  + Easy hot reloading. No global install.
  + Load on devices using wifi with external URL

```JavaScript
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'downloadedFileTitleHere');
  link.innerHTML = `<img src="${data}" alt="" />`;
  strip.insertBefore(link, strip.firsChild);
```
+ __Creating an element__ and adding/setting its attributes in JS
  + __insertBefore()__

```JavaScript
red = pixels.data[i + 0];
green = pixels.data[i + 1];
blue = pixels.data[i + 2];
alpha = pixels.data[i + 3];
```
+ Not entirely sure how he gets away with using _red_ etc. here without a const/let declaration...

```JavaScript
video.addEventListener('canplay', paintToCanvas);
```
+ __canplay__ event listener

### 20 - Speech Detection

__See projects files.__ Again, niche but a great demo

__Take aways:__

```JavaScript
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);
p.textContent = transcript;
```
+ __Creating an element__ and appending it to existing DOM element in JS
  + __appendChild()__
  + __textContent__

```JavaScript
recognition.addEventListener('result', e => {
  console.log(e.results);
})
```
+ Good place to get a feel for what's returned by the recognition object  

```JavaScript
recognition.addEventListener('result', e => {
  const transcript = Array.from(e.results)
  .map(result => result[0])
  .map(result =>  result.transcript)
  .join('');
})
```
+ __Chained map() invocations__ somehow feel dirty to me, but this is a nice example of clean, readable data munging
+ _e.results_ has confidence and transcript keys

```JavaScript
if(transcript.includes('London')) {
  console.log('You said London');
}
```
+ Can trigger actions off recognition of words in transcript
+ Love seeing the __multiple interpretations__. Would be interesting to see side by side.

```JavaScript
recognition.addEventListener('end', recognition.start);
```
+ __end__ event

### 21 - Geolocation
+ __To simulate geolocation attributes:__ XCode -> location -> running
+ __To run dev tools in Xcode:__ Safari -> develop -> simulator  

```JavaScript
navigator.geolocation.watchPosition((data) => {
  console.log(data);
  speed.textContent = data.coords.speed;
  arrow.style.transform = `rotate(${data.coords.heading}deg)`;
}, (err) => {
  console.error(err);
});
```
+ __watchPosition()__
+ __textContent__

### 22 - Follow Along Links

__Key concept:__ Grabbing values off __getBoundingClientRect()__ and inserting them as __inline styles__
  + Basically a __fancy hover__ state

+ Because there's only one _span_ element, animations track it across the page and illustrate where it's been and is going
  + ...as opposed to hover, which doesn't convey causality with any sense of history.

```JavaScript
const triggers = document.querySelectorAll('a');

const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.append(highlight);

function highlightLink() {
  const linkCoordinates = this.getBoundingClientRect();
  highlight.style.width = `${linkCoordinates.width}px`
  highlight.style.height = `${linkCoordinates.height}px`
  highlight.style.transform = `translate(${linkCoordinates.left + window.scrollX}px, ${linkCoordinates.top + window.scrollY}px)`;
}

triggers.forEach(trigger => { trigger.addEventListener('mouseenter', highlightLink)})
```
+ __mouseenter__ event
+ __getBoundingClientRect()__ is super useful here

```js
const coords = {
  width: linkCoords.width,
  height: linkCoords.height,
  top: linkCoords.top + window.scrollY,
  left: linkCoords.left + window.scrollX
};
highlight.style.width = `${coords.width}px`;
highlight.style.height = `${coords.height}px`;
highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
```
+ Bos code destructures values onto _coords_ object
  + I prefer the inline approach I used in the first code snippet above, but I can see the benefit of including the addition logic for _top_ and _left_ in a separate location to the _style.transform_ definition.

### 23 - Speech Synthesis

```JavaScript
const msg = new SpeechSynthesisUtterance();
let voices = [];
...
msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    .filter(voice => voice.lang.includes('en'))
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle();
}

function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

function setOption() {
  console.log(this.name, this.value);
  msg[this.name] = this.value;
  toggle();
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
```
Both part of the __Web Speech API__ native in browsers
+ __speechSynthesis__ is
>the controller interface for the speech service; this can be used to retrieve information about the synthesis voices available on the device, start and pause speech, and other commands besides.

+ __SpeechSynthesisUtterance__ represents
>a speech request. It contains the content the speech service should read and information about how to read it (e.g. language, pitch and volume.)

__populateVoices()__
+ Quick and easy __filter()__

__setVoice()__
+ Differed to mine in use of __find()__
  + This is more declarative and uses the value attribute on the DOM object to explicitly correlate with the desired setting on the _msg_ object

```JavaScript
const voiceOptions = voices
  .map( (voice, index) => `<option value="${index}">${voice.name} (${voice.lang})</option>`)
  .join('');

function setVoice() {
  msg.voice = voices[this.value];
}
```
+ I connected these by carrying the index through on an option attribute

__toggle()__
+ __default parameter value__ with _toggle(startOver = true)_
  + This allows the _toggle_ function to be used to different effect in _setVoice_ and inline on the _stopButton_ DOM element

```JavaScript
stopButton.addEventListener('click', () => toggle(false));
```
+ __Passing a parameter into a callback__ with an arrow function  

```JavaScript
stopButton.addEventListener('click', toggle.bind(null, false));
```
+ Also possible to pass parameter to a callback with __bind__

### 24 - Sticky Nav

```JavaScript
const nav = document.querySelector('#main');
let topOfNav = nav.offsetTop;

function fixNav() {
  if(window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}

window.addEventListener('scroll', fixNav);
```
+ __offsetTop__ as opposed to my use of _getBoundingClientRect().top_
+ Advantage of __programmatically setting__ _paddingTop_ with __offsetHeight__ is that there's no problem if font size, etc. changes

```JavaScript
document.body.classList.add('fixed-nav');
```
+ __Add page state class to body__. If it's high up, easy to target anything affected

```css
li.logo {
  max-width:0;
  overflow: hidden;
  transition: all 0.5s;
}
.fixed-nav li.logo {
  max-width:500px;
}
```
+ __max-width allows transitions__, but _width: auto_ does not. 500px value is simply something way larger than it would ever be. Flex is handling actual width.

```css
.site-wrap {
  transform: scale(0.98);
  transition: transform 0.5s;
}
body.fixed-nav .site-wrap {
  transform: scale(1);
}
```
+ Nice UX effect to boost main content area via a __subtle scale transform__

### 25 - Event Capture, Propagation, Bubbling

> Event bubbling and capturing are two ways of propagating events which occur in an element that is nested within another element, when both elements have registered a handle for that event. The event propagation mode determines the order in which elements receive the event

```html
 <div class="one">
    <div class="two">
      <div class="three">
      </div>
    </div>
  </div>
```
```JavaScript
  divs.forEach(div => div.addEventListener('click', logText, {
    capture: true
  }));
```
+ Third argument of _addEventListener_ is the __options object__

__Capture__
+ Event capturing can be thought of as an arrow cutting through layers of DOM and triggering any handles registered for that event on the way to the inner most element
+ __capture__ here says to fire off click events on the initial event capture decent into inner DOM element
  + "On the way down"
+ Event bubbling occurs on the way back up
+ __Default is false__

```JavaScript
e.stopPropagation(); // stop bubbling!
```

+ Won't trigger events on the parents on the way up
 + Or on the way _down_ if _capture_ is set to true

```JavaScript

  button.addEventListener('click', () => {
    console.log('Click!!!');
  }, {
    once: true
  });
  ```

+ __once__ = unbind after the event is fired (like, _removeEventListener_)
+ For instance, in a checkout where the event should only ever fire once

### 26 - Stripe Follow Along Nav

```JavaScript
setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
```
+ When entering into a non-arrow function, the value of _this_ changes, so declaring a _function()_ would prevent the use of _this.classList_

```CSS
  .dropdown {
    opacity: 0;
    transition: all 0.5s;
    will-change: opacity;
    display: none;
  }

  .trigger-enter .dropdown {
    display: block;
  }

  .trigger-enter-active .dropdown {
    opacity: 1;
  }
```

```JavaScript
function handleEnter() {
  this.classList.add('trigger-enter');
  setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
  ...
```
+ Handling a __transition from _display: none___ with ___setTimeout()___
+ __Short-circuiting with &&__ to avoid _if_ syntax

```JavaScript
const dropdown = this.querySelector('.dropdown');
```
+ __querySelector on _this___ to connect elements
  + Much simpler than my passing in and _index_ value

```JavaScript
const dropdownCoords = dropdown.getBoundingClientRect();
const navCoords = nav.getBoundingClientRect();

const coords = {
  height: dropdownCoords.height,
  width: dropdownCoords.width,
  top: dropdownCoords.top - navCoords.top,
  left: dropdownCoords.left - navCoords.left
};
```
+ Logging entire returned object from getBoundingClientRect into a _const_
+ __Setting keys on a newly declared object__
+ _navCoords.top_ and _.left_ useful in programmatically determining top offset and accounting for any variations from extra markup, etc.

```JavaScript
background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
```
+ Using __translate rather than left/top offsets__

### 27 - Click and Drag

```JavaScript
const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;  // stop the fn from running
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3;
  slider.scrollLeft = scrollLeft - walk;
});
```
+ __mouseleave__ to halt dragging if mouse leaves the div being scrolled
+ __console.count__ useful with _mousemove_ listener
+ __console.log({x, startX})__ very useful for multiple logs
+ __cursor: grabbing__
+ _preventDefault_ helps avoid default dragging cursor behaviour like selecting text, etc.

```JavaScript
slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;  // stop the fn from running
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3;
  slider.scrollLeft = scrollLeft - walk;
});
```
+ _e.pageX - slider.offsetLeft_ = where the mousedown occurred minus the context of the div's offset on the page

### 28 - Video Speed Controller

```JavaScript
const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
const video = document.querySelector('.flex');

function handleMove(e) {
    const y = e.pageY - this.offsetTop;
    const percent = y / this.offsetHeight;
    const min = 0.4;
    const max = 4;
    const height = Math.round(percent * 100) + '%';
    const playbackRate = percent * (max - min) + min;
    bar.style.height = height;
    bar.textContent = playbackRate.toFixed(2) + '×';
    video.playbackRate = playbackRate;
  }

speed.addEventListener('mousemove', handleMove);
```
__Wes:__
```JavaScript
const y = e.pageY - this.offsetTop;
const percent = y / this.offsetHeight;
```
__Me:__
```JavaScript
const percentageInBar = (e.pageY - speed.offsetTop) / speed.offsetHeight;
```
+ __Using _this_ to allow a more reusable function__. I used the element (_speed_), which seems more concrete and works just fine. I'd feel a bit nervous about _this_ here because it feels less specific and more prone to potential error.
+ But if you're adding your event listener on the explicit element already, then _this_ has a clear definition and using _speed_ could be seen as __redundant and hard coded__.

```JavaScript
const playbackRate = percent * (max - min) + min;
```
+ Useful math to convert a percentage to a unit in a min–max context

+ __decimals.toFixed()__

### 29 - Countdown Clock

```JavaScript
const buttons = document.querySelectorAll('[data-time]');
```
+ Data attribute as specific, declarative selector

```JavaScript
let countdown;

function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}
```
+ __Avoid decrement within setInterval__ because occasionally no fire and iOS scrolling halts interval timer
+ Solution here is to use the _fixed end time_ along with _Date.now_ inside the timer, so it doesn't really matter if a cycle is skipped because the next second will return an accurate value

```JavaScript
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}
```
```JavaScript
document.title = display;
```
+ Allows browser tab to show timer value

```JavaScript
const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
```
+ __Ternary__ to solve __2-digit seconds__
+ Only saving this in _display_ because it will be used in two places, otherwise inline, as below

```JavaScript
function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}
```

```HTML
<form name="customForm" id="custom">
  <input type="text" name="minutes" placeholder="Enter Minutes">
</form>
```

```JavaScript
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
```
+ Using reset to take advantage of native form features (rather than saying something like _value=''_)
+ Can use __name attribute__ off of _this.minutes.value_

### 30 - Whack A Mole

```JavaScript
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
```

```JavaScript
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    console.log('Ah nah thats the same one bud');
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}
```

```JavaScript
function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}
```
+ Appreciate the small functions. My work mixed the above concerns of randomHole + peep, which made it tricky to follow.

```JavaScript
setTimeout(() => timeUp = true, 10000)
```
+ __Inline timeout__

```JavaScript
if (!timeUp) peep();
```
+ __Inline if__

+ Careful not to confuse __setTimeout()__ and __setInterval()__!
+ Helpful in this instance to avoid passing in parameter for the _timeUp_ condition.
  + I was passing this condition in and it allowed the undesired value to "leapfrog" the desired canceling condition and continue an indefinite loop
