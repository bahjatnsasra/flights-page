import { Box, Typography } from '@mui/material';
import { FlightTicketCard } from '../FlightTicket/FlightTicket';
import { FlightTicket } from '../../services/types';


interface FlightListProps {
    flights: FlightTicket[];
    isLoading?: boolean;
}

export const FlightList = ({ flights, isLoading }: FlightListProps) => {
    
    if (isLoading) {
        return <Typography>Loading flights...</Typography>;
    }

    if (!flights?.length) {
        return <Typography>No flights found</Typography>;
    }

    return (
        <Box sx={{ mt: 3 }}>
            {flights.map((flight) => (
                <FlightTicketCard key={flight.id} flight={flight} />
            ))}
        </Box>
    );
};