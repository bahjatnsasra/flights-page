import { Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './PassengerInfo.css'
import { IPassengerInfoProps } from '../../services/types'




export function PassengerInfo (props: IPassengerInfoProps) {
    const handleIncrease = (event: React.MouseEvent) => {
        props.onIncrease?.();
    };

    const handleDecrease = (event: React.MouseEvent) => {
        props.onDecrease?.();
    };

    return (
        <div className='passenger-info-container'>
                <Box>
                    <Typography variant="subtitle1">{props.label}</Typography>
                    {props.subLabel && (
                        <Typography variant="caption" color="text.secondary">
                            {props.subLabel}
                        </Typography>
                    )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <IconButton 
                        size="small"
                        onClick={handleDecrease}
                        disabled={props.count! <= props.minValue!}
                    >
                        <RemoveIcon />
                    </IconButton>
                    <Typography>{props.count!}</Typography>
                    <IconButton 
                        size="small"
                        onClick={handleIncrease}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
        </div>
    );
}
