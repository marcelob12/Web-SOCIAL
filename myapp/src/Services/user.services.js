const BASE_URL = "https://posts-pw2021.herokuapp.com/api/v1";

const services = {};

services.login = async (username, password) => {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });

    if(response.ok) {
        const data = await response.json();
        return data;
    }
    return {};
}


services.verifyToken = async (token) => {
    const response = await fetch(`${BASE_URL}/auth/whoami`, {
        headers: {
            "Authorization": `Bearer ${ token }`
        }
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    }
    return {};
}
export default services;