import { makeStyles } from "@material-ui/core";
import Page from "component/Page";
import { useEffect, useRef, useState } from "react";
import QrReader from "react-qr-reader";

const useStyles = makeStyles({
  scannerContainer: {
    display: "flex",
    justifyContent: "center",
  },
});

const QrCodeScannerPage = () => {
  const classes = useStyles();
  const scannerRef = useRef(null);

  const [result, setResult] = useState("NO result");
  const [legacyMode, setLegacyMode] = useState(false);

  const [previewStyle, setPreviewStyle] = useState({
    width: 0,
    height: 0,
  });

  const delay = 100;

  useEffect(() => {
    const handleResize = () => {
      const pageContainer = document.getElementById("page-container");

      console.log(pageContainer.offsetWidth);
      setPreviewStyle({
        width: pageContainer.offsetWidth * 0.8,
        height: pageContainer.offsetWidth * 1.3 * 0.8,
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

  const onScannerLoad = (mode) => {
    console.log(mode);
  };

  const openImageDialog = () => {
    scannerRef.current.openImageDialog();
  };

  return (
    <Page title="Qr Code Scanner">
      <div className={classes.scannerContainer}>
        <QrReader
          ref={scannerRef}
          delay={delay}
          style={previewStyle}
          onLoad={onScannerLoad}
          onError={handleError}
          onScan={handleScan}
          legacyMode={legacyMode}
        />
      </div>
      <input type="button" value="Submit QR Code" onClick={openImageDialog} />
      <p>{result}</p>
    </Page>
  );
};

export default QrCodeScannerPage;
