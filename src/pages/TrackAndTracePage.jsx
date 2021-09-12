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
    <Card elevation={0} style={{ marginBottom: "1rem" }}>
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
      <Timeline
        align="left"
        className={classes.timeline}
        style={{ paddingLeft: "1rem", paddingRight: "0", paddingTop: "0", paddingBottom: "0" }}
      >
        <DepartureItem locationName={group.departure.location.locationName} />
        <Collapse in={open} timeout="auto" unmountOnExit>
          <>
            {group.checkPoints.length > 0 && (
              <>
                {group.checkPoints.map(({ date, location }, index) => (
                  <>
                    {group.events
                      .filter((event) => {
                        if (index === 0) {
                          return moment(event.dateTime).isBefore(date);
                        } else {
                          return moment(event.dateTime).isBetween(
                            moment(group.checkPoints[index - 1].date).subtract(
                              1,
                              "s"
                            ),
                            date
                          );
                        }
                      })
                      .map((event) => (
                        <EventItem event={event} key={event.id} />
                      ))}
                    <LocationItem location={location} date={date} />
                  </>
                ))}
              </>
            )}
            {group.events
              .filter(
                (event) =>
                  group.checkPoints.length === 0 ||
                  moment(event.dateTime).isSameOrAfter(
                    group.checkPoints[group.checkPoints.length - 1].date
                  )
              )
              .map((event, i) => (
                <EventItem event={event} key={event.id} />
              ))}
          </>
        </Collapse>
        <ArrivalItem locationName={group.arrival.location.locationName} />
      </Timeline>
    </Card>
  );
};

const TrackAndTracePage = () => {
  const { company, entityType, id } = useParams();
  const [groups, setGroups] = useState(createGroups());

  useEffect(() => {
    pieceService
      .getEvents(company, entityType, id)
      .then((events) => {
        setGroups(processGroup(createGroups(), events));
      })
      .catch(() => {
        setGroups(processGroup(createGroups(), []));
      });
  }, [company, entityType, id]);

  return (
    <Page title="Track & trace" style={{ display: "block" }}>
      {groups.map(
        (group) => group.events.length > 0 && <TimelineGroup group={group} />
      )}
    </Page>
  );
};

const processGroup = (groups, events) => {
  events.forEach((event) => {
    const group = groups.find((group) =>
      moment(event.dateTime).isBetween(
        moment(group.departure.date).subtract(1, "s"),
        moment(group.arrival.date).add(1, "s")
      )
    );
    if (group) {
      group.events.push(event);
    }
  });
  return groups;
};

export default TrackAndTracePage;
