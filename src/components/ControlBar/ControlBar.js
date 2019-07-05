// @flow

import React, { Component, } from 'react'
import { View, ActivityIndicator, } from 'react-native'
import Orientation from 'react-native-orientation-locker'

import type { ViewStyleProp, } from 'react-native'

import { Icon, TouchableButton, } from '../index'
import { ORIENTATION_TYPES, } from '../../constants'
import styles from './style'

type Props = {
  flashMode: boolean,
  isCameraReady: boolean ,
  isImage: boolean,
  toggleType: () => void,  
  takePicture: () => void,
  toggleFlashMode: () => void,
}

type State = { 
  currentContainerStyle: ?ViewStyleProp,
  currentCameraBtnStyle: ?ViewStyleProp,
}

class ControlBar extends Component<Props, State> {
  state = { 
    currentContainerStyle: null,
    currentCameraBtnStyle: null,
  }
  
  onOrientationDidChange = (orientation: string): void => {
    switch (orientation) {
      case ORIENTATION_TYPES.landscapeR:
        this.setState({
          currentContainerStyle: styles.orientationRight, 
          currentCameraBtnStyle: styles.cameraBtnRight,
        })
        break
      case ORIENTATION_TYPES.landscapeL:
        this.setState({
          currentContainerStyle: styles.orientationLeft, 
          currentCameraBtnStyle: styles.cameraBtnLeft,
        })
        break
      default:
        this.setState({
          currentContainerStyle: styles.orientationPortrait, 
          currentCameraBtnStyle: styles.cameraBtnPortrait,
        }) 
    }
  }

  componentDidMount = (): void => {
    Orientation.getDeviceOrientation(this.onOrientationDidChange)
    Orientation.addDeviceOrientationListener(this.onOrientationDidChange)
  }

  componentWillUnmount = (): void => {
    Orientation.removeDeviceOrientationListener(this.onOrientationDidChange)
  }

  render() {
    const { 
      flashMode, 
      takePicture, 
      toggleFlashMode, 
      isCameraReady, 
      isImage, 
      toggleType, 
    } = this.props
    const { currentCameraBtnStyle, currentContainerStyle, } = this.state

    if(!currentCameraBtnStyle && !currentContainerStyle) {
      return null
    }

    return (
      <View style={[styles.container, currentContainerStyle]}>
        <TouchableButton style={styles.btnIcons} onPress={toggleFlashMode}>
          <Icon name='bolt' color={flashMode ? '#3EE7AD' : '#e6e5e6'} />
        </TouchableButton>
        {isCameraReady ? (
          <TouchableButton
            style={[styles.cameraBtn, currentCameraBtnStyle]}
            onPress={takePicture}
          >
            {isImage ? (
              <Icon name='save' size={43} />
            ) : (
              <Icon name='camera' size={43} />
            )}
          </TouchableButton>
        ) : (
          <View style={[styles.cameraBtn, currentCameraBtnStyle]}>
            {isImage ? (
              <Icon name='save' size={43} />
            ) : (
              <ActivityIndicator color='#3EE7AD' size='large' />
            )}
          </View>
        )}
        {isImage ? (
          <TouchableButton style={styles.btnIcons}>
            <Icon name='redo-alt' />
          </TouchableButton>
        ) : (
          <TouchableButton style={styles.btnIcons} onPress={toggleType}>
            <Icon name='sync-alt' />
          </TouchableButton>
        )}
      </View>
    )
  }
}

export { ControlBar, }