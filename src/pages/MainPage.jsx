import { Button, makeStyles } from "@material-ui/core";
import Page from "component/Page";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    "& > * ": {
      margin: "0.8rem 0",
    },
  },
});

const MainPage = () => {
  const classes = useStyles();
  return (
    <Page title="">
      <div className={classes.container}>
        <Button
          component={Link}
          to="/qr-code-scanner"
          variant="contained"
          color="primary"
        >
          QrCode Scanner
        </Button>
        <Button
          component={Link}
          to="/pieces/1"
          variant="contained"
          color="primary"
        >
          Test piece
        </Button>
      </div>
    </Page>
  );
};

export default MainPage;
