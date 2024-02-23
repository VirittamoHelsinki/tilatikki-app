interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface Space {
  _id: string;
  name: string;
  area: number;
  premise: string;
  building: string;
  floor: number;
  availabilities: string[];
  reservations: string[];
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

export interface SpaceStateProps {
  spacesData: ApiResponse<Space[]>;
  spaceData: ApiResponse<Space>;
  currentSpace: Space | null;
  isLoading: boolean;
  alertType: string | null;
  alertText: string | null;
}

export const initialSpaceState: SpaceStateProps = {
  spacesData: {
    success: false,
    data: [],
  },
  spaceData: {
    success: false,
    data: {
      _id: "",
      name: "",
      area: 0,
      premise: "",
      building: "",
      floor: 0,
      availabilities: [],
      reservations: [],
    },
  },
  currentSpace: null,
  isLoading: false,
  alertType: null,
  alertText: null,
};
