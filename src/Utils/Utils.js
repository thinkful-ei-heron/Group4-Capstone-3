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
    },
    getRatingImage(id) {
        let ratingImg = '';
        switch (id) {
            case 9:
                ratingImg = require('../assets/rating2/5.png');
                break;
            case 8:
                ratingImg = require('../assets/rating2/4half.png');
                break;
            case 7:
                ratingImg = require('../assets/rating2/4.png');
                break;
            case 6:
                ratingImg = require('../assets/rating2/3half.png');
                break;
            case 5:
                ratingImg = require('../assets/rating2/3.png');
                break;
            case 4:
                ratingImg = require('../assets/rating2/2half.png');
                break;
            case 3:
                ratingImg = require('../assets/rating2/2.png');
                break;
            case 2:
                ratingImg = require('../assets/rating2/1half.png');
                break;
            case 1:
                ratingImg = require('../assets/rating2/1.png');
                break;
            default:
                ratingImg = require('../assets/rating2/half.png');
                break;
        }
        return ratingImg;
    }
};

export default Utils