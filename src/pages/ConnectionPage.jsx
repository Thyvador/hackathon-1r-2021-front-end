import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import Page from "component/Page";
import { useState } from "react";
import { useHistory } from "react-router";
import authService from "services/auth.service";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "& > * ": {
      margin: "0.8rem 0",
    },
  },
  errorMessage: {
    minHeight: "2rem",
  },
});

const ConnectionPage = () => {
  const history = useHistory();
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();
    if (authService.auth(username, password)) {
      setError(null);
      history.push("/");
    } else {
      setError("Username & password does not match");
    }
  };

  const onUpdateUserName = (event) => {
    setUsername(event.target.value);
  };

  const onUpdatePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Page>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <TextField
          id="outlined-basic"
          label="User name"
          variant="outlined"
          onChange={onUpdateUserName}
          value={username}
          error={!!error}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          onChange={onUpdatePassword}
          value={password}
          error={!!error}
        />
        <Typography
          variant="body"
          color="error"
          className={classes.errorMessage}
        >
          {!!error && error}
        </Typography>

        <Button variant="contained" color="primary" type="submit">
          Sign in
        </Button>
      </form>
    </Page>
  );
};

export default ConnectionPage;
