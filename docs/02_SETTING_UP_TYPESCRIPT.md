# Setting Up TypeScript

In this section, we are going to set up Typescript for the project.

## Reference

This guide references the official [React Native Typescript starter](https://github.com/Microsoft/TypeScript-React-Native-Starter). Feel free to follow the guidelines in this starter instead.

## Installing Typescript

We need to install typescript as well as typscript transformer with other dependencies for React Native:

```
yarn add --dev typescript react-native-typescript-transformer
yarn add --dev @types/react @types/react-native
yarn tsc --init --pretty --jsx react
touch rn-cli.config.js
```

The tsconfig.json file contains all the settings for the TypeScript compile. The defaults created by the command above are mostly fine, but open the file and uncomment the following line:

```js
{
  ...
  // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
  ...
}
```

The `rn-cli.config.js` contains the settings for the React Native TypeScript Transformer. Open it and add the following:

```
module.exports = {
  getTransformModulePath() {
    return require.resolve("react-native-typescript-transformer");
  },
  getSourceExts() {
    return ["ts", "tsx"];
  }
};
```

## Migrating Code to TypeScript

- Rename the `App.js` file to `App.tsx`
- `index.js` should have `.js` extension as before.
- From now on, any file that contains React code should have `.tsx` extension while non-React code should have a `.ts` extension (except for `index.js` as you may recall).

## Before you run `react-run run-ios`

Add two new scripts to `package.json`:

```diff
  "scripts": {
    "start": "node node_modules/react-native/local-cli/cli.js start",
    "test": "jest",
+   "ios": "react-native run-ios",
+   "ios:clean": "rm -rf ios/build/; yarn ios"
  },
```

Now you can run commands like `yarn ios` or `yarn ios:clean` just using `yarn` or `npm` (e.g. `npm run ios`). The `yarn ios:clean` command removes the `ios` build directory. Sometimes the issues come up when the old settings mess up with the new ones. You may encounter that after installing typescript. If you do, just try running the app with `yarn ios:clean` instead.

Your `package.json` may now look like this:

```json
...
  "scripts": {
    "start": "node node_modules/react-native/local-cli/cli.js start",
    "test": "jest",
    "ios": "react-native run-ios",
    "ios:clean": "rm -rf ios/build/; yarn ios"
  },
  "dependencies": {
    "react": "16.4.1",
    "react-native": "0.56.0"
  },
  "devDependencies": {
    "@types/react": "^16.4.13",
    "@types/react-native": "^0.56.15",
    "babel-jest": "23.4.2",
    "babel-preset-react-native": "^5",
    "jest": "23.5.0",
    "react-native-typescript-transformer": "^1.2.10",
    "react-test-renderer": "16.4.1",
    "typescript": "^3.0.3"
  },
...
```

## Making sure TypeScript works

In `App.tsx`:

```diff
import React from 'react';
- import { Platform, StyleSheet, Text, View } from 'react-native';
+ import { StyleSheet, Text, View } from 'react-native';

- const instructions = Platform.select({
-   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
-   android:
-     'Double tap R on your keyboard to reload,\n' +
-     'Shake or press menu button for dev menu'
- });

+ const MyMessage = ({ text }: { name: string }): React.ReactElement<Element> => (
+   <View>
+     <Text>{ text }</Text>
+   </View>
+ );

type Props = {};
export default class App extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
-        <Text style={styles.welcome}>Welcome to React Native!</Text>
-        <Text style={styles.instructions}>To get started, edit App.js</Text>
-        <Text style={styles.instructions}>{instructions}</Text>
+        <MyMessage text="Hello World" />
      </View>
    );
  }
}
```

We removed `MyMessage` a component that contains `text` property and renders the passed in text.

## Running Typescript with new component

```shell
yarn ios:clean
```

:warning: **Note:** you may not need to run `yarn ios:clean` that often (or at all). It's still safe to have this command handy when issues show up and they do show up quite often from my experience. Sorry to tell you.
