// @flow

import React from 'react'
import { TouchableOpacity, } from 'react-native'

import type { Node, } from 'react'
import type { ViewStyleProp, } from 'react-native'

type Props = {
  onPress: ?() => void,
  style: ?ViewStyleProp,
  children: ?Node
}

const TouchableButton = ({ onPress, style, children, }: Props) => (
  <TouchableOpacity onPress={onPress} style={style} activeOpacity={0.5}>
    {children}
  </TouchableOpacity>
)

export { TouchableButton, }