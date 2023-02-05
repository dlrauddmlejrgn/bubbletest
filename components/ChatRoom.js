import { Text, View, SectionList, TextInput, TouchableOpacity, Image, Alert, Modal } from 'react-native';
import { useState, useEffect, useRef } from 'react';

import getData from './getData';

import ArtistChat from './ArtistChat';
import UserChat from './UserChat';
import styles from './styles';
//import getArtist from './getArtist';



const ChatRoom = ({ route }) => {
    //const artist = getArtist(route.params.artist);
    const artist = route.params.artist;
    const userName = route.params.userName;
    
    const [data, setData] = useState([]);
    const [media, setMedia] = useState({});

    // getData from asyncStorage
    // const storageKey = route.params.artist.code;
    
    const _fetchData = async () => {
        if (route.params.full) {    //full chat
            //setData(await getData(artist.code));
            const url = "https://raw.githubusercontent.com/hasy0224/Bubble/main/FullChat/"+artist.code+".json";
            try {
                const response = await fetch(
                    url,
                );
                const json = await response.json();
                setData(json);
                } catch (error) {
                console.error(error);
            }
        }
        else {  //user chat
            setData(await getData(artist.code));
        }

        if (artist.hasMediaMeta){
            const mediaUrl = "https://raw.githubusercontent.com/hasy0224/Bubble/main/MediaDB/"+artist.code+".json";
            try {
                const response = await fetch(
                    mediaUrl,
                );
                const json = await response.json();
                setMedia(json);
                } catch (error) {
                console.error(error);
            }
        }

    }
    useEffect ( ()=>{
        //console.log(artist);
        _fetchData();
        
    }, [] );
    
    const [sectionIndex, setSectionIndex] = useState(0);
    const getSectionIndex = (dateStr) => {
        for(let i = 0; i < data.length; i++){
            if (data[i].date.includes(dateStr)) return i;
        }
    }
    const dateSearch = (targetDate) => {
        console.log(targetDate);
        let i = getSectionIndex(targetDate);
        
        if (i < data.length){
            setSectionIndex(i);
            console.log(i);
            setDateModal(!dateModal);
        }
        else Alert.alert('해당 날짜의 대화를 찾을 수 없습니다.')
    }

    const ref = useRef(null);

    useEffect( () => { // Auto Scroll
        if(data[sectionIndex]?.data){
            ref.current?.scrollToLocation({
                sectionIndex: sectionIndex,
                itemIndex: 0,
            });
        }
    }, [sectionIndex])
    
    
    const [dateModal, setDateModal] = useState(false);
    const DatePicker = () => {
        var yy, mm, dd;
        return (
            <Modal
                transparent={true}                
                animationType="fade"
                visible={dateModal}
                onRequestClose={() => {
                    setDateModal(!dateModal);
                }}
            >
                <View style={[{flex:1, backgroundColor: '#00000055'}, styles.centeredContainer]}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>날짜 검색</Text>
                        <View style={{flexDirection:'row', alignItems:'center', flex:1}}>
                            <TextInput onChangeText={text=>{yy=text;}} 
                                style={[styles.textinput, {flex:2}]} 
                                placeholder={'yyyy'}
                                maxLength={4} 
                                textAlign='left'
                                inputMode='numeric'
                                keyboardType='number-pad'
                                returnKeyType='next' />
                            <Text style={{margin:8}}>년</Text>
                            <TextInput onChangeText={text=>{mm=text;}} 
                                style={[styles.textinput, {flex:1}]} 
                                placeholder={'mm'}
                                maxLength={2}
                                textAlign='left'
                                inputMode='numeric'
                                keyboardType='number-pad'
                                returnKeyType='next' />
                            <Text style={{margin:8}}>월</Text>
                            <TextInput onChangeText={text=>{dd=text;}} 
                                style={[styles.textinput, {flex:1}]} 
                                placeholder={'dd'}
                                maxLength={2}
                                textAlign='left'
                                inputMode='numeric'
                                keyboardType='number-pad'/>
                            <Text style={{margin:8}}>일</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={() => {
                                setDateModal(!dateModal);
                            }}
                        >
                            <Text style={styles.cancelButton}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonContainer}
                            onPress={ () => {
                                let targetDate = yy+'년 ';
                                if (mm) {
                                    if (dd) {
                                        targetDate = targetDate+mm+'월 '+dd+'일';
                                    }
                                    else targetDate = targetDate+mm+'월 ';
                                }
                                dateSearch(targetDate);
                            }}
                        >
                            <Text style={styles.okButton}>확인</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </Modal>
        )
    }

    // import media meta JSON
    // switch media or not
    // switch media type
    const renderItem = ({ item }) => {
        return ( item.fromArtist ? 
            ( item.isMedia && artist.hasMediaMeta ? 
            <ArtistChat item={item} artist={artist} media={media[item.content]} userName={userName}/>
            : <ArtistChat item={item} artist={artist} media={false} userName={userName}/> )
        : <UserChat item={item}/> );
    }
    
    return(
        <View style = {{backgroundColor: '#EEEEEE'}}>
            <DatePicker/>
            <SectionList
                ref={ref}
                onScrollToIndexFailed={ info => {
                    console.log(info.index);
                    console.log(info.averageItemLength);
                    try{
                        if(data[sectionIndex]?.data){
                            ref.current?.scrollToLocation({
                                sectionIndex: 0,
                                itemIndex: 0,
                                viewOffset: -(info.index * info.averageItemLength)
                            });
                        }
                    }
                    finally{
                        const wait = new Promise(resolve => setTimeout(resolve, 500));
                        wait.then( ()=>{
                            if(data[sectionIndex]?.data){
                                ref.current?.scrollToLocation({
                                    sectionIndex: sectionIndex,
                                    itemIndex: 0,
                                    viewOffset: 0
                                });
                            }
                        }) 
                    }
                }}
                sections={data}
                renderItem={renderItem}
                renderSectionHeader={ ({section: {date}}) => (<Text style={styles.date}>{date}</Text>) }
                style={{paddingHorizontal: 10, marginBottom:60}}
            /> 
            <View style={{width: '100%',height: 60, backgroundColor:'white', position:'absolute', bottom:0, padding:8}}>
                <View style={{alignItems:'center', flexDirection:'row'}}>
                <TouchableOpacity /*style={{borderColor:'red', borderWidth:1}}*/onPress={()=>{setDateModal(!dateModal)}}>
                    <Image source={require('../assets/Calendar.png')} style={{width: 32, height:32}}/>
                </TouchableOpacity>
                <TextInput style={{height:40, flex:1, marginHorizontal: 7, padding: 10, borderRadius:20, backgroundColor:'#F5F5F5'}}
                    placeholder={'검색어 입력'}/>
                <TouchableOpacity /*style={{width: 40, height:40}}*/>
                    <Image source={require('../assets/Search.png')} style={{width: 32, height:32}}/>
                </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ChatRoom;