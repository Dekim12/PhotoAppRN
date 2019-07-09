// @flow

import React, { Component, } from 'react'
import { View, Image, Dimensions, BackHandler, } from 'react-native'

import { TouchableButton, Icon, } from '../index'
import { isHorizontalOrientation, } from '../../utils'
import styles from './style'

import { type PhotoDataType, } from '../../types'

type Props = {
  photoInfo: PhotoDataType,
  closeSelectedPhoto: () => void
}

type State = {
  isHorizontal: boolean
}

class SelectedPhoto extends Component<Props, State> {
  state = {
    isHorizontal: isHorizontalOrientation(),
  }

  orientationHaveBeenChanged = (): void => this.setState(
    prevState => ({ isHorizontal: !prevState.isHorizontal, })
  )

  closePhotoByBackHandler = (): boolean => {
    const { closeSelectedPhoto, } = this.props

    closeSelectedPhoto()
    return true
  }

  componentDidMount = (): void => {
    Dimensions.addEventListener('change', this.orientationHaveBeenChanged)
    BackHandler.addEventListener('hardwareBackPress', this.closePhotoByBackHandler)
  }

  componentWillUnmount = (): void => {
    Dimensions.removeEventListener('change', this.orientationHaveBeenChanged)
    BackHandler.removeEventListener('hardwareBackPress', this.closePhotoByBackHandler)
  }

  defineResizeMode = (): string => {
    const { photoInfo, } = this.props
    const { isHorizontal, } = this.state

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

export { SelectedPhoto, }