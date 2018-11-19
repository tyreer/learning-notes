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

## [Bounce a Heart Shaped Button in React Native on Press](https://github.com/browniefed/examples/tree/realworld/bouncyheart)

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

## [Create An Exploding Heart Button in React Native](https://github.com/browniefed/examples/tree/realworld/explodinghearts)

```js
this.state = {
    liked: false,
    scale: new Animated.Value(0),
    animations: [
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0)
    ]
  };
```
+ Each heart gets its own `Animated.Value`

```js
const getTransformationAnimation = (
  animation,
  scale,
  y,
  x,
  rotate,
  opacity
) => {
  const scaleAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, scale]
  });

  const xAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, x]
  });

  const yAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, y]
  });

  const rotateAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", rotate]
  });

  const opacityAnimation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, opacity]
  });

  return {
    opacity: opacityAnimation,
    transform: [
      { scale: scaleAnimation },
      { translateX: xAnimation },
      { translateY: yAnimation },
      { rotate: rotateAnimation }
    ]
  };
};
```
+ Interesting factory combining most/all natively animatable style properties


```js
const showAnimations = this.state.animations.map(animation => {
    return Animated.spring(animation, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true
    });
  });
```
+ On the way out, the hearts have a spring/bounce easing

```js
const hideAnimations = this.state.animations
  .map(animation => {
    return Animated.timing(animation, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true
    });
  })
  .reverse();
```
+ On the way back in, the hearts have a linear easing
+ `reverse()` here is _not_ a part of the Animated API, but an __array__ method telling all the animations from earlier to run in a reversed sequence

```js
   Animated.parallel([
      Animated.spring(this.state.scale, {
        toValue: 2,
        friction: 3,
        useNativeDriver: true  
      }),
      Animated.sequence([
        Animated.stagger(50, showAnimations),
        Animated.delay(100),
        Animated.stagger(50, hideAnimations)
      ])
    ]).start(() => {
      this.state.scale.setValue(0);
    });
  ```
+ Nice model of `parallel()`, `sequence()`, and `stagger()` used to coordinate a several different animations
+ Also the one place with a `start()` invocation


