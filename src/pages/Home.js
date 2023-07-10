import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import fetchBirthdays from "../apis/fetchBirthdays";
import Greeting from "../components/Greeting";
import Navbar from "../components/Navbar";


const Home = () => {
  const [greetings, setGreetings] = useState([]);

  useEffect(() => {
    fetchBirthdays(setGreetings);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mt-[10vh]">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Home;
