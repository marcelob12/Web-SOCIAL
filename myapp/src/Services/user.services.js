const BASE_URL = "https://posts-pw2021.herokuapp.com/api/v1";
import axios from 'axios';

const services = {};

services.login = async (username, password) => {

    const response = await axios.post(`${BASE_URL}/auth/signin`, { username: username, password: password }, 
    {headers: {'Content-Type': 'application/json'}});
    
    if (response.status===200) {
      const data = await response.json();
      return data;
    }
  
    return {};
  };

  
    services.verifyToken = async (token) => {
        const response = await fetch(`${BASE_URL}/auth/whoami`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
            }

        });
    

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  
    return {};
  };

  export default services;