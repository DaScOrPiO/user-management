import { useState } from "react";
import { signup, makeRequest } from "../endpoints/endpoint";
import { toast } from "react-toastify";
import { EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordIcon = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordIcon = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const notify = (message) => {
    toast(message);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formValidator = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

    if (formData.lastname === "") {
      notify("Lastname is required");
      return true;
    }

    if (formData.firstname === "") {
      notify("Firstname is required");
      return true;
    }

    if (formData.email === "") {
      notify("E-mail is required");
      return true;
    } else if (!emailRegex.test(formData.email)) {
      notify("Invalid E-mail format");
      return true;
    }

    if (formData.username === "") {
      notify("Username is required");
      return true;
    }

    if (formData.password === "") {
      notify("Password is required");
      return true;
    } else if (!passwordRegex.test(formData.password)) {
      notify(
        "Password must contain at least one uppercase letter, one number, one special character, and be at least 10 characters long"
      );
      return true;
    }

    if (formData.confirmPassword === "") {
      notify("Please confirm the password");
      return true;
    }

    if (formData.password !== formData.confirmPassword) {
      notify("Passwords do not match");
      return true;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = formValidator();
    if (validationError) return;

    try {
      const values = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      };
      const response = await makeRequest(signup, values);
      if (response.status === 200) {
        notify("Registeration successful");
        const loggedInStatus = localStorage.setItem("active", "true");
        if (loggedInStatus) {
          window.location.reload()
        }
      } else {
        notify(response.data);
      }
    } catch (err) {
      console.error("Error:", err);
      if (err.response && err.response.data) {
        toast.error(err.response.data);
      } else {
        toast.error("something went wrong!");
      }
    }
  };

  return (
    <div className="w-full py-2 px-2 h-auto flex justify-center flex-col gap-4">
      <h1 className="text-slate-700 font-bold text-center text-2xl">
        Login using your orgainsation&apos;s account
      </h1>
      <form className="" onSubmit={handleSubmit}>
        <div className="w-full">
          <div className="mt-6 w-full flex items-center">
            <div className="w-2/4">
              <input
                type="text"
                placeholder="Firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full py-2 outline-none border-none focus:outline focus:outline-slate-700 px-2 rounded-md"
              />
            </div>

            <div className="w-2/4 ml-2">
              <input
                type="text"
                className="w-full py-2 outline-none border-none focus:outline focus:outline-slate-700 px-2 rounded-md"
                placeholder="Lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mt-6 w-full flex flex-col items-center">
            <input
              type="email"
              className="w-full py-2 outline-none border-none focus:outline focus:outline-slate-700 px-2 rounded-md"
              placeholder="E-mail"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mt-6 w-full flex flex-col items-center">
            <input
              type="text"
              className="w-full py-2 outline-none border-none focus:outline focus:outline-slate-700 px-2 rounded-md"
              placeholder="username"
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

          <div className="mt-6 w-full flex items-center relative">
            <input
              type={!showConfirmPassword ? "password" : "text"}
              className="w-full py-2 outline-none border-none focus:outline focus:outline-slate-700 px-2 rounded-md"
              placeholder="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <span
              className="absolute top-25 right-5 cursor-pointer"
              onClick={toggleConfirmPasswordIcon}
            >
              {showConfirmPassword ? (
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
