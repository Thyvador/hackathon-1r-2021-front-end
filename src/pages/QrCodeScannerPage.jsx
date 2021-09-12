import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import Page from "component/Page";
import { useEffect, useRef, useState } from "react";
import QrReader from "react-qr-reader";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

const useStyles = makeStyles({
  scannerContainer: {
    display: "flex",
    justifyContent: "center",
  },
  infoContainer: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    "& > *": {
      margin: "0.5rem 0",
    },
  },
  container: {
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

const QrCodeScannerPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const history = useHistory();
  const scannerRef = useRef(null);

  const [result, setResult] = useState(
    "https://api.onerecord.fr/companies/asus/piece-dgs/pallet1"
  );
  const [legacyMode, setLegacyMode] = useState(false);
  const [error, setError] = useState(null);

  const [previewStyle, setPreviewStyle] = useState({
    width: 0,
    height: 0,
  });

  const delay = 100;

  useEffect(() => {
    // alert("debug: " + JSON.stringify(navigator));
    if (!navigator?.userAgentData?.mobile) {
      enqueueSnackbar("Camera not found legacy mode is activated", {
        variant: "info",
      });
    }
    setLegacyMode(!navigator?.userAgentData?.mobile);
  }, [enqueueSnackbar]);

  useEffect(() => {
    const handleResize = () => {
      const pageContainer = document.getElementById("page-container");
      const width = pageContainer.offsetWidth * 0.6;
      setPreviewStyle({
        width,
        height: width,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScan = (result) => {
    if (result) {
      setResult(result);
    }
  };

  const handleError = (err) => {
    console.error(err);
    setLegacyMode(true);
  };

  const openImageDialog = () => {
    scannerRef.current.openImageDialog();
  };

  const onValidate = async () => {
    try {
      setError(null);
      history.push(result.replace("https://api.onerecord.fr", ""));
    } catch (err) {
      setError(err.message);
    }
  };

  const onUpdateUri = (event) => {
    setResult(event.target.value);
  };

  const onLoadContainer = () => {
    setResult("https://api.onerecord.fr/companies/msc/piece-dgs/container1");
  };

  const onLoadPallet = () => {
    setResult("https://api.onerecord.fr/companies/asus/piece-dgs/pallet1");
  };

  const onLoadLaptop = () => {
    setResult("https://api.onerecord.fr/companies/asus/items/zenbook1");
  };

  return (
    <Page title="Qr Code Scanner">
      <div className={classes.container}>
        <div className={classes.infoContainer}>
          <div className={classes.scannerContainer}>
            <QrReader
              ref={scannerRef}
              delay={delay}
              style={previewStyle}
              onError={handleError}
              onScan={handleScan}
              legacyMode={legacyMode}
            />
          </div>
          <Button variant="outlined" onClick={openImageDialog}>
            Upload QR Code
          </Button>
          <TextField
            value={result}
            onChange={onUpdateUri}
            variant="outlined"
            error={!!error}
            helperText={error}
          ></TextField>

          <Typography>Load demo data:</Typography>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant={result.endsWith("container1") ? "contained" : "outlined"}
              color="primary"
              onClick={onLoadContainer}
            >
              Container
            </Button>
            <Button
              variant={result.endsWith("pallet1") ? "contained" : "outlined"}
              color="primary"
              onClick={onLoadPallet}
            >
              Pallet
            </Button>
            <Button
              variant={result.endsWith("zenbook1") ? "contained" : "outlined"}
              color="primary"
              onClick={onLoadLaptop}
            >
              Laptop
            </Button>
          </div>
        </div>
        <Button variant="contained" color="primary" onClick={onValidate}>
          Validate
        </Button>
      </div>
    </Page>
  );
};

export default QrCodeScannerPage;
