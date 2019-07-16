// @flow

import React, { type Node, } from 'react'
import { Animated, type AnimatedValue, } from 'react-native'
import uuidv4 from 'uuid/v4'
import { type PhotoIdentifier, } from '@react-native-community/cameraroll'

import { PhotoListChunk, } from '../index'
import { MAX_COUNT_LIST_PHOTOS, } from '../../constants'
import { type PhotoDataType, } from '../../types'

type Props = {
  photoList: Array<PhotoIdentifier>,
  selectPhoto: (data: PhotoDataType) => void,
}

const PhotoList = ({ photoList, selectPhoto, }: Props) => {
  const xOffset: AnimatedValue = new Animated.Value(0)

  const photoChunks: Array<Array<PhotoIdentifier>> = []

  while (photoList.length > MAX_COUNT_LIST_PHOTOS) {
    photoChunks.push(photoList.splice(0, 12))
  }
  photoChunks.push(photoList)

  const generateChunks = (chunksList: Array<Array<PhotoIdentifier>>): Array<Node> => chunksList.map(
    (chunk: Array<PhotoIdentifier>, index: number) => (
      <PhotoListChunk
        photoList={chunk}
        xOffset={xOffset}
        chunkIndex={index}
        selectPhoto={selectPhoto}
        key={uuidv4()}
      />
    )
  )

  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: xOffset, }, }, }],
        { useNativeDriver: true, }
      )}
      horizontal
      pagingEnabled
    >
      {generateChunks(photoChunks)}
    </Animated.ScrollView>
  )
}

export { PhotoList, }