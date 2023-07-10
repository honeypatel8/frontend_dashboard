import React, { useEffect, useState } from 'react'
import { AuthConsumer } from '../contextApi/store';
import { updateProfile } from '../apis/updateProfile';
import { useNavigate } from 'react-router-dom';

const WorkStatusOptions = [
    { id: 1, value: 'Work from Home' },
    { id: 2, value: 'Work from Office' },
    { id: 3, value: 'Half Leave' },
    { id: 4, value: 'Full Leave' },

];

// const initialState = {
//     id: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     dob: '',
//     doj: '',
//     department: '',
//     workStatus: '',
//     current: {
//         street: '',
//         city: '',
//         pincode: '',
//         state: '',
//     },
//     permanent: {
//         street: '',
//         city: '',
//         pincode: '',
//         state: '',
//     },
// };
const Profile = () => {

    const { activeUser: user, dispatch } = AuthConsumer();
    const [activeUser, setActiveUser] = useState(user)
    const navigate = useNavigate();

    useEffect(() => {
        setActiveUser(user)
        console.log("refreshed");
    }, [user])



    const addresses = activeUser.user.addresses.length > 0 ? activeUser.user.addresses?.map((address) => (

        {
            [address?.type]: {
                street: address?.street,
                city: address?.city,
                pincode: address?.pincode,
                state: address?.state,
            }
        }
    )) : [
        {
            current: {
                street: '',
                city: '',
                pincode: '',
                state: '',
            }
        }
        ,
        {
            permanent: {
                street: '',
                city: '',
                pincode: '',
                state: '',
            },
        }
    ]

    const [add1, add2] = addresses;
    const add = {
        ...add1,
        ...add2
    }

    const obj = {
        firstName: activeUser.user?.firstName,
        lastName: activeUser.user?.lastName,
        email: activeUser.user?.email,
        dob: new Date(activeUser.user?.dob).toISOString().split('T')[0],
        doj: new Date(activeUser.user?.doj).toISOString().split('T')[0],
        department: activeUser.user?.department?.departmentName,
        wstId: activeUser.user?.wstId,
        ...add
    }

    const [formData, setFormData] = useState(obj);
    console.log(formData);

    const handleChange = (e) => {
        const { name, value, type } = e.target;


        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        const addressType = e.target.dataset.addresstype;

        setFormData((prevData) => ({
            ...prevData,
            [addressType]: {
                ...prevData[addressType],
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            formData.dob = new Date(formData.dob).toISOString();
            const response = await updateProfile(formData)
            console.log(response.data);
            dispatch({ type: 'login', payload: response.data.user })
            navigate('/profile')
        } catch (error) {
            console.log(error);
        }

    };



    return (
        <div>
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={true}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={true}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={true}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="dateOfBirth">
                        Date of Birth
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="dateOfBirth"
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="dateOfJoining">
                        Date of Joining
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="dateOfJoining"
                        type="date"
                        name="doj"
                        value={formData.doj}
                        onChange={handleChange}
                        disabled={true}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="department">
                        Department
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="department"
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        disabled={true}
                    // required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="workStatus">
                        Work Status
                    </label>
                    <select
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="workStatus"
                        name="wstId"
                        value={formData.wstId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Work Status</option>
                        {WorkStatusOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.value}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="currentStreet">
                        Current Street
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="currentStreet"
                        type="text"
                        name="street"
                        data-addresstype="current"
                        value={formData.current.street}
                        onChange={handleAddressChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="currentCity">
                        Current City
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="currentCity"
                        type="text"
                        name="city"
                        data-addresstype="current"
                        value={formData.current.city}
                        onChange={handleAddressChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="currentPincode">
                        Current Pincode
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="currentPincode"
                        type="text"
                        name="pincode"
                        data-addresstype="current"
                        value={formData.current.pincode}
                        onChange={handleAddressChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="currentState">
                        Current State
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="currentState"
                        type="text"
                        name="state"
                        data-addresstype="current"
                        value={formData.current.state}
                        onChange={handleAddressChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="permanentStreet">
                        Permanent Street
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="permanentStreet"
                        type="text"
                        name="street"
                        data-addresstype="permanent"
                        value={formData.permanent.street}
                        onChange={handleAddressChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="permanentCity">
                        Permanent City
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="permanentCity"
                        type="text"
                        name="city"
                        data-addresstype="permanent"
                        value={formData.permanent.city}
                        onChange={handleAddressChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="permanentPincode">
                        Permanent Pincode
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="permanentPincode"
                        type="text"
                        name="pincode"
                        data-addresstype="permanent"
                        value={formData.permanent.pincode}
                        onChange={handleAddressChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="permanentState">
                        Permanent State
                    </label>
                    <input
                        className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="permanentState"
                        type="text"
                        name="state"
                        data-addresstype="permanent"
                        value={formData.permanent.state}
                        onChange={handleAddressChange}
                        required
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Profile