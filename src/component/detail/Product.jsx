import { Grid, Typography } from "@material-ui/core";
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
    <Grid container alignItems="center" spacing={3}>
      <Grid item xs={12} alignItems="center">
        <Typography>{identifier}</Typography>
        <Typography>{description}</Typography>
        <Typography>{unNumber}</Typography>
        <Typography>{manufacturer}</Typography>
      </Grid>
      <Grid item xs={12} alignItems="center">
        <Typography>{hsCode}</Typography>
        <Typography>{hsCommodityDescription}</Typography>
        <Typography>{hsType}</Typography>
      </Grid>
    </Grid>
  );
};

export default Product;
