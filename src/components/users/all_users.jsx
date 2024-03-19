import { useState } from "react";
import users from "../dummy_data";
import { PlusIcon } from "@radix-ui/react-icons";

export default function All_users() {
  const [selectedUsers, setSelectedUsers] = useState([]);

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

  return (
    <>
      <div className="md:w-3/4 w-full px-8">
        <div
          className="flex md:mt-12 mt-24 -mb-8 justify-end md:px-12 px-2
        "
        >
          <button className="bg-slate-700 text-white px-4 py-2 rounded-md flex">
            Add User
            <span className="mx-2">
              <PlusIcon color="white" width={25} height={25} />
            </span>
          </button>
        </div>
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
