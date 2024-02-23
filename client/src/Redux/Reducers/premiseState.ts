interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// interface Floor {
//   floor: number;
//   blueprint_url?: string;
// }

interface Blueprint {
  floor: number;
  image: string;
  _id: string;
}

interface Outline {
  floor: number;
  image: string;
  _id: string;
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

export interface BuildingDetails {
  _id: string;
  name: string;
  floors: number;
  rooms: number;
  blueprint: Blueprint[];
  facade: string[];
  outlines: Outline[];
  space: Space[];
}

export interface Premise {
  _id: string;
  name: string;
  address: string;
  users: string[];
  premise_facade: string[];
  buildings: BuildingDetails[];
}

export interface PremiseStateProps {
  premisesData: ApiResponse<Premise[]>;
  premiseData: Premise;
  reservationsData: ApiResponse<Reservation[]>;
  reservationData: Reservation;
  spacesData: ApiResponse<Space[]>;
  spaceData: ApiResponse<Space>;
  currentPremise: Premise | null;
  isLoading: boolean;
  alertType: string | null;
  alertText: string | null;
  currentBuilding: BuildingDetails | null;
}

export const initialPremiseState: PremiseStateProps = {
  premisesData: {
    success: false,
    data: [],
  },
  premiseData: {
    _id: "",
    name: "",
    address: "",
    users: [],
    premise_facade: [],
    buildings: [],
  },
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
  currentPremise: null,
  isLoading: false,
  alertType: null,
  alertText: null,
  currentBuilding: null,
};
