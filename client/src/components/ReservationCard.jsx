import {
	Card,
	CardContent,
	CardHeader,
	Typography,
	Box,
	Chip,
	Avatar,
	Grid
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';

const ReservationCard = ({ roomNumber, purpose, status, capacity, startTime, endTime }) => {
	// console.log('roomNumber: ', roomNumber)
	// console.log('purpose: ', purpose)
	// console.log('status: ', status)
	// console.log('capacity: ', capacity)
	// console.log('startTime: ', startTime)
	// console.log('endTime: ', endTime)
	return (
		<Card variant="outlined">
			<CardHeader
				avatar={<Avatar aria-label="room-number">{roomNumber}</Avatar>}
				title={
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Typography variant="h6">{`Room ${roomNumber}`}</Typography>
						<Box>
							<Typography variant="body2" color="textSecondary">
								{startTime} - {endTime}
							</Typography>
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
								{capacity}
							</Typography>
						</Box>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default ReservationCard;
