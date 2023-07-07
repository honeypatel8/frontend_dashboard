import React, { useEffect, useState } from "react";
import fetchBirthdays from "../apis/fetchBirthdays";
import Greeting from "../components/Greeting";

const Home = () => {
  const [greetings, setGreetings] = useState([]);

  useEffect(() => {
    fetchBirthdays(setGreetings);
  }, []);

  return (
    <div>
      <Greeting greetings={greetings} />
    </div>
  );
};

export default Home;
