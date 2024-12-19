import React, { useState } from "react";
import AddData from "./AddData";
import DeleteData from "./DeleteData";
import UpdateData from "./UpdateData";

// Success Component to render when credentials are correct
const SuccessComponent = () => {
  return (
    <div className="flex gap-5 flex-col">
      <AddData />
      <DeleteData />
      <UpdateData />
    </div>
  );
};

const Admin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [h3, setH3] = useState("");
  const [isAuth, setIsAuth] = useState(false); // State to track successful login

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    if (formData.username === "sumit" && formData.password === "qwerty") {
      setH3(""); // Clear error message
      setIsAuth(true); // Set successful authentication
    } else {
      setH3("Incorrect username or password");
      setIsAuth(false); // Reset on incorrect login
    }
  };

  return (
    <>
      <div className="w-screen flex items-center justify-center bg-w">
        <div className="w-full max-w-md p-5 rounded-md">
          {isAuth ? (
            <SuccessComponent />
          ) : (
            <>
              <form onSubmit={submit} className="space-y-4">
                <h2 className="text-2xl font-bold my-2 text-center text-gray-700">Login</h2>
                <label className="block">
                  <span className="text-gray-600">Username:</span>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter the username"
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-600">Password:</span>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="mt-1 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter the password"
                    required
                  />
                </label>

                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Submit
                </button>
                <h3 className="text-red-500">{h3}</h3>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
