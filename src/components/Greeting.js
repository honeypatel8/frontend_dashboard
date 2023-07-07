import React from "react";

const Greeting = ({ greetings }) => {
  return (
    <div>
      {greetings.map((employee) => (
        <h1>{`Happy Birthday ${employee.firstName} ${employee.lastName}`}</h1>
      ))}
    </div>
  );
};

export default Greeting;
