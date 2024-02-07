const axiosConfig = {
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Bearer") || ""}`,
    },
};

const Http = axios.create(axiosConfig);

const GetRequest = async (url, payload) => {
    let response = null;
    try {
        let newConfig = Object.assign({}, axiosConfig);

        newConfig.headers.Authorization = `Bearer ${
            localStorage.getItem("Bearer") || ""
        }`;

        let httpResponse = await Http.get(
            url,
            { params: { ...payload } },
            newConfig
        );
        response = httpResponse.data;
    } catch (error) {
        response = error.response.data;
        console.log(error);
    }

    return response;
};

const PostRequest = async (url, payload) => {
    let response = null;
    try {
        let newConfig = Object.assign({}, axiosConfig);

        newConfig.headers.Authorization = `Bearer ${
            localStorage.getItem("Bearer") || ""
        }`;

        let httpResponse = await Http.post(url, payload, newConfig);
        response = httpResponse.data;
    } catch (error) {
        response = error.response.data;
        console.log(error);
    }

    return response;
};

const DeleteRequest = async (url, payload) => {
    let response = null;
    try {
        let newConfig = Object.assign({}, axiosConfig);

        newConfig.headers.Authorization = `Bearer ${
            localStorage.getItem("Bearer") || ""
        }`;

        let httpResponse = await Http.delete(
            url,
            { params: { ...payload } },
            newConfig
        );
        response = httpResponse.data;
    } catch (error) {
        response = error.response.data;
        console.log(error);
    }

    return response;
};

export { GetRequest, PostRequest, DeleteRequest };
