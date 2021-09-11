import Page from "component/Page";
import { Timeline } from "@material-ui/lab";
import LocationItem from "component/timeline/LocationItem";
import EventItem from "component/timeline/EventItem";
import ArrivalItem from "component/timeline/Arrivaltem";
import DepartureItem from "component/timeline/DepartureItem";
import {
  Card,
  CardActions,
  Collapse,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { createGroups } from "data/timeline";
import { useParams } from "react-router";
import pieceService from "services/piece.service";
import moment from "moment";

const useStyles = makeStyles({
  actionContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  timeline: {
    marginTop: "0",
  },
});

const TimelineGroup = ({ group }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const onExpandClick = () => {
    setOpen(!open);
  };

  return (
    <Card elevation={0}>
      <CardActions
        disableSpacing
        onClick={onExpandClick}
        className={classes.actionContainer}
      >
        <Typography variant="h6">{group.name}</Typography>
        <IconButton aria-expanded={open} aria-label="show more">
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </CardActions>
      <Timeline align="left" className={classes.timeline}>
        <DepartureItem locationName={group.departure.location.locationName} />
        <Collapse in={open} timeout="auto" unmountOnExit>
          {group.checkPoints.length > 0 && (
            <>
              {group.checkPoints.map(({ date, location }) => (
                <>
                  {group.events
                    .filter((event) => moment(event.dateTime).isBefore(date))
                    .map((event) => (
                      <EventItem event={event} />
                    ))}
                  <LocationItem location={location} date={date} />
                </>
              ))}
              {group.events
                .filter((event) =>
                  moment(event.dateTime).isAfter(
                    group.checkPoints[group.checkPoints.length - 1].date
                  )
                )
                .map((event) => (
                  <EventItem event={event} />
                ))}
            </>
          )}
        </Collapse>
        <ArrivalItem locationName={group.arrival.location.locationName} />
      </Timeline>
    </Card>
  );
};

const TrackAndTracePage = () => {
  const { company, id } = useParams();
  const [groups, setGroups] = useState(createGroups());

  useEffect(() => {
    pieceService
      .getEvents(company, id)
      .then((events) => {
        setGroups(processGroup(createGroups(), events));
      })
      .catch(() => {
        setGroups(processGroup(createGroups(), []));
      });
  }, [company, id]);

  return (
    <Page title="Track & trace" style={{ display: "block" }}>
      {groups.map((group) => (
        <TimelineGroup group={group} />
      ))}
    </Page>
  );
};

const processGroup = (groups, events) => {
  events.forEach((event) => {
    const group = groups.find((group) =>
      moment(event.dateTime).isBetween(group.departure.date, group.arrival.date)
    );
    if (group) {
      group.events.push(event);
    }
  });
  return groups;
};

export default TrackAndTracePage;
