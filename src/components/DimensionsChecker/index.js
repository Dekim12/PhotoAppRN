import React, { useEffect, useState, } from 'react'
import { Dimensions, } from 'react-native'
import { isHorizontalOrientation, } from '../../utils'

const DimensionsChecker = WrappedComponent => (props) => {
  const [isHorizontal, setOrientation] = useState(isHorizontalOrientation())

  const orientationHaveBeenChanged = () => setOrientation(!isHorizontal)

  useEffect(() => {
    Dimensions.addEventListener('change', orientationHaveBeenChanged)

    return () => Dimensions.removeEventListener('change', orientationHaveBeenChanged)
  })

  return <WrappedComponent isHorizontal={isHorizontal} {...props} />
}

export { DimensionsChecker, }