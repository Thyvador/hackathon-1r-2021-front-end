import { makeStyles, CardActionArea, Paper, Typography } from "@material-ui/core";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineDot from "@material-ui/lab/TimelineDot";
import DomainIcon from "@material-ui/icons/Domain";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";
import HomeIcon from "@material-ui/icons/Home";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  item: {
    "&::before": {
      content: "none",
    },
  },
  departureItem: {
    backgroundColor: theme.palette.error.main,
  },
  arrivalItem: {
    backgroundColor: theme.palette.error.main,
  },
}));

const LocationItemIcon = ({ location }) => {
  if (location.locationType === "Airport") {
    return <FlightTakeoffIcon />;
  } else if (location.locationType === "Port") {
    return <DirectionsBoatIcon />;
  } else if (location.locationType === "House") {
    return <HomeIcon />;
  }

  return <DomainIcon />;
};

const LocationItem = ({ location, date }) => {
  const classes = useStyles();

  return (
    <TimelineItem className={classes.item}>
      <TimelineSeparator>
        <TimelineDot color="secondary">
          <LocationItemIcon location={location} />
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <CardActionArea
          target="_blank"
          href={`https://www.google.com/maps/search/?api=1&query=${location.geolocation.latitude},${location.geolocation.longitude}`}
        >
          <Paper elevation={0} className={classes.paper}>
            <Typography variant="h6">{location.locationName}</Typography>
            <Typography variant="body1">{location.locationType}</Typography>
            <Typography variant="caption">
              {moment(date).format("LLLL")}
            </Typography>
          </Paper>
        </CardActionArea>
      </TimelineContent>
    </TimelineItem>
  );
};

export default LocationItem;
