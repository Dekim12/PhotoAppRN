import { StyleSheet, } from 'react-native'

const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#3EE7AD',
    backgroundColor: '#3EE7AD',
  },
  photoItem: {
    marginBottom: 3,
    marginRight: 3,
  },
})

export default styles