import { StyleSheet, } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
  },
  headline: {
    marginTop: 25,
    marginBottom: 20,
    fontSize: 30,
    fontFamily: 'Edo',
    textAlign: 'center',
    color: '#ffffff',
  },  
  makePhotoBtn: {
    width: '100%',
    height: 60,
    justifyContent: 'center',    
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#737075',
    backgroundColor: '#333234',
  },
  btnText: {
    fontSize: 37,
    fontFamily: 'Edo',
    textAlign: 'center',
    color: '#ffffff',
  },
})

export default styles