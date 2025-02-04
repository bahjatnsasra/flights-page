import { Box, IconButton, Paper, Tooltip } from '@mui/material';

import "./FlightSearchForm.css"
import { FlightInfo } from '../FlightInfo/FlightInfo';
import LocationAutocomplete from '../LocationAutocomplete/LocationAutocomplete ';
import { useEffect, useState } from 'react';
import PlaceIcon from '@mui/icons-material/Place';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { CustomDatePicker } from '../DatePicker/DatePicker';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import dayjs ,{ Dayjs } from 'dayjs';
import { getCurrentLocation } from '../../services/location';
import { searchAirports } from '../../services/airports';
import { Airport, FlightTicket } from '../../services/types'
import { searchFlights } from '../../services/flights';
import { FlightList } from '../FlightTicket/FlightTicketList';


export function FlightSearchForm () {
    const [departureAirport, setDepartureAirport] = useState<Airport>();
    const [landingAirport, setLandingAirport] = useState<Airport>();
    const [tripType, setTripType] = useState('Round');
    const [passengerCount, setPassengerCount] = useState(1);
    const [tripClass, setTripClass] = useState('Economy');
    const [departureDate, setDepartureDate] = useState<Dayjs>(dayjs('2025-02-17'));
    const [returnDate, setReturnDate] = useState<Dayjs>(dayjs('2025-02-26'));
    const [departureAirports, setDepartureAirports] = useState<Airport[]>([]);
    const [landingAirports, setLandingAirports] = useState<Airport[]>([]);
    const [departureSearchQuery, setDepartureSearchQuery] = useState<string>('');
    const [landingeSearchQuery, setLandingeSearchQuery] = useState<string>('');
    const [flights, setFlights] = useState<FlightTicket[]>([]);
    const [isLoading, setIsLoading] = useState(false);





    useEffect(() => {
            const fetchLocationAndAirports = async () => {
                try {
                    const location = await getCurrentLocation();
                    const airports = await searchAirports({
                        query: location.country.name,
                        countryCode: location.country.code
                    });
                    setDepartureAirports(airports);
                    
                } catch (error) {
                    console.error('Error:', error);
                }
                
            }
            fetchLocationAndAirports()
        },[])



        useEffect(() => {
            const debounceTimeout = setTimeout(async () => {
                try {
                    if (departureSearchQuery) {
                        console.log("departureSearchQuery");
                        const departureAirports = await searchAirports({
                            query: departureSearchQuery, 
                            countryCode: null
                        });
                        setDepartureAirports(departureAirports);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }, 2000);
            return () => clearTimeout(debounceTimeout);
        }, [departureSearchQuery]);
        
        useEffect(() => {
            const debounceTimeout = setTimeout(async () => {
                try {
                    if (landingeSearchQuery) {
                        console.log("landingeSearchQuery");
                        const landingAirports = await searchAirports({
                            query: landingeSearchQuery, 
                            countryCode: null
                        });
                        setLandingAirports(landingAirports);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }, 2000);
            return () => clearTimeout(debounceTimeout);
        }, [landingeSearchQuery]);


        const handleSearch = async () => {
            if (!departureAirport || !landingAirport || !departureDate) return;
        
            try {
                setIsLoading(true);
                const flights = await searchFlights({
                    originSkyId: departureAirport.code,
                    destinationSkyId: landingAirport.code,
                    originEntityId: departureAirport.entityId,
                    destinationEntityId: landingAirport.entityId,
                    date: departureDate.format('YYYY-MM-DD'),
                    cabinClass: tripClass.toLowerCase(),
                    adults: passengerCount
                });
                setFlights(flights.data.itineraries);
            } catch (error) {
                console.error('Error searching flights:', error);
            } finally { 
                setIsLoading(false);
            }
        };
    return (
        <div>
            <Paper elevation={3} className="flight-search-container">
                <FlightInfo passengerCount={passengerCount} setPassengerCount={setPassengerCount} setTripClass={setTripClass} setTripType={setTripType} tripClass={tripClass} tripType={tripType} />
                <div className='location-info-container'>
                    <LocationAutocomplete
                        rightIcon={<MyLocationIcon />}
                        placeholder="Where from?"
                        value={departureAirport}
                        setAirportLocations={setDepartureAirport}
                        airports={departureAirports}
                        setSearchQuery={setDepartureSearchQuery}
                    /> 
                    <Tooltip title="switch locations">
                        <IconButton>
                            <CompareArrowsIcon/>
                        </IconButton>
                    </Tooltip>
                    <LocationAutocomplete
                        rightIcon={<PlaceIcon />}
                        placeholder="Where to?"
                        value={landingAirport}
                        setAirportLocations={setLandingAirport}
                        airports={landingAirports}
                        setSearchQuery={setLandingeSearchQuery}
                    />
                    <div className='date-picker-container'>
                        <CustomDatePicker 
                            calenderText="Departure" 
                            dateValue={departureDate}
                            setDate={setDepartureDate}
                        />
                        <CustomDatePicker 
                            calenderText="Return" 
                            dateValue={returnDate}
                            setDate={setReturnDate}
                        />
                    </div>
                </div>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    mt: 2  
                }}>
                    <Button onClick={handleSearch} sx={{borderRadius: 10}} variant="contained" endIcon={<SearchIcon />}>
                        Search
                    </Button>
                </Box>
            </Paper>
            <div className="flight-list-container">
                <FlightList flights={flights} isLoading={isLoading} />
            </div>
        </div>
    );
}
