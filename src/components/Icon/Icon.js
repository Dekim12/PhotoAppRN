import React from 'react'
import Ionicons from 'react-native-vector-icons/FontAwesome5'

const Icon = ({ name, size = 40, color = '#ffffff', style, }) => {
  const IconComponent = Ionicons

  return <IconComponent name={name} size={size} color={color} style={style} />
}

export { Icon, }