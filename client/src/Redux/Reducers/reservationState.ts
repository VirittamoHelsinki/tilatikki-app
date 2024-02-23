interface ApiResponse<T> {
  success: boolean;
  data: T;
}
export interface Reservation {
  _id: string;
  creator: string;
  startdate: Date;
  enddate: Date;
  premise: string;
  space: string;
  availability: string;
}

export interface ReservationStateProps {
  reservationsData: ApiResponse<Reservation[]>;
  reservationData: Reservation;
  currentReservation: Reservation | null;
  isLoading: boolean;
  alertType: string | null;
  alertText: string | null;
}

export const initialReservationState: ReservationStateProps = {
  reservationsData: {
    success: false,
    data: [],
  },
  reservationData: {
    _id: "",
    creator: "",
    startdate: new Date(2021, 1, 1),
    enddate: new Date(2021, 1, 1),
    premise: "",
    space: "",
    availability: "",
  },
  currentReservation: null,
  isLoading: false,
  alertType: null,
  alertText: null,
};
