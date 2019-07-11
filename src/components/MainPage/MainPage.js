// @flow

import React, { Component, } from 'react'
import { Text, View, ActivityIndicator, PermissionsAndroid, } from 'react-native'
import CameraRoll, {
  type GetPhotosParams,
  type PhotoIdentifiersPage,
  type PhotoIdentifier,
} from '@react-native-community/cameraroll'

import {
  TouchableButton,
  WrappedPhotoList,
  WrappedSelectedPhoto,
} from '../index'
import { MAX_COUNT_LIST_PHOTOS, } from '../../constants'
import styles from './style'

import { type PhotoDataType, } from '../../types'

type Props = {
  toggleCamera: () => void
}

type State = {
  photoList: ?Array<PhotoIdentifier>,
  selectedPhotoData: ?PhotoDataType,
  chunkNumber: number,
  nextChunksIndicator: ?string
}

class MainPage extends Component<Props, State> {
  state = {
    photoList: null,
    selectedPhotoData: null,
    chunkNumber: 0,
    nextChunksIndicator: null,
  }

  checkAndroidPermission = async (): Promise<void> => {
    try {
      const permission: string =
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      await PermissionsAndroid.request(permission)
      Promise.resolve()
    } catch (error) {
      Promise.reject(error)
    }
  }

  componentDidMount = async (): Promise<void> => {
    this.checkAndroidPermission()
    const photoData: PhotoIdentifiersPage = await this.getPhoto()

    this.setState({
      photoList: photoData.edges,
      nextChunksIndicator: photoData.page_info.end_cursor || null,
    })
  }

  getPhoto = async (): Promise<PhotoIdentifiersPage> => {
    const { nextChunksIndicator, } = this.state
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

  selectPhoto = (data: PhotoDataType): void => this.setState({ selectedPhotoData: data, })

  closeSelectedPhoto = (): void => this.setState({ selectedPhotoData: null, })

  getMorePhoto = async (): Promise<void> => {
    const { photoList, } = this.state
    const photoData: PhotoIdentifiersPage = await this.getPhoto()

    if (photoList) {
      this.setState({
        photoList: photoList.concat(photoData.edges),
        nextChunksIndicator: photoData.page_info.end_cursor || null,
      })
    }
  }

  showNextList = (forward: boolean): void => {
    const { chunkNumber, nextChunksIndicator, photoList, } = this.state
    const countShowedPhoto: number = (chunkNumber + 1) * MAX_COUNT_LIST_PHOTOS

    if (!photoList) {
      return
    }

    if (forward && nextChunksIndicator) {
      if (photoList.length - countShowedPhoto <= MAX_COUNT_LIST_PHOTOS) {
        this.getMorePhoto()
      }

      this.setState({ chunkNumber: chunkNumber + 1, })
    } else if (forward && !nextChunksIndicator) {
      if (countShowedPhoto < photoList.length) {
        this.setState({ chunkNumber: chunkNumber + 1, })
      }
    } else if (!forward && chunkNumber) {
      this.setState({ chunkNumber: chunkNumber - 1, })
    }
  }

  render() {
    const { toggleCamera, } = this.props
    const { photoList, selectedPhotoData, chunkNumber, } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Photo List</Text>
        {photoList ? (
          <WrappedPhotoList
            photoList={photoList.slice(
              chunkNumber * MAX_COUNT_LIST_PHOTOS,
              (chunkNumber + 1) * MAX_COUNT_LIST_PHOTOS
            )}
            selectPhoto={this.selectPhoto}
            showNextList={this.showNextList}
          />
        ) : (
          <ActivityIndicator color='#3EE7AD' size='large' />
        )}
        <TouchableButton onPress={toggleCamera} style={styles.makePhotoBtn}>
          <Text style={styles.btnText}>MAKE A PHOTO</Text>
        </TouchableButton>
        {selectedPhotoData && (
          <WrappedSelectedPhoto
            photoInfo={selectedPhotoData}
            closeSelectedPhoto={this.closeSelectedPhoto}
          />
        )}
      </View>
    )
  }
}

export { MainPage, }