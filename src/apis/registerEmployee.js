import axios from 'axios'

export default async function registerEmployee(payload) {
    const response = await axios.post('/employee/register', payload)
    console.log("called");
    return response;
}