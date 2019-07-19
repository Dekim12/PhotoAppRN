// @flow

import { Dimensions, } from 'react-native'

import {
  SUMMARY_ELEMENTS_WIDTH,
  SUMMARY_ELEMENTS_HEIGHT,
  PHOTO_ITEMS_COUNT_ROW,
  PHOTO_ITEMS_COUNT_COLUMN,
} from '../constants'

import { type PhotoSizes, } from '../types'

export const getScreenSize: {
  screenWidth: number,
  screenHeight: number
} = {
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
}

export const defineImageSizes = (): PhotoSizes => {
  let { screenWidth, screenHeight, } = getScreenSize

  if (screenWidth > screenHeight) {
    [screenWidth, screenHeight] = [screenHeight, screenWidth]
  }

  return {
    vertical: {
      photoWidth:
        (screenWidth - SUMMARY_ELEMENTS_WIDTH.vertical) /
        PHOTO_ITEMS_COUNT_ROW.vertical,
      photoHeight:
        (screenHeight - SUMMARY_ELEMENTS_HEIGHT.vertical) /
        PHOTO_ITEMS_COUNT_COLUMN.vertical,
    },
    horizontal: {
      photoWidth:
        (screenHeight - SUMMARY_ELEMENTS_WIDTH.horizontal) /
        PHOTO_ITEMS_COUNT_ROW.horizontal,
      photoHeight:
        (screenWidth - SUMMARY_ELEMENTS_HEIGHT.horizontal) /
        PHOTO_ITEMS_COUNT_COLUMN.horizontal,
    },
  }
}

export const isHorizontalOrientation = (): boolean => {
  const dimensions: { width: number, height: number } = Dimensions.get('window')

  return dimensions.width > dimensions.height
}