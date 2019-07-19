// @flow

import React, { useEffect, useState, type Node, } from 'react'
import {
  View,
  ActivityIndicator,
  Animated,
  type ViewStyleProp,
  type AnimatedValue,
} from 'react-native'
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
  const [currentBackBtnStyle, setBarState] = useState(null);
  (currentBackBtnStyle: ?ViewStyleProp)

  const [rotationDegree, changeRotationDegree] = useState(0);
  (rotationDegree: number)

  const scaleValue: AnimatedValue = new Animated.Value(1)

  const onOrientationDidChange = (orientation: string): void => {
    switch (orientation) {
      case ORIENTATION_TYPES.landscapeR:
        setBarState(styles.backBtnRight)
        changeRotationDegree(-90)
        break
      case ORIENTATION_TYPES.landscapeL:
        setBarState(styles.backBtnLeft)
        changeRotationDegree(90)
        break
      default:
        setBarState(styles.backBtnPortrait)
        changeRotationDegree(0)
    }
  }

  useEffect(() => {
    Orientation.getDeviceOrientation(onOrientationDidChange)
    Orientation.addDeviceOrientationListener(onOrientationDidChange)
    Orientation.lockToPortrait()

    return () => Orientation.removeDeviceOrientationListener(onOrientationDidChange)
  }, [])

  const increaseAnimation = (): void => {
    scaleValue.setValue(0)

    Animated.spring(scaleValue, {
      toValue: 1,
      duration: 500,
      friction: 3,
      tension: 50,
      useNativeDriver: true,
    }).start()
  }

  const decreaseAnimation = (): void => {
    const callbackAction: boolean = isImage ? savePicture : takePicture

    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(callbackAction)
  }

  const defineMiddleBtn = (): Node => {
    const iconTransformStyle = { transform: [{ scale: scaleValue, }], }
    increaseAnimation()

    if (isImage) {
      return (
        <Animated.View style={iconTransformStyle}>
          <Icon name='save' size={43} />
        </Animated.View>
      )
    }

    if (isCameraReady) {
      return (
        <Animated.View style={iconTransformStyle}>
          <Icon name='camera' size={43} />
        </Animated.View>
      )
    }

    return <ActivityIndicator color='#3EE7AD' size='large' />
  }

  return (
    <View style={styles.container}>
      <TouchableButton
        style={[styles.backBtn, currentBackBtnStyle]}
        onPress={toggleCamera}
      >
        <Icon name='arrow-left' />
      </TouchableButton>
      <View style={styles.bottomBar}>
        <TouchableButton
          style={[styles.btnIcons, { rotation: rotationDegree, }]}
          onPress={toggleFlashMode}
        >
          <Icon name='bolt' color={flashMode ? '#3EE7AD' : '#e6e5e6'} />
        </TouchableButton>
        <TouchableButton
          style={[styles.cameraBtn, { rotation: rotationDegree, }]}
          disabled={!isCameraReady}
          onPress={decreaseAnimation}
        >
          {defineMiddleBtn()}
        </TouchableButton>
        {isImage ? (
          <TouchableButton
            style={[styles.btnIcons, { rotation: rotationDegree, }]}
            onPress={resetPhoto}
          >
            <Icon name='redo-alt' />
          </TouchableButton>
        ) : (
          <TouchableButton
            style={[styles.btnIcons, { rotation: rotationDegree, }]}
            onPress={toggleType}
          >
            <Icon name='sync-alt' />
          </TouchableButton>
        )}
      </View>
    </View>
  )
}

export { ControlBar, }