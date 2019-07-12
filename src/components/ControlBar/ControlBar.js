// @flow

import React, { useEffect, useState, type Node, } from 'react'
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

const INITIAL_BAR_STATE = {
  currentBottomBarStyle: null,
  currentCameraBtnStyle: null,
  currentBackBtnStyle: null,
}

const ControlBar = ({
  flashMode,
  takePicture,
  toggleFlashMode,
  isCameraReady,
  isImage,
  toggleType,
  resetPhoto,
  savePicture,
  toggleCamera,
}: Props) => {
  const [
    { currentBottomBarStyle, currentCameraBtnStyle, currentBackBtnStyle, },
    setBarState
  ] = useState(INITIAL_BAR_STATE);
  ({
    currentBottomBarStyle,
    currentCameraBtnStyle,
    currentBackBtnStyle,
  }: State)

  const onOrientationDidChange = (orientation: string): void => {
    switch (orientation) {
      case ORIENTATION_TYPES.landscapeR:
        setBarState({
          currentBottomBarStyle: styles.orientationRight,
          currentCameraBtnStyle: styles.cameraBtnRight,
          currentBackBtnStyle: styles.backBtnRight,
        })
        break
      case ORIENTATION_TYPES.landscapeL:
        setBarState({
          currentBottomBarStyle: styles.orientationLeft,
          currentCameraBtnStyle: styles.cameraBtnLeft,
          currentBackBtnStyle: styles.backBtnDefault,
        })
        break
      default:
        setBarState({
          currentBottomBarStyle: styles.orientationPortrait,
          currentCameraBtnStyle: styles.cameraBtnPortrait,
          currentBackBtnStyle: styles.backBtnDefault,
        })
    }
  }

  useEffect(() => {
    Orientation.getDeviceOrientation(onOrientationDidChange)
    Orientation.addDeviceOrientationListener(onOrientationDidChange)

    return () => Orientation.removeDeviceOrientationListener(onOrientationDidChange)
  }, [])

  const defineMiddleBtn = (): Node => {
    if (isImage) {
      return <Icon name='save' size={43} />
    }

    if (isCameraReady) {
      return <Icon name='camera' size={43} />
    }

    return <ActivityIndicator color='#3EE7AD' size='large' />
  }

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
          {defineMiddleBtn()}
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

export { ControlBar, }