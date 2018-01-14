function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

const BASE_URL = "http://localhost:5000/";

export const requestFactory = {
    login,
    logout,
    register,
    likeShow,
    getFavouriteShows,
    getShow
};

function getShow(id, callback) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    return fetch(BASE_URL + 'api/show/' + id, requestOptions)
        .then(handleResponse)
        .then(shows => {
            return callback(shows);
        });
}

function getFavouriteShows(userId, callback) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    return fetch(BASE_URL + 'api/' + userId + '/favourites', requestOptions)
        .then(handleResponse)
        .then(shows => {
            return callback(shows);
        });
}

function addShow(showId, callback) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: "tv-show",
            showId: showId
        })
    };

    return fetch(BASE_URL + "api/tv-show", requestOptions)
        .then(handleResponse)
        .then(callback);
}

function likeShow(userId, showId) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            showId: showId
        })
    };

    return addShow(showId, () => {
        return fetch(BASE_URL + "api/favourite", requestOptions)
            .then(handleResponse)
            .then(favourite => {
                return favourite;
            });
    });
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(BASE_URL + '/login', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(BASE_URL + '/register', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json();
}