// @flow

import React from 'react'
import Icons, { type FontAwesome5Glyphs, } from 'react-native-vector-icons/FontAwesome5'

import type { ViewStyleProp, } from 'react-native'

type Props = {
  name: FontAwesome5Glyphs,
  size: number,
  color: string,
  style: ViewStyleProp
}

const Icon = ({ name, size = 33, color = '#e6e5e6', style, }: Props) => {
  const IconComponent = Icons

  return <IconComponent name={name} size={size} color={color} style={style} />
}

export { Icon, }