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
import { useSnackbar } from "notistack";
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
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const history = useHistory();

  const [location, setLocation] = useState(authService.getLocation());
  const [company, setCompany] = useState(authService.getCompany());

  const [locations, setLocations] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    genericService.get("/locations").then((res) => {
      setLocations(res);
    });

    genericService.get("/companies").then((res) => {
      setCompanies(res);
    });
  }, []);

  const signOut = () => {
    authService.signOut();
    history.push("/login");
  };

  const onChangeLocation = (event) => {
    setLocation(locations.find((l) => l.id === event.target.value));
  };

  const onChangeCompany = (event) => {
    setCompany(companies.find((c) => c.id === event.target.value));
  };

  const onSave = () => {
    authService.setLocation(location);
    authService.setCompany(company);
    enqueueSnackbar("Profile saved successfully !", {
      variant: "success",
      autoHideDuration: 1500,
    });
  };

  console.log(companies);

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
        <FormControl variant="outlined">
          <InputLabel id="company-label">Company: </InputLabel>
          <Select
            labelId="company-label"
            id="company-select"
            value={company?.id}
            onChange={onChangeCompany}
            label="company"
          >
            {companies.map((company) => (
              <MenuItem value={company.id}>
                {company.branch.branchName}
              </MenuItem>
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
