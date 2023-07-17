import * as React from "react";

import Button from "@mui/joy/Button";

import FormControl from "@mui/joy/FormControl";

import FormLabel from "@mui/joy/FormLabel";

import Input from "@mui/joy/Input";

import Modal from "@mui/joy/Modal";

import ModalDialog from "@mui/joy/ModalDialog";

import Stack from "@mui/joy/Stack";

import Add from "@mui/icons-material/Add";

import {
  useRegisterEmployeeMutation,
  useUpdateEmployeeDataMutation,
} from "../features/api/user";
import { useSelector } from "react-redux";
import { genders, departments, workstatuses, roles } from "../shared/dropDown";

// const WorkStatusOptions = [
//   { id: 1, value: "Work from Office" },
//   { id: 2, value: "Work from Home" },
//   { id: 3, value: "Full Leave" },
//   { id: 4, value: "Half Leave" },
// ];

// const DepartmentOptions = [
//   { id: 1, value: "HR" },
//   { id: 2, value: "Account" },
//   { id: 3, value: "IT" },
//   { id: 4, value: "Maintainence" },
//   { id: 5, value: "Sales" },
//   { id: 6, value: "R&D" },
// ];
// const GenderOptions = [
//   { id: 1, value: "male" },
//   { id: 2, value: "female" },
// ];
// const RoleOptions = [
//   { id: 1, value: "Employee" },
//   { id: 2, value: "Admin" },
// ];

const defaultEditForm = {
  firstName: "",
  lastName: "",
  gender: "",
  password: "",
  email: "",
  phone: "",
  deptId: "",
  wstId: "",
};

export default function Form({
  open,
  setOpen,
  setAction,
  action,
  formData,
  setFormData,
}) {
  const { role } = useSelector((state) => state.user);
  const [updateEmployee] = useUpdateEmployeeDataMutation();
  const [registerEmployee] = useRegisterEmployeeMutation();
  const gender = genders;
  const department = departments;
  const workstatus = workstatuses;
  const roleTypes = roles;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (action === "create") {
        registerEmployee(formData);
      } else if (action === "edit") {
        formData.doj = new Date(formData.doj).toISOString();

        const response = await updateEmployee(formData);
        setFormData(defaultEditForm);
      }

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div className="flex justify-center my-2 ">
        {role === 2 && (
          <Button
            variant="outlined"
            startDecorator={<Add />}
            onClick={() => {
              setOpen(true);
              setAction("create");
              setFormData(defaultEditForm);
            }}
          >
            Add Employee
          </Button>
        )}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className="w-[70%] mx-auto"
      >
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{ width: 1000 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-center my-1 bg-slate-100 p-2 font-bold ">
            {" "}
            {action === "create" ? "Create New Employee" : "Edit Employee"}
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <Stack spacing={2} className="grid grid-cols-2 gap-4">
              {action === "edit" && (
                <>
                  <FormControl className="mt-4">
                    <FormLabel>ID</FormLabel>

                    <Input
                      autoFocus
                      required
                      name="id"
                      value={formData?.id}
                      onChange={handleChange}
                      disabled={true}
                    />
                  </FormControl>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      htmlFor="role"
                    >
                      Role
                    </label>
                    <select
                      className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="role"
                      name="roleId"
                      value={formData?.roleId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Role</option>
                      {roleTypes.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.value}
                        </option>
                      ))}
                    </select>
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
                      value={formData?.doj}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}

              <FormControl className={`${action === "create" && "mt-4"}`}>
                <FormLabel>Email</FormLabel>

                <Input
                  autoFocus
                  required
                  name="email"
                  value={formData?.email}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>First Name</FormLabel>

                <Input
                  autoFocus
                  required
                  name="firstName"
                  value={formData?.firstName}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>

                <Input
                  autoFocus
                  required
                  name="lastName"
                  value={formData?.lastName}
                  onChange={handleChange}
                />
              </FormControl>

              {action === "create" && (
                <FormControl>
                  <FormLabel>Password</FormLabel>

                  <Input
                    autoFocus
                    required
                    name="password"
                    value={formData?.password}
                    onChange={handleChange}
                  />
                </FormControl>
              )}

              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="workStatus"
                >
                  Gender
                </label>
                <select
                  className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="workStatus"
                  name="gender"
                  value={formData?.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  {gender.map((option) => (
                    <option key={option.id} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>

              <FormControl>
                <FormLabel>Phone</FormLabel>

                <Input
                  autoFocus
                  required
                  name="phone"
                  value={formData?.phone}
                  onChange={handleChange}
                />
              </FormControl>

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
                >
                  <option value="">Select Department</option>
                  {department.map((option) => (
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
                  value={formData?.wstId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Work Status</option>
                  {workstatus.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.value}
                    </option>
                  ))}
                </select>
              </div>
            </Stack>
            <Button
              style={{ backgroundColor: "#096bde" }}
              type="submit"
              className="mt-4 w-20 "
            >
              Submit
            </Button>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
