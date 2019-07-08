// @flow

import React, { Component, } from 'react'
import { Dimensions, Image , } from 'react-native'

import { PHOTO_MODE, } from '../../constants'
import styles from './style'

import type { PhotoType, } from '../../types'

type Props = {
  imageData: PhotoType
}

type State = {
  photoResizeMode: string
}

class PreviewPhoto extends Component<Props, State> {
  state = {
    photoResizeMode: PHOTO_MODE.cover,
  }

  setResizeImageMode = (): void => {
    const { photoResizeMode, } = this.state
    const newMode: string =
      photoResizeMode === PHOTO_MODE.cover
        ? PHOTO_MODE.contain
        : PHOTO_MODE.cover

    this.setState({ photoResizeMode: newMode, })
  }

  componentDidMount = (): void => {
    Dimensions.addEventListener('change', this.setResizeImageMode)
  }

  componentWillUnmount = (): void => {
    Dimensions.removeEventListener('change', this.setResizeImageMode)
  }

  render() {
    const { imageData, } = this.props
    const { photoResizeMode, } = this.state

    return (
      <Image
        source={{ uri: imageData.uri, }}
        style={styles.photoStyle}
        resizeMode={photoResizeMode}
      />
    )
  }
}

export { PreviewPhoto, }