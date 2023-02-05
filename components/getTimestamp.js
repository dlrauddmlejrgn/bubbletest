const getTimestamp = (str) => {
    var str2 = str.replace(' ', 'T')
    var timestamp = new Date(str2.slice(0,16)+':00.000+09:00');
    if (str.length != 16) {
        if (str.slice(11,13) != '12' && str[16] == 'P') {
            timestamp.setHours(timestamp.getHours()+12);
        }
        else if (str.slice(11,13) == '12' && str[16] == 'A') {
            timestamp.setHours(timestamp.getHours()-12);
        }
    }
    //console.log(timestamp);
    //console.log(timestamp.toString());
    //console.log(timestamp.toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric", weekday: "long"}));

    return timestamp.valueOf();
}

export default getTimestamp;