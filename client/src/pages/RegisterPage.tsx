/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useRegister } from "../hooks/useRegister";

const RegisterPage = () => {
 
  const registerMutation = useRegister();

  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerMutation.mutateAsync(formData);

      // redirect after login
    //   navigate("/dashboard");

    } catch (error) {
      console.log("Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="name"
          placeholder="name"
          className="w-full p-2 border mb-3"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-3"
          value={formData.email}
          onChange={handleChange}
        />


        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {registerMutation.isPending ? "Registering..." : "Register"}
        </button>

        {registerMutation.isError && (
          <p className="text-red-500 mt-2">
            Registration failed. Check your credentials.
          </p>
        )}
        {registerMutation.isSuccess && (
          <p className="text-green-500 mt-2">
            Registration successful.
          </p>
        )}
      </form>
    </div>
  );
};

export default RegisterPage;
