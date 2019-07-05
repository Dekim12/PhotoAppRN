// @flow

import React, { Component, } from 'react'
import { StyleSheet, View, StatusBar, } from 'react-native'

import { MainPage, CameraPage, } from './components'


type Props = {}

type State = {
  isCamera: boolean
}

export default class App extends Component<Props, State> {
  state = {
    isCamera: false,
  }

  toggleCamera = () => this.setState({ isCamera: true, })

  render() {
    const { isCamera, } = this.state

    return (
      <View style={styles.container}>
        <StatusBar hidden />          
        {isCamera ? <CameraPage /> : <MainPage toggleCamera={this.toggleCamera}/>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
