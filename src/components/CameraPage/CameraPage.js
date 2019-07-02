import React, { Component, } from 'react'
import { View, } from 'react-native'
import FastImage from 'react-native-fast-image'
import { RNCamera, } from 'react-native-camera'
import { ControlBar, } from '../index'
import styles from './style'

class CameraPage extends Component {
  state = {
    flashMode: false,
    image: null,
    isCameraReady: false,
    isBackType: true,
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, }
      const data = await this.camera.takePictureAsync(options)
      // console.log(data)
      this.setState({ image: data.uri, })
    }
  }

  toggleFlashMode = () => this.setState(prevState => ({ flashMode: !prevState.flashMode, }))

  toggleCameraType = () => this.setState(prevState => ({ isBackType: !prevState.isBackType, }))

  handleCameraReady = () => {
    const { isCameraReady, } = this.state

    if(this.camera.getStatus() === 'READY') {
      this.setState({ isCameraReady: true, })
    } else if(isCameraReady) {
      this.setState({ isCameraReady: false, })
    }
  }
  
  render (){ 
    const { flashMode, image, isCameraReady, isBackType, } = this.state
    const CameraConstants = RNCamera.Constants

  return(
      <View style={styles.container}>
        { image ? <FastImage source={{ uri: image, priority: FastImage.priority.high,}} style={{ width: '100%', height: '100%', }}/> :
          <RNCamera ref={ref => { this.camera = ref}}
            style={styles.preview}
            captureAudio={false}
            onCameraReady={this.handleCameraReady}
            flashMode={flashMode ? CameraConstants.FlashMode.on : CameraConstants.FlashMode.off}
            type={isBackType ? CameraConstants.Type.back : CameraConstants.Type.front}
          /> 
        }
        <ControlBar takePicture={this.takePicture} flashMode={flashMode} toggleFlashMode={this.toggleFlashMode} isCameraReady={isCameraReady} isImage={!!image} toggleType={this.toggleCameraType}/>
      </View>
    )}}

export { CameraPage, }