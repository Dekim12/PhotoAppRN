import React from 'react'
import { TouchableOpacity, } from 'react-native'

const TouchableButton = ({ onPress, style, children, }) => (
  <TouchableOpacity onPress={onPress} style={style} activeOpacity={0.5}>
    {children}
  </TouchableOpacity>
)

export { TouchableButton, }