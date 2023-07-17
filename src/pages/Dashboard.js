import { useEffect, useState } from "react";

import { StyledEngineProvider, CssVarsProvider } from "@mui/joy/styles";
import Navbar from "../components/Navbar";

import Form from "./../components/Form";
import { ThreeDots } from "react-loader-spinner";

import { useGetEmployeesQuery } from "../features/api/user";

import { filterBy } from "../shared/dropDown";
import Filter from "../components/Filter";
import Tables from "../components/Tables";

export default function Dashboard() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const [filterType, setFilterType] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    deptId: "",
    wstId: "",
    password: "",
  });

  const { data, error, isLoading } = useGetEmployeesQuery();

  // Update the "rows" state whenever "data" changes
  useEffect(() => {
    if (data) {
      setRows(data.user);
    }
  }, [data]);

  const handleFilter = (e) => {
    setFilterType(e.target.value);
    setSearchQuery("");
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}
      className="flex justify-center  "
    >
      <Navbar />
      <div className="my-10 flex flex-col justify-center items-center">
        {isLoading ? (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="black"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        ) : (
          <>
            <StyledEngineProvider injectFirst>
              <CssVarsProvider>
                <Form
                  open={open}
                  setOpen={setOpen}
                  setAction={setAction}
                  action={action}
                  formData={formData}
                  setFormData={setFormData}
                />
              </CssVarsProvider>
            </StyledEngineProvider>

            <Filter
              filterBy={filterBy}
              filterType={filterType}
              handleFilter={handleFilter}
              searchQuery={searchQuery}
              globalSearchQuery={globalSearchQuery}
              setSearchQuery={setSearchQuery}
              setGlobalSearchQuery={setGlobalSearchQuery}
            />

            <Tables
              data={data}
              setOpen={setOpen}
              globalSearchQuery={globalSearchQuery}
              searchQuery={searchQuery}
              filterType={filterType}
              formData={formData}
              setFormData={setFormData}
              action={action}
              setAction={setAction}
            />
          </>
        )}
      </div>
    </div>
  );
}
