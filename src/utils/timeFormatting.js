const monthShort = ["Jan","Feb","Mar","Apr","May","June","Jul","Aug","Sept","Oct","Nov","Dec"];
const dayShort = ["Mon","Tues","Wed","Thur","Fri","Sat"]

export const parseDate = (dateISO)=>{
    var date = new Date(dateISO);

    var hour = date.getHours()+1;
    var minute = (date.getMinutes()+1)%60;
    var format =  date.getDate() + " " + monthShort[date.getMonth()] + " " + date.getFullYear() + " / "+ hour+":"+minute;
    return format;
} 

export const dayAndTime = (dateISO)=>{
    var date = new Date(dateISO);
    var format = dayShort[date.getDay()]+", " + date.getHours();
    return format;
}