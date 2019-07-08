// @flow

import React, { Component, } from 'react'
import { View, } from 'react-native'
import { RNCamera, } from 'react-native-camera'

import { ControlBar, PreviewPhoto, } from '../index'
import styles from './style'

import type { PhotoType, } from '../../types'

type Props = {}

type State = {
  isFlashEnabled: boolean,
  image: ?PhotoType,
  isCameraReady: boolean,
  isBackType: boolean,
}

type PhotoOptions = {
  quality: number, 
  base64: boolean, 
  fixOrientation: boolean,
}

class CameraPage extends Component<Props, State> {
  camera: any

  state = {
    isFlashEnabled: false,
    image: null,
    isCameraReady: false,
    isBackType: true,
  }

  takePicture = async (): Promise<void> => {
    if (this.camera) {
      const options: PhotoOptions = { quality: 0.5, base64: true, fixOrientation: true, }

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

  resetPhoto = (): void => this.setState({ image: null, })

  render() {
    const { isFlashEnabled, image, isCameraReady, isBackType, } = this.state
    const CameraConstants = RNCamera.Constants

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
                ? CameraConstants.FlashMode.on
                : CameraConstants.FlashMode.off
            }
            type={
              isBackType
                ? CameraConstants.Type.back
                : CameraConstants.Type.front
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
        />
      </View>
    )
  }
}

export { CameraPage, }
