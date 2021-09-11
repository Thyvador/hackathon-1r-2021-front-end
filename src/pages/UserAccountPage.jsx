import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Page from "component/Page";
import locations from "data/locations";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import authService from "services/auth.service";
import genericService from "services/generic.service";

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
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    genericService.get("/locations").then((res) => {
      setLocations(res);
    });
  }, []);

  const signOut = () => {
    authService.signOut();
    history.push("/login");
  };

  const onChangeLocation = (event) => {
    setLocation(locations.find((l) => l.id === event.target.value));
  };

  const onSave = () => {
    authService.setLocation(location);
  };
  console.log(location);

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
        <FormControl variant="outlined">
          <InputLabel id="location-label">Location: </InputLabel>
          <Select
            labelId="location-label"
            id="location-select"
            value={location.id}
            onChange={onChangeLocation}
            label="Location"
          >
            {locations.map((loc) => (
              <MenuItem value={loc.id}>{loc.locationName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={onSave}>
          Save
        </Button>
      </div>
    </Page>
  );
};

export default UserAccountPage;
