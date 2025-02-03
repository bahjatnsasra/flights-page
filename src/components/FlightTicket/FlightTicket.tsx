import { Box, Card, Typography, Divider, Chip } from '@mui/material';
import { FlightTakeoff, FlightLand } from '@mui/icons-material';
import dayjs from 'dayjs';
import { FlightTicket } from '../../services/types';

interface FlightTicketProps {
    flight: FlightTicket;
}

export const FlightTicketCard = ({ flight }: FlightTicketProps) => {
    console.log(flight);
    
    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };

    const leg = flight.legs[0]; // For single flight leg

    return (
        <Card sx={{ p: 2, mb: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" gap={1}>
                    {leg.carriers.marketing[0].logoUrl && (
                        <img 
                            src={leg.carriers.marketing[0].logoUrl} 
                            alt={leg.carriers.marketing[0].name}
                            style={{ width: 32, height: 32 }}
                        />
                    )}
                    <Typography variant="subtitle1">
                        {leg.carriers.marketing[0].name}
                    </Typography>
                </Box>

                <Typography variant="h6" color="primary">
                    {flight.price.formatted}
                </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                    <Typography variant="h6">
                        {dayjs(leg.departure).format('HH:mm')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {leg.origin.city} ({leg.origin.code})
                    </Typography>
                </Box>

                <Box textAlign="center">
                    <Typography variant="caption" display="block">
                        {formatDuration(leg.durationInMinutes)}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <FlightTakeoff fontSize="small" />
                        <Divider orientation="horizontal" flexItem />
                        <FlightLand fontSize="small" />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                        {leg.stopCount === 0 ? 'Direct' : `${leg.stopCount} stop${leg.stopCount > 1 ? 's' : ''}`}
                    </Typography>
                </Box>

                <Box textAlign="right">
                    <Typography variant="h6">
                        {dayjs(leg.arrival).format('HH:mm')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {leg.destination.city} ({leg.destination.code})
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
};