import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";

const Dimensions = ({ volume, height, width, length }) => {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell width="30%">Volume</TableCell>
          <TableCell>
            {volume.value}
            {volume.unit.toLowerCase()}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Height</TableCell>
          <TableCell>
            {height.value}
            {height.unit.toLowerCase()}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Width</TableCell>
          <TableCell>
            {width.value}
            {width.unit.toLowerCase()}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Length</TableCell>
          <TableCell>
            {length.value}
            {length.unit.toLowerCase()}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Dimensions;
