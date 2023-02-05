import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async ({value, storageKey}) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(storageKey, jsonValue)
    } catch (e) {
      // saving error
    }
}

export default storeData;