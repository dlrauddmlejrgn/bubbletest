import { Text, View, TouchableOpacity, Image, Modal, TextInput, Alert } from 'react-native';
import styles from './styles';
import { openURL } from 'expo-linking';

import { useState } from 'react';

const Profile = ({ navigation, route }) => {
    const artist = route.params.artist;

    const [modalVisible, setModalVisible] = useState(false);

    const UserNameModal = () => {
        var userName;

        return (
        <Modal
            transparent={true}                
            animationType="fade"
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={[{flex:1, backgroundColor: '#00000055'}, styles.centeredContainer]}>
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>내 닉네임 설정</Text>
                    <View style={[{flex:1}, styles.centeredContainer]}>
                        <TextInput 
                            onChangeText={text=>{userName = text;}} 
                            placeholder={'닉네임 입력'}
                            style={[styles.textinput, {width:'100%'}]}
                        />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={() => {
                                userName='';
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.cancelButton}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={ () => {
                                //console.log(userName);
                                setModalVisible(!modalVisible); 
                                navigation.navigate('ChatRoom',{artist: artist, nickname: artist.name, full: true, userName: userName}); 
                            }}
                        >
                            <Text style={styles.okButton}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )}

    return (
        <TouchableOpacity style={{flex: 1}} 
            onPress={()=>{if(artist.background) {openURL(artist.backgroundDownload);}}}>
            {artist.background ? <Image source={{uri:artist.background}} style={{flex:1}}/> : <View/>}
            <View style={{backgroundColor:'#00000050', position:'absolute', top:0, width: '100%', height:'100%'}}>
                <UserNameModal/>
                <TouchableOpacity onPress={() => navigation.goBack()} 
                    style={{position:'absolute', top: 45, left: 25}}>
                    <Image source={require('../assets/X.png')} style={{width:27, height: 27, opacity: 0.7}} />
                </TouchableOpacity>
                <View style={{position:'absolute', bottom:0, alignItems:'center', width: '100%'}}>
                    <TouchableOpacity onPress={()=>{openURL(artist.profileDownload);}}>
                        <Image source={{uri: artist.profile}} 
                            style={{width: 120, height: 120, borderRadius: 60}} />
                    </TouchableOpacity>
                    <Text style={{fontSize:18, margin:10, color:'white'}}>{artist.name}</Text>
                    <Text style={{color:'lightgray'}}>{artist.status}</Text>
                    {
                        artist.hasMediaMeta ?
                        <TouchableOpacity style={{width: '100%', marginTop:70}}
                            onPress={()=>{setModalVisible(!modalVisible);}}>
                            <Text style={[styles.okButton, {margin:25, padding: 15, fontSize:15.5}]}>
                                전체 채팅 보기
                            </Text>
                        </TouchableOpacity> :
                        <View style={{height: 150}}/>
                    }
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default Profile;