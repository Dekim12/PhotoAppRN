import { StyleSheet, } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    position: 'absolute',
    left: 0,
    bottom: 0, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 50,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(115, 112, 117, 0.8)',
    backgroundColor: 'rgba(51, 50, 52, 0.65)',
  },
  btnIcons: { width: 50, alignItems: 'center', },
  cameraBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 72, 
    width: 72,
    bottom: 15,
    borderRadius: 50,
    backgroundColor: '#59575b',
    borderWidth: 1,
    borderColor: 'rgba(115, 112, 117, 0.8)',
    // borderColor: '#3EE7AD',
  },
})

export default styles