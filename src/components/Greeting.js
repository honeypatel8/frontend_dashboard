import React, { useEffect, useState } from "react";
import fetchBirthdays from "../apis/fetchBirthdays";


const Greeting = () => {
  const [greetings, setGreetings] = useState([]);

  useEffect(() => {
    fetchBirthdays(setGreetings);
  }, []);
  return (
    <div className="flex flex-col justify-center items-center ">

      {greetings.map((employee, id) => (
        <h1 key={id} className="text-xl" >{`Happy Birthday ${employee.firstName} ${employee.lastName}`}</h1>
      ))}
    </div>
  );
};

export default Greeting;
