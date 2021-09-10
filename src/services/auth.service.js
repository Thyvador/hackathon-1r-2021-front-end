const USERS = [
  {
    name: "operator",
    role: "operator",
    location: "Paris",
  },
];

class AuthService {
  activeUser = null;

  constructor() {
    const user = localStorage.getItem("activeUser");
    if (user) {
      this.activeUser = JSON.parse(user);
    }
  }

  auth(userName) {
    const user = USERS.find((u) => u.name === userName);
    if (!user) {
      return false;
    }

    this.activeUser = user;
    localStorage.setItem("activeUser", JSON.stringify(user));
    return true;
  }

  setLocation(location) {
    this.activeUser.location = location;
    localStorage.setItem("activeUser", JSON.stringify(this.activeUser));
  }

  getActiveUser() {
    return this.activeUser;
  }

  isUserLoggedIn() {
    return !!this.activeUser;
  }

  signOut() {
    this.activeUser = null;
    localStorage.setItem("activeUser", null);
  }
}

export default new AuthService();
export { USERS };
