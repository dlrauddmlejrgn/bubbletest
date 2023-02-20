import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from './styles';


const Archive = ({ navigation, route }) =>{
    const data = route.params.Artists;

    const renderItem = ({item}) => {
        //console.log(item);
        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity style={{flexDirection: 'row'}}
                    onPress={ ()=> {
                        navigation.navigate('Profile',{artist: item})
                    } }
                >
                    <View>
                        <View style={styles.profileContainer}>
                            <Image source={{uri:item.profile}} 
                                style={styles.profile}
                            />
                        </View>
                        <View style={{flex:1}}/>
                    </View>
                    
                    <View style={{ marginHorizontal: 10, justifyContent: 'center'}}>
                        <Text style={styles.boldName}>
                            {item.name}
                        </Text>
                    </View>
                    
                    <View style={{ justifyContent: 'center', flex: 1, alignItems: 'flex-end'}}>
                        <Text style={styles.lastMsg}
                                numberOfLines={2} ellipsizeMode='tail'>
                                {item.status}
                        </Text>
                    </View>
                    
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={Object.values(data)}
                renderItem={renderItem}
            />
        </View>
    );
}


export default Archive;