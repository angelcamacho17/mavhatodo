import { API_BASE_URL } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'multipart/form-data',
    })

    headers.append('Authorization', 'Bearer ' +1);

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response =>
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getAllTodos(page,size) {
    return request({
        url: API_BASE_URL + "/todos?",
        method: 'GET'
    });
}

export function createTodo(todoData) {
    return request({
        url: API_BASE_URL + "/todos",
        method: 'POST',
        body: JSON.stringify(todoData)
    });
}

export function getTodo(todoId) {
    return request({
        url: API_BASE_URL + "/todos/"+todoId,
        method: 'GET'
    });
}

export function updateTodo(todoData,todoId) {
    return request({
        url: API_BASE_URL + "/todos/update/"+ todoId,
        method: 'POST',
        body: JSON.stringify(todoData)
    });
}

export function deleteTodo(todoId) {
    return request({
        url: API_BASE_URL + "/todos/delete/"+ todoId,
        method: 'DELETE'
    });
}

export function doneTodo(todoId) {
    return request({
        url: API_BASE_URL + "/todos/done/"+todoId,
        method: 'POST'
    });
}

export function uploadFile(file) {
    return request({
        url: API_BASE_URL + "/uploadFile",
        method: 'POST',
        body:file
    });
}
