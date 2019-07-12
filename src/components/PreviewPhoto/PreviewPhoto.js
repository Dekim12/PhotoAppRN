// @flow

import React, { useState, } from 'react'
import { Image, } from 'react-native'

import { RESIZE_MODE, } from '../../constants'
import { useDimensions, } from '../../utils/hooks'
import styles from './style'

import type { PhotoType, } from '../../types'

type Props = {
  imageData: PhotoType
}

const PreviewPhoto = ({ imageData, }: Props) => {
  const [photoResizeMode, setPhotoResizeMode] = useState(RESIZE_MODE.cover);
  (photoResizeMode: string)

  const setResizeImageMode = (): void => {
    const newMode: string =
      photoResizeMode === RESIZE_MODE.cover
        ? RESIZE_MODE.contain
        : RESIZE_MODE.cover

    setPhotoResizeMode(newMode)
  }

  useDimensions(setResizeImageMode)

  return (
    <Image
      source={{ uri: imageData.uri, }}
      style={styles.photoStyle}
      resizeMode={photoResizeMode}
    />
  )
}

export { PreviewPhoto, }