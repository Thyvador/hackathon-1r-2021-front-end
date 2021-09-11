import moment from "moment";

const events = () => [
  {
    linkedObject: null,
    location: {
      id: "https://api.onerecord.fr/locations/bru-whs-2",
      geolocation: {
        id: "https://api.onerecord.fr/locations/bru-whs-2/geolocation",
        latitude: 50.90363,
        longitude: 4.45454,
      },
      code: "BRU", 
      locationName: "Brussels Warehouse 2",
      locationType: "Warehouse",
    },
    performedBy: {
      id: "https://api.onerecord.fr/companies/swissport",
      branch: {
        location: {
          id: "https://api.onerecord.fr/locations/bru",
        },
        branchName: "SWISSPORT Belgium",
      },
      iataCargoAgentCode: "SWISSPORT",
    },
    dateTime: moment(1628641338000).add(1, "hour").valueOf(),
    eventCode: "LOAD",
    eventName: "Container loaded at Brussels Warehouse 2",
    eventTypeIndicator: "Actual",
  },
];

export default events;
