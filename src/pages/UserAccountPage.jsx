import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Page from "component/Page";
import { useState } from "react";
import { useHistory } from "react-router";
import authService from "services/auth.service";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: "0.8rem 0",
    },
  },
});

const UserAccountPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const [location, setLocation] = useState(
    authService.getActiveUser().location
  );

  const signOut = () => {
    authService.signOut();
    history.push("/login");
  };

  const onChangeLocation = (event) => {
    setLocation(event.target.value);
  };

  const onSave = () => {
    authService.setLocation(location);
  };

  return (
    <Page>
      <div className={classes.container}>
        <Button color="primary" variant="outlined" onClick={signOut}>
          Sign out
        </Button>
        <TextField
          variant="outlined"
          label="Role"
          value={authService.getActiveUser().role}
          disabled
        />
        <TextField
          variant="outlined"
          label="Location"
          onChange={onChangeLocation}
          value={location}
        />
        <Button variant="contained" color="primary" onClick={onSave}>
          Save
        </Button>
      </div>
    </Page>
  );
};

export default UserAccountPage;
