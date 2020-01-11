function parsePlaceType(placeType) {

    switch (placeType) {
        case 'T': {
            return 'Station'
        }
        case 'C': {
            return 'City'
        }
        case 'A': {
            return 'Airport'
        }
        default: {
            return 'City'
        }
    }
}


export function parseResponse(results) {
    try {

        return results.map(result => {
            const name = `${result.name}${result.iata ? ` (${result.iata})` : ''}`;
            const placeType = parsePlaceType(result.placeType);
            const location = [];
            
            if(result.region) {
                location.push(result.region);
            }
            if(result.country) {
                location.push(result.country);
            }
            
            return {
                name,
                placeType,
                location: location.join(', ')
            }

        })


    } catch(err) {
        console.log('There was an error parsing');
        throw err;
    }
}