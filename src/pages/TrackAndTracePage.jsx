import Page from "component/Page";
import { Timeline } from "@material-ui/lab";
import locations, { arrival, departure } from "data/locations";
import LocationItem from "component/timeline/LocationItem";
import EventItem from "component/timeline/EventItem";
import ArrivalItem from "component/timeline/Arrivaltem";
import DepartureItem from "component/timeline/DepartureItem";

const TrackAndTracePage = () => {
  return (
    <Page>
      <Timeline align="left">
        <DepartureItem locationName={departure.locationName} />
        {Object.values(locations).map((location) => (
          <LocationItem location={location} />
        ))}
        <EventItem
          event={{
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
          }}
        />
        <ArrivalItem locationName={arrival.locationName} />
      </Timeline>
    </Page>
  );
};

export default TrackAndTracePage;
