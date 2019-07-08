// @flow

import React, { type Node, } from 'react'
import { TouchableOpacity, } from 'react-native'

import type { ViewStyleProp, } from 'react-native'

type Props = {
  onPress: ?() => void,
  style: ?ViewStyleProp,
  children: ?Node,
  disabled: boolean, 
}

const TouchableButton = ({
  onPress,
  style,
  children,
  disabled = false,
}: Props) => (
  <TouchableOpacity
    onPress={onPress}
    style={style}
    activeOpacity={0.5}
    disabled={disabled}
  >
    {children}
  </TouchableOpacity>
)

export { TouchableButton, }