# Canopy - Selva

forked from:
#### The Platform agnostic React Native Web Starter App
#### With Redux, Jest, Enzyme and React-Router
[More details in the release article](https://medium.com/@Or_yoffe/building-a-platform-agnostic-app-react-native-and-web-c0e82cbdda8)

```
                                             ,@@@@@@@,
                                     ,,,.   ,@@@@@@/@@,  .oo8888o.
                                  ,&%%&%&&%,@@@@@/@@@@@@,8888\88/8o
                                ,%&\%&&%&&%,@@@\@@@/@@@88\88888/88'
                               %&&%&%&/%&&%@@\@@/ /@@@88888\88888'
                                %&&%/ %&%%&&@@\ V /@@' `88\8 `/88'
                                `&%\ ` /%&'    |.|        \ '|8'
                                    |o|        | |         | |
                                    |.|        | |         | |
                                 \\/ ._\//_/__/  ,\_//__\\/.  \_//__/_
```


## Based on
- [React Native for Web (react-native-web)](https://github.com/necolas/react-native-web)
- [React Everywhere boilerplate (react-native-template-re-start)](https://github.com/react-everywhere/re-start)
- [React](https://reactjs.org/)
- [React Native](http://facebook.github.io/react-native/)
- [Redux](https://redux.js.org/)
- [React Router](https://reacttraining.com/react-router/native/)
- [Jest](https://facebook.github.io/jest/)
- [Enzyme](http://airbnb.io/enzyme/)

## Installation

- Install yarn package manager (1.3.2): `npm i -g yarn`
- Install node (minimum: node v8.9.1) through [nvm (Node version manager)](https://github.com/creationix/nvm)
- Install [adb (Android Debug Bridge)](https://developer.android.com/studio/releases/platform-tools.html)


- Clone the repo and install dependencies
```
npm -g i react-native-cli
git clone git@github.com:insurestreetltd/canopy-selva.git
cd rnw-starter-app
rm -rf .git
yarn
```

- install Xcode and android studio and follow the react native instructions [under the "Building Projects with Native Code" tab](http://facebook.github.io/react-native/docs/getting-started.html)

## Running

- Native - `yarn start`
- Web - `yarn web`
- IOS Simulator - `yarn ios`
- Android Simulator - `yarn android`

<p align="center">
<img src="https://raw.githubusercontent.com/VISI-ONE/rnw-starter-app/master/src/assets/desktop.png" height="450"  width="70%">
<img src="https://raw.githubusercontent.com/VISI-ONE/rnw-starter-app/master/src/assets/ios.png" height="450"  width="29%">
</p>

## Testing

- Eslint - `yarn lint`
- Eslint fix - `yarn lint-fix`
- Web - `yarn test:web`

- Web watch mode - `yarn test:web-watch`

- Native - `yarn test:native`

- Web watch mode - `yarn test:native-watch`

- Coverage - web `yarn coverage`
- Coverage - native `yarn coverage:native`
- Open Coverage - web `yarn open-coverage`
- Open Coverage - native `yarn open-coverage:native`

## Debugging

Open dev menu:
1. CMD+D (IOS) / CMD+M (Android)
2. Press "Enable Live-Reload"

[On real devices](http://facebook.github.io/react-native/releases/0.49/docs/running-on-device.html)
[React native docs](http://facebook.github.io/react-native/docs/debugging.html)


## Build
- WEB - run `yarn build`
- Android - [React native docs](http://facebook.github.io/react-native/releases/0.49/docs/signed-apk-android.html)
- IOS - [React native docs](http://facebook.github.io/react-native/releases/0.49/docs/running-on-device.html#building-your-app-for-production)

## Environment Variables
Environment variables available at build time will be passed into the React Codebase if they are prefixed with `REACT_APP`.

## Shortcuts
- see package.json scripts

## Styled Components

This repo uses Styled-Components instead of style sheets. The benefits of this are multiple and it is recommend to check out the styled components website for documention on this library. Here are a few examples.

```jsx
import React from 'react'
import styled from 'styled-components/native'

const Title = styled.Text`
  font-size: 30
`

const BlueTitle = styled(Title)`
  color: #0000ff
`
const RedTitle = styled(Title)`
  color: ${props => props.light ? '#ff4c4c' : '#ff000'}
`


<Title>Hello World</Title>
// black title text

<BlueTitle>Hello World</BlueTitle>
// blue title text

<RedTitle>Hello World</RedTitle>
//red title text

<RedTitle light>Hello World</RedTitle>
//light red title text
```

An extra level has been added to this functionality in this repo through the `responsive` function. This allows for strict and consistent breakpoints in an intiuitive API.
It works like this:
```
responsive(Component)({
  S: `
    color: #ff0000
  `
  M: `
    color: #000000
  `
  L:`
    color: #ffffff
  `
})
```

note: back ticks are required here to preserve the whitespace that seperates the rules. The API is the same as `styled-components`, as such functions can be interpolated too. This responsiveness can be added to a native/premitive components as well.

```
import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'
import responsive from 'utils/common'

const Title =  responsive(styled.Text`
  font-size: 30
`)({
  S: `
    color: #ff0000
  `
  M: `
    color: #000000
  `
  L:`
    color: #ffffff
  `
})


const responsiveText =  responsive(Text)({
  S: `
    color: #ff0000
  `
  M: `
    color: #000000
  `
  L:`
    color: #ffffff
  `
})
```

note: styled components pass the styles through the default style prop (and also inherit styles passed into style prop). For this reason components that come from libraries may not be able to be styled in the same way.
