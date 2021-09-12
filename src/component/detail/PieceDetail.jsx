import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { Fragment, useEffect, useState } from "react";
import { generatePath } from "react-router";
import genericService from "services/generic.service";
import ContainedItems from "./ContainedItems";
import ContainedPieces from "./ContainedPieces";
import Dimensions from "./Dimensions";
import InstructionList from "./InstructionList";
import Product from "./Product";
import Shipment from "./Shipment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: "1rem",
    fontWeight: theme.typography.fontWeightRegular,
  },
  accordion: {
    margin: "1rem 0",
  },
}));

const PieceDetail = ({ piece, ...props }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!piece?.product) {
      return;
    }
    genericService
      .getAbsolute(piece.product.id)
      .then(setProduct)
      .catch(console.err);
  }, [piece]);

  if (!piece) return null;

  const identifier = piece["upid"];
  const description = piece["goodsDescription"];
  const grossWeight = `${piece["grossWeight"]?.value} ${piece["grossWeight"]?.unit}`;

  const specialHandling = piece["specialHandling"];

  const shipment = piece["shipment"];

  return (
    <Fragment>
      <Typography variant="h6" style={{ margin: "0.5rem 0" }}>
        Piece: {description}
      </Typography>

      <InstructionList specialHandlingList={specialHandling || []} />

      <Typography
        style={{
          marginTop: "1rem",
          marginLeft: "1rem",
        }}
      >
        <Typography style={{ fontWeight: "bold" }} component="span">
          UPID
        </Typography>{" "}
        : {identifier}
      </Typography>
      <Typography
        style={{
          marginBottom: "1rem",
          marginLeft: "1rem",
        }}
      >
        <Typography style={{ fontWeight: "bold" }} component="span">
          Gross weight:
        </Typography>{" "}
        {grossWeight}
      </Typography>
      <MyAccordion title="Product">
        {product && <Product product={product} />}
      </MyAccordion>

      <MyAccordion title="Dimensions">
        <Dimensions {...piece.dimensions} />
      </MyAccordion>
      <MyAccordion title="Shipment">
        {shipment && <Shipment shipment={shipment} />}
      </MyAccordion>
      <MyAccordion
        title="Contained Pieces"
        number={piece.containedPieces?.length || 0}
      >
        <ContainedPieces pieces={piece.containedPieces || []} />
      </MyAccordion>
      <MyAccordion
        title="Contained Items"
        number={piece.containedItems?.length || 0}
      >
        <ContainedItems items={piece.containedItems || []} />
      </MyAccordion>
    </Fragment>
  );
};

const MyAccordion = ({ children, title, icon, number }) => {
  const classes = useStyles();

  return (
    <Accordion
      className={classes.accordion}
      disabled={number !== undefined && number === 0}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel2a-content"
        id="panel2a-header"
      >
        <Typography className={classes.heading}>{title}</Typography>
        <Badge
          badgeContent={number}
          color="primary"
          style={{
            marginLeft: "1rem",
            marginTop: "0.65rem",
          }}
        >
          {icon}
        </Badge>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default PieceDetail;
