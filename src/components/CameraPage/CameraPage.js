// @flow

import React, { Component, } from 'react'
import { View, PermissionsAndroid, BackHandler, } from 'react-native'
import { RNCamera, } from 'react-native-camera'
import CameraRoll from '@react-native-community/cameraroll'
import RNFS from 'react-native-fs'

import { ControlBar, PreviewPhoto, } from '../index'
import styles from './style'

import type { PhotoType, } from '../../types'

type Props = {
  toggleCamera: () => void
}

type State = {
  isFlashEnabled: boolean,
  image: ?PhotoType,
  isCameraReady: boolean,
  isBackType: boolean
}

type PhotoOptions = {
  quality: number,
  fixOrientation: boolean
}

class CameraPage extends Component<Props, State> {
  camera: any

  state = {
    isFlashEnabled: false,
    image: null,
    isCameraReady: false,
    isBackType: true,
  }

  componentDidMount = (): void => {
    BackHandler.addEventListener('hardwareBackPress', this.closeCamera)
  }

  componentWillUnmount = (): void => {
    BackHandler.removeEventListener('hardwareBackPress', this.closeCamera)
  }

  checkAndroidPermission = async (): Promise<void> => {
    try {
      const permission: string =
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      await PermissionsAndroid.request(permission)
      Promise.resolve()
    } catch (error) {
      Promise.reject(error)
    }
  }

  savePicture = async (): Promise<void> => {
    const { image, } = this.state

    if (image) {
      await this.checkAndroidPermission()
      CameraRoll.saveToCameraRoll(image.uri, 'photo')
    }
    this.resetPhoto()
  }

  takePicture = async (): Promise<void> => {
    if (this.camera) {
      const options: PhotoOptions = { quality: 0.5, fixOrientation: true, }

      const data: PhotoType = await this.camera.takePictureAsync(options)
      this.setState({ image: data, })
    }
  }

  handleCameraReady = (): void => {
    const { isCameraReady, } = this.state

    if (this.camera.getStatus() === 'READY') {
      this.setState({ isCameraReady: true, })
    } else if (isCameraReady) {
      this.setState({ isCameraReady: false, })
    }
  }

  toggleFlashMode = (): void => this.setState(prevState => ({ isFlashEnabled: !prevState.isFlashEnabled, }))

  toggleCameraType = (): void => this.setState(prevState => ({ isBackType: !prevState.isBackType, }))

  removePhotoFromCache = async (): Promise<void> => {
    const { image, } = this.state

    if (image) {
      const filePath: string = image.uri.split('///').pop()

      const isFileExists: boolean = await RNFS.exists(filePath)

      if (isFileExists) {
        RNFS.unlink(filePath)
      }
    }
  }

  resetPhoto = (): void => {
    this.removePhotoFromCache()

    this.setState({ image: null, })
  }

  closeCamera = async (): Promise<boolean> => {
    const { toggleCamera, } = this.props
    const { image, } = this.state

    if (image) {
      await this.removePhotoFromCache()
    }
    toggleCamera()

    return true
  }

  render() {
    const { isFlashEnabled, image, isCameraReady, isBackType, } = this.state
    const { Constants, } = RNCamera

    return (
      <View style={styles.container}>
        {image ? (
          <PreviewPhoto imageData={image} />
        ) : (
          <RNCamera
            ref={(ref) => {
              this.camera = ref
            }}
            style={styles.preview}
            ratio='16:9'
            captureAudio={false}
            onCameraReady={this.handleCameraReady}
            flashMode={
              isFlashEnabled
                ? Constants.FlashMode.on
                : Constants.FlashMode.off
            }
            type={
              isBackType
                ? Constants.Type.back
                : Constants.Type.front
            }
          />
        )}
        <ControlBar
          takePicture={this.takePicture}
          flashMode={isFlashEnabled}
          toggleFlashMode={this.toggleFlashMode}
          isCameraReady={isCameraReady}
          isImage={!!image}
          toggleType={this.toggleCameraType}
          resetPhoto={this.resetPhoto}
          savePicture={this.savePicture}
          toggleCamera={this.closeCamera}
        />
      </View>
    )
  }
}

export { CameraPage, }