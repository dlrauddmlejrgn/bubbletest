import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from './styles';


const Archive = ({ navigation, route }) =>{
    const data = route.params.Artists;

    const renderItem = ({item}) => {
        //console.log(item);
        return (
            <View style={{marginBottom: 15, height: 65}}>
                <TouchableOpacity style={{flexDirection: 'row'}}
                    //onPress={ ()=> {_fetchData(); console.log(temp);}}
                    onPress={ ()=> {
                        //navigation.navigate('ChatRoom',{artist: item, nickname: item.name, full: true})
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
                        <Text style={{ fontWeight: 'bold', fontSize: 16}}>
                            {item.name}
                        </Text>
                    </View>
                    
                    <View style={{ justifyContent: 'center', flex: 1, alignItems: 'flex-end'}}>
                        <Text style={{ color: 'darkgray', fontSize: 12 }}
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