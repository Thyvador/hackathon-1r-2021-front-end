const events = () => [
  [
    {
      "linkedObject": {
          "id": "https://api.onerecord.fr/companies/msc/piece-dgs/container1"
      },
      "location": {
          "id": "https://api.onerecord.fr/locations/cnsha-port",
          "locationName": "Shanghai Port",
      },
      "performedBy": {
          "id": "https://api.onerecord.fr/companies/msc",
          "branch": {
            "branchName": "MSC Rotterdam"
          }
      },
      "dateTime": 1628847204000,
      "eventCode": "LOAD",
      "eventName": "(SCAN) Container loaded in the ship",
      "eventTypeIndicator": "Actual"
    }, {
      "linkedObject": {
          "id": "https://api.onerecord.fr/companies/asus/piece-dgs/pallet1"
      },
      "location": {
          "id": "https://api.onerecord.fr/locations/cnsha-port",
          "locationName": "Shanghai Port",
      },
      "performedBy": {
          "id": "https://api.onerecord.fr/companies/msc",
          "branch": {
            "branchName": "MSC Rotterdam"
          }
      },
      "dateTime": 1628847204000,
      "eventCode": "LOAD",
      "eventName": "(SCAN) Container loaded in the ship",
      "eventTypeIndicator": "Actual"
    }, {
      "linkedObject": {
          "id": "https://api.onerecord.fr/companies/asus/items/zenbook1"
      },
      "location": {
          "id": "https://api.onerecord.fr/locations/cnsha-port",
          "locationName": "Shanghai Port",
      },
      "performedBy": {
          "id": "https://api.onerecord.fr/companies/msc",
          "branch": {
            "branchName": "MSC Rotterdam"
          }
      },
      "dateTime": 1628847204000,
      "eventCode": "LOAD",
      "eventName": "(SCAN) Container loaded in the ship",
      "eventTypeIndicator": "Actual"
    }
  ],
  [{
    "linkedObject": {
        "id": "https://api.onerecord.fr/companies/asus/items/zenbook1"
    },
    "location": {
        "id": "https://api.onerecord.fr/locations/bru-whs-1",
        "locationName": "Brussels Warehouse 1"
    },
    "performedBy": {
        "id": "https://api.onerecord.fr/companies/dhl",
        "branch": {
          "branchName": "DHL Belgium"
        }
    },
    "dateTime": 1630932012000,
    "eventCode": "UNLOAD",
    "eventName": "(SCAN) Piece unloaded from truck",
    "eventTypeIndicator": "Actual"
  }]
];

export default events;
