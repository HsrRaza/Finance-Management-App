import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const [formData, setFormData] = useState({
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
      await loginMutation.mutateAsync(formData);

      // redirect after login
      navigate("/dashboard");

    } catch (error) {
      console.log("Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <form onSubmit={handleSubmit}>
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
          disabled={loginMutation.isPending}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>

        {loginMutation.isError && (
          <p className="text-red-500 mt-2">
            Login failed. Check your credentials.
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;