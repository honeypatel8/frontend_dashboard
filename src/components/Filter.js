import React from "react";
import {
  genders,
  departments,
  workstatuses,
  filterBy,
} from "../shared/dropDown";

const Filter = ({
  filterBy,
  filterType,
  handleFilter,
  searchQuery,
  setSearchQuery,
  globalSearchQuery,
  setGlobalSearchQuery,
}) => {
  const gender = genders;
  const department = departments;
  const workstatus = workstatuses;
  return (
    <div>
      <div className="mb-4 flex items-center space-x-3">
        <label
          className=" mb-2 h-10  grid place-content-center  w-[200px] bg-slate-50 text-sm font-bold text-gray-700"
          htmlFor="workStatus"
        >
          <span className="color:black">Filter Type :</span>
        </label>
        {/* filter type select element -------------------------------- */}

        <select
          className=" px-3 py-2 flex flex-1  w-[250px] leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="workStatus"
          name="wstId"
          value={filterType}
          onChange={handleFilter}
          required
        >
          <option value=""> Select Filter Type</option>
          {filterBy.map((option) => (
            <option key={option.id} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
        {/* -------------------------------------------------------- */}

        <div className={`flex space-x-2 ${filterType ? "block" : "hidden"}  `}>
          <select
            className={` px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
            id="workStatus"
            name="wstId"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          >
            <option value="">Select {filterType}</option>
            {filterType !== "global" &&
              eval(filterType)?.map((option) => (
                <option key={option?.id} value={option?.value}>
                  {option?.value}
                </option>
              ))}
          </select>
        </div>
        <input
          className={` block w-full rounded-md border-0 p-1.5 px-2 text-gray-900  shadow  focus:outline-none focus:shadow-outline  placeholder:text-gray-400   sm:text-sm sm:leading-6`}
          type="text"
          placeholder="Search by Firstname , Lastname or Email"
          value={globalSearchQuery}
          onChange={(e) => setGlobalSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Filter;
