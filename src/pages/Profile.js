import React, { useEffect, useState } from "react";
import { AuthConsumer } from "../contextApi/store";
import { updateProfile } from "../apis/updateProfile";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ReduxConsumer } from "./../contextApi/store";
import { useDispatch } from "react-redux";
import { useUpdateProfileDataMutation } from "../features/api/user";
import { setUser } from "../features/user/userSlice";
import { workstatuses, departments } from "../shared/dropDown";

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
  const { user, role } = ReduxConsumer();
  const dispatch = useDispatch();
  const [updateProfile] = useUpdateProfileDataMutation();
  const [activeUser, setActiveUser] = useState(user);
  const WorkStatusOptions = workstatuses;
  const DepartmentOptions = departments;

  useEffect(() => {
    setActiveUser(user);
  }, [user]);

  const addresses =
    activeUser.addresses?.length > 0
      ? activeUser.addresses?.map((address) => ({
          [address?.type]: {
            street: address?.street,
            city: address?.city,
            pincode: address?.pincode,
            state: address?.state,
            type: address?.type,
          },
        }))
      : [
          {
            current: {
              street: "",
              city: "",
              pincode: "",
              state: "",
              type: "current",
            },
          },
          {
            permanent: {
              street: "",
              city: "",
              pincode: "",
              state: "",
              type: "permanent",
            },
          },
        ];

  const [add1, add2] = addresses;
  const add = {
    ...add1,
    ...add2,
  };

  const obj = {
    id: activeUser.id,
    firstName: activeUser.firstName,
    lastName: activeUser.lastName,
    email: activeUser.email,
    dob: activeUser.dob
      ? new Date(activeUser.dob).toISOString().split("T")[0]
      : null,
    doj: new Date(activeUser.doj).toISOString().split("T")[0],
    department: activeUser.department?.departmentName,
    wstId: activeUser.wstId,
    deptId: activeUser.deptId,
    ...add,
  };

  const [formData, setFormData] = useState(obj);

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
      console.log(formData);
      const response = await updateProfile(formData);
      console.log(response);
      toast.success(response.data.message);
      dispatch(setUser(response.data.user));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Toaster />
      <h1 className="text-center text-3xl my-1">Profile</h1>
      <form
        className="max-w-xl mx-auto grid grid-cols-2 gap-4 border p-3 shadow"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="firstName"
          >
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
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="lastName"
          >
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
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="email"
          >
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
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="dateOfBirth"
          >
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
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="dateOfJoining"
          >
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

        {/* <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="department"
          >
            Department
          </label>
          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="department"
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            disabled={role === 2 ? false : true}
            // required
          />
        </div> */}
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="workStatus"
          >
            Department
          </label>
          <select
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="workStatus"
            name="deptId"
            value={formData?.deptId}
            onChange={handleChange}
            required
            disabled={true}
          >
            <option value="">Select Department</option>
            {DepartmentOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.value}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="workStatus"
          >
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
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="currentStreet"
          >
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
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="currentCity"
          >
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
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="currentPincode"
          >
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
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="currentState"
          >
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
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="permanentStreet"
          >
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
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="permanentCity"
          >
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
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="permanentPincode"
          >
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
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="permanentState"
          >
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
            className="px-4 py-2 mt-7 w-60 h-9 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