## [Build an Animated Floating Action Button in React Native with Springy Menu](https://github.com/browniefed/examples/tree/realworld/fab)
[springy-menu on Expo](https://exp.host/@tyreer/springy-menu)

```js
  this.state = {
      animate: new Animated.Value(0),
      fabs: [
        new Animated.Value(0),
        new Animated.Value(0),
        new Animated.Value(0)
      ]
    };
```
+ Two sets of animations

```js
handlePress() {
  const toValue = this.open ? 0 : 1;
  const flyouts = this.state.fabs.map((value, i) => {
    return Animated.spring(value, {
      toValue: (i + 1) * -90 * toValue,
      friction: 6
    });
  });

  Animated.parallel([
    Animated.timing(this.state.animate, {
      toValue,
      duration: 300
    }),
    Animated.stagger(30, flyouts)
  ]).start();

  this.open = !this.open;
}
```
+ `parallel()` starts both sets of animations
  + `timing` provides default _inOut_ easing for the 3 animations driven by the `animate` value in state
  + `flyouts` have spring easing with a height/transformY determined by each element's index

```js
  render() {
    const backgroundInterpolate = this.state.animate.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgb(90, 34, 153)", "rgb(36, 11, 63)"]
    });
    const backgroundStyle = {
      backgroundColor: backgroundInterpolate
    };
    const fabColorInterpolate = this.state.animate.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgb(24,214,255)", "rgb(255,255,255)"]
    });

    const fabRotate = this.state.animate.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "135deg"]
    });

    const fabStyle = {
      backgroundColor: fabColorInterpolate,
      transform: [
        {
          rotate: fabRotate
        }
      ]
    };
  ```

  + __animate__ drives 3 animated values
    + 1 on the container
    + 2 on the "fab" (floating action button)
    + interpolations model how different units (rgb, rgba, deg) can be driven by a single input

```js
return (
  <Animated.View style={[styles.container, backgroundStyle]}>
    <View style={styles.position}>
      {this.state.fabs.map((animation, i) => {
        return (
          <TouchableOpacity
            key={i}
            style={[
              styles.button,
              styles.fab,
              styles.flyout,
              getTransformStyle(animation)
            ]}
            onPress={this.handlePress}
          />
        );
      })}
      <TouchableOpacity onPress={this.handlePress}>
        <Animated.View style={[styles.button, fabStyle]}>
          <Text style={styles.plus}>+</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  </Animated.View>
);
```
+ `backgroundStyle` + `fabStyle` driven by __animate__

+ __getTransformStyle(animation)__ is just driving a single style attribute
  + Each animation passed in has been initialized in `handlePress`, and only the `transform` property is being returned

```js
const getTransformStyle = animation => {
  return {
    transform: [{ translateY: animation}]
  };
};
``` 

## [Use React Native to Animate a Swipe Away Comment Modal](https://github.com/browniefed/examples/tree/realworld/commentmodal)
[swipe-away-modal on Expo](https://exp.host/@tyreer/swipe-away-modal)

```js
<ScrollView
  scrollEventThrottle={16}
  onScroll={event => {
    this.scrollOffset = event.nativeEvent.contentOffset.y;
    this.scrollViewHeight =
      event.nativeEvent.layoutMeasurement.height;
  }}
  onContentSizeChange={(contentWidth, contentHeight) =>
    (this.contentHeight = contentHeight)
  }
>
```
+ `ScrollView` updates `this.scrollOffset` and `this.scrollViewHeight` (plus `this.contentHeight`)


```js
<Animated.View
  style={[styles.modal, modalStyle]}
  {...this.panResponder.panHandlers}
>
  <View style={styles.comments}>
    <ScrollView
```
+ `Animated.View` is connected with the `panResponder` by spreading `panHandlers` as props


```js
this.panResponder = PanResponder.create({
```

+ Model of `panResponder` + its crazy `create()` parameter ([docs ref](https://facebook.github.io/react-native/docs/panresponder#create))

```js
this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        const { dy } = gestureState;
        const totalScrollHeight = this.scrollOffset + this.scrollViewHeight;

        if (
          (this.scrollOffset <= 0 && dy > 0) ||
          (totalScrollHeight >= this.contentHeight && dy < 0)
        ) {
          return true;
        }
      },
```

+ __dy__ - accumulated distance of the gesture since the touch started
  + Scroll up (swiping down) = positive
  + Scroll down (swipe up) = negative

+ `(this.scrollOffset <= 0 && dy > 0)` = scrolling up when already at the top of the view
+ `(totalScrollHeight >= this.contentHeight && dy < 0)` = scrolling down when already at the bottom of the view 
+ Essentially this is a big _if-_ statement triggering the functions below

```js
  onPanResponderMove: (e, gestureState) => {
    const { dy } = gestureState;
    if (dy < 0) {
      this.animated.setValue(dy);
    } else if (dy > 0) {
      this.animatedMargin.setValue(dy);
    }
  },
```
+ If __scrolling down__ set `animated`, which begin driving _opacity_ and _translateY_ 
+ If __scrolling up__ set `animatedMargin`, which begins driving the _marginTop_ 
+ __Both__ are animated via `onPanResponderRelease()` if the scroll is large enough 


```js
 onPanResponderRelease: (e, gestureState) => {
    const { dy } = gestureState;

    // Animate away as a "swipe up"
    // Opacity and translateY are animated
    if (dy < -150) {
      Animated.parallel([
        Animated.timing(this.animated, {
          toValue: -400,
          duration: 150
        })
      ]).start();
      // Animate back to start position as a "bounce back on release"
      // Values beneath the threshold have moved the container already
      // but on release, the vertical offsets will reverse back to neutral
    } else if (dy > -150 && dy < 150) {
      Animated.parallel([
        Animated.timing(this.animated, {
          toValue: 0,
          duration: 150
        }),
        Animated.timing(this.animatedMargin, {
          toValue: 0,
          duration: 150
        })
      ]).start();
    } else if (dy > 150) {
      Animated.parallel([
        Animated.timing(this.animated, {
          toValue: 400,
          duration: 300
        })
      ]).start();
    }
  }
});
```
+ 150 is set as an arbitrary threshold to determine the length of the drag
+ In each condition, some animation will have rendered while the touch was engaged 
  + The release resolves the animation from its current state to its finished state

```js
const opacityInterpolate = this.animated.interpolate({
  inputRange: [-400, 0, 400],
  outputRange: [0, 1, 0]
});
```
+ Sharing the animated value's inputRange by interpolating down to a very different value

## [Create a Tap to Show Love React Native Animation](https://github.com/browniefed/examples/tree/realworld/periscoped)
[tap-to-love on Expo](https://exp.host/@tyreer/tap-to-love)

```js
 handleAddHeart() {
    const animation = new Animated.Value(0);
    this.setState(
      state => ({
        hearts: [
          ...state.hearts,
          { animation, start: getRandomInt(100, width - 100) }
        ]
      }),
      () => {
        Animated.timing(animation, {
          toValue: height,
          duration: 3000
        }).start();
      }
    );
  }
```
+ `setState` callback used to ensure heart is a part of state before beginning animation 

```js
<View style={StyleSheet.absoluteFill}>
```
+ __StyleSheet.absoluteFill__: "position absolute and zero positioning"

```js
<TouchableWithoutFeedback onPress={this.handleAddHeart}>
  <View style={StyleSheet.absoluteFill}>
    {this.state.hearts.map(({ animation, start }, index) => {
     
...
      const heartStyle = {
        left: start,
        transform: [
          { translateY: positionInterpolate },
          { translateX: wobbleInterpolate },
          { scale: scaleInterpolate }
        ],
        opacity: opacityInterpolate
      };

      return <Heart key={index} style={heartStyle} />;
    })}
  </View>
</TouchableWithoutFeedback>
```

+ Mapping over a set of animations
  + `animation` contains the driving value from 0–height
  + `start` is the randomized left offset

```js
const positionInterpolate = animation.interpolate({
  inputRange: [0, height],
  outputRange: [height - 50, 0]
});

const opacityInterpolate = animation.interpolate({
  inputRange: [0, height - 200],
  outputRange: [1, 0]
});

const scaleInterpolate = animation.interpolate({
  inputRange: [0, 15, 30],
  outputRange: [0, 1.2, 1],
  extrapolate: "clamp"
});

const dividedHeight = height / 6;

const wobbleInterpolate = animation.interpolate({
  inputRange: [
    0,
    dividedHeight * 1,
    dividedHeight * 2,
    dividedHeight * 3,
    dividedHeight * 4,
    dividedHeight * 5,
    dividedHeight * 6
  ],
  outputRange: [0, 15, -15, 15, -15, 15, -15],
  extrapolate: "clamp"
});
```

+ __extrapolate: "clamp"__ on `scaleInterpolate` 
  + nice model of only using the first portion of an `inputRange` then leaving a value static ("clamped")

## [Toggle Hidden Details on a React Native Event Card](https://github.com/browniefed/examples/tree/realworld/eventcard)
[toggle-hidden-details on Expo](https://exp.host/@tyreer/toggle-hidden-details)
 
  
```js
constructor(props) {
  super(props);
  this.state = {
    open: false,
    animated: new Animated.Value(0)
  };
  this.toggleCard = this.toggleCard.bind(this);
}

toggleCard() {
  this.setState(
    state => ({
      open: !state.open
    }),
    () => {
      const toValue = this.state.open ? 1 : 0;
      Animated.timing(this.state.animated, {
        toValue,
        duration: 500
      }).start();
    }
  );
}
```
+ Coordination of toggled `open` state with the `toValue` via `setState()` callback

```js
const offsetInterpolate = this.state.animated.interpolate({
  inputRange: [0, 1],
  outputRange: [191, 0]
});

const offsetStyle = {
  transform: [ { translateY: offsetInterpolate } ]
};
```

```js
 <ImageBackground
    source={Portland}
    resizeMode="cover"
    style={styles.background}
  >
    <Animated.View style={[styles.card, offsetStyle]}>
```

```js
  background: {
    width: 300,
    height: 250,
    borderRadius: 3,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,.5)"
  },
  ```

+ `offsetStyle` matches up with `styles.card`, which begins at a 191 _translateY_
+ `ImageBackground` clips via `overflow: hidden` and a fixed height