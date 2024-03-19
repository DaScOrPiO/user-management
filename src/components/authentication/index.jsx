import Login from "./login";
import Signup from "./signup";
import managementImage from "../../assets/images/management.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Index() {
  const [switchForm, setSwitchForm] = useState(false);

  const handleLinkClick = () => {
    setSwitchForm(!switchForm);
  };

  return (
    <div className="min-h-screen flex">
      <div className="md:flex flex-col hidden md:w-2/4 min-h-screen relative bg-slate-700">
        <img
          src={managementImage}
          alt="management"
          className="w-full h-screen"
        />
        <div className="absolute top-20 gap-4 left-10 text-center flex justify-center flex-col items-center h-full">
          <h1 className="text-slate-700 font-bold text-3xl">
            Simplify your managemant tasks
          </h1>
          <p className="text-slate-700 text-lg">
            Empower Your Team with Our Management Solution
          </p>
        </div>
      </div>
      <div className="ml-5 md:w-2/4 w-full min-h-screen flex flex-col items-center justify-center">
        {!switchForm && (
          <span>
            <Login />
          </span>
        )}
        {switchForm && (
          <span>
            <Signup />
          </span>
        )}

        {!switchForm ? (
          <div>
            Don&apos;t have an account?
            <Link className="text-slate-700 mx-2" onClick={handleLinkClick}>Register</Link>
          </div>
        ) : (
          <div>
            Already have an account?
            <Link className="text-slate-700 mx-2" onClick={handleLinkClick}>Login</Link>
          </div>
        )}
      </div>
    </div>
  );
}
