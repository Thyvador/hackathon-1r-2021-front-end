import moment from "moment";

const manufactureToCentralStock = () => ({
  name: "Manufacturer to central stock",
  departure: {
    date: moment(1628641148000),
    location: {
      id: "https://api.onerecord.fr/locations/sha_warehouse",
      geolocation: {
        id: "https://api.onerecord.fr/locations/sha_warehouse/geolocation",
        elevation: {
          unit: "m",
          value: 0.0,
        },
        latitude: 31.04038,
        longitude: 121.283,
      },
      code: "SHA",
      locationName: "Shanghai",
      locationType: "Warehouse",
    },
  },
  arrival: {
    date: moment("2021-09-02T22:50:03+0200"),
    location: {
      geolocation: {
        elevation: {
          unit: "m",
          value: 0.0,
        },
        latitude: 50.74807,
        longitude: 3.25508,
      },
      code: "BCN",
      locationName: "Mouscron",
      locationType: "Warehouse",
    },
  },
  checkPoints: [
    {
      date: moment("2021-08-13T10:11:38+0800"),
      location: {
        id: "https://api.onerecord.fr/locations/cdsha",
        geolocation: {
          id: "https://api.onerecord.fr/locations/cdsha/geolocation",
          elevation: {
            unit: "m",
            value: 0.0,
          },
          latitude: 31.33193,
          longitude: 121.65435,
        },
        code: "CNSHA",
        locationName: "Shanghai",
        locationType: "Port",
      },
    },
    {
      date: moment("2021-09-01T04:24:52+02:00"),
      location: {
        id: "https://api.onerecord.fr/locations/nlrtm",
        geolocation: {
          id: "https://api.onerecord.fr/locations/nlrtm/geolocation",
          elevation: {
            unit: "m",
            value: 0.0,
          },
          latitude: 51.95138,
          longitude: 4.05362,
        },
        code: "NLRTM",
        locationName: "Rotterdam",
        locationType: "Port",
      },
    },
    {
      date: moment("2021-09-02T21:54:52+02:00"),
      location: {
        geolocation: {
          elevation: {
            unit: "m",
            value: 0.0,
          },
          latitude: 50.74807,
          longitude: 3.25508,
        },
        code: "BCN",
        locationName: "Mouscron",
        locationType: "Warehouse",
      },
    },
  ],
  events: [],
});

const eCommerceProcess = () => ({
  name: "eCommerce process",
  departure: {
    date: moment("2021-09-05T18:12:36+0200"),
    location: {
      geolocation: {
        elevation: {
          unit: "m",
          value: 0.0,
        },
        latitude: 50.74807,
        longitude: 3.25508,
      },
      code: "BCN",
      locationName: "Mouscron",
      locationType: "Warehouse",
    },
  },
  arrival: {
    date: moment("2021-09-06T09:34:11+0200"),
    location: {
      geolocation: {
        elevation: {
          unit: "m",
          value: 0.0,
        },
        latitude: 41.40079,
        longitude: 2.15767,
      },
      code: "BCN",
      locationName: "Barcelona",
      locationType: "House",
    },
  },
  checkPoints: [],
  events: [],
});

const warehouseToCustomer = () => ({
  name: "From warehouse to customer adress",
  departure: {
    date: moment("2021-09-06T12:30:52+0200"),
    location: {
      geolocation: {
        elevation: {
          unit: "m",
          value: 0.0,
        },
        latitude: 50.74807,
        longitude: 3.25508,
      },
      code: "BCN",
      locationName: "Mouscron",
      locationType: "Warehouse",
    },
  },
  arrival: {
    date: moment("2021-09-10T23:03:54+0200"),
    location: {
      geolocation: {
        elevation: {
          unit: "m",
          value: 0.0,
        },
        latitude: 41.40079,
        longitude: 2.15767,
      },
      code: "BCN",
      locationName: "Barcelona",
      locationType: "House",
    },
  },
  checkPoints: [
    {
      date: moment("2021-09-06T14:27:33+0200"),
      location: {
        id: "https://api.onerecord.fr/locations/bru",
        geolocation: {
          id: "https://api.onerecord.fr/locations/bru/geolocation",
          elevation: {
            unit: "m",
            value: 0.0,
          },
          latitude: 50.90434,
          longitude: "4.44.725",
        },
        code: "BRU",
        locationName: "Brussels",
        locationType: "Warehouse",
      },
    },
    {
      date: moment("2021-09-06T16:41:36+0200"),
      location: {
        id: "https://api.onerecord.fr/locations/bru",
        geolocation: {
          id: "https://api.onerecord.fr/locations/bru/geolocation",
          elevation: {
            unit: "m",
            value: 0.0,
          },
          latitude: 50.90363,
          longitude: 4.45454,
        },
        code: "BRU",
        locationName: "Brussels",
        locationType: "Airport",
      },
    },
    {
      date: moment("2021-09-07T21:08:05+02:00"),
      location: {
        id: "https://api.onerecord.fr/locations/bcn",
        geolocation: {
          id: "https://api.onerecord.fr/locations/bcn/geolocation",
          elevation: {
            unit: "m",
            value: 0.0,
          },
          latitude: 41.29866,
          longitude: 2.06322,
        },
        code: "BCN",
        locationName: "Barcelona",
        locationType: "Airport",
      },
    },
    {
      date: moment("2021-09-08T00:01:00+02:00"),
      location: {
        id: "https://api.onerecord.fr/locations/bcn",
        geolocation: {
          id: "https://api.onerecord.fr/locations/bcn/geolocation",
          elevation: {
            unit: "m",
            value: 0.0,
          },
          latitude: 41.40079,
          longitude: 2.15767,
        },
        code: "BCN",
        locationName: "Barcelona",
        locationType: "House",
      },
    },
  ],
  events: [],
});

const createGroups = () => [
  manufactureToCentralStock(),
  eCommerceProcess(),
  warehouseToCustomer(),
];

export { createGroups };
