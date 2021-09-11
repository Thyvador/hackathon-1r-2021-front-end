import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { ExpandMore, Mail } from '@material-ui/icons';
import { Fragment } from 'react';
import ContainedItems from './ContainedItems';
import ContainedPieces from './ContainedPieces';
import Dimensions from './Dimensions';
import InstructionList from './InstructionList';
import Shipment from './Shipment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const PieceDetail = ({ piece }) => {
  if (!piece) return null;

  const identifier = piece['upid'];
  const description = piece['goodsDescription'];
  const grossWeight = `${piece['grossWeight']?.value} ${piece['grossWeight']?.unit}`;

  const specialHandling = piece['specialHandling'];

  const shipment = piece['shipment'];

  return (
    <Fragment>
      <Typography>{description}</Typography>
      <Typography>{identifier}</Typography>
      <Typography>{grossWeight}</Typography>

      <InstructionList specialHandlingList={specialHandling || []} />

      <MyAccordion title='Dimensions'>
        <Dimensions {...piece.dimensions} />
      </MyAccordion>
      <MyAccordion title='Shipment'>
        {shipment && <Shipment shipment={shipment} />}
      </MyAccordion>
      <MyAccordion
        title='Contained Pieces'
        icon={<Mail />}
        number={piece.containedPieces?.length || 0}
      >
        <ContainedPieces pieces={piece.containedPieces || []} />
      </MyAccordion>
      <MyAccordion
        title='Contained Items'
        icon={<Mail />}
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

export default PieceDetail;
