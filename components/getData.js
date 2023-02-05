import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async (storageKey) => {
    try {
      const jsonValue = await AsyncStorage.getItem(storageKey)
      //console.log(jsonValue);
      return (jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch(e) {
      // error reading value
    }
}

export default getData;