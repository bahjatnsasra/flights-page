import { Dayjs } from 'dayjs';



export interface ICustomDatePickerProps {
    calenderText: string;
    setDate: Function
    dateValue: Dayjs
}


export interface IFlightInfoProps {
    tripType: string,
    passengerCount: number,
    tripClass: string,
    setTripType: Function,
    setPassengerCount: Function,
    setTripClass: Function,
}


export interface ILocationAutocompleteProps {
    rightIcon?: React.ReactNode;
    placeholder: string;
    value?: Airport | null;
    setAirportLocations: Function
    airports: Airport[]
    setSearchQuery: Function
}

export interface CityOption {
    city: string;
    country?: string;
    description?: string;
    isHistory?: boolean;
    
}


export interface IPassengerInfoProps {
    label?: string;
    subLabel?: string;
    count?: number;
    onIncrease?: () => void;
    onDecrease?: () => void;
    minValue?: number;
}


export interface NearbyAirportsParams {
    latitude: number;
    longitude: number;
    locale?: string;
}

export interface SearchAirportsParams {
    query: string;
    countryCode: string | null;
    locale?: string;
}


export interface LocationResponse {
    location: {
        latitude: number;
        longitude: number;
    };
    country: {
        name: string;
        code: string;
    };
    city: {
        name: string;
    };
}


export interface Airport {
    name: string;       
    city: string;       
    code: string;   
    entityId: string;
}


export interface SearchFlightsParams {
    originSkyId: string;
    destinationSkyId: string;
    originEntityId: string;
    destinationEntityId: string;
    cabinClass?: string;
    adults?: number;
    sortBy?: string;
    currency?: string;
    market?: string;
    countryCode?: string;
    date?: string;
    returnDate?: string;
}


export interface Carrier {
    id: number;
    name: string;
    logoUrl?: string;
}


export interface FlightLeg {
    origin: Airport;
    destination: Airport;
    durationInMinutes: number;
    stopCount: number;
    departure: string;
    arrival: string;
    carriers: {
        marketing: Carrier[];
    };
}

export interface FlightPrice {
    raw: number;
    formatted: string;
}

export interface FlightTicket {
    id: string;
    price: FlightPrice;
    legs: FlightLeg[];
    isSelfTransfer: boolean;
    tags: string[];
}