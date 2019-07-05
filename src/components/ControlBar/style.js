import { StyleSheet, } from 'react-native'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',    
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'rgba(115, 112, 117, 0.8)',
    backgroundColor: 'rgba(51, 50, 52, 0.65)',
  },
  btnIcons: { width: 50, alignItems: 'center', },
  cameraBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 72, 
    width: 72,
    borderRadius: 50,
    backgroundColor: '#59575b',
    borderWidth: 1,
    borderColor: 'rgba(115, 112, 117, 0.8)',
  },
  orientationRight: {
    width: 60,
    height: '100%',
    left: 0, 
    top: 0,
    flexDirection: 'column',
    paddingVertical: 50,
  },
  orientationLeft: {
    width: 60,
    height: '100%',
    right: 0, 
    top: 0,
    flexDirection: 'column',
    paddingVertical: 50,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  orientationPortrait: {    
    width: '100%',
    height: 60,
    left: 0,
    bottom: 0, 
    flexDirection: 'row',
    paddingHorizontal: 50,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  cameraBtnPortrait: {
    bottom: 15,
  },
  cameraBtnLeft: {
    right: 15,
    bottom: 3,
  },
  cameraBtnRight: {
    left: 15,
    bottom: 3,
  },
})

export default styles