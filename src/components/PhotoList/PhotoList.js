// @flow

import React, { type Node, } from 'react'
import { View, Image, } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import uuidv4 from 'uuid/v4'
import { type PhotoIdentifier, } from '@react-native-community/cameraroll'

import { TouchableButton, } from '../index'
import { useDimensions, } from '../../utils/hooks'
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
  showNextList: (forward: boolean) => void
}

type VoidFunction = () => void

const PhotoList = ({ photoList, selectPhoto, showNextList, }: Props) => {
  const isHorizontal: boolean = useDimensions()
  const photoSizes: PhotoSizes = defineImageSizes()

  const generateItems = (list: Array<PhotoIdentifier>): Array<Node> => {
    const currentSizeObj: PhotoOrientationSizes = isHorizontal
      ? photoSizes.horizontal
      : photoSizes.vertical

    return list.map(({ node: { image, }, }) => {
      const showCurrentPhoto: VoidFunction = () => selectPhoto(image)

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

  const onSwipe = ({ dx, }): void => {
    showNextList(dx < 0)
  }

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipe}
      onSwipeRight={onSwipe}
      config={GESTURE_CONFIG}
      style={styles.gestureContainer}
      rr
    >
      <View style={styles.container}>{generateItems(photoList)}</View>
    </GestureRecognizer>
  )
}

export { PhotoList, }
