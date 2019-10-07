const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
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
        url: "http://localhost:7777/todos?",
        method: 'GET'
    });
}
