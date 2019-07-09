// @flow

import React, { Component, } from 'react'
import { Text, View, ActivityIndicator, } from 'react-native'
import CameraRoll, {
  type GetPhotosParams,
  type PhotoIdentifiersPage,
  type PhotoIdentifier,
} from '@react-native-community/cameraroll'

import { TouchableButton, PhotoList, SelectedPhoto, } from '../index'
import styles from './style'

import { type PhotoDataType, } from '../../types'

type Props = {
  toggleCamera: () => void
}

type State = {
  photoList: ?Array<PhotoIdentifier>,
  selectedPhotoData: ?PhotoDataType
}

class MainPage extends Component<Props, State> {
  state = {
    photoList: null,
    selectedPhotoData: null,
  }

  componentDidMount = async () => {
    const photoData: PhotoIdentifiersPage = await this.getPhoto()
    this.setState({ photoList: photoData.edges, })
  }

  getPhoto = async (): Promise<PhotoIdentifiersPage> => {
    const startParams: GetPhotosParams = { first: 12, assetType: 'Photos', }
    const data: PhotoIdentifiersPage = await CameraRoll.getPhotos(startParams)

    return data
  }

  selectPhoto = (data: PhotoDataType): void => this.setState({ selectedPhotoData: data, })

  closeSelectedPhoto = (): void => this.setState({ selectedPhotoData: null, })

  render() {
    const { toggleCamera, } = this.props
    const { photoList, selectedPhotoData, } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.headline}>Photo List</Text>
        {photoList ? (
          <PhotoList photoList={photoList} selectPhoto={this.selectPhoto} />
        ) : (
          <ActivityIndicator color='#3EE7AD' size='large' />
        )}
        <TouchableButton onPress={toggleCamera} style={styles.makePhotoBtn}>
          <Text style={styles.btnText}>MAKE A PHOTO</Text>
        </TouchableButton>
        {selectedPhotoData && (
          <SelectedPhoto
            photoInfo={selectedPhotoData}
            closeSelectedPhoto={this.closeSelectedPhoto}
          />
        )}
      </View>
    )
  }
}

export { MainPage, }

