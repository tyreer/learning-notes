# Notes on Real World React Native Animations
https://egghead.io/courses/real-world-react-native-animations
Course by [Jason Brown](https://egghead.io/instructors/jason-brown-20a6bf03-254a-428c-9984-dca76cc84f32)


## [Create a Horizontal Parallax ScrollView in React Native](https://github.com/browniefed/examples/tree/realworld/momentparallax/realworld)

```js
   <ScrollView
          pagingEnabled
          horizontal
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { x: this.state.animatedScroll } } }
          ])}
        >
```
+ `pagingEnabled`: When true, the scroll view stops on multiples of the scroll view's size when scrolling. This can be used for horizontal pagination.

+ `onScroll`: Pretty sure the only effect of this property is to set the value of `animatedScroll` in state.
  > Gestures, like panning or scrolling, and other events can map directly to animated values using Animated.event. This is done with a structured map syntax so that values can be extracted from complex event objects. The first level is an array to allow mapping across multiple args, and that array contains nested objects.


```js
const getInterpolate = (animatedScroll, i, imageLength) => {
  const inputRange = [
    i - 1 * width, // -1 * width // - 414
    i * width, // 0 or width // 0 // When at width we do don't translate
    (i + 1) * width // 1 * width // 828 // when we swipe past we will translate 150 left on prev picutre
  ];

  const outputRange = i === 0 ? [0, 0, 150] : [-300, 0, 150];

  return animatedScroll.interpolate({
    inputRange,
    outputRange,
    extrapolate: "clamp"
  });
};
```

```js
  {Images.map((image, i) => {
            return (
              <Moment
                key={i}
                {...image}
                translateX={getInterpolate(
                  this.state.animatedScroll,
                  i,
                  Images.length
                )}
              />
            );
```
+ The is all for the parallax effect 
  + Offsetting the 1-to-1 scrolling with translateX in the opposite direction makes the image appear to move across the screen at a different speed than the divider bar

  ```js
   {Array.apply(null, { length: Images.length + 1 }).map((_, i) =>
            getSeparator(i)
          )}
          ```
+ Counter intuitive for me, but I suppose this would be a way to generate an array simply to mirror the quantity of elements in another data set.

## [Animate a React Native Information Callout View](https://github.com/browniefed/examples/tree/realworld/momentcallout)

```js
class Moment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: new Animated.Value(1)
    }
    this.handlePress = this.handlePress.bind(this)
  }

componentWillMount() {
    this.bgFadeInterpolate = this.state.scale.interpolate({
      inputRange: [.9, 1],
      outputRange: ["rgba(0,0,0,.3)", 'rgba(0,0,0,0)']
    })
    this.textFade = this.state.scale.interpolate({
      inputRange: [.9, 1],
      outputRange: [0, 1]
    })

    this.calloutTranslate = this.state.scale.interpolate({
      inputRange: [.9, 1],
      outputRange: [0, 150]
    })
  }

  render() {
    const animatedStyle = {
      transform: [
        { translateX: this.props.translateX },
        { scale: this.state.scale}
      ]
    }

    const bgFadeStyle = {
      backgroundColor: this.bgFadeInterpolate
    }
    const textFadeStyle = {
      opacity: this.textFade
    }
    const calloutStyle = {
      transform: [{ translateY: this.calloutTranslate}]
    }
```

+ The single animated value, `scale: new Animated.Value(1)`, is driving four animations
+ The `inputRange` of 1–0.9 is directly applicable to the animated _scale_ value, and is simply interpolated for all the other values it needs to drive
  > "We'll ... rely heavily on interpolate to coordinate the sliding of the card, and scaling image animations."


```js
  handlePress() {
    if(this.props.focused) {
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: 300
      }).start(() => this.props.onFocus(false))
      return;
    }
    Animated.timing(this.state.scale, {
      toValue: .9,
      duration: 300
    }).start(() => this.props.onFocus(true))
  }

  ...

  <TouchableWithoutFeedback onPress={this.handlePress}>
  ```

+ `TouchableWithoutFeedback` wraps the title text
+  `handlePress()` triggers the animations and sets the `scrollEnabled` flag in _App.js_
    + `scrollEnabled` is translated to `focused` within _Moment.js_

## [Bounce a Heart Shaped Button in React Native on Press](https://egghead.io/lessons/react-bounce-a-heart-shaped-button-in-react-native-on-press)

```js
triggerLike() {
    this.setState({
      liked: !this.state.liked
    });
    Animated.spring(this.state.scale, {
      toValue: 2,
      friction: 3
    }).start(() => {
      this.state.scale.setValue(0);
    });
  }
```
+ `Animated.spring` provides bouncy character
  + Resets to zero via `start()`

```js
render() {
  const bouncyHeart = this.state.scale.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 0.8, 1]
  });
  const heartButtonStyle = {
    transform: [{ scale: bouncyHeart }]
};
``` 
+ `interpolate` takes the spring-driven value and maps it to useful scale transform values

```js
return (
    <View style={styles.container}>
      <View>
        <TouchableWithoutFeedback onPress={this.triggerLike}>
          <Animated.View style={heartButtonStyle}>
            <Heart filled={this.state.liked} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
```

+ Interesting how the concerns are separated between `TouchableWithoutFeedback` and `Animated.View`
  + The `Animated.View` containing the `Heart` scales up rather than it's children