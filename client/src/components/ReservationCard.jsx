import React, { useState, useEffect } from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	Typography,
	Box,
	Chip,
	Avatar,
	Grid,
	ButtonBase
} from '@mui/material';
import dayjs from 'dayjs';
import PeopleIcon from '@mui/icons-material/People';
import ReservationDialog from '../components/ReservationDialog';

const ReservationCard = ({ roomId, roomNumber, purpose, status, capacity, reservationDate, startTime, endTime, groupsize, creator }) => {

	const [isOpen, setIsOpen] = useState(false);


	const handleOpenDialog = () => {
		setIsOpen(true);
	};

	const handleCloseDialog = () => {
		setIsOpen(false);
	};

	const color = () => {
		if (status === 'Vapaa') {
			return 'success'
		} else if (status === 'Varattu') {
			return 'error'
		} else {
			return 'warning'
		}
	}

	return (
		<>
			<ButtonBase onClick={handleOpenDialog} sx={{ width: '100%', display: 'block', textAlign: 'left' }}>
				<Card variant="outlined">
					<CardHeader
						title={
							<Box display="flex" justifyContent="space-between" alignItems="center">
								<Typography variant="h6">{`Room ${roomNumber}`}</Typography>

								<Box display="flex" justifyContent="flex-end" flexGrow={1} style={{ marginLeft: 30 }}>
									{reservationDate && startTime && endTime && (
										<Typography variant="body2" color="textSecondary">
											{dayjs(reservationDate).format('DD.MM.YYYY')} {startTime} - {endTime}
										</Typography>
									)}
								</Box>
							</Box>
						}
						subheader={purpose}
					/>
					<CardContent>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<Box display="flex" alignItems="center">
									<Chip
										label={status}
										color={color()}
										size="small"
										sx={{ marginLeft: 1 }}
									/>
								</Box>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Box display="flex" alignItems="center">
									<PeopleIcon sx={{ marginRight: 1 }} />
									<Typography variant="body2" color="textSecondary">
										{groupsize}/{capacity}
									</Typography>
								</Box>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</ButtonBase>
			<ReservationDialog isOpen={isOpen} onClose={handleCloseDialog} roomId={roomId} roomNumber={roomNumber}
				capacity={capacity} groupsize={groupsize} creator={creator} />
		</>
	);
};

export default ReservationCard;
