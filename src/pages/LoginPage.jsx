import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import Page from "component/Page";
import { useState } from "react";
import { useHistory } from "react-router";
import authService, { USERS } from "services/auth.service";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "& > * ": {
      margin: "1rem 0",
    },
  },
});

const ConnectionPage = () => {
  const history = useHistory();
  const classes = useStyles();

  const onLogin = (user) => {
    if (authService.auth(user)) {
      history.push("/");
    }
  };

  return (
    <Page>
      <div className={classes.root}>
        {USERS.map((user) => (
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => onLogin(user.name)}
          >
            {user.name}
          </Button>
        ))}
      </div>
    </Page>
  );
};

export default ConnectionPage;
