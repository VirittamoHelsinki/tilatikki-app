import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const MapTooltip = ({ roomName, style }) => {
  return (
    <Card style={{ position: 'absolute', ...style }}>
      <CardContent>
        <Typography variant="body1">{roomName}</Typography>
      </CardContent>
    </Card>
  );
};

export default MapTooltip;
