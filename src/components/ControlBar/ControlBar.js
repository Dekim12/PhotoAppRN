// @flow

import React, { Component, type Node, } from 'react'
import { View, ActivityIndicator, type ViewStyleProp, } from 'react-native'
import Orientation from 'react-native-orientation-locker'

import { Icon, TouchableButton, } from '../index'
import { ORIENTATION_TYPES, } from '../../constants'
import styles from './style'

type Props = {
  flashMode: boolean,
  isCameraReady: boolean,
  isImage: boolean,
  toggleType: () => void,
  takePicture: () => void,
  toggleFlashMode: () => void,
  resetPhoto: () => void,
  savePicture: () => void,
  toggleCamera: () => void
}

type State = {
  currentBottomBarStyle: ?ViewStyleProp,
  currentCameraBtnStyle: ?ViewStyleProp,
  currentBackBtnStyle: ?ViewStyleProp
}

class ControlBar extends Component<Props, State> {
  state = {
    currentBottomBarStyle: null,
    currentCameraBtnStyle: null,
    currentBackBtnStyle: null,
  }

  onOrientationDidChange = (orientation: string): void => {
    switch (orientation) {
      case ORIENTATION_TYPES.landscapeR:
        this.setState({
          currentBottomBarStyle: styles.orientationRight,
          currentCameraBtnStyle: styles.cameraBtnRight,
          currentBackBtnStyle: styles.backBtnRight,
        })
        break
      case ORIENTATION_TYPES.landscapeL:
        this.setState({
          currentBottomBarStyle: styles.orientationLeft,
          currentCameraBtnStyle: styles.cameraBtnLeft,
          currentBackBtnStyle: styles.backBtnDefault,
        })
        break
      default:
        this.setState({
          currentBottomBarStyle: styles.orientationPortrait,
          currentCameraBtnStyle: styles.cameraBtnPortrait,
          currentBackBtnStyle: styles.backBtnDefault,
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

  defineMiddleBtn = (): Node => {
    const { isCameraReady, isImage, } = this.props

    if (isImage) {
      return <Icon name='save' size={43} />
    }

    if (isCameraReady) {
      return <Icon name='camera' size={43} />
    }

    return <ActivityIndicator color='#3EE7AD' size='large' />
  }

  render() {
    const {
      flashMode,
      takePicture,
      toggleFlashMode,
      isCameraReady,
      isImage,
      toggleType,
      resetPhoto,
      savePicture,
      toggleCamera,
    } = this.props
    const {
      currentCameraBtnStyle,
      currentBottomBarStyle,
      currentBackBtnStyle,
    } = this.state

    if (!currentCameraBtnStyle && !currentBottomBarStyle) {
      return null
    }

    return (
      <View style={styles.container}>
        <TouchableButton
          style={[styles.backBtn, currentBackBtnStyle]}
          onPress={toggleCamera}
        >
          <Icon name='arrow-left' />
        </TouchableButton>
        <View style={[styles.bottomBar, currentBottomBarStyle]}>
          <TouchableButton style={styles.btnIcons} onPress={toggleFlashMode}>
            <Icon name='bolt' color={flashMode ? '#3EE7AD' : '#e6e5e6'} />
          </TouchableButton>
          <TouchableButton
            style={[styles.cameraBtn, currentCameraBtnStyle]}
            disabled={!isCameraReady}
            onPress={isImage ? savePicture : takePicture}
          >
            {this.defineMiddleBtn()}
          </TouchableButton>
          {isImage ? (
            <TouchableButton style={styles.btnIcons} onPress={resetPhoto}>
              <Icon name='redo-alt' />
            </TouchableButton>
          ) : (
            <TouchableButton style={styles.btnIcons} onPress={toggleType}>
              <Icon name='sync-alt' />
            </TouchableButton>
          )}
        </View>
      </View>
    )
  }
}

export { ControlBar, }