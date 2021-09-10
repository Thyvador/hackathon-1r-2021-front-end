import { Button } from "@material-ui/core";
import Page from "component/Page";
import { useHistory } from "react-router";
import authService from "services/auth.service";

const UserAccountPage = () => {
  const history = useHistory();
  
  const signOut = () => {
    authService.signOut();
    history.push("/login");
  };

  return (
    <Page>
      <div>
        <Button color="primary" variant="outlined" onClick={signOut}>
          Sign out
        </Button>
      </div>
      UserAccount
      <br />
      TODO :: add user config form
    </Page>
  );
};

export default UserAccountPage;
