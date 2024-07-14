import axios from "axios";

// const API_URL =  process.env.API_URL;
const API_URL = "http://localhost:3001/auth/"

class AuthService {
    login(user, password) {
      return axios
        .post(API_URL + "sign-in", {
          user,
          password,
        })
        .then(response => {
          if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
          }
          return response.data;
        });
    }

    logout() {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    }

    register(name, username, email, password) {
      return axios.post(API_URL + "sign-up", {
        name,
        username,
        email,
        password,
      });
    }

    getCurrentUser() {
      return JSON.parse(localStorage.getItem('user'));
    }

    getAccessToken() {
      return JSON.parse(localStorage.getItem('accessToken'));
    }
  }

  export default new AuthService();