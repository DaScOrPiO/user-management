import { useEffect, useRef, useState } from "react";
import users from "../dummy_data";
import { PlusIcon } from "@radix-ui/react-icons";
import { makeGetRequest, get } from "../endpoints/endpoint";
import { toast } from "react-toastify";

export default function All_users() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const newUserRef = useRef();

  const handleCheckboxChange = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleDeleteSelected = () => {
    const usersToDelete = selectedUsers.map((index) => users[index]);
    console.log(
      "Selected Users to Delete:",
      usersToDelete.map((item) => item.lastname)
    );
  };

  const notify = (message) => {
    toast(message);
  };

  const showForm = () => {
    setDisplayForm(true);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await makeGetRequest(get);
        if (response.status === 200) {
          console.log(response);
        }
      } catch (err) {
        console.log("something went wrong!", err);
        if (err.response && err.response.data) {
          toast.error(err.response.data);
        } else {
          toast.error("something went wrong!");
        }
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!newUserRef.current?.contains(e.target)) {
        setDisplayForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="md:w-3/4 w-full px-8">
        <div
          className="flex md:mt-12 mt-24 -mb-8 justify-end md:px-12 px-2
        "
        >
          <button
            className="bg-slate-700 text-white px-4 py-2 rounded-md flex"
            onClick={showForm}
          >
            Add User
            <span className="mx-2">
              <PlusIcon color="white" width={25} height={25} />
            </span>
          </button>
        </div>

        {displayForm && (
          <div
            className="md:w-[600px] w-full min-h-[500px] overflow-y-auto md:fixed md:top-2 top-56 right-0 md:right-20 z-50 bg-gray-200 py-4 flex justify-center flex-col items-center"
            ref={newUserRef}
          >
            <h2 className="text-center text-slate-700 -mb-12 mt-8 font-bold text-2xl">
              Add a new user
            </h2>
            <form
              action=""
              className="w-full py-8 px 4 flex flex-col justify-center items-center"
            >
              <div className="flex md:flex-row flex-col py-4 px-2 my-6 w-full">
                <div className="px-2 py-4 md:w-2/4 w-full">
                  <input
                    type="text"
                    className="py-2 px-4 my-2 rounded-md w-full"
                    placeholder="firstname"
                  />
                </div>

                <div className="px-2 py-4 md:w-2/4 w-full">
                  <input
                    type="text"
                    className="py-2 px-4 my-2 rounded-md w-full"
                    placeholder="lastname"
                  />
                </div>
              </div>
              <div className="flex md:flex-row flex-col py-4 px-2 my-2 w-full">
                <div className="px-2 py-4 md:w-2/4 w-full">
                  <input
                    type="tel"
                    className="py-2 px-4 my-2 rounded-md w-full"
                    placeholder="phone"
                  />
                </div>

                <div className="px-2 py-4 md:w-2/4 w-full">
                  <input
                    type="text"
                    className="py-2 px-4 my-2 rounded-md w-full"
                    placeholder="email"
                  />
                </div>
              </div>

              <div className="py-4 px-2 my-6 w-full">
                <input
                  type="date"
                  className="py-2 px-4 my-2 rounded-md w-full"
                />
              </div>

              <div className="flex">
                <button className="bg-slate-700 text-white px-4 py-2 rounded-md">
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="w-full px-2 py-8 flex justify-center flex-col overflow-x-auto">
          <table className="table-auto text-slate-700">
            <thead className="font-bold">
              <tr className="px-5 py-8">
                <th></th>
                <th className="px-5 py-8 text-lg text-left">Last Name</th>
                <th className="px-5 py-8 text-lg text-left">First Name</th>
                <th className="px-5 py-8 text-lg text-left">Phone</th>
                <th className="px-5 py-8 text-lg text-left">Email</th>
                <th className="px-5 py-8 text-lg text-left">DOB</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="px-5 py-8 text-md">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(user.id)}
                      checked={selectedUsers.includes(user.id)}
                    />
                  </td>
                  <td className="px-5 py-8 text-md">{user.lastname}</td>
                  <td className="px-5 py-8 text-md">{user.Firstname}</td>
                  <td className="px-5 py-8 text-md">{user.phone}</td>
                  <td className="px-5 py-8 text-md">{user.email}</td>
                  <td className="px-5 py-8 text-md">{user.dob}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-8">
            <button
              onClick={handleDeleteSelected}
              className="bg-slate-700 py-4 px-8 text-white rounded-md"
            >
              Delete Selected Users
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
