import dateNotation from './dateNotation' 

const dateSort = (rawData) => {
    const tmp = {};
    rawData.forEach(element => {
        if (tmp[element.date] == undefined) {
            tmp[element.date] = {
                message: [element.message]
            };
        } 
        else {
            tmp[element.date].message.push(element.message);
        }
    });

    let data = [];
    for(const date in tmp) {
        /*
        const dateString = new Date(date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        console.log(dateString.toLocaleDateString(undefined, options));
        */

        // ref
        /*
            const dd = new Date();    
            dd.toLocaleDateString(undefined, {year: "numeric", month: "long", day: "numeric", weekday: "long"})
            >> '2023년 1월 1일 일요일' 
            dd.toLocaleTimeString(undefined, {hour12:true, hour: "numeric", minute: "2-digit"})
            >>'오후 4:24'
            
            dd.setHours(dd.getHours()-12);
        */
        data.push({
            date: dateNotation(date),
            //date: dateString.toLocaleDateString(undefined, options),
            data: messageSort(tmp[date].message)
        });
    }
    //console.log(data[0]);
    console.log('data sort done.');

    return data;
}


const messageSort = (messageArr) => {
    let l = messageArr.length;
    for (let i = 0; i < l - 1; i++){
        if (messageArr[i].isMedia){
            let index = 1, duplicated = false;
            for ( let j = 1; j < l - i; j++) {
                if (messageArr[i].content == messageArr[i+j].content){
                    duplicated = true;
                    messageArr[i+j].content = messageArr[i+j].content+'_'+index++;
                }
            }
            if (duplicated){
                messageArr[i].content = messageArr[i].content+'_'+'0';
            }
        }
    }
    return messageArr;
}

export default dateSort;