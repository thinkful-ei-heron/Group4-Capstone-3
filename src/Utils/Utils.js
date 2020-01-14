const Utils = {
    formattedDate(token) {
        let date = new Date(token);
        return `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`;
    },
    getImage(id) {
        let beerImg = '';
        switch (id) {
            case 6:
                beerImg = require('../assets/beers/light.jpg');
                break;
            case 5:
                beerImg = require('../assets/beers/light-2.jpg');
                break;
            case 4:
                beerImg = require('../assets/beers/light-3.jpg');
                break;
            case 3:
                beerImg = require('../assets/beers/medium.jpg');
                break;
            case 2:
                beerImg = require('../assets/beers/dark.jpg');
                break;
            case 1:
                beerImg = require('../assets/beers/dark-1.jpg');
                break;
            default:
                beerImg = require('../assets/beers/light.jpg');
                break;
        }
        return beerImg;
    }
};

export default Utils