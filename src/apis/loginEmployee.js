import axios from 'axios'

export default async function loginEmployee(payload) {
    const response = await axios.post('/employee/login', payload)
    console.log("called");
    return response;
}