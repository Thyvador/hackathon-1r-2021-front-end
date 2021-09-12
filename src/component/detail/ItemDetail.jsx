import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { Fragment } from "react";
import Dimensions from "./Dimensions";
import Product from "./Product";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  accordion: {
    margin: "1rem 0",
  },
}));

const ItemDetail = ({ item }) => {
  if (!item) return null;

  const lotNumber = item.lotNumber;
  const quantity = item.quantity?.value;
  const price = `${item.unitPrice?.value}${item.unitPrice?.unit}`;
  const weight = `${item["weight"]?.value} ${item["weight"]?.unit}`;

  const product = item["product"];

  return (
    <Fragment>
      <Typography
        style={{
          marginTop: "0.5rem",
          marginLeft: "1rem",
        }}
        variant="h6"
      >
        Item: {item.batchNumber}
      </Typography>
      <Typography
        style={{
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
          marginLeft: "1rem",
        }}
      >
        <Typography style={{ fontWeight: "bold" }} component="span">
          Weight
        </Typography>{" "}
        : {weight}
      </Typography>
      <Typography
        style={{
          marginTop: "0.5rem",
          marginLeft: "1rem",
        }}
      >
        <Typography style={{ fontWeight: "bold" }} component="span">
          Quantity :
        </Typography>{" "}
        {quantity}
      </Typography>
      <Typography
        style={{
          marginTop: "0.5rem",
          marginLeft: "1rem",
        }}
      >
        <Typography style={{ fontWeight: "bold" }} component="span">
          Lot number
        </Typography>{" "}
        : {lotNumber}
      </Typography>
      <Typography
        style={{
          marginTop: "0.5rem",
          marginLeft: "1rem",
        }}
      >
        <Typography style={{ fontWeight: "bold" }} component="span">
          Unit price
        </Typography>{" "}
        : {price}
      </Typography>

      {/* {product && <Product product={product} />} */}

      <MyAccordion title="Dimensions">
        <Dimensions {...item.dimensions} />
      </MyAccordion>
      <MyAccordion title="Product">
        {product && <Product product={product} />}
      </MyAccordion>
    </Fragment>
  );
};

const MyAccordion = ({ children, title, icon, number }) => {
  const classes = useStyles();

  return (
    <Accordion
      disabled={number !== undefined && number === 0}
      className={classes.accordion}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography className={classes.heading}>{title}</Typography>
        <Badge badgeContent={number} color="primary">
          {icon}
        </Badge>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default ItemDetail;
