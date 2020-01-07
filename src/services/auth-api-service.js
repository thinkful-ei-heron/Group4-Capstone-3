import config from '../config'
import TokenService from "./token-service";
import UserService from "./user-api-service";

const AuthApiService = {
    postLogin({user_name, password}) {
        return fetch(`${config.API_ENDPOINT}/auth/token`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({user_name, password}),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    deleteUser() {
        if (UserService.getUser().id)
            return fetch(`${config.API_ENDPOINT}/users/${UserService.getUser().id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `bearer ${TokenService.getAuthToken()}`
                }
            })
    },
    patchUser(user) {
        return fetch(`${config.API_ENDPOINT}/users/${UserService.getUser().id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(user),
        })
    },
    patchPassword(password) {
        return fetch(`${config.API_ENDPOINT}/users/auth/${UserService.getUser().id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(password),
        })
    },
    postUser(user) {
        return fetch(`${config.API_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
};

export default AuthApiService