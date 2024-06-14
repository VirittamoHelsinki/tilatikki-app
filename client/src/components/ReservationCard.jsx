// import React, { useState } from 'react';
// import {
// 	Card,
// 	CardContent,
// 	CardHeader,
// 	Typography,
// 	Box,
// 	Chip,
// 	Avatar,
// 	Grid
// } from '@mui/material';
// import PeopleIcon from '@mui/icons-material/People';
// import ReservationDialog from '../components/reservationDialog';
//
// const ReservationCard = ({ roomId, roomNumber, purpose, status, capacity, startTime, endTime, groupsize }) => {
//
// 	const [isOpen, setIsOpen] = useState(false);
//
// 	const handleOpenDialog = () => {
// 		setIsOpen(true);
// 	};
//
// 	const handleCloseDialog = () => {
// 		setIsOpen(false);
// 	};
//
// 	return (
// 		<>
// 			<Card variant="outlined">
// 				<CardHeader
// 					avatar={<Avatar aria-label="room-number">{roomNumber}</Avatar>}
// 					title={
// 						<Box display="flex" justifyContent="space-between" alignItems="center">
// 							<Typography variant="h6">{`Room ${roomNumber}`}</Typography>
//
// 							<Box display="flex" justifyContent="flex-end" flexGrow={1} style={{ marginLeft: 30 }}>
// 								{startTime && endTime && (
// 									<Typography variant="body2" color="textSecondary">
// 										{new Date(startTime).toLocaleString()} - {new Date(endTime).toLocaleString()}
// 									</Typography>
// 								)}
// 							</Box>
// 						</Box>
// 					}
// 					subheader={purpose}
// 				/>
// 				<CardContent>
// 					<Grid container spacing={2}>
// 						<Grid item xs={12} sm={6}>
// 							<Box display="flex" alignItems="center">
// 								<Chip
// 									label={status}
// 									color={status === 'Vapaa' ? 'success' : 'error'}
// 									size="small"
// 									sx={{ marginLeft: 1 }}
// 								/>
// 							</Box>
// 						</Grid>
// 						<Grid item xs={12} sm={6}>
// 							<Box display="flex" alignItems="center">
// 								<PeopleIcon sx={{ marginRight: 1 }} />
// 								<Typography variant="body2" color="textSecondary">
// 									{groupsize}/{capacity}
// 								</Typography>
// 							</Box>
// 						</Grid>
// 						<Grid item xs={12}>
// 							<Button variant="outlined" onClick={handleOpenDialog}>
// 								Open Reservation Dialog
// 							</Button>
// 						</Grid>
// 					</Grid>
// 				</CardContent>
// 			</Card>
// 			<ReservationDialog isOpen={isOpen} onClose={handleCloseDialog} roomId={roomId} />
// 		</>
// 	);
// };
//
// export default ReservationCard;


import React, { useState } from 'react';
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
import PeopleIcon from '@mui/icons-material/People';
import ReservationDialog from '../components/reservationDialog';

const ReservationCard = ({ roomId, roomNumber, purpose, status, capacity, startTime, endTime, groupsize }) => {

	const [isOpen, setIsOpen] = useState(false);

	const handleOpenDialog = () => {
		setIsOpen(true);
	};

	const handleCloseDialog = () => {
		setIsOpen(false);
	};

	return (
		<>
			<ButtonBase onClick={handleOpenDialog} sx={{ width: '100%', display: 'block', textAlign: 'left' }}>
				<Card variant="outlined">
					<CardHeader
						avatar={<Avatar aria-label="room-number">{roomNumber}</Avatar>}
						title={
							<Box display="flex" justifyContent="space-between" alignItems="center">
								<Typography variant="h6">{`Room ${roomNumber}`}</Typography>

								<Box display="flex" justifyContent="flex-end" flexGrow={1} style={{ marginLeft: 30 }}>
									{startTime && endTime && (
										<Typography variant="body2" color="textSecondary">
											{new Date(startTime).toLocaleString()} - {new Date(endTime).toLocaleString()}
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
										color={status === 'Vapaa' ? 'success' : 'error'}
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
			<ReservationDialog isOpen={isOpen} onClose={handleCloseDialog} roomId={roomId} />
		</>
	);
};

export default ReservationCard;
