import { Dimensions, } from 'react-native'


export const isHorizontalOrientation = () => {
  const { width, height, } = Dimensions.get('window')

  return (width > height)
}