# Notes on React Navigation for Native Mobile Applications
https://egghead.io/courses/react-navigation-for-native-mobile-applications

[Repo](https://github.com/eggheadio-projects/react-native-navigation-for-mobile-applications/)


### [React-Native Modal](https://github.com/eggheadio-projects/react-native-navigation-for-mobile-applications/blob/03-react-native-use-the-react-native-modal-component-with-react-navigation/App/react-native-modal/index.js)

+ Can use _screenProps_ within any component that's _registered with a navigator_

+ Below, _Home_ is registered with the navigator, so it has access to the top-level _App_ component's _changeModalVisibility()_ via __screenProps__

```js
const MainAppStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
    },
  },
  ...
});
```

```js
class App extends React.Component {
  state = {
    modalVisible: false,
  };

  changeModalVisiblity = (modalVisible = false) => {
    this.setState({ modalVisible });
  };

render() {
    return (
      <View style={{ flex: 1 }}>
        <MainAppStack
          screenProps={{ changeModalVisibility: this.changeModalVisibility }}
        />
        <Modal
          visible={this.state.modalVisible}
          animationType="fade"
        >
```

```js

const Home = ({ navigation, screenProps }) => (
  <SafeAreaView>
    <Button
      title="Go to details"
      onPress={() => navigation.navigate("Details")}
    />
    <Button title="Go to modal" onPress={() => screenProps.changeModalVisiblity(true)} />
  </SafeAreaView>
);
```

### [Auth-Flow](https://github.com/eggheadio-projects/react-native-navigation-for-mobile-applications/blob/04-react-native-create-an-authentication-flow-with-react-navigation/App/auth-flow/index.js)

+ __Linking__

```js
import { ScrollView, Text, Linking, View } from "react-native";
...
onPress={() => Linking.openURL(url)}
```

+ __react-native-elements__

+ Not wired up to use the form input, but close to a form example

```js
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
```

+ Model of two navigators conditionally rendered from base App component

```js
const AuthStack = createStackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up"
    }
  },
...
});

const PrimaryApp = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="home" size={26} color={tintColor} />
      )
    }
  },
...
});

class App extends React.Component {
 ...

  render() {
    const { isAuthorized, checkingInitialAuth } = this.state;
    if (checkingInitialAuth) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      );
    } else if (isAuthorized) {
      return <PrimaryApp screenProps={{ signOut: this.signOut }} />;
    } else {
      return <AuthStack screenProps={{ signIn: this.signIn }} />;
    }

  export default App;
```

### [Modal From Tab Bar](https://github.com/eggheadio-projects/react-native-navigation-for-mobile-applications/blob/05-react-native-open-a-modal-from-tab-bar-in-react-navigation/App/modal-from-tab-bar/index.js)

Allows tab press to open a modal from the bottom of the screen

+ __MaterialCommunityIcons__ 
+ _screen_ key is just generic _View_ component
+ _navigationOptions_ is given a function
+ _tabBarOnPress_ overrides the default onPress behavior
+ _tintColor_ must be passed through navigator

```js
  import { MaterialCommunityIcons } from "@expo/vector-icons";
  ...

const MainApp = createBottomTabNavigator({
  New: {
    screen: View,
    navigationOptions: ({ navigation }) => ({
      title: "New",
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons color={tintColor} name="plus" size={26} />
      ),
      tabBarOnPress: () => {
        navigation.navigate("Modal");
      }
    })
  },
```

+ Options object with _mode: modal_

```js
const RootNavigator = createStackNavigator(
  {
    MainApp: {
      screen: MainApp
    },
    Modal: {
      screen: ModalScreen
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);
```

### [Override default transition with createStackNavigator + transitionConfig](https://github.com/eggheadio-projects/react-native-navigation-for-mobile-applications/blob/08-react-native-override-default-transitions-in-react-native-with-stacknavigator-s-transitionconfig-object/App/custom-transition/index.js)

+ The navigator has a __transitionConfig__, which is passed as a second argument

```js
const MainAppStack = createStackNavigator({
  Home: {
    screen: Home,
  ...
}, {
  transitionConfig: () => {
    return {
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    };
  },
});
```


### [Build fine grained screen transitions with a custom React navigation interpolator](https://github.com/eggheadio-projects/react-native-navigation-for-mobile-applications/blob/09-react-native-build-fine-grained-screen-transitions-with-a-custom-react-navigation-interpolator/App/custom-screen-interpolator/index.js)

```js
transitionConfig: () => {
    return {
      transitionSpec: {
        ...
      },
      screenInterpolator: interpolator,
      headerTitleInterpolator: interpolator,
      headerLeftInterpolator: interpolator,
      headerRightInterpolator: interpolator,
    };
  },
});
```

```js
const interpolator = (sceneProps) => {
  const { layout, position, scene } = sceneProps;

  const opacity = position.interpolate({
    inputRange: [scene.index - 1, scene.index, scene.index + 1],
    outputRange: [0, 1, 0],
  });

  const scale = position.interpolate({
    inputRange: [scene.index - 1, scene.index, scene.index + 1],
    outputRange: [0.8, 1, 1],
  });

  const height = layout.initHeight;
  const translateY = position.interpolate({
    inputRange: [scene.index - 1, scene.index, scene.index + 1],
    outputRange: [height, 0, 0],
  });

  return {
    opacity,
    transform: [
      { scale },
      { translateY },
    ],
  }
}
```