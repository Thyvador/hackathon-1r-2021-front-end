import {
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Fragment, useEffect, useState } from 'react';
import ReactJson from 'react-json-view';
import GenericService from 'services/generic.service';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const Shipment = ({ shipment: shipmentLink }) => {
  const url = shipmentLink.id;
  const [shipmentData, setShipmentData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const shipment = await GenericService.getAbsolute(url);
        // const parties = await Promise.all(shipment.parties.map(party => GenericService.getAbsolute(party.partyDetails.id)))
        // shipment.parties = parties;
        const deliveryLocation = await GenericService.getAbsolute(
          shipment.deliveryLocation.id
        );
        shipment.deliveryLocation = deliveryLocation;
        const masterWaybill = await GenericService.getAbsolute(
          shipment.waybillNumber.id
        );
        shipment.masterWaybill = masterWaybill;
        const containedWaybills = await Promise.all(
          shipment.masterWaybill.containedWaybills.map((waybill) =>
            GenericService.getAbsolute(waybill.id)
          )
        );
        shipment.masterWaybill.containedWaybills = containedWaybills;
        setShipmentData(shipment);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return <ShipmentDetail shipment={shipmentData} />;
};

const ShipmentDetail = ({ shipment }) => {
  const deliveryDate = new Date(shipment.deliveryDate).toLocaleDateString();
  const totalSLAC = shipment.totalSLAC;

  const parties = shipment.parties;
  const waybills = shipment.masterWaybill.containedWaybills;

  return (
    <Grid container alignItems='center' spacing={3}>
      <Grid item xs={12} alignItems='center'>
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Parties</StyledTableCell>
                <StyledTableCell align='right'>Role</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parties.map((party) => (
                <TableRow key={party.partyDetails.id}>
                  <TableCell component='th' scope='row'>
                    {party.partyDetails.id}
                  </TableCell>
                  <TableCell align='right'>{party.partyRole}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} alignItems='center'>
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Waybills</StyledTableCell>
                <StyledTableCell align='right'>Type</StyledTableCell>
                <StyledTableCell align='right'>Prefix + Number</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {waybills.map((waybill) => (
                <TableRow key={waybill.id}>
                  <TableCell component='th' scope='row'>
                    {waybill.id}
                  </TableCell>
                  <TableCell align='right'>{waybill.waybillType}</TableCell>
                  <TableCell align='right'>
                    {waybill.waybillPrefix}
                    {waybill.waybillNumber}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Shipment;
