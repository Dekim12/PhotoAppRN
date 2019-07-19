// @flow

import React, { useEffect, useState, } from 'react'
import {
  Text,
  View,
  ActivityIndicator,
  PermissionsAndroid,
  Animated,
} from 'react-native'
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

type ChunkInfo = { chunkNumber: number, previousChunkNumber: number }

type SelectedPhotoInfo = { selectedPhotoData: ?PhotoDataType, isPhotoSelected: boolean, }

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

  const [{ selectedPhotoData, isPhotoSelected, }, setSelectedPhoto] = useState({
    selectedPhotoData: null,
    isPhotoSelected: false,
  });
  ({ selectedPhotoData, isPhotoSelected, }: SelectedPhotoInfo)

  const [{ chunkNumber, previousNumber, }, changeChunkInfo] = useState({
    chunkNumber: 0,
    previousNumber: 0,
  });
  ({ chunkNumber, previousNumber, }: ChunkInfo)

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
      first: MAX_COUNT_LIST_PHOTOS * 5,
      assetType: 'Photos',
    }

    if (nextChunksIndicator) {
      startParams.after = nextChunksIndicator
    }
    const data: PhotoIdentifiersPage = await CameraRoll.getPhotos(startParams)

    return data
  }

  const setStartData = async (): Promise<void> => {
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

  const selectPhoto = (data: PhotoDataType): void => setSelectedPhoto(
    { selectedPhotoData: data, isPhotoSelected: true, }
  )

  const closeSelectedPhoto = (): void => setSelectedPhoto(
    { selectedPhotoData: null, isPhotoSelected: true, }
  )

  const getMorePhoto = async (): Promise<void> => {
    const photoData: PhotoIdentifiersPage = await getPhoto()

    if (photoList) {
      setPhotoList({
        photoList: photoList.concat(photoData.edges),
        nextChunksIndicator: photoData.page_info.end_cursor || null,
      })
    }
  }

  const displayPhotoOrLoad = (displayedPhoto: number): void => {
    if (!photoList) {
      return
    }

    if (photoList.length - displayedPhoto <= MAX_COUNT_LIST_PHOTOS) {
      getMorePhoto()
    }
    changeChunkInfo({
      chunkNumber: chunkNumber + 1,
      previousNumber: chunkNumber,
    })
  }

  const displayPhotoOrSkip = (displayedPhoto: number): void => {
    if (!photoList) {
      return
    }

    if (displayedPhoto < photoList.length) {
      changeChunkInfo({
        chunkNumber: chunkNumber + 1,
        previousNumber: chunkNumber,
      })
    }
  }

  const showNextList = (forward: boolean): void => {
    const countShowedPhoto: number = (chunkNumber + 1) * MAX_COUNT_LIST_PHOTOS

    if(isPhotoSelected) {
      setSelectedPhoto(
        { selectedPhotoData: null, isPhotoSelected: false, }
      )
    }

    if (forward && nextChunksIndicator) {
      displayPhotoOrLoad(countShowedPhoto)
    } else if (forward && !nextChunksIndicator) {
      displayPhotoOrSkip(countShowedPhoto)
    } else if (!forward) {
      changeChunkInfo({
        chunkNumber: chunkNumber - 1,
        previousNumber: chunkNumber,
      })
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
          isLastChunk={
            (chunkNumber + 1) * MAX_COUNT_LIST_PHOTOS >= photoList.length &&
            !nextChunksIndicator
          }
          chunkNumber={chunkNumber}
          previousChunkNumber={previousNumber}
          selectedPhoto={isPhotoSelected}
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
          scaleValue={new Animated.Value(0)}
        />
      )}
    </View>
  )
}

export { MainPage, }