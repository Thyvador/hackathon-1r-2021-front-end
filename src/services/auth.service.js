const USERS = [
  {
    name: "philippe",
    password: "tesla",
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

  auth(userName, password) {
    const user = USERS.find((u) => u.name === userName);
    if (!user) {
      return false;
    }

    if (user.password === password) {
      this.activeUser = user;
      localStorage.setItem("activeUser", JSON.stringify(user));
      return true;
    }
    return false;
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
