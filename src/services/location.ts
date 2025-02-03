import { API_CONFIG } from './endpoints';
import { LocationResponse } from '../services/types'



export const getCurrentLocation = async (): Promise<LocationResponse> => {
    const url = `${API_CONFIG.ENDPOINTS.GEO_LOCATION}?format=json&language=en`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_CONFIG.RAPID_API_KEY,
                'x-rapidapi-host': API_CONFIG.HOSTS.GEO_LOCATION
            }
        });
        
        const result = await response.json();
        const data = {
            location: {
                latitude: result.location.latitude,
                longitude: result.location.longitude,
            },
            city: {
                name: result.city.name
            },
            country: {
                name: result.country.name,
                code: result.country.code,
            }
        };

        console.log(data);
        
        return data
    } catch (error) {
        throw error;
    }
};