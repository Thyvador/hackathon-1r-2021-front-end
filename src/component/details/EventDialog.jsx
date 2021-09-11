import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core";
import events from "data/events";
import { useEffect, useState } from "react";
import moment from "moment";
import eventService from "services/event.service";
import { useSnackbar } from "notistack";
import { useParams } from "react-router";
import genericService from "services/generic.service";

const useStyles = makeStyles({
  container: {
    "& > MuiDialog-paper": {
      padding: "2rem",
    },
  },
});

const getNextEvent = (url, lastEvent) => {
  const event = events().find((e) =>
    Array.isArray(e)
      ? moment(e[0]?.dateTime).isAfter(lastEvent.dateTime)
      : moment(e?.dateTime).isAfter(lastEvent.dateTime)
  );
  if (!event) {
    return null;
  }
  event.linkedObject = { id: url };
  return event;
};

const EventDialog = ({ open, onClose }) => {
  const { company, entityType, id } = useParams();

  const url = `https://api.onerecord.fr/companies/${company}/${entityType}/${id}`;
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    genericService
      .getAbsolute(`${url}/events`)
      .then((res) => {
        setEvents(res);
      })
      .catch(console.err);
  }, []);

  const onSendEvent = async (event) => {
    try {
      if (Array.isArray(event)) {
        await new Promise.all(event.map((e) => eventService.sendEvent(e)));
        setEvents([...events, ...event]);
      } else {
        await eventService.sendEvent(event);
        setEvents([...events, event]);
      }
      onClose();
      enqueueSnackbar("Event(s) sent successfully !", {
        variant: "success",
      });
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Send event(s) failed", {
        variant: "error",
      });
    }
  };

  const lastEvent = events[events.length - 1];
  const nextEvent = !!lastEvent ? getNextEvent(url, lastEvent) : null;

  return (
    <Dialog open={open} onClose={onClose} className={classes.container}>
      <DialogTitle id="customized-dialog-title">Send event</DialogTitle>
      <DialogContent>
        {nextEvent ? (
          <>
            <Typography component="div">
              Event: {nextEvent?.eventName}
            </Typography>
            <Typography component="div" variant="caption">
              Performed by: {nextEvent?.performedBy?.branch?.branchName}
            </Typography>
            <Typography component="div" variant="caption">
              At: {nextEvent?.location?.locationName}
            </Typography>
          </>
        ) : (
          "No event to send"
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={() => onSendEvent(nextEvent)}
          color="primary"
          variant="contained"
          disabled={!nextEvent}
        >
          Send event
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDialog;
