import express from 'express';
import { getReservation, createReservation,updateReservation,deleteReservation } from '../controllers/reservationControllers';

const router = express.Router();

router.route('/').get(getReservation).post(createReservation);
router.route('/:id').get(getReservation).put(updateReservation).delete(deleteReservation);

export default router;
