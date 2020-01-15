import config from '../config'
import TokenService from "./token-service";

const MapsApiService = {
    getArea(zipcode) {
        return fetch(`${config.API_ENDPOINT}/maps`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({zipcode})
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    }
};

export default MapsApiService