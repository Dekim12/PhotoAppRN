// @flow

import React, { useEffect, } from 'react'
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

const SelectedPhoto = ({
  photoInfo,
  isHorizontal,
  closeSelectedPhoto,
}: Props) => {
  const closePhotoByBackHandler = (): boolean => {
    closeSelectedPhoto()
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', closePhotoByBackHandler)

    return () => BackHandler.removeEventListener(
      'hardwareBackPress',
      closePhotoByBackHandler
    )
  })

  const defineResizeMode = (): string => {
    if (photoInfo.width < photoInfo.height) {
      return isHorizontal ? 'center' : 'cover'
    }

    return isHorizontal ? 'cover' : 'center'
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

export const WrappedSelectedPhoto = DimensionsChecker(SelectedPhoto)