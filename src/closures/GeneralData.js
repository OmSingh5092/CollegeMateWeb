import { subject } from "../api/endpoints";

const compareTime = (a,b)=>{
    var date1 = new Date(a);
    var date2 = new Date(b);

    return date1.getTime()-date2.getTime();
}

export const Assignments = (function(){
    var data = [];

    function sortData(){
        data.sort((a,b)=>{
            return compareTime(a.date_due,b.date_due);
        })
    }

    function getAssignments(){
        return data
    }
    function setAssignments(newData){
        data = newData;
        sortData();
    }

    function removeAssignment(index){
        data.splice(index,1);
        sortData();
        console.log(data);
    }

    function addAssignment(assignment){
        data.push(assignment);
        sortData();
    }

    return ({getAssignments,removeAssignment,setAssignments,addAssignment});
})();

export const Subjects = (function(){

    var data = [];

    function getSubjects(){
        return data
    }
    function setSubjects(newData){
        data = newData;
    }

    function addSubject(subject){
        data.push(subject);
    }
    
    function removeSubject(index){
        data.splice(index,1);
    }

    return({getSubjects,removeSubject,setSubjects,addSubject});

})();

export const Classes = (function(){

    var data = {0:[],1:[],2:[],3:[],4:[],5:[],6:[]}

    function sortData(key){
        data[key].sort((a,b)=>{
            compareTime(a.start,b.start);
        })
    }

    function getClasses(day){
        console.log(data[day]);
        return data[day];
    }
    function getAllClasses(){
        
        return data
    }

    function removeClass(index,day){
        data[day].splice(index,1);
        sortData(day);
    }

    function setClasses(newData){
        newData.map((item,index)=>{
            data[item.day].push(item);
            sortData(item.day);
        })
    }

    function addClasses(timetable){
        data[timetable.day].push(timetable);
        sortData(timetable.day);
    }

    return({getClasses,removeClass,setClasses,addClasses,getAllClasses});

})();

export const Events = (()=>{
    var data = [];

    function setEvents(events){
        data = events;
    }

    function getEvents(){
        return data;
    }

    function addEvent(event){
        data.push(event);
    }

    return ({setEvents,getEvents,addEvent});

})();


export const Library = (()=>{
    var files= [];

    function setFiles(data){
        files = data;
    }
    
    function addFile(file){
        files.push(file);
    }

    function getFiles(){
        return files;
    }

    function removeFile(index){
        files.splice(index,1);
    }

    return {setFiles, removeFile,addFile,getFiles}
})();

export const Profile =(()=>{
    var data={};

    function setData(newData){
        data = newData;
    }

    function getData(){
        return data;
    }

    return {setData,getData};
})();

export const Attendance = (()=>{
    var data = {};

    function setData(newData){
        newData.map((item,index)=>{
            if(data[item.subject_id] == null){
                data[item.subject_id] = [item];
            }else{
                data[item.subject_id].push(item);
            }
            
        })
    }
    
    function getData(){
        return data;
    }

    function getDataFromSubject(subjectId){
        return data[subjectId];
    }

    function addData(attendance){
        data[attendance.subject_id].push(attendance);
    }

    return {setData,getData,getDataFromSubject, addData};
})();