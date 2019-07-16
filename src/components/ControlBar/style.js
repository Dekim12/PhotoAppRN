import { StyleSheet, } from 'react-native'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  bottomBar: {
    width: '100%',
    height: 60,
    left: 0,
    bottom: 0,
    flexDirection: 'row',
    paddingHorizontal: 50,
    borderTopWidth: 1,
    borderBottomWidth: 1,
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
    bottom: 15,
    height: 72,
    width: 72,
    borderRadius: 50,
    backgroundColor: '#59575b',
    borderWidth: 1,
    borderColor: 'rgba(115, 112, 117, 0.8)',
  },
  backBtnRight: {
    rotation: 90,
    left: 10,
  },
  backBtnLeft: {
    rotation: 90,
    right: 10,
  },
  backBtnPortrait: {
    left: 10,
  },
  backBtn: {
    position: 'absolute',
    top: 7,
  },
})

export default styles