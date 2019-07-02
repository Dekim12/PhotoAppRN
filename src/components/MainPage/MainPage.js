// @flow

import React from 'react'
import { Text, View, } from 'react-native'
import { TouchableButton, PhotoList, } from '../index'
import styles from './style'

type Props = {
  toggleCamera: () => void
}

const MainPage = ({ toggleCamera, }: Props) => (
      <View style={styles.container}>
        <Text style={styles.headline}>Photo List</Text> 
        <PhotoList />   
        <TouchableButton onPress={toggleCamera} style={styles.makePhotoBtn}>
        <Text style={styles.btnText}>MAKE A PHOTO</Text> 
        </TouchableButton>  
      </View>
    )

export { MainPage, }

