import { API_CONFIG } from './endpoints';
import { SearchAirportsParams, NearbyAirportsParams, Airport } from '../services/types'



export const getNearbyAirports = async ({ latitude, longitude, locale = 'en-US'  }: NearbyAirportsParams) => {
    const url = `${API_CONFIG.ENDPOINTS.NEARBY_AIRPORTS}?lat=${latitude}&lng=${longitude}&locale=${locale}`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_CONFIG.RAPID_API_KEY,
                'x-rapidapi-host': API_CONFIG.ENDPOINTS.NEARBY_AIRPORTS
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching nearby airports:', error);
        throw error;
    }
};

const transformAirportData = (data: any[]): Airport[] => {
    return data
        .filter(item => item.navigation.entityType === 'AIRPORT') // Filter out non-airport entries
        .map(item => ({
            name: item.presentation.title,
            city: item.navigation.relevantHotelParams.localizedName,
            code: item.skyId,
            entityId: item.entityId
        }));
};

export const searchAirports = async ({ query, countryCode, locale = 'en-US'  }: SearchAirportsParams) => {
    const url = countryCode?  `${API_CONFIG.ENDPOINTS.SEARCH_AIRPORT}?query=${query}&market=${countryCode}&locale=${locale}` : 
    `${API_CONFIG.ENDPOINTS.SEARCH_AIRPORT}?query=${query}&locale=${locale}`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_CONFIG.RAPID_API_KEY,
                'x-rapidapi-host': API_CONFIG.HOSTS.SKY_SCRAPPER
            }
        });
        const result = await response.json();
        return transformAirportData(result.data);
    } catch (error) {
        console.error( error);
        throw error;
    }
};