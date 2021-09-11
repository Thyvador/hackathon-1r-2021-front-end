const locations = {
  cnsha: {
    id: "https://api.onerecord.fr/locations/cdsha",
    geolocation: {
      id: "https://api.onerecord.fr/locations/cdsha/geolocation",
      elevation: {
        unit: "m",
        value: 500.0,
      },
      latitude: 31.04038,
      longitude: 121.283,
    },
    code: "CNSHA",
    locationName: "Shanghai port",
    locationType: "Port",
  },
  bru: {
    id: "https://api.onerecord.fr/locations/bru",
    geolocation: {
      id: "https://api.onerecord.fr/locations/bru/geolocation",
      elevation: {
        unit: "m",
        value: 500.0,
      },
      latitude: 50.90363,
      longitude: 4.45454,
    },
    code: "BRU",
    locationName: "Bruxelles airport",
    locationType: "Airport",
  },
};

const departure = {
  id: "https://api.onerecord.fr/locations/sha_warehouse",
  geolocation: {
    id: "https://api.onerecord.fr/locations/sha_warehouse/geolocation",
    elevation: {
      unit: "m",
      value: 500.0,
    },
    latitude: 31.04038,
    longitude: 121.283,
  },
  code: "SHA_WAREHOUSE",
  locationName: "Shanghai warehouse",
  locationType: "Warehouse",
};
const arrival = {
  geolocation: {
    elevation: {
      unit: "m",
      value: 500.0,
    },
    latitude: 41.40079,
    longitude: 2.15767,
  },
  code: "BCN",
  locationName: "Mr Bond's House",
  locationType: "House",
};

export { departure, arrival };
export default locations;
