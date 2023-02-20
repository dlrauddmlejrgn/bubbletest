import { Text, View, SectionList } from 'react-native';
import { useState, useEffect } from 'react';

import getData from './getData';

import ArtistChat from './ArtistChat';
import UserChat from './UserChat';
import styles from './styles';



const ChatRoom = ({ route }) => {
    const artist = route.params.artist;
    const userName = route.params.userName;
    
    const [data, setData] = useState([]);
    const [media, setMedia] = useState({});

    // getData from asyncStorage
    // const storageKey = route.params.artist.code;
    
    const _fetchData = async () => {
        if (route.params.full) {    //full chat
            //setData(await getData(artist.code));
            const url = "https://raw.githubusercontent.com/dlrauddmlejrgn/BBMedia/main/FullChat/"+artist.code+".json";
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
            const mediaUrl = "https://raw.githubusercontent.com/dlrauddmlejrgn/BBMedia/main/MediaList/"+artist.code+".json";
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
        <SectionList
            sections={data}
            renderItem={renderItem}
            renderSectionHeader={ ({section: {date}}) => (<Text style={styles.date}>{date}</Text>) }
            style={{backgroundColor: '#EEEEEE', height: 100 }}
            contentContainerStyle={{padding: 10, paddingTop:0}}
        /> 
    )
}

export default ChatRoom;