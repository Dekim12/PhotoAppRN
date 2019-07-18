// @flow

import React from 'react'
import { View, Image, Animated, } from 'react-native'

import { TouchableButton, Icon, } from '../index'
import { useBackHandler, useDimensions, } from '../../utils/hooks'
import { RESIZE_MODE, } from '../../constants'
import styles from './style'

import { type PhotoDataType, } from '../../types'

type Props = {
  photoInfo: PhotoDataType,
  closeSelectedPhoto: () => void,
  scaleValue: number,
}

const SelectedPhoto = ({ photoInfo, closeSelectedPhoto, scaleValue, }: Props) => {
  const isHorizontal: boolean = useDimensions()

  const closePhotoByBackHandler = (): boolean => {
    closeSelectedPhoto()
    return true
  }

  useBackHandler(closePhotoByBackHandler)

  const defineResizeMode = (): string => {
    if (photoInfo.width < photoInfo.height) {
      return isHorizontal ? RESIZE_MODE.center : RESIZE_MODE.cover
    }

    return isHorizontal ? RESIZE_MODE.cover : RESIZE_MODE.center
  }

  Animated.spring(
    scaleValue, 
    {
      toValue: 1,        
      duration: 1000,    
      friction: 4,
      tension: 10,      
      useNativeDriver: true, 
    }
  ).start()

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleValue, }], }]}>
      <Image
        style={styles.selectedPhotoStyle}
        source={{ uri: photoInfo.uri, }}
        resizeMode={defineResizeMode()}
      />
      <TouchableButton style={styles.closeBtn} onPress={closeSelectedPhoto}>
        <Icon name='times' size={40} />
      </TouchableButton>
    </Animated.View>
  )
}

export { SelectedPhoto, }