import React, { useEffect, useState } from "react";

import {
  useGetBirthdaysQuery,
  useGetFullLeavesQuery,
} from "../features/api/user";

const Greeting = () => {
  const [greetings, setGreetings] = useState([]);
  const [fullleaves, setFullLeaves] = useState([]);
  const { data } = useGetBirthdaysQuery();
  const { data: fullleaveData } = useGetFullLeavesQuery();

  useEffect(() => {
    setGreetings(data);
    setFullLeaves(fullleaveData);
  }, [data, fullleaveData]);

  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-2 ">
        {greetings?.length > 0 && (
          <div className="flex flex-col border w-[60%] p-4">
            <h1 className="font-bold text-xl">Today's Birthdays</h1>
            {greetings?.map((employee, id) => (
              <h1
                key={id}
                className="text-md my-1 text-gray-500"
              >{`Happy Birthday ${employee.firstName} ${employee.lastName}`}</h1>
            ))}
          </div>
        )}
        {fullleaves?.length > 0 && (
          <div className="flex flex-col border w-[60%] p-4">
            <h1 className="font-bold text-xl">On Leaves Today</h1>
            {fullleaves?.map((employee, id) => (
              <h1
                key={id}
                className="text-md my-1 text-gray-500"
              >{` ${employee.firstName} ${employee.lastName}`}</h1>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Greeting;
