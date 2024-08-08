import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const MapTooltip = ({ roomName, roomCapacity, style }) => {
  return (
    <Card style={{ position: 'absolute', ...style }}>
      <CardContent>
        <Typography variant="body1">{roomName}</Typography>
        <Typography variant="body1">Kapasiteetti: {roomCapacity} </Typography>
      </CardContent>
    </Card>
  );
};

export default MapTooltip;
