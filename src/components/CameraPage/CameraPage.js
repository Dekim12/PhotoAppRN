// @flow

import React, { useState, } from 'react'
import { View, PermissionsAndroid, } from 'react-native'
import { RNCamera, } from 'react-native-camera'
import CameraRoll from '@react-native-community/cameraroll'
import RNFS from 'react-native-fs'

import { ControlBar, PreviewPhoto, } from '../index'
import { useBackHandler, } from '../../utils/hooks'
import styles from './style'

import type { PhotoType, } from '../../types'

type Props = {
  toggleCamera: () => void
}

type PhotoOptions = {
  quality: number,
  fixOrientation: boolean
}

const CameraPage = ({ toggleCamera, }: Props) => {
  const { Constants, } = RNCamera
  let camera: any = null

  const [isFlashEnabled, changeFlashMode] = useState(false);
  (isFlashEnabled: boolean)

  const [image, setImage] = useState(null);
  (image: ?PhotoType)

  const [isCameraReady, changeCameraState] = useState(false);
  (isCameraReady: boolean)

  const [isBackType, changeCameraType] = useState(true);
  (isBackType: boolean)

  const checkAndroidPermission = async (): Promise<void> => {
    try {
      const permission: string =
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      await PermissionsAndroid.request(permission)
      Promise.resolve()
    } catch (error) {
      Promise.reject(error)
    }
  }

  const removePhotoFromCache = async (): Promise<void> => {
    if (image) {
      const filePath: string = image.uri.split('///').pop()
      const isFileExists: boolean = await RNFS.exists(filePath)

      if (isFileExists) {
        RNFS.unlink(filePath)
      }
    }
  }

  const closeCamera = async (): Promise<boolean> => {
    if (image) {
      await removePhotoFromCache()
    }
    toggleCamera()

    return true
  }

  useBackHandler(closeCamera)

  const resetPhoto = (): void => {
    removePhotoFromCache()
    setImage(null)
  }

  const savePicture = async (): Promise<void> => {
    if (image) {
      await checkAndroidPermission()
      CameraRoll.saveToCameraRoll(image.uri, 'photo')
    }
    resetPhoto()
  }

  const takePicture = async (): Promise<void> => {
    if (camera) {
      const options: PhotoOptions = { quality: 0.5, fixOrientation: true, }

      const data: PhotoType = await camera.takePictureAsync(options)
      setImage(data)
    }
  }

  const handleCameraReady = (): void => {
    if (camera.getStatus() === 'READY') {
      changeCameraState(true)
    } else if (isCameraReady) {
      changeCameraState(false)
    }
  }

  const toggleFlashMode = (): void => changeFlashMode(!isFlashEnabled)

  const toggleCameraType = (): void => changeCameraType(!isBackType)

  const setRef = (ref): void => {
    camera = ref
  }

  return (
    <View style={styles.container}>
      {image ? (
        <PreviewPhoto imageData={image} />
      ) : (
        <RNCamera
          ref={setRef}
          style={styles.preview}
          ratio='16:9'
          captureAudio={false}
          onCameraReady={handleCameraReady}
          flashMode={
            isFlashEnabled ? Constants.FlashMode.on : Constants.FlashMode.off
          }
          type={isBackType ? Constants.Type.back : Constants.Type.front}
        />
      )}
      <ControlBar
        takePicture={takePicture}
        flashMode={isFlashEnabled}
        toggleFlashMode={toggleFlashMode}
        isCameraReady={isCameraReady}
        isImage={!!image}
        toggleType={toggleCameraType}
        resetPhoto={resetPhoto}
        savePicture={savePicture}
        toggleCamera={closeCamera}
      />
    </View>
  )
}

export { CameraPage, }