import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  email: string;
  password: string;
}

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl border border-white/20 bg-white/10 backdrop-blur-md">
        <h2 className="text-center text-2xl font-bold text-white mb-6">
          Create Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-white mb-1">Email*</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#22d3ee]"
            />
          </div>

          <div className="relative">
            <label className="block text-white mb-1">Password*</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#22d3ee]"
            />

            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[40px] text-white/70 cursor-pointer"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold text-white transition duration-200 bg-[#06b6d4] hover:bg-[#0891b2] cursor-pointer"
          >
            Register
          </button>
        </form>

        <p className="text-center text-white mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#22d3ee] hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
