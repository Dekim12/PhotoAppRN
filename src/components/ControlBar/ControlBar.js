// @flow

import React, { Component, } from 'react'
import { View, ActivityIndicator, } from 'react-native'
import { Icon, TouchableButton, } from '../index'
import styles from './style'

type Props = {
  flashMode: boolean,
  isCameraReady: boolean ,
  isImage: boolean,
  toggleType: () => void,  
  takePicture: () => void,
  toggleFlashMode: () => void,
}

class ControlBar extends Component<Props> {
  
  render () { 
    const { flashMode, takePicture, toggleFlashMode, isCameraReady, isImage, toggleType} = this.props

    return(
      <View style={styles.container}>
        <TouchableButton style={styles.btnIcons} onPress={toggleFlashMode}>
          <Icon name='bolt' color={flashMode? '#3EE7AD' : '#e6e5e6'}/>
        </TouchableButton>
        <TouchableButton style={styles.cameraBtn} onPress={isCameraReady ? takePicture : null}>
          { isImage ? <Icon name='save' size={43}/> :       
              isCameraReady ? <Icon name='camera' size={43}/> : 
                <ActivityIndicator color='#3EE7AD' size='large' />
            
          }
        </TouchableButton>
        { isImage ? 
            <TouchableButton style={styles.btnIcons}>
              <Icon name='redo-alt' />
            </TouchableButton> :
            <TouchableButton style={styles.btnIcons} onPress={toggleType}>
              <Icon name='sync-alt' />
            </TouchableButton> 
        }
      </View>    
    )
  }
}

export { ControlBar, }