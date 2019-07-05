import React, { Component, } from 'react'
import { View, Dimensions, } from 'react-native'
import FastImage from 'react-native-fast-image'
import { RNCamera, } from 'react-native-camera'

import { ControlBar, } from '../index'
// import { isHorizontalOrientation, } from '../../utils'
import styles from './style'

class CameraPage extends Component<Props, State> {
  state = {
    flashMode: false,
    image: null,
    isCameraReady: false,
    isBackType: true,
    // isHorizontal: null,
  }

  // setResizeImageMode = ({ screen, }) => {
  //   const { width, height, } = screen
  //   const { image, } = this.state

  //   if(image) {
  //     this.setState({ isHorizontal: width > height, })
  //   }
  // }

  // componentDidMount = () => {
  //   Dimensions.addEventListener('change', this.setResizeImageMode)
  // }

  // componentWillUnmount = () => {
  //   Dimensions.addEventListener('change', this.setResizeImageMode)
  // }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, fixOrientation: true, }
      
      const data = await this.camera.takePictureAsync(options)
      this.setState({ 
        image: data, 
        // isHorizontal: isHorizontalOrientation(), 
      })
    }
  }
  
  handleCameraReady = () => {
    const { isCameraReady, } = this.state

    if (this.camera.getStatus() === 'READY') {
      this.setState({ isCameraReady: true, })
    } else if (isCameraReady) {
      this.setState({ isCameraReady: false, })
    }
  }

  toggleFlashMode = () => this.setState(prevState => ({ flashMode: !prevState.flashMode, }))

  toggleCameraType = () => this.setState(prevState => ({ isBackType: !prevState.isBackType, }))

  render() {
    const { flashMode, image, isCameraReady, isBackType, } = this.state
    const CameraConstants = RNCamera.Constants

    return (
      <View style={styles.container}>
        {image ? (
          <FastImage
            source={{ uri: image.uri, priority: FastImage.priority.high, }}
            style={styles.photoStyle}
            // resizeMode={isHorizontal ? 'contain' : 'cover'}
          />
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
              flashMode
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
          flashMode={flashMode}
          toggleFlashMode={this.toggleFlashMode}
          isCameraReady={isCameraReady}
          isImage={!!image}
          toggleType={this.toggleCameraType}
        />
      </View>
    )
  }
}

export { CameraPage, }
