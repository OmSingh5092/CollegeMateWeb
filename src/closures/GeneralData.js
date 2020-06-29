import { subject } from "../api/endpoints";

export const Assignments = (function(){
    var data = [];

    function getAssignments(){
        return data
    }
    function setAssignments(newData){
        data = newData;
    }

    function addAssignment(assignment){
        data.push(assignment);
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