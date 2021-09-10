const USERS = [
  {
    name: "operator",
    role: "operator",
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
