// @flow

import React, { type Node, } from 'react'
import { Image, Animated, Dimensions, type AnimatedValue, } from 'react-native'
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
  showNextList: (forward: boolean) => void,
  isLastChunk: boolean,
  chunkNumber: number,
  previousChunkNumber: number
}

type VoidFunction = () => void

const PhotoList = ({
  photoList,
  selectPhoto,
  showNextList,
  isLastChunk,
  chunkNumber,
  previousChunkNumber,
}: Props) => {
  const isHorizontal: boolean = useDimensions()
  const photoSizes: PhotoSizes = defineImageSizes()
  const listСoordinate: AnimatedValue = new Animated.Value(0)
  const windowWidth: number = Dimensions.get('window').width

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

  const swipeAnimation = (offset: number, callback: () => void): void => {
    Animated.timing(listСoordinate, {
      toValue: offset,
      duration: 400,
      useNativeDriver: true,
    }).start(callback)
  }

  const defineAnimation = (isRightSwipe: boolean): void => {
    if (
      (isRightSwipe && !isLastChunk) ||
      (!isRightSwipe && Boolean(chunkNumber))
    ) {
      const offsetValue = isRightSwipe ? -windowWidth : windowWidth
      const afterSwipeCallback = () => showNextList(isRightSwipe)

      swipeAnimation(offsetValue, afterSwipeCallback)
    }
  }

  const onSwipe = ({ dx, }): void => {
    defineAnimation(dx < 0)
  }

  if (previousChunkNumber !== chunkNumber) {
    listСoordinate.setValue(
      previousChunkNumber > chunkNumber ? -windowWidth : windowWidth
    )

    Animated.spring(listСoordinate, {
      toValue: 1,
      duration: 600,
      friction: 4,
      tension: 30,
      useNativeDriver: true,
    }).start()
  }

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipe}
      onSwipeRight={onSwipe}
      config={GESTURE_CONFIG}
      style={styles.gestureContainer}
    >
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateX: listСoordinate, }], }
        ]}
      >
        {generateItems(photoList)}
      </Animated.View>
    </GestureRecognizer>
  )
}

export { PhotoList, }
