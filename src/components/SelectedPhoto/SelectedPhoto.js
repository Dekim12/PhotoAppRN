// @flow

import React from 'react'
import { View, Image, } from 'react-native'

import { TouchableButton, Icon, } from '../index'
import { useBackHandler, useDimensions, } from '../../utils/hooks'
import { RESIZE_MODE, } from '../../constants'
import styles from './style'

import { type PhotoDataType, } from '../../types'

type Props = {
  photoInfo: PhotoDataType,
  closeSelectedPhoto: () => void
}

const SelectedPhoto = ({ photoInfo, closeSelectedPhoto, }: Props) => {
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

  return (
    <View style={styles.container}>
      <Image
        style={styles.selectedPhotoStyle}
        source={{ uri: photoInfo.uri, }}
        resizeMode={defineResizeMode()}
      />
      <TouchableButton style={styles.closeBtn} onPress={closeSelectedPhoto}>
        <Icon name='times' size={40} />
      </TouchableButton>
    </View>
  )
}

export { SelectedPhoto, }