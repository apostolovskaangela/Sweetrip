export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
};

export type MainDrawerParamList = {
  Dashboard: undefined;
  Trips: undefined;
  Vehicles: undefined;
  LiveTracking: undefined;
};

export type TripsStackParamList = {
  TripsList: undefined;
  TripDetails: { id: number };
  TripCreate: undefined;
  TripEdit: { id: number };
};
