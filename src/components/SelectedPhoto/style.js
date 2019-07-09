import { StyleSheet, } from 'react-native'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginBottom: 3,
    marginRight: 3,
    backgroundColor: '#000000',
    borderWidth: 3,
    borderColor: '#3EE7AD', 
  },
  selectedPhotoStyle: {    
    width: '100%',
    height: '100%',
  },
  closeBtn: {
    position: 'absolute',
    top: 5,
    right: 14,
  },
})

export default styles