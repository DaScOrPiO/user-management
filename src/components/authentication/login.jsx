import { toast } from "react-toastify";
import { login, makeRequest } from "../endpoints/endpoint";
import { EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordIcon = () => {
    setShowPassword(!showPassword);
  };

  const notify = (message) => {
    toast(message);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (formData.username === "") {
      notify("Enter your organisation's username");
      return true;
    }

    if (formData.password === "") {
      notify("Password is required");
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErr = validateForm();
    if (validationErr) return;

    try {
      const response = await makeRequest(login, formData);
      if (response.status === 200) {
        notify("Login successful");
        let loggedInStatus = localStorage.getItem("active");
        if (loggedInStatus) {
          navigate("/");
        } else {
          loggedInStatus = localStorage.setItem("active", "true");
          navigate("/");
        }
      } else {
        notify(response.data);
      }
    } catch (err) {
      console.error("Error:", err);
      if (err.response && err.response.data) {
        toast.error(err.response.data);
      } else {
        toast.error("network, or invalid username or password. Try again");
      }
    }
  };

  return (
    <div className="w-full py-2 px-2 h-auto flex justify-center flex-col">
      <h1 className="text-slate-700 font-bold text-center text-2xl">
        Login using your orgainsation&apos;s account
      </h1>
      <form className="py-4" onSubmit={handleSubmit}>
        <div className="w-full">
          <div className="mt-6 w-full flex flex-col items-center">
            <input
              type="text"
              className="w-full py-2 outline-none border-none focus:outline focus:outline-slate-700 px-2 rounded-md"
              placeholder="organisation's name"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mt-6 w-full flex items-center relative">
            <input
              type={!showPassword ? "password" : "text"}
              className="w-full py-2 outline-none border-none focus:outline focus:outline-slate-700 px-2 rounded-md"
              placeholder="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <span
              className="absolute top-25 right-5 cursor-pointer"
              onClick={togglePasswordIcon}
            >
              {showPassword ? (
                <EyeOpenIcon color="black" width={20} height={20} />
              ) : (
                <EyeNoneIcon color="black" width={20} height={20} />
              )}
            </span>
          </div>

          <div className="mt-4 flex justify-center w-full">
            <button className="bg-slate-700 px-5 py-3 rounded-lg text-white">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
