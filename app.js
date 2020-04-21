// let

let favoriteCityId = 'rome'
console.log(favoriteCityId)

favoriteCityId = 'paris'
console.log(favoriteCityId)

// const

const citiesId = ['paris', 'nyc', 'rome', 'rio-de-janeiro']
console.log(citiesId)

// citiesId = []
// console.log(citiesId)
// On constate une erreur dans la console car l'on affecte une nouvelle valeur à une constante

citiesId.push('tokyo')
console.log(citiesId)

// Création d’objet

function getWeather(cityId) {
    let city = cityId.toUpperCase()
    let temperature = 20
    return { city, temperature }
}

const weather = getWeather(favoriteCityId)
console.log(weather)

// Affectation destructurée

let { city, temperature } = weather;

console.log(city)
console.log(temperature)

// Rest operator

let [parisId, nycId, ...othersCitiesId] = citiesId
console.log(parisId)
console.log(nycId)
console.log(othersCitiesId.length)

// Classe

class Trip {
    constructor(id, name, imageUrl) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    toString() {
        return "Trip [" + this.id + ", " + this.name + ", " + this.imageUrl + ", " + this.price + "]"
    }

    static getDefaultTrip() {
        return new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg')
    }

    get price() {
        return this._price;
    }

    set price(newPrice) {
        this._price = newPrice;
    }
}

parisTrip = new Trip('paris', 'Paris', 'img/paris.jpg')

console.log(parisTrip)
console.log(parisTrip.name)

console.log(parisTrip.toString())

parisTrip.price = 100

console.log(parisTrip.toString())

const defaultTrip = Trip.getDefaultTrip()

console.log(defaultTrip.toString())

// Héritage

class FreeTrip extends Trip {
    constructor(id, name, imageUrl) {
        super(id, name, imageUrl);
        this.price = 0;
    }

    toString() {
        return 'Free' + super.toString()
    }
}

const freeTrip = new FreeTrip('nantes', 'Nantes', 'img/nantes.jpg')

console.log(freeTrip.toString())

// Promise, Set, Map, Arrow Function

class TripService {

    constructor() {
        this.tripSet = new Set();
        this.tripSet.add(new Trip('paris', 'Paris', 'img/paris.jpg'))
        this.tripSet.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'))
        this.tripSet.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'))
    }

    findByName(tripName) {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                let trouve = false;
                let foundTrip = undefined
                for (const trip of this.tripSet) {
                    if (trip.name === tripName) {
                        trouve = true;
                        foundTrip = trip
                    }
                }
                if (trouve) {
                    resolve(foundTrip)
                } else {
                    reject('No trip with name ' + tripName)
                }
            }, 2000)
        });
    }
}

class PriceService {

    constructor() {
        this.tripMap = new Map()
        this.tripMap.set('paris', 100)
        this.tripMap.set('rio-de-janeiro', 800)
    }

    findPriceByTripId(tripId) {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                if (this.tripMap.has(tripId)) {
                    resolve(this.tripMap.get(tripId))
                } else {
                    reject('No price found for id ' + tripId)
                }
            }, 2000)
        });
    }
}

const promesseTripService = new TripService()
const promessePriceService = new PriceService()

promesseTripService.findByName('Paris')
    .then(trip => console.log('Trip found : ' + trip))
    .catch(err => console.log(err))

promesseTripService.findByName('Toulouse')
    .then(trip => console.log('Trip found : ' + trip))
    .catch(err => console.log(err))

promesseTripService.findByName('Rio de Janeiro')
    .then(trip => trip.id)
    .then(idTrip => promessePriceService.findPriceByTripId(idTrip))
    .then(price => console.log('Price found : ' + price))
    .catch(err => console.log(err))

promesseTripService.findByName('Nantes')
    .then(trip => trip.id)
    .then(idTrip => promessePriceService.findPriceByTripId(idTrip))
    .then(price => console.log('Price found : ' + price))
    .catch(err => console.log(err))