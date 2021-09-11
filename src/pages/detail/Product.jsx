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
  Typography,
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

const Product = ({ product }) => {
  const url = product.id;
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const product = await GenericService.getAbsolute(url);
        setProductData(product);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
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
    <Grid container alignItems='center' spacing={3}>
      <Grid item xs={12} alignItems='center'>
        <Typography>{identifier}</Typography>
        <Typography>{description}</Typography>
        <Typography>{unNumber}</Typography>
        <Typography>{manufacturer}</Typography>
      </Grid>
      <Grid item xs={12} alignItems='center'>
        <Typography>{hsCode}</Typography>
        <Typography>{hsCommodityDescription}</Typography>
        <Typography>{hsType}</Typography>
      </Grid>
    </Grid>
  );
};

export default Product;
