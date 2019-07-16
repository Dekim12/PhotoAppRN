// @flow

import { useState, useEffect, } from 'react'
import { BackHandler, Dimensions, } from 'react-native'

import { isHorizontalOrientation, } from './index'

export const useBackHandler = (
  callback: () => boolean | Promise<boolean>
): void => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', callback)

    return () => BackHandler.removeEventListener('hardwareBackPress', callback)
  })
}

export const useDimensionsWithCallback = (callback: () => void): void => {
  useEffect(() => {
    Dimensions.addEventListener('change', callback)

    return () => Dimensions.removeEventListener('change', callback)
  })
}

export const useDimensions = (): boolean => {
  const horizontalOrientation = isHorizontalOrientation()
  const [isHorizontal, setOrientation] = useState(horizontalOrientation);
  (isHorizontal: boolean)

  const orientationHaveBeenChanged = (): void => setOrientation(!isHorizontal)

  useEffect(() => {
    Dimensions.addEventListener('change', orientationHaveBeenChanged)

    return () => Dimensions.removeEventListener('change', orientationHaveBeenChanged)
  })

  return isHorizontal
}