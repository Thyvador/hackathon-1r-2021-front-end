import { makeStyles, Paper, Typography } from "@material-ui/core";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineDot from "@material-ui/lab/TimelineDot";
import DomainIcon from "@material-ui/icons/Domain";
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

const EventItem = ({ event }) => {
  const classes = useStyles();

  return (
    <TimelineItem className={classes.item}>
      <TimelineSeparator>
        <TimelineDot>
          <DomainIcon />
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Paper elevation={3} className={classes.paper}>
          <div>
            <Typography variant="h6" component="span">
              {event.eventCode}
            </Typography>
            <Typography variant="body" component="span">
              {" - "}
              {event.eventName}
            </Typography>
          </div>
          <Typography>{moment(event.dateTime).format("LLL")}</Typography>
          <Typography>At: {event.location.code}</Typography>
          <Typography>
            performed by: {event.performedBy.branch.branchName}
          </Typography>
        </Paper>
      </TimelineContent>
    </TimelineItem>
  );
};

export default EventItem;
