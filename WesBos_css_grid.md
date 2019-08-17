# CSS Grid

### 3 CSS Grid Fundamentals

_implicit grid_ means sizing by default or assumption if not specified

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
<div>
```

```CSS
.container {
  display: grid;
  grid-template-columns: repeat(5, 100px);
  grid-template-rows: 200px 75px;
  grid-gap: 20px;
}
```

### 5 Implicit vs Explicit Tracks

```css
grid-auto-rows: 100px 20px;
```

+  Provides a rule for implicit grid rows
  + In this case the rows will alternate between the two heights

### 6 grid-auto-flow Explained

```css
grid-auto-flow: column;
grid-auto-columns: 100px 20px;
```

+ Default value is _row_, but _column_ allows horizontal tracks to be the implicit result

### 7 Sizing tracks in CSS Grid

+ Best to avoid trying to add up to 100% when defining column and row templates
  + Overflow issue occurs if you have `grid-template-columns: 50% 50%` + `grid-gap: 20px`
  + Will use 100% of space for columns and the gap will push beyond the 100% bounds = horizontal scroll/overflow

+ Better to use `fr` fractional unit to occupy remaining free space
  + This calculation is done _after_ the gap is accounted for

### 12 auto-fit and auto-fill

```css
grid-template-columns: repeat(auto-fill, 125px);

.item4 {
  grid-column: span 2 / -1
}
```

+ `auto-fill` will keep making columns as the container grows 
+ `grid-column: span 2 / -1` will always place that element at the end of the columns, even as they grow

### 13 Using minmax() for Responsive Grids

```css
grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
```

+ Will keep creating or removing columns bc `auto-fill`
+ Allows grid elements to be dynamically sized, and to take up the full width of the column if only one column can fit in the grid container (ie: < 300px)


```css
grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
```

+ Change to `auto-fit` allows grid elements to take up entire width of available space
  + `auto-fit` is specifying how many columns to have


### 14 Grid Template Areas

```css
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 8fr 1fr;
  grid-template-rows: auto auto 100px;
  grid-template-areas: 
  "content  content   content"
  "side-1   side-1   side-2"
  "footer   footer    footer"
}

.item1 {
  grid-area: side-1;
}


.item2 {
  grid-area: content;
}

.item3 {
  grid-area: side-2;
}

.footer {
  grid-area: footer;
}

@media(min-width: 500px) {

  .container {
    grid-template-areas: 
    "side-1   content   side-2"
    "side-1   content   side-2"
    "footer   footer    footer"
  }
}
```

+ `grid-area` allows us to place elements across different parts of the grid
  + Can also be done by `grid-column: x / y` + `grid-row: x / y`


```css
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-areas:
    "💩 💩 💩 💩 🍔 🍔 🍔 🍔"
    "💩 💩 💩 💩 🍔 🍔 🍔 🍔"
    "💩 💩 💩 💩 🍔 🍔 🍔 🍔"
    "💩 💩 💩 💩 🍔 🍔 🍔 🍔";
}

.item3 {
  grid-column: 💩-start / 🍔-end;
  grid-row-end: 💩-end;
}
```

+ Can target area boundaries via `-start` + `-end`

### 15 Naming Lines in CSS Grid

```css
.container {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: [site-left] 1fr [content-start] 500px [content-end] 1fr [site-end];
  grid-template-rows: [site-top] repeat(10, auto) [site-bottom];
}

.item3 {
  grid-column: content-start / content-end;
  grid-row: site-top / site-end
}
```

+ `[line-name-here]` allows you to label the lines and more easily target them via `grid-row` and `grid-column`

### 16 grid-auto-flow dense

+ `grid-auto-flow: dense` will try to fill in the spaces available—reordering elements as needed 

### 17 Image Gallery

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-auto-rows: 100px;
  grid-auto-flow: dense;
}
```

+ As many columns of 100x100 grid spaces as browser width allows: `auto-fill`
+ `grid-auto-rows` allows rows to be added as needed 

```css
.item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

+ images take up full space 

```js
function generateHTML([h, v]) {
    return `
      <div class="item h${h} v${v}">
        <img src="images/${randomNumber(12)}.jpg">
        <div class="item__overlay">
          <button>View →</button>
        </div>
      </div>
    `;
  }

const digits = Array.from({ length: 50 }, () => [randomNumber(4), randomNumber(4)]).concat([[1, 1], ... [1, 1]])

const html = digits.map(generateHTML).join('');
gallery.innerHTML = html;
```

+ Nice little model of `Array.from` 
+ And destructuring via the `.map()` callback

### 21 Flexbox vs. Grid

```css
display: grid;
grid-template-columns: 1fr;
grid-auto-flow: column;
```

+ `grid-auto-flow: column` creates new columns for any additional elements
+ While the `1fr` allows the entire left space to be filled by the initial element
+ Title on left, UI buttons on the right


### 24 Responsive website

 ```css
 grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
 ```

 + `auto-fit` is still a bit un-intuitive to me 
 + Here it's allowing responsiveness by saying: make as many columns as you need just ensure each column is at least 200px


```css
[aria-expanded="true"] ~ ul {
  display: grid;
  max-height: 500px;
  transform: rotateX(0);
}

[aria-expanded="false"] .close {
  display: none;
}

[aria-expanded="true"] .close {
  display: inline-block;
}

[aria-expanded="true"] .open {
  display: none;
}
```

+ Interesting use of `aria-expanded` attribute selector
+ JavaScript then only has to toggle that attribute on click events, and styles can follow

### 25 Full Bleed Blog Layout

```css
grid-gap: 10px 50px;
grid-template-columns: 3fr 12fr 5fr;
```

+ Specify less grid gap between rows
+ Using `fr` units allows us to avoid margin adding up to over 100%

```css
.post>* {
  grid-column: 2 / -2;
}
```

+ More flexible to count from negative on the right because you can add columns and it will still span to the desired end point