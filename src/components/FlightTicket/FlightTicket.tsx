import { useState } from 'react';
import { 
    Box, 
    Card, 
    Typography, 
    Divider, 
    Chip,
    Collapse,
    IconButton,
    Stack
} from '@mui/material';
import { 
    FlightTakeoff, 
    FlightLand, 
    KeyboardArrowDown, 
    AccessTime, 
    Airlines,
    DateRange
} from '@mui/icons-material';
import dayjs from 'dayjs';
import { FlightTicket } from '../../services/types';
import './FlightTicket.css';

interface FlightTicketProps {
    flight: FlightTicket;
}

export const FlightTicketCard = ({ flight }: FlightTicketProps) => {
    const [expanded, setExpanded] = useState(false);
    
    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };

    const leg = flight.legs[0];

    return (
        <Card className={`flight-ticket ${expanded ? 'expanded' : ''}`}>
            <Box className="flight-ticket-main">
                <Box className="flight-header">
                    <Box className="airline-info">
                        {leg.carriers.marketing[0].logoUrl && (
                            <img 
                                src={leg.carriers.marketing[0].logoUrl} 
                                alt={leg.carriers.marketing[0].name}
                                className="airline-logo"
                            />
                        )}
                        <Stack>
                            <Typography variant="h6" className="airline-name">
                                {leg.carriers.marketing[0].name}
                            </Typography>
                        </Stack>
                    </Box>
                    <Box className="price-section">
                        <Typography variant="h5" color="primary" className="price">
                            {flight.price.formatted}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            per person
                        </Typography>
                    </Box>
                </Box>

                <Divider />

                <Box className="flight-route">
                    <Box className="route-point departure">
                        <Typography variant="h4" className="time">
                            {dayjs(leg.departure).format('HH:mm')}
                        </Typography>
                        <Typography variant="h6">
                            {leg.origin.city}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {leg.origin.code} • {dayjs(leg.departure).format('D MMM')}
                        </Typography>
                    </Box>

                    <Box className="duration-indicator">
                        <Typography variant="body2" className="duration-text">
                            {formatDuration(leg.durationInMinutes)}
                        </Typography>
                        <Box className="flight-line">
                            <FlightTakeoff className="plane-icon departure" />
                            <div className="line" />
                            <FlightLand className="plane-icon arrival" />
                        </Box>
                        <Chip 
                            label={leg.stopCount === 0 ? 'Direct Flight' : `${leg.stopCount} Stop${leg.stopCount > 1 ? 's' : ''}`}
                            size="small"
                            color={leg.stopCount === 0 ? "success" : "default"}
                            className="stops-chip"
                        />
                    </Box>

                    <Box className="route-point arrival">
                        <Typography variant="h4" className="time">
                            {dayjs(leg.arrival).format('HH:mm')}
                        </Typography>
                        <Typography variant="h6">
                            {leg.destination.city}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {leg.destination.code} • {dayjs(leg.arrival).format('D MMM')}
                        </Typography>
                    </Box>
                </Box>

                <IconButton 
                    className={`expand-button ${expanded ? 'expanded' : ''}`}
                    onClick={() => setExpanded(!expanded)}
                >
                    <KeyboardArrowDown />
                </IconButton>
            </Box>

            <Collapse in={expanded}>
                <Box className="flight-details">
                    <Typography variant="h6" gutterBottom>Flight Details</Typography>
                    <Box className="features-grid">
                        <Box className="feature">
                            <Airlines />
                            <Typography variant="body2">
                                {leg.carriers.marketing[0].name}
                            </Typography>
                        </Box>
                        
                        <Box className="feature">
                            <AccessTime />
                            <Typography variant="body2">
                                {formatDuration(leg.durationInMinutes)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Flight Duration
                            </Typography>
                        </Box>

                        <Box className="feature">
                            <DateRange />
                            <Typography variant="body2">
                                {dayjs(leg.departure).format('DD MMM YYYY')}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Departure Date
                            </Typography>
                        </Box>
                    </Box>

                </Box>
            </Collapse>
        </Card>
    );
};