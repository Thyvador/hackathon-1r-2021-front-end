import { Button, makeStyles, TextField } from "@material-ui/core";
import Page from "component/Page";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import QrReader from "react-qr-reader";
import { useHistory } from "react-router-dom";
import genericService from "services/generic.service";
import pieceStore from "store/piece.store";

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

  const [result, setResult] = useState(pieceStore.pieceUri);
  const [legacyMode, setLegacyMode] = useState(false);
  const [error, setError] = useState(null);

  const [previewStyle, setPreviewStyle] = useState({
    width: 0,
    height: 0,
  });

  const delay = 100;

  useEffect(() => {
    // alert("debug: " + JSON.stringify(navigator));
    enqueueSnackbar("Camera not found legacy mode is activated", {
      variant: "info",
    });
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
      pieceStore.setActivePiece(await genericService.getAbsolute(result));
      history.push(
        `/companies/${pieceStore.getCompany()}/pieces/${pieceStore.getId()}`
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const onUpdateUri = (event) => {
    setResult(event.target.value);
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
        </div>
        <Button variant="contained" color="primary" onClick={onValidate}>
          Validate
        </Button>
      </div>
    </Page>
  );
};

export default QrCodeScannerPage;
