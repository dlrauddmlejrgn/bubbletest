import AsyncStorage from '@react-native-async-storage/async-storage';

const removeData = async (storageKey) => {
    try {
      await AsyncStorage.removeItem(storageKey)
    } catch(e) {
      // remove error
    }
  
    console.log('Done.')
}

export default removeData;