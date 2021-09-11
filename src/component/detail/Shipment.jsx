import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import GenericService from "services/generic.service";

const StyledTableCell = withStyles((theme) => ({
  body: {
    fontSize: 14,
  },
}))(TableCell);

const Shipment = ({ shipment: shipmentLink }) => {
  const url = shipmentLink.id;
  const [shipmentData, setShipmentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
        console.error(e);
      }
    };

    fetchData();
  }, [url]);

  return shipmentData && <ShipmentDetail shipment={shipmentData} />;
};

const ShipmentDetail = ({ shipment }) => {
  const parties = shipment.parties;
  const waybills = shipment.masterWaybill.containedWaybills;

  return (
    <Grid container alignItems="center" spacing={3}>
      <Grid item xs={12} alignItems="center">
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell colSpan={2} style={{ fontWeight: "bold" }}>
                  Parties
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parties.map((party) => (
                <TableRow key={party.partyDetails.id}>
                  <TableCell>{party.partyRole}</TableCell>
                  <TableCell
                    style={{
                      overflowWrap: "anywhere",
                    }}
                    scope="row"
                  >
                    {party.partyDetails.id}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} alignItems="center">
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell colSpan={3} style={{ fontWeight: "bold" }}>
                  Waybills
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {waybills.map((waybill) => (
                <TableRow key={waybill.id}>
                  <TableCell align="right">
                    {waybill.waybillPrefix}
                    {waybill.waybillNumber}
                  </TableCell>
                  <TableCell align="right">{waybill.waybillType}</TableCell>
                  <TableCell
                    scope="row"
                    style={{
                      overflowWrap: "anywhere",
                    }}
                  >
                    {waybill.id}
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
