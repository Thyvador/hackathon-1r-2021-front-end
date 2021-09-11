import { Button, CircularProgress, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Page from 'component/Page';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import genericService from 'services/generic.service';
import ItemDetail from './detail/ItemDetail';
import PieceDetail from './detail/PieceDetail';

const useStyles = makeStyles((theme) => ({
  actionContainer: {},
  list: {
    marginTop: '4rem',
    height: '100%',
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

  return (
    <Page title='Details'>
      <div className={classes.actionContainer}>
        <Button variant='outlined'>Delivery</Button>
      </div>
      <Divider />
      {isLoading && <CircularProgress />}
      {error && JSON.stringify(error)}
      {entityType === 'items' && <ItemDetail item={logisticObject} />}
      {(entityType === 'piece' || entityType === 'piece-dgs') &&
        logisticObject && <PieceDetail piece={logisticObject} />}
    </Page>
  );
};

export default DetailsPage;
