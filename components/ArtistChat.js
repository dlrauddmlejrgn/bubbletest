import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';

import { openURL } from 'expo-linking';
import styles from './styles';

const Message = ({content, media, userName}) => {
    if (media) {
        
        const [picStyle, setPicStyle]=useState({});
                
        const getStyle = async (imageURL) => {
            Image.getSize(imageURL, (Width, Height) => {
                let ratio = Width/Height;
                //console.log(ratio);
                ratio >= 0.75 ? setPicStyle({width: 264, aspectRatio: ratio}) : setPicStyle({height: 352, aspectRatio: ratio});
                }, (errorMsg) => {
                console.log(errorMsg);
            });
        }

        switch (media.type) {
            case 'err':
                return (
                    <View style={{ marginRight:7 }}>
                        <Text style={[{color: 'white', backgroundColor:'gray', borderTopLeftRadius: 0}, styles.text]}>
                            삭제된 미디어
                        </Text>
                    </View>
                );
            
            case 'pic':
                useEffect(()=>{ 
                    //console.log(getStyle(uri));
                    getStyle(media.url);
                }, [])
                
                return (
                    <TouchableOpacity onPress={()=>{openURL(media.download);}}>
                        <View style={{ marginRight:7}}>
                            <Image style={[{borderRadius: 15, borderTopLeftRadius: 0}, picStyle]}
                            source={{uri: media.url}} />
                        </View>
                    </TouchableOpacity>
                );
                
            case 'voice':
                return (
                    <TouchableOpacity onPress={()=>{openURL(media.download);}}>
                        <View style={{ marginRight:7 }}>
                            <View style={[{backgroundColor:'white', borderTopLeftRadius: 0, flexDirection: 'row'}, styles.text]}>
                                <View  style={{borderColor: 'black', borderWidth: 2, width: 24, height: 24, borderRadius: 12, justifyContent: 'center', paddingLeft:2}}>
                                    <Text style={{textAlign: 'center', fontSize:11}}>▶</Text>
                                </View>
                                <Text style={{fontSize:14.8, lineHeight:21}}> {media.length}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            case 'vid':
                useEffect(()=>{ 
                    getStyle(media.thumbnail);
                }, [])
                
                return (
                    <TouchableOpacity onPress={()=>{openURL(media.download);}}>
                        <View style={{ marginRight:7 }}>
                            <Image style={[{borderRadius: 15, borderTopLeftRadius: 0}, picStyle]}
                            source={{uri: media.thumbnail}}/>
                            <View style={[{backgroundColor: 'black', opacity: 0.4, 
                            top:0, position:'absolute', borderRadius: 15, borderTopLeftRadius: 0, alignItems:'center', justifyContent: 'center'}, picStyle]}>
                                <View  style={{borderColor: 'white', borderWidth: 3, width: 36, height: 36, borderRadius: 18, justifyContent: 'center', paddingLeft:3}}>
                                    <Text style={{color: 'white', textAlign: 'center', fontSize:18}}>▶</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
        }
    }

    else {
        return (
            <View style={{ marginRight:7 }}>
                <Text style={[{color: 'black', backgroundColor:'white', borderTopLeftRadius: 0}, styles.text]}>
                    {content.replace(/@@@/g, userName)}
                </Text>
            </View>
        );
    }
    
}

const ArtistChat = ({ item, artist, media, userName }) => {
    //console.log(item);
    return (
        <View style={{flexDirection: 'row', marginVertical: 5}}>
            <Image source={{uri: artist.profile}} style={styles.profileImg}/>
            <View style={{marginHorizontal:5}}>
                <Text style={styles.artistName}>{artist.name}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Message content={item.content} media={media} userName={userName}/>
                    <View>
                        <View style={{flex: 1}}></View>
                        <Text style={styles.time}>
                            {item.time}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}



export default ArtistChat;
