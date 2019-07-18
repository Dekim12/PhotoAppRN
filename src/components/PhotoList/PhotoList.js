// @flow

import React, { type Node, } from 'react'
import { View, Image, Animated, Dimensions, } from 'react-native'
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
  isFirstChunk: boolean,
}

type VoidFunction = () => void

const PhotoList = ({ photoList, selectPhoto, showNextList, isLastChunk, isFirstChunk, }: Props) => {
  const isHorizontal: boolean = useDimensions()
  const photoSizes: PhotoSizes = defineImageSizes()
  const windowWidth = Dimensions.get('window').width

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

  // const swipeAnimation = () => {
  //   Animated.timing(
  //     listСoordinate, 
  //     {
  //       toValue: -150,        
  //       duration: 500,       
  //       useNativeDriver: true, 
  //     }
  //   ).start()
  // }

  const onSwipe = ({ dx, }): void => {
    showNextList(dx < 0)
  }
  
  // const listСoordinate = new Animated.Value()

  // const onSwipe = ({ dx, }): void => {
  //   Animated.timing(
  //     listСoordinate, 
  //     {
  //       toValue: dx > 0 ? windowWidth : -windowWidth,        
  //       duration: 300,       
  //       useNativeDriver: true, 
  //     }
  //   ).start(() => showNextList(dx < 0))
  // }

  // const startAnimation = () => {
  //   listСoordinate.setValue(Dimensions.get('window').width)

  //   Animated.spring(
  //     listСoordinate, 
  //     {
  //       toValue: 1,        
  //       duration: 600,    
  //       friction: 4,
  //       tension: 30,      
  //       useNativeDriver: true, 
  //     }
  //   ).start()
  // }

  // startAnimation()

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipe}
      onSwipeRight={onSwipe}
      config={GESTURE_CONFIG}
      style={styles.gestureContainer}
    >
      {/* <Animated.View style={[styles.container, { transform: [{ translateX: listСoordinate, }], }]} >*/}
      <Animated.View style={[styles.container]}>
        {generateItems(photoList)}
      </Animated.View>
    </GestureRecognizer>
  )
}

export { PhotoList, }
