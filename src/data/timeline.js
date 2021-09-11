import moment from "moment";

const createGroups = () => [
  {
    name: "Group 1",
    departure: {
      date: moment("2021-09-10T06:00:00.000Z"),
      location: {
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
      },
    },
    arrival: {
      date: moment("2021-09-12T06:54:05.000Z"),
      location: {
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
      },
    },
    checkPoints: [
      {
        date: moment("2021-09-11T10:00:05.000Z"),
        location: {
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
      },
    ],
    events: [],
  },
];

export { createGroups };
