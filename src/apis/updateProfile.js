import axios from "axios"


export const updateProfile = async (payload) => {
    const result = await axios.post('/employee/update', payload);
    return result
}