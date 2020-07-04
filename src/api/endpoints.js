const BASE_URL = //"https://collegemate-api.herokuapp.com/api/" ;
"http://localhost:4193/api/"
export const login = {
    post:BASE_URL+"google/signin",
}

export const Profile = {
    post: BASE_URL+"user/update",
    get: BASE_URL+"user/get"
}

export const Assignment={
    post: BASE_URL+"assignments/add",
    get: BASE_URL+"assignments/get",
    delete: BASE_URL+"assignments/delete"
}

export const Subject= {
    post: BASE_URL+"subjects/add",
    get: BASE_URL+"subjects/get",
    delete: BASE_URL+"subjects/delete",
}

export const Timetable={
    post:BASE_URL+"timetable/add",
    get:BASE_URL+"timetable/get",
    delete:BASE_URL+"timetable/delete"
}


export const Library = {
    post:BASE_URL+"library/add",
    get:BASE_URL+"library/get",
    delete:BASE_URL+ "library/delete"
}

export const Attendance={
    post:BASE_URL+"attendance/add",
    get:BASE_URL+"attendance/get",
    delete:BASE_URL+"attendance/delete"
}

