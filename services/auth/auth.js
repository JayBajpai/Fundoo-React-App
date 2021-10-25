class Auth {

    isAuthenticated() {
      return localStorage.getItem("token") !== null;
    }
  }
  
  export default new Auth();