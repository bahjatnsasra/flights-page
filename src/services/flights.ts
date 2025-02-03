import { API_CONFIG } from "./endpoints"
import {SearchFlightsParams} from "./types"


export const searchFlights = async ({
    originSkyId,
    destinationSkyId,
    originEntityId,
    destinationEntityId,
    cabinClass = 'economy',
    adults = 1,
    sortBy = 'best',
    currency = 'USD',
    market = 'en-US',
    countryCode,
    date,
    returnDate
}: SearchFlightsParams) => {
    const url = `${API_CONFIG.ENDPOINTS.SEARCH_FLIGHTS}?originSkyId=${originSkyId}&destinationSkyId=${destinationSkyId}&originEntityId=${originEntityId}&limit=5&destinationEntityId=${destinationEntityId}&date=${date}&cabinClass=${cabinClass}&adults=${adults}&sortBy=${sortBy}&currency=${currency}&market=${market}&countryCode=${countryCode}`;


    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_CONFIG.RAPID_API_KEY,
                'x-rapidapi-host': API_CONFIG.HOSTS.SKY_SCRAPPER
            }
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error searching flights:', error);
        throw error;
    }

}