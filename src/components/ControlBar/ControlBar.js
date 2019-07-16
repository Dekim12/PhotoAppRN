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

  const defineMiddleBtn = (): Node => {
    if (isImage) {
      return <Icon name='save' size={43} />
    }

    if (isCameraReady) {
      return <Icon name='camera' size={43} />
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
          onPress={isImage ? savePicture : takePicture}
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