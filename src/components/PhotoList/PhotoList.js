// @flow

import React, { Component, type Node, } from 'react'
import { View, Image, } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import uuidv4 from 'uuid/v4'
import { type PhotoIdentifier, } from '@react-native-community/cameraroll'

import { TouchableButton, } from '../index'
import { DimensionsChecker, } from '../DimensionsChecker'
import { defineImageSizes, } from '../../utils'
import { GESTURE_CONFIG, } from '../../constants'
import styles from './style'

import {
  type PhotoSizes,
  type PhotoOrientationSizes,
  type PhotoDataType,
} from '../../types'

type Props = {
  photoList: Array<PhotoIdentifier>,
  selectPhoto: (data: PhotoDataType) => void,
  showNextList: (forward: boolean) => void,
  isHorizontal: boolean
}

type State = {
  photoSizes: PhotoSizes
}

class PhotoList extends Component<Props, State> {
  state = {
    photoSizes: defineImageSizes(),
  }

  generateItems = (list: Array<PhotoIdentifier>): Array<Node> => {
    const { selectPhoto, isHorizontal, } = this.props
    const { photoSizes, } = this.state

    const currentSizeObj: PhotoOrientationSizes = isHorizontal
      ? photoSizes.horizontal
      : photoSizes.vertical

    return list.map(({ node: { image, }, }) => {
      const showCurrentPhoto = (): void => selectPhoto(image)

      return (
        <TouchableButton
          key={uuidv4()}
          style={styles.photoItem}
          onPress={showCurrentPhoto}
        >
          <Image
            style={{
              width: currentSizeObj.photoWidth,
              height: currentSizeObj.photoHeight,
            }}
            source={{ uri: image.uri, }}
          />
        </TouchableButton>
      )
    })
  }

  onSwipe = ({ dx, }: { dx: number }): void => {
    const { showNextList, } = this.props
    showNextList(dx < 0)
  }

  render() {
    const { photoList, } = this.props

    return (
      <GestureRecognizer
        onSwipeLeft={this.onSwipe}
        onSwipeRight={this.onSwipe}
        config={GESTURE_CONFIG}
        style={styles.gestureContainer}
      >
        <View style={styles.container}>{this.generateItems(photoList)}</View>
      </GestureRecognizer>
    )
  }
}

export const WrappedPhotoList = DimensionsChecker(PhotoList)
