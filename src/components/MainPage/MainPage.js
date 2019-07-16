// @flow

import React, { useEffect, useState, } from 'react'
import { Text, View, ActivityIndicator, PermissionsAndroid, } from 'react-native'
import CameraRoll, {
  type GetPhotosParams,
  type PhotoIdentifiersPage,
  type PhotoIdentifier,
} from '@react-native-community/cameraroll'

import { TouchableButton, PhotoList, SelectedPhoto, } from '../index'
import { MAX_PHOTO_NUMBER, } from '../../constants'
import styles from './style'

import { type PhotoDataType, } from '../../types'

type Props = {
  toggleCamera: () => void
}

const MainPage = ({ toggleCamera, }: Props) => {
  const [photoList, setPhotoList] = useState(null);
  (photoList: ?Array<PhotoIdentifier>)

  const [selectedPhotoData, setSelectedPhoto] = useState(null);
  (selectedPhotoData: ?PhotoDataType)

  const checkAndroidPermission = async (): Promise<void> => {
    try {
      const permission: string =
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      await PermissionsAndroid.request(permission)
      Promise.resolve()
    } catch (error) {
      Promise.reject(error)
    }
  }

  const getPhoto = async (): Promise<PhotoIdentifiersPage> => {
    const startParams: GetPhotosParams = {
      first: MAX_PHOTO_NUMBER,
      assetType: 'Photos',
    }

    const data: PhotoIdentifiersPage = await CameraRoll.getPhotos(startParams)
    return data
  }

  const setStartData = async () => {
    checkAndroidPermission()
    const photoData: PhotoIdentifiersPage = await getPhoto()

    setPhotoList(photoData.edges)
  }

  useEffect(() => {
    setStartData()
  }, [])

  const selectPhoto = (data: PhotoDataType): void => setSelectedPhoto(data)

  const closeSelectedPhoto = (): void => setSelectedPhoto(null)

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Photo List</Text>
      {photoList ? (
        <PhotoList
          photoList={photoList}
          selectPhoto={selectPhoto}
        />
      ) : (
        <ActivityIndicator color='#3EE7AD' size='large' />
      )}
      <TouchableButton onPress={toggleCamera} style={styles.makePhotoBtn}>
        <Text style={styles.btnText}>MAKE A PHOTO</Text>
      </TouchableButton>
      {selectedPhotoData && (
        <SelectedPhoto
          photoInfo={selectedPhotoData}
          closeSelectedPhoto={closeSelectedPhoto}
        />
      )}
    </View>
  )
}

export { MainPage, }