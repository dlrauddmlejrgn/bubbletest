import { Text, View } from 'react-native';
import styles from './styles';

const UserChat = ({item}) => {
    return (
        <View style={{flexDirection: 'row-reverse', marginVertical: 5}}>
            <View style={{ marginLeft:7 }}>
                <Text style={[{color: 'white', backgroundColor:'#555555',borderBottomRightRadius: 0}, styles.text]}>
                    {item.content}
                </Text>
            </View>
            <View>
                <View style={{flex: 1}}/>
                <Text style={styles.time}>
                    {item.time}
                </Text>
            </View>
        </View>
    );
}

export default UserChat;