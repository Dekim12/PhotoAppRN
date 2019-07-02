import React from 'react'
import Ionicons from 'react-native-vector-icons/FontAwesome5'

const Icon = ({ name, size = 33, color = '#e6e5e6', style, }) => {
  const IconComponent = Ionicons

  return <IconComponent name={name} size={size} color={color} style={style} />
}

export { Icon, }