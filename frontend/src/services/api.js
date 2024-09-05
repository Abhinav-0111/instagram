import axios from "axios";
import { toast } from "react-toastify";

const URL = `${window.location.origin}`;
export const authenticationSignup = async (file) => {
    try {
        return await axios.post(`${URL}/signup`, file);
    } catch (error) {
        console.log("Error while calling Signup Api", error);
        toast.error(error.response.data);
        return error.response;
    }
};

export const authenticationLogin = async (file) => {
    try {
        return await axios.post(`${URL}/login`, file);
    } catch (error) {
        console.log("Error while calling Login Api", error);
        toast.error(error.response.data);
        return error.response;
    }
};
