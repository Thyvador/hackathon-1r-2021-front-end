import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { Fragment } from 'react';
import Dimensions from './Dimensions';
import Product from './Product';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const ItemDetail = ({ item }) => {
  if (!item) return null;

  const lotNumber = item.lotNumber;
  const quantity = item.quantity?.value;
  const price = `${item.unitPrice?.value}${item.unitPrice?.unit}`;
  const weight = `${item['weight']?.value} ${item['weight']?.unit}`;

  const product = item['product'];

  return (
    <Fragment>
      <Typography>{lotNumber}</Typography>
      <Typography>{price}</Typography>
      <Typography>Quantity: {quantity}</Typography>
      <Typography>{weight}</Typography>

      <MyAccordion title='Dimensions'>
        <Dimensions {...item.dimensions} />
      </MyAccordion>
      <MyAccordion title='Product'>
        {product && <Product product={product} />}
      </MyAccordion>
    </Fragment>
  );
};

const MyAccordion = ({ children, title, icon, number }) => {
  const classes = useStyles();

  return (
    <Accordion disabled={number !== undefined && number === 0}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls='panel2a-content'
        id='panel2a-header'
      >
        <Typography className={classes.heading}>{title}</Typography>
        <Badge badgeContent={number} color='primary'>
          {icon}
        </Badge>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default ItemDetail;
