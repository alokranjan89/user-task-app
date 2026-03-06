import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email || !password){
      setError("All fields are required");
      return;
    }

    try{

      await API.post("/auth/register",{
        email,
        password
      });

      setSuccess("Registration successful");

      setTimeout(()=>{
        navigate("/");
      },1500);

    }catch(err){
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-8 w-96"
      >

        <h2 className="text-2xl font-bold text-center mb-6">
          Register
        </h2>

        {error && (
          <p className="text-red-500 mb-3 text-center">{error}</p>
        )}

        {success && (
          <p className="text-green-500 mb-3 text-center">{success}</p>
        )}

        <input
          className="border p-2 w-full mb-4 rounded"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-4 rounded"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          className="bg-green-500 hover:bg-green-600 text-white w-full p-2 rounded"
        >
          Register
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Register;