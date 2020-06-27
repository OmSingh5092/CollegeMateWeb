const BASE_URL = "http://localhost:4193/api/";

export const login = {
    post:BASE_URL+"google/signin",
}

export const profile = {
    post: BASE_URL+"user/update",
    get: ""
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

