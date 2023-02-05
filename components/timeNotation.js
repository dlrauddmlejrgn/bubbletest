const timeNotation = (temp) => {
    var time;

    switch(temp[5]){
        case 'P': time='오후 '; break;
        default: time='오전 ';
    }
    switch(temp[0]){
        case '0': time += temp.slice(1, 5); break;
        default: time += temp.slice(0, 5)
    }

    return time;
    
};

export default timeNotation;