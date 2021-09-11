import { Save } from "@material-ui/icons";

const USERS = [
  {
    name: "operator",
    role: "operator",
    location: "Paris",
  },
  {
    name: "supervisor",
    role: "supervisor",
    location: "Paris",
  },
];

class AuthService {
  activeUser = null;

  users = [];

  constructor() {
    const user = localStorage.getItem("activeUser");
    const lsUsers = localStorage.getItem("users");
    if (lsUsers) {
      this.users = JSON.parse(lsUsers);
    } else {
      this.users = USERS;
    }
    if (user) {
      this.activeUser = JSON.parse(user);
    }
  }

  auth(userName) {
    const user = this.users.find((u) => u.name === userName);
    if (!user) {
      return false;
    }

    this.activeUser = user;
    this._save();
    return true;
  }

  setLocation(location) {
    this.activeUser.location = location;
    this._save();
  }

  getActiveUser() {
    return this.activeUser;
  }

  isUserLoggedIn() {
    return !!this.activeUser;
  }

  signOut() {
    this.activeUser = null;
    this._save();
  }

  _save() {
    localStorage.setItem("activeUser", JSON.stringify(this.activeUser));
    localStorage.setItem("users", JSON.stringify(this.users));
  }
}

export default new AuthService();
export { USERS };
