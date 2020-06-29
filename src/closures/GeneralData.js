import { subject } from "../api/endpoints";

const compareTime = (a,b)=>{
    var date1 = new Date(a);
    var date2 = new Date(b);

    return date1.getTime()-date2.getTime();
}

export const Assignments = (function(){
    var data = [];

    function getAssignments(){
        return data
    }
    function setAssignments(newData){
        newData.sort((a,b)=>{
            return compareTime(a.date_due,b.date_due);
        })
        data = newData;
    }

    function addAssignment(assignment){
        data.push(assignment);
        data.sort((a,b)=>{
            return compareTime(a.date_due,b.date_due);
        })
    }

    return ({getAssignments,setAssignments,addAssignment});
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

    return({getSubjects,setSubjects,addSubject});

})();

export const Classes = (function(){

    var data = [];

    function getClasses(){
        return data
    }
    function setClasses(newData){
        data = newData;
    }

    function addClasses(timetable){
        data.push(timetable);
    }

    return({getClasses,setClasses,addClasses});

})();