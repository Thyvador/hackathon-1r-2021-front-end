import { makeStyles, Paper, Typography } from "@material-ui/core";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineDot from "@material-ui/lab/TimelineDot";
import WidgetsIcon from "@material-ui/icons/Widgets";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import GetAppIcon from "@material-ui/icons/GetApp";
import PublishIcon from "@material-ui/icons/Publish";
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
}));

const EventIcon = ({ event }) => {
  switch (event.eventCode) {
    case "BUILD UP":
      return <WidgetsIcon />;
    case "DEPARTURE":
      return <ArrowForwardIcon />;
    case "ARRIVAL":
      return <ArrowBackIcon />;
    case "UNLOAD":
      return <GetAppIcon />;
    case "LOAD":
      return <PublishIcon />;
    default:
      return <CalendarTodayIcon />;
  }
};

const EventItem = ({ event }) => {
  const classes = useStyles();

  return (
    <TimelineItem className={classes.item}>
      <TimelineSeparator>
        <TimelineDot>
          <EventIcon event={event} />
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Paper elevation={3} className={classes.paper}>
          <div>
            <Typography
              variant="subtitle1"
              component="span"
              style={{ fontWeight: "bold" }}
            >
              {event.eventCode}
            </Typography>
            <Typography variant="body" component="span">
              {" - "}
              {event.eventName}
            </Typography>
          </div>
          <Typography variant="subtitle2" component="div">
            Performed by: {event.performedBy.branch.branchName}
          </Typography>
          <Typography variant="subtitle" component="div">
            At: {event.location.code}
          </Typography>
          <Typography variant="subtitle">
            {moment(event.dateTime).format("LLL")}
          </Typography>
        </Paper>
      </TimelineContent>
    </TimelineItem>
  );
};

export default EventItem;
