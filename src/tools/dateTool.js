function parseSingleNum(num){
    return num < 10 ? "0"+num : num
}

export function getFormalDate(dateStr){
    let date
    if(dateStr){
        date = new Date(dateStr)
    }else{
        date = new Date()
    }
    let year = date.getFullYear()
    let month = parseSingleNum(date.getMonth()+1)
    let day = parseSingleNum(date.getDate())

    let hour = parseSingleNum(date.getHours())
    let minute = parseSingleNum(date.getMinutes())
    let scened = parseSingleNum(date.getSeconds())

    return `${year}-${month}-${day} ${hour}:${minute}:${scened}`
}

