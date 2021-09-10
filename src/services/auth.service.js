const USERS = [
  {
    name: "philippe",
    password: "tesla",
    role: "operator",
  },
];

class AuthService {
  activeUser = null;

  auth(userName, password) {
    const user = USERS.find((u) => u.name === userName);
    if (!user) {
      return false;
    }

    if (user.password === password) {
      this.activeUser = user;
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
  }
}

export default new AuthService();
