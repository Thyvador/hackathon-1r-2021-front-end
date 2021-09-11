import { makeStyles, Paper, Typography } from "@material-ui/core";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineDot from "@material-ui/lab/TimelineDot";
import RoomIcon from "@material-ui/icons/Room";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
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

const DepartureItem = ({ locationName }) => {
  const classes = useStyles();

  return (
    <TimelineItem className={classes.item}>
      <TimelineSeparator>
        <TimelineDot className={classes.departureItem}>
          <RoomIcon />
        </TimelineDot>
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h6" component="span">
            Departure
          </Typography>
          <Typography>{locationName}</Typography>
        </Paper>
      </TimelineContent>
    </TimelineItem>
  );
};

export default DepartureItem;
