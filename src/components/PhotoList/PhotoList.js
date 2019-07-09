// @flow

import React, { Component, type Node, } from 'react'
import { View, Image, Dimensions, } from 'react-native'
import uuidv4 from 'uuid/v4'

import { type PhotoIdentifier, } from '@react-native-community/cameraroll'
import { TouchableButton, } from '../index'
import { defineImageSizes, isHorizontalOrientation, } from '../../utils'
import styles from './style'

import {
  type PhotoSizes,
  type PhotoOrientationSizes,
  type PhotoDataType,
} from '../../types'

type Props = {
  photoList: Array<PhotoIdentifier>,
  selectPhoto: (data: PhotoDataType) => void
}

type State = {
  photoSizes: PhotoSizes,
  isHorizontal: boolean
}

class PhotoList extends Component<Props, State> {
  state = {
    photoSizes: defineImageSizes(),
    isHorizontal: isHorizontalOrientation(),
  }

  orientationHaveBeenChanged = ():void => this.setState(
    prevState => ({ isHorizontal: !prevState.isHorizontal, })  
  )

  componentDidMount = ():void => {
    Dimensions.addEventListener('change', this.orientationHaveBeenChanged)
  }

  componentWillUnmount = (): void => {
    Dimensions.removeEventListener('change', this.orientationHaveBeenChanged)
  }

  generateItems = (list: Array<PhotoIdentifier>): Array<Node> => {
    const { selectPhoto, } = this.props
    const { photoSizes, isHorizontal, } = this.state

    const currentSizeObj: PhotoOrientationSizes = isHorizontal
      ? photoSizes.horizontal
      : photoSizes.vertical

    return list.map(({ node: { image, }, }) => {
      const showCurrentPhoto = ():void => selectPhoto(image)

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

  render() {
    const { photoList, } = this.props

    return (
      <View style={styles.container}>
        {this.generateItems(photoList)}
      </View>
    )
  }
}

export { PhotoList, }