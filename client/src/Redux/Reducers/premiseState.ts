// Define the structure for individual building floors
interface Floor {
    floor: number;
    blueprint_url?: string;
  }
  
  // Define the structure for buildings
  interface Building {
    name: string;
    floors: Floor[];
  }
  
  // Define the structure for a premise
  interface Premise {
    name: string;
    address: string;
    users: string[];  // Array of User ObjectIds
    spaces: string[];  // Array of Space ObjectIds
    buildings: Building[];
  }
  
  // Define the structure for the premise state
  export interface initialPremiseStateProps {
    premises: Premise[];
    currentPremise: Premise | null;
    isLoading: boolean;
    alertType: string | null;
    alertText: string | null;
  }
  
  // Initial state for premises
  export const initialPremiseState: initialPremiseStateProps = {
    premises: [],
    currentPremise: null,
    isLoading: false,
    alertType: null,
    alertText: null,
  };
  
  