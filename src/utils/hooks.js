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

export const useDimensions = (callback?: () => void): boolean => {
  if (callback) {
    useEffect(() => {
      Dimensions.addEventListener('change', callback)

      return () => Dimensions.removeEventListener('change', callback)
    })

    return false
  }
  const [isHorizontal, setOrientation] = useState(isHorizontalOrientation());
  (isHorizontal: boolean)

  const orientationHaveBeenChanged = (): void => setOrientation(!isHorizontal)

  useEffect(() => {
    Dimensions.addEventListener('change', orientationHaveBeenChanged)

    return () => Dimensions.removeEventListener('change', orientationHaveBeenChanged)
  })

  return isHorizontal
}