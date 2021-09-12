import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { useEffect, useState } from "react";
import GenericService from "services/generic.service";

const Product = ({ product }) => {
  const url = product.id;
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await GenericService.getAbsolute(url);
        setProductData(product);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [url]);

  return productData && <ProductDetail product={productData} />;
};

const ProductDetail = ({ product }) => {
  const identifier = product.productIdentifier;
  const description = product.productDescription;
  const unNumber = product.unNumber;
  const manufacturer = product.manufacturer.id; // TODO fetch to get name
  const hsCode = product.hsCode;
  const hsCommodityDescription = product.hsCommodityDescription;
  const hsType = product.hsType;

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell width="30%">UN number:</TableCell>
          <TableCell
            style={{
              overflowWrap: "anywhere",
            }}
          >
            {unNumber}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell width="30%">Product identifier:</TableCell>
          <TableCell
            style={{
              overflowWrap: "anywhere",
            }}
          >
            {identifier}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell width="30%">Description</TableCell>
          <TableCell
            style={{
              overflowWrap: "anywhere",
            }}
          >
            {description}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell width="30%">Manufacturer:</TableCell>
          <TableCell
            style={{
              overflowWrap: "anywhere",
            }}
          >
            {manufacturer}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell width="30%">HS code:</TableCell>
          <TableCell
            style={{
              overflowWrap: "anywhere",
            }}
          >
            {hsCode}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell width="30%">HS commodity description:</TableCell>
          <TableCell
            style={{
              overflowWrap: "anywhere",
            }}
          >
            {hsCommodityDescription}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell width="30%">HS type:</TableCell>
          <TableCell
            style={{
              overflowWrap: "anywhere",
            }}
          >
            {hsType}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Product;
