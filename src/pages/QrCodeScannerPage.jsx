import Page from "component/Page";
import { useState } from "react";
import QrReader from "react-qr-scanner";

const QrCodeScannerPage = () => {
  const [result, setResult] = useState("NO result");
  const delay = 100;
  const previewStyle = {
    height: 240,
    width: 320,
  };

  const handleScan = (result) => {
    if (result) {
      setResult(result);
    }
  };

  const handleError = (mode) => {
    console.log(mode);
  };

  return (
    <Page title="Qr Code Scanner">
      <QrReader
        delay={delay}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
      <p>{result}</p>
    </Page>
  );
};

export default QrCodeScannerPage;
