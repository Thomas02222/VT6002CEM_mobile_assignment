export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Search: undefined;
  Tabs: { screen: string } | undefined;
  PlaceDetail: { location_id: string };
  MyTrips: undefined;
  TripEditor: { tripId?: string | undefined };
};
