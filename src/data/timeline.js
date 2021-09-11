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
    events: [
      {
        id: "https://api.onerecord.fr/companies/af/pieces/box1/events/41b896d5-a70f-418e-b656-6e3acfb0ebf5",
        linkedObject: {
          id: "https://api.onerecord.fr/companies/af/pieces/box1",
        },
        location: {
          id: "https://api.onerecord.fr/locations/pek",
          geolocation: {
            id: "https://api.onerecord.fr/locations/pek/geolocation",
            elevation: {
              unit: "m",
              value: 500.0,
            },
            latitude: 1.23456,
            longitude: 1.23456,
          },
          code: "PEK",
          locationName: "Airport Beijing",
          locationType: "Airport",
        },
        performedBy: {
          id: "https://api.onerecord.fr/companies/nike",
          branch: {
            branchName: "Nike",
          },
        },
        dateTime: 1630849600973,
        eventCode: "PKG",
        eventName: "Packaged",
        eventTypeIndicator: "Actual",
      },
    ],
  },
];

export { createGroups };
