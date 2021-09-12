import { Button, CircularProgress, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ItemDetail from "component/detail/ItemDetail";
import PieceDetail from "component/detail/PieceDetail";
import EventDialog from "component/details/EventDialog";
import Page from "component/Page";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import genericService from "services/generic.service";

const useStyles = makeStyles((theme) => ({
  actionContainer: {
    paddingBottom: "0.5rem",
  },
  list: {
    height: "100%",
  },
  listHeader: {
    color: theme.palette.text.secondary,
  },
  iconInfo: {
    color: theme.palette.primary.main,
  },
}));

const DetailsPage = () => {
  const { company, entityType, id } = useParams();
  const [open, setOpen] = useState(false);

  const url = `https://api.onerecord.fr/companies/${company}/${entityType}/${id}`;

  const [logisticObject, setLogisticObject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const lo = await genericService.getAbsolute(url);
        setLogisticObject(lo);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const classes = useStyles();

  const onClose = () => {
    setOpen(false);
  };

  const onAddEvent = () => {
    setOpen(true);
  };

  return (
    <Page title="Details" style={{ display: "block" }}>
      <EventDialog open={open} onClose={onClose} />
      <div className={classes.actionContainer}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={onAddEvent}
        >
          Send event
        </Button>
      </div>
      <Divider />
      {isLoading && <CircularProgress />}
      {error && JSON.stringify(error)}
      {entityType === "items" && <ItemDetail item={logisticObject} />}
      {(entityType === "piece" || entityType === "piece-dgs") &&
        logisticObject && <PieceDetail piece={logisticObject} />}
    </Page>
  );
};

export default DetailsPage;
