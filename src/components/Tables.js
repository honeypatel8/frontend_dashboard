import React, { useState, useEffect } from "react";

import Table from "@mui/material/Table";

import TableBody from "@mui/material/TableBody";

import TableCell from "@mui/material/TableCell";

import TableContainer from "@mui/material/TableContainer";

import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";

import {
  useDeleteEmployeeMutation,
  useGetEmployeesQuery,
} from "../features/api/user";
import { useSelector } from "react-redux";
const Tables = ({
  data,
  setOpen,
  globalSearchQuery,
  searchQuery,
  filterType,
  formData,
  setFormData,
  action,
  setAction,
}) => {
  const [rows, setRows] = useState([]);

  const { role } = useSelector((state) => state.user);

  const [deleteEmployee] = useDeleteEmployeeMutation();

  useEffect(() => {
    if (data) {
      setRows(data.user);
    }
  }, [data]);

  const handleEdit = (row) => {
    setAction("edit");
    setOpen(true);
    setFormData({
      id: row?.id,
      firstName: row.firstName,
      lastName: row.lastName,
      gender: row.gender,
      email: row.email,
      phone: row.phone,
      deptId: row.deptId,
      wstId: row.wstId,
      roleId: row.roleId,
      doj: row.doj ? new Date(row.doj).toISOString().split("T")[0] : "",
    });
  };

  const handleDelete = async (e, row) => {
    await deleteEmployee({ id: row.id });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table
          sx={{ width: 1400 }}
          style={{ fontWeight: 800 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow className=" bg-slate-300   ">
              <TableCell align="right" style={{ fontWeight: 700 }}>
                ID
              </TableCell>

              <TableCell align="right" style={{ fontWeight: 700 }}>
                FirstName
              </TableCell>

              <TableCell align="right" style={{ fontWeight: 700 }}>
                LastName
              </TableCell>

              <TableCell align="right" style={{ fontWeight: 700 }}>
                Email
              </TableCell>

              <TableCell align="right" style={{ fontWeight: 700 }}>
                Gender
              </TableCell>

              <TableCell align="right" style={{ fontWeight: 700 }}>
                Phone
              </TableCell>

              <TableCell align="right" style={{ fontWeight: 700 }}>
                Dob
              </TableCell>

              <TableCell align="right" style={{ fontWeight: 700 }}>
                Doj
              </TableCell>

              <TableCell align="right" style={{ fontWeight: 700 }}>
                Department
              </TableCell>

              <TableCell align="right" style={{ fontWeight: 700 }}>
                Work Status
              </TableCell>

              <TableCell align="right" style={{ fontWeight: 700 }}>
                Role
              </TableCell>

              {role === 2 && (
                <>
                  <TableCell align="right" style={{ fontWeight: 700 }}>
                    Edit
                  </TableCell>

                  <TableCell align="right" style={{ fontWeight: 700 }}>
                    Remove
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length > 0 &&
              rows
                .filter((row) => {
                  if (globalSearchQuery) {
                    return (
                      row.firstName
                        .toLowerCase()
                        .includes(globalSearchQuery.toLowerCase()) ||
                      row.lastName
                        .toLowerCase()
                        .includes(globalSearchQuery.toLowerCase()) ||
                      row.email
                        .toLowerCase()
                        .includes(globalSearchQuery.toLowerCase())
                    );
                  } else {
                    return row;
                  }
                })
                .filter((row) => {
                  if (filterType && searchQuery) {
                    if (filterType === "gender") {
                      return row.gender === searchQuery;
                    } else if (filterType === "workstatus") {
                      return row.workstate?.workState === searchQuery;
                    } else if (filterType === "department") {
                      return row.department?.departmentName === searchQuery;
                    }
                  } else {
                    return row;
                  }
                })
                .map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell align="right">{row.id}</TableCell>

                    <TableCell align="right">{row.firstName}</TableCell>

                    <TableCell align="right">{row.lastName}</TableCell>

                    <TableCell align="right">{row.email}</TableCell>

                    <TableCell align="right">{row.gender}</TableCell>

                    <TableCell align="right">{row.phone}</TableCell>

                    <TableCell align="right">
                      {!!row.dob
                        ? new Date(row.dob).toISOString().split("T")[0]
                        : ""}
                    </TableCell>

                    <TableCell align="right">
                      {!!row.doj
                        ? new Date(row.doj).toISOString().split("T")[0]
                        : ""}
                    </TableCell>

                    <TableCell align="right">
                      {row?.department?.departmentName}
                    </TableCell>

                    <TableCell align="right">
                      {row?.workstate?.workState}
                    </TableCell>

                    <TableCell align="right">
                      <span
                        className={`${
                          row.Role.role === "admin"
                            ? "bg-green-300"
                            : "bg-gray-200"
                        }  font-bold p-1 rounded-sm`}
                      >
                        {row.Role.role}
                      </span>
                    </TableCell>

                    {role === 2 && (
                      <>
                        <TableCell align="right">
                          <button
                            //   type="submit"
                            className="flex w-full  fo justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => handleEdit(row)}
                          >
                            Edit
                          </button>
                        </TableCell>

                        <TableCell align="right">
                          <button
                            id={row.id}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={(e) => handleDelete(e, row)}
                          >
                            Delete
                          </button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tables;
