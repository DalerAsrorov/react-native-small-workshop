# Getting Started

There are two ways to get started with `react-native`:

- [`Create React Native App`](https://github.com/react-community/create-react-native-app) - easier way to start building a new React Native app with minimal configurations.
- `Native Code` - a bit harder way. The advantage of this approach is that you can integrate native libraries with your react native app. We will go with this one in this workshop.

## Reference
This guide references the official [React Native documentation on getting started](https://facebook.github.io/react-native/docs/getting-started).

## Platform
We will be using iOS platform to build our app. React-native apps can be run on Android as well, but each platform may have different flows of setups which should be followed in order to make certain libraries work on each platform. To make this workshop easier for all of us, I chose iOS for this workshop.

## Install Node and Watchman
If you already have Node installed, make sure you have Node 8.3 or higher. Watchman is a tool by Facebook for watching changes in the filesystem. It is highly recommended you install it for better performance.
```shell
brew install node
brew install watchman
```

## Install React Native CLI
```shell
npm install -g react-native-cli
```
If you use `yarn`, you could also do:
```shell
yarn global add react-native-cli
```

## Xcode
To run the app in the simulator, you need Xcode. You can download it from [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12). Make sure you have Xcode version `9.4`.

## Running workshop

1. Fork the repository https://github.com/DalerAsrorov/react-native-small-workshop
2. `git clone https://github.com/[your username]/react-native-small-workshop.git`
3. `cd react-native-small-workshop`
4. `react-native init workshop` - creates a react native app inside of the repository.
5. `cd workshop`
6. `react-native run-ios` - this may take a little while. Do whatever.
7. After build is successfully finished, the simulator with a sample app should appear.

![Screenshot of the sample app in iOS](/docs/img/sample_app_screenshot.png "Sample app screenshot")
