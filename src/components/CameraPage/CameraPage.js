// @flow

import React, { Component, } from 'react'
import { Text, View, } from 'react-native'
import { RNCamera, } from 'react-native-camera'
import { ControlBar, } from '../index'
import styles from './style'

type Props = {}

class CameraPage extends Component<Props> {
  
  render (){ 

  return(
      <View style={styles.container}>
        <RNCamera ref={ref => { this.camera = ref}}
          style={{ flex: 1, width: '100%', }}
        ><ControlBar /></RNCamera>
      </View>
    )}}

export { CameraPage, }