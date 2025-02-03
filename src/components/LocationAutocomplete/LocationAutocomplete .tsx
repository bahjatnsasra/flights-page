import * as React from 'react';
import { 
    Autocomplete, 
    TextField, 
    Box, 
    Typography,
    IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './LocationAutocomplete.css'
import { Airport, ILocationAutocompleteProps } from '../../services/types'




export default function LocationAutocomplete(props: ILocationAutocompleteProps) {

    
    const renderOption = (props: any, airport: Airport) => {
        const { key, ...otherProps } = props; 
        return (
            <Box component="li" key={key} {...otherProps}>
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    padding: '8px'
                }}>
                    <Box>
                        <Typography variant="body1">
                            {airport.name}, {airport.city}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        );
    };

    const handleLocationClick = () => {
        console.log('Getting user location...');
    };

    return (
        <div className='auto-complete-container'>
            {props.rightIcon && 
                (
                    <IconButton onClick={handleLocationClick}>
                        {props.rightIcon}
                    </IconButton>
                )
            }

            <Autocomplete
                onInputChange={(event, newInputValue) => {props.setSearchQuery(newInputValue)}}
                options={props.airports}
                value={props.value}
                onChange={(event,value) => {props.setAirportLocations(value);}}
                getOptionLabel={(option) => option.city}
                renderOption={renderOption}
                sx={{ minWidth: '300px',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': { border: 'none' }  
                    }
                }}
                popupIcon={null}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={props.placeholder}
                        variant="outlined"
                    />
                )}
            />

            
                <IconButton>
                    <AddIcon/>
                </IconButton>
        </div>
    );
}