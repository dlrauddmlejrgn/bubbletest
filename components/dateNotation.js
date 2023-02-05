//"date": "2020-08-28"
const dateNotation = (date) => {
    const dd = new Date(date);
    const day = dd.getDay();
    let dayStr;
    switch (day){
        case 0: 
            dayStr = '일요일'
            break;
        case 1: 
            dayStr = '월요일'
            break;
        case 2: 
            dayStr = '화요일'
            break;
        case 3: 
            dayStr = '수요일'
            break;
        case 4: 
            dayStr = '목요일'
            break;
        case 5: 
            dayStr = '금요일'
            break;
        case 6: 
            dayStr = '토요일'
            break;
    }
    
    return (dd.getFullYear()+'년 '+(dd.getMonth()+1)+'월 '+dd.getDate()+'일 '+dayStr);
    
}

export default dateNotation;