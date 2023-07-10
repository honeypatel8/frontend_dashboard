import axios from "axios"

export const logoutUser = async () => {
    const result = await axios.post('/employee/logout')
    return result;
}