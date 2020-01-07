import config from '../config'
import TokenService from "./token-service";

const BeerApiService = {
    getAllBeers() {
        return fetch(`${config.API_ENDPOINT}/beers`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    getBeer(beerId) {
        return fetch(`${config.API_ENDPOINT}/beers/${beerId}`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    patchBeer(beer, id) {
        return fetch(`${config.API_ENDPOINT}/beers/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                type: beer.type,
                date: beer.date,
                checkedamt: beer.checkedamt
            }),
        })
    },
    postBeer(beer) {
        return fetch(`${config.API_ENDPOINT}/beers`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({
                type: beer.type,
                beers: beer.beers,
                date: beer.date,
                checkedamt: 0
            }),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
    },
    deleteBeer(id) {
        return fetch(`${config.API_ENDPOINT}/beers/${id}`, {
            method: 'DELETE',
            headers: {'authorization': `bearer ${TokenService.getAuthToken()}`}
        })
    }
};

export default BeerApiService