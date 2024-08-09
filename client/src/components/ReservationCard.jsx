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

const ReservationCard = ({ roomId, roomNumber, purpose, status, capacity, reservationDate, startTime, endTime, groupsize, creator, filterValues, reservationId }) => {

	const [isOpen, setIsOpen] = useState(false);


	const handleOpenDialog = () => {
		setIsOpen(true);
	};

	const handleCloseDialog = () => {
		setIsOpen(false);
	};


	const colorStyles = {
		Vapaa: {
			backgroundColor: '#D3FCE5', // custom green color
			color: '#008A2E'
		},
		Varattu: {
			backgroundColor: '#FFE0E1', // custom red color
			color: '#E60000'
		},
		Osittain: {
			backgroundColor: '#FDF5D3', // custom orange color
			color: '#DC7609'
		}
	}

	const getColorStyle = () => {
		if (status === 'Vapaa') {
			return colorStyles.Vapaa;
		} else if (status === 'Varattu') {
			return colorStyles.Varattu;
		} else {
			return colorStyles.Osittain;
		}
	};

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
										size="small"
										sx={{ marginLeft: 1, ...getColorStyle(), fontWeight: 600, padding: 1 }}
									/>
								</Box>
							</Grid>
							{<Grid item xs={12} sm={6}>
								<Box display="flex" alignItems="center">
									<PeopleIcon sx={{ marginRight: 1 }} />
									<Typography variant="body2" color="textSecondary">
										{groupsize}/{capacity}
									</Typography>
								</Box>
							</Grid>}
						</Grid>
					</CardContent>
				</Card>
			</ButtonBase>
			<ReservationDialog isOpen={isOpen} onClose={handleCloseDialog} roomId={roomId} roomNumber={roomNumber}
				capacity={capacity} groupsize={groupsize} creator={creator} filterValues={filterValues} status={status} reservationId={reservationId} />
		</>
	);
};

export default ReservationCard;
