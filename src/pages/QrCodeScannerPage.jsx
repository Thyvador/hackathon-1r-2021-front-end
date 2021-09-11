import { Button, makeStyles, TextField } from "@material-ui/core";
import Page from "component/Page";
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
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "& > *": {
      margin: "0.5rem 0",
    },
  },
});

const QrCodeScannerPage = () => {
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
    setLegacyMode(!navigator.userAgentData.mobile);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const pageContainer = document.getElementById("page-container");
      setPreviewStyle({
        width: pageContainer.offsetWidth * 0.8,
        height: pageContainer.offsetWidth * 0.8,
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
        <Button variant="outlined" color="primary" onClick={onValidate}>
          Validate
        </Button>
      </div>
    </Page>
  );
};

export default QrCodeScannerPage;
