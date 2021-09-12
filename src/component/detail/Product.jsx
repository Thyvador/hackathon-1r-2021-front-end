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
    <>
      <Grid
        container
        alignItems="left"
        spacing={3}
        style={{
          marginBot: "1rem 0",
          padding: "0 1rem",
        }}
      >
        <Grid item xs={12} alignItems="left" style={{ paddingLeft: 0 }}>
          <Typography>
            <Typography style={{ fontWeight: "bold" }} component="span">
              UN number:
            </Typography>{" "}
            <Typography component="span" variant="body2">
              {unNumber}
            </Typography>
          </Typography>
          <Typography>
            <Typography style={{ fontWeight: "bold" }} component="span">
              Product identifier:
            </Typography>{" "}
            <Typography component="span" variant="body2">
              {identifier}
            </Typography>
          </Typography>
          <Typography>
            <Typography style={{ fontWeight: "bold" }} component="span">
              Description
            </Typography>{" "}
            <Typography component="span" variant="body2">
              {description}
            </Typography>
          </Typography>
          <Typography>
            <Typography style={{ fontWeight: "bold" }} component="span">
              Manufacturer:
            </Typography>{" "}
            <Typography component="span" variant="body2">
              {manufacturer}
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} alignItems="left" style={{ paddingLeft: 0 }}>
          <Typography>
            <Typography style={{ fontWeight: "bold" }} component="span">
              HS code:
            </Typography>{" "}
            <Typography component="span" variant="body2">
              {hsCode}
            </Typography>
          </Typography>
          <Typography>
            <Typography style={{ fontWeight: "bold" }} component="span">
              HS commodity description:
            </Typography>{" "}
            <Typography component="span" variant="body2">
              {hsCommodityDescription}
            </Typography>
          </Typography>
          <Typography>
            <Typography style={{ fontWeight: "bold" }} component="span">
              HS type:
            </Typography>{" "}
            <Typography component="span" variant="body2">
              {hsType}
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Product;
