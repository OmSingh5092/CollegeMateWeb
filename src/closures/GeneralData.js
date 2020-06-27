import { subject } from "../api/endpoints";

export const Assignments = (function(){
    var data = [];

    function getAssignments(){
        return data
    }
    function setAssignments(newData){
        data = newData;
    }

    return ({getAssignments,setAssignments});
})();

export const Subjects = (function(){

    var data = [];

    function getSubjects(){
        return data
    }
    function setSubjects(newData){
        data = newData;
    }

    return({getSubjects,setSubjects});

})();