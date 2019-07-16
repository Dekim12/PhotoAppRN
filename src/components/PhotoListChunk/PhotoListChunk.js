// @flow

import React, { useState, useCallback, type Node, } from 'react'
import { Image, Animated, type AnimatedValue, Dimensions, } from 'react-native'
import uuidv4 from 'uuid/v4'
import { type PhotoIdentifier, } from '@react-native-community/cameraroll'

import { TouchableButton, } from '../index'
import { useDimensions, } from '../../utils/hooks'
import { defineImageSizes, } from '../../utils'
import styles from './style'

import {
  type PhotoSizes,
  type PhotoOrientationSizes,
  type PhotoDataType,
} from '../../types'

type Props = {
  photoList: Array<PhotoIdentifier>,
  selectPhoto: (data: PhotoDataType) => void,
  chunkIndex: number,
  xOffset: AnimatedValue
}

type VoidFunction = () => void

const PhotoListChunk = ({
  photoList,
  selectPhoto,
  chunkIndex,
  xOffset,
}: Props) => {
  const [chunkWidth, changeWidth] = useState(Dimensions.get('window').width)

  const changeOrientation = ({ window, }: any): void => {
    changeWidth(window.width)  
  }

  useDimensions(changeOrientation)

  const transitionAnimation = (index: number) => ({
    transform: [
      { perspective: 800, },
      {
        scale: xOffset.interpolate({
          inputRange: [
            (index - 1) * chunkWidth,
            index * chunkWidth,
            (index + 1) * chunkWidth
          ],
          outputRange: [0.25, 1, 0.25],
        }),
      },
      {
        rotateX: xOffset.interpolate({
          inputRange: [
            (index - 1) * chunkWidth,
            index * chunkWidth,
            (index + 1) * chunkWidth
          ],
          outputRange: ['45deg', '0deg', '45deg'],
        }),
      },
      {
        rotateY: xOffset.interpolate({
          inputRange: [
            (index - 1) * chunkWidth,
            index * chunkWidth,
            (index + 1) * chunkWidth
          ],
          outputRange: ['-45deg', '0deg', '45deg'],
        }),
      }
    ],
  })

  const isHorizontal: boolean = useDimensions()
  const photoSizes: PhotoSizes = defineImageSizes()

  const generateItems = (list: Array<PhotoIdentifier>): Array<Node> => {
    const currentSizeObj: PhotoOrientationSizes = isHorizontal
      ? photoSizes.horizontal
      : photoSizes.vertical

    return list.map(({ node: { image, }, }) => {
      const showCurrentPhoto: VoidFunction = useCallback(() => {
        selectPhoto(image)
      }, [image])

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

  return (
    <Animated.View
      style={[
        styles.container,
        { width: chunkWidth, },
        transitionAnimation(chunkIndex)
      ]}
    >
      {generateItems(photoList)}
    </Animated.View>
  )
}

export { PhotoListChunk, }