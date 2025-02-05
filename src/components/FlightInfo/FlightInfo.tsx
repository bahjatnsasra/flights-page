import { PassengerInfo } from '../PassengerInfo/PassengerInfo';
import { Select, MenuItem, InputAdornment,SelectChangeEvent } from '@mui/material';
import RepeatIcon from '@mui/icons-material/Repeat';
import PersonIcon from '@mui/icons-material/Person';
import * as mock from '../../mock/mock_data'
import { useState } from 'react';
import { IFlightInfoProps } from '../../services/types'


export function FlightInfo (props: IFlightInfoProps) {

        const [passengerData, setPassengerData] = useState(mock.passengersMock);

        function countPassengers() {
            let counter = 0
            passengerData.map((p) => {
                counter = counter + p.count
            })
            props.setPassengerCount(counter)
        }

        function updatePassengerData(change: number, key: number) {
            const newData = [...passengerData];
            const newCount = newData[key].count + change;
            
            if (newCount >= newData[key].minValue) {
                newData[key].count = newCount;
            }

            countPassengers()
            setPassengerData(newData);
        }

        const handleTripTypeChange = (event: SelectChangeEvent) => {
            props.setTripType(event.target.value);
            console.log(event.target.value);
        };
    
        const handleTripClassChange = (event: SelectChangeEvent) => {
            props.setTripClass(event.target.value);
            console.log(event.target.value);
        };

    return (
        <div className='flight-info'>
                    <Select
                        startAdornment={
                            <InputAdornment position="start">
                                <RepeatIcon />
                            </InputAdornment>
                        }
                        value={props.tripType}
                        onChange={handleTripTypeChange}

                    >
                        <MenuItem value="Round">Round trip</MenuItem>
                        <MenuItem value="One">One way</MenuItem>
                        <MenuItem value="Multi">Multi-city</MenuItem>
                    </Select>

                    <Select
                        startAdornment={
                            <InputAdornment position="start">
                                <PersonIcon />
                            </InputAdornment>
                        }
                        value={props.passengerCount}
                    >   
                    {
                        passengerData.map((p, key) => (
                            <PassengerInfo
                                key={key}
                                label={p.label}
                                subLabel={p.sublabel}
                                count={p.count}
                                onIncrease={() => updatePassengerData(1,key)}
                                onDecrease={() => updatePassengerData(-1,key)}
                                minValue={p.minValue}
                            />
                        ))
                    }
                    </Select>
                    
                    <Select
                        value={props.tripClass}
                        onChange={handleTripClassChange}
                    >
                        {
                            mock.tripClass.map((c, key) => (
                                <MenuItem value={c}>{c}</MenuItem>
                            ))
                        }
                    </Select>
                </div>
    );
}
