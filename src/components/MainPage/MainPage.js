// @flow

import React, { useEffect, useState, } from 'react'
import { Text, View, ActivityIndicator, PermissionsAndroid, } from 'react-native'
import CameraRoll, {
  type GetPhotosParams,
  type PhotoIdentifiersPage,
  type PhotoIdentifier,
} from '@react-native-community/cameraroll'

import { TouchableButton, PhotoList, SelectedPhoto, } from '../index'
import { MAX_COUNT_LIST_PHOTOS, } from '../../constants'
import styles from './style'

import { type PhotoDataType, } from '../../types'

type Props = {
  toggleCamera: () => void
}

type InitialPhotoState = {
  photoList: ?Array<PhotoIdentifier>,
  nextChunksIndicator: ?string
}

const INITIAL_PHOTO_STATE = {
  photoList: null,
  nextChunksIndicator: null,
}

const MainPage = ({ toggleCamera, }: Props) => {
  const [{ photoList, nextChunksIndicator, }, setPhotoList] = useState(
    INITIAL_PHOTO_STATE
  );
  ({ photoList, nextChunksIndicator, }: InitialPhotoState)

  const [selectedPhotoData, setSelectedPhoto] = useState(null);
  (selectedPhotoData: ?PhotoDataType)

  const [chunkNumber, changeChunkNumber] = useState(0);
  (chunkNumber: number)

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
      first: MAX_COUNT_LIST_PHOTOS * 3,
      assetType: 'Photos',
    }

    if (nextChunksIndicator) {
      startParams.after = nextChunksIndicator
    }
    const data: PhotoIdentifiersPage = await CameraRoll.getPhotos(startParams)

    return data
  }

  const setStartData = async () => {
    checkAndroidPermission()
    const photoData: PhotoIdentifiersPage = await getPhoto()

    setPhotoList({
      photoList: photoData.edges,
      nextChunksIndicator: photoData.page_info.end_cursor || null,
    })
  }

  useEffect(() => {
    setStartData()
  }, [])

  const selectPhoto = (data: PhotoDataType): void => setSelectedPhoto(data)

  const closeSelectedPhoto = (): void => setSelectedPhoto(null)

  const getMorePhoto = async (): Promise<void> => {
    const photoData: PhotoIdentifiersPage = await getPhoto()

    if (photoList) {
      setPhotoList({
        photoList: photoList.concat(photoData.edges),
        nextChunksIndicator: photoData.page_info.end_cursor || null,
      })
    }
  }

  const showPhotoOrLoad = (showeredPhoto) => {
    if (!photoList) {
      return
    }

    if (photoList.length - showeredPhoto <= MAX_COUNT_LIST_PHOTOS) {
      getMorePhoto()
    }
    changeChunkNumber(chunkNumber + 1)
  }

  const showPhotoOrSkip = (showeredPhoto) => {
    if (!photoList) {
      return
    }

    if (showeredPhoto < photoList.length) {
      changeChunkNumber(chunkNumber + 1)
    }
  }

  const showNextList = (forward: boolean): void => {
    const countShowedPhoto: number = (chunkNumber + 1) * MAX_COUNT_LIST_PHOTOS

    if (forward && nextChunksIndicator) {
      showPhotoOrLoad(countShowedPhoto)
    } else if (forward && !nextChunksIndicator) {
      showPhotoOrSkip(countShowedPhoto)
    } else if (!forward && chunkNumber) {
      changeChunkNumber(chunkNumber - 1)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Photo List</Text>
      {photoList ? (
        <PhotoList
          photoList={photoList.slice(
            chunkNumber * MAX_COUNT_LIST_PHOTOS,
            (chunkNumber + 1) * MAX_COUNT_LIST_PHOTOS
          )}
          selectPhoto={selectPhoto}
          showNextList={showNextList}
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