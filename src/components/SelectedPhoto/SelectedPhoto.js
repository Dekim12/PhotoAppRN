// @flow

import React, { Component, } from 'react'
import { View, Image, BackHandler, } from 'react-native'

import { TouchableButton, Icon, } from '../index'
import { DimensionsChecker, } from '../DimensionsChecker'
import styles from './style'

import { type PhotoDataType, } from '../../types'

type Props = {
  photoInfo: PhotoDataType,
  isHorizontal: boolean,
  closeSelectedPhoto: () => void
}

class SelectedPhoto extends Component<Props> {
  closePhotoByBackHandler = (): boolean => {
    const { closeSelectedPhoto, } = this.props

    closeSelectedPhoto()
    return true
  }

  componentDidMount = (): void => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.closePhotoByBackHandler
    )
  }

  componentWillUnmount = (): void => {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.closePhotoByBackHandler
    )
  }

  defineResizeMode = (): string => {
    const { photoInfo, isHorizontal, } = this.props

    if (photoInfo.width < photoInfo.height) {
      return isHorizontal ? 'center' : 'cover'
    }

    return isHorizontal ? 'cover' : 'center'
  }

  render() {
    const { photoInfo, closeSelectedPhoto, } = this.props

    return (
      <View style={styles.container}>
        <Image
          style={styles.selectedPhotoStyle}
          source={{ uri: photoInfo.uri, }}
          resizeMode={this.defineResizeMode()}
        />
        <TouchableButton style={styles.closeBtn} onPress={closeSelectedPhoto}>
          <Icon name='times' size={40} />
        </TouchableButton>
      </View>
    )
  }
}

export const WrappedSelectedPhoto = DimensionsChecker(SelectedPhoto)