import { PostRequest } from "../api/axios.js";

const LoginUser = async (email, password) => {
    if (!email || !password) {
        return false;
    }

    // Dito mag rerequest sa backend to log in the user
    const response = await PostRequest("/user/login", {
        email,
        password,
    });

    // If success yung login, save the token and user data sa localstorage
    if (response.status === "success") {
        localStorage.setItem("Bearer", response.data.token);
        localStorage.setItem("c_user", JSON.stringify(response.data.userData));

        return response.data.userData;
    }

    alert(response.message);
    return false;
};

export { LoginUser };
