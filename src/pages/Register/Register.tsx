/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRegisterUserMutation } from "../../redux/features/user/userApi";
import { toast } from "sonner";

interface IFormInput {
  email: string;
  password: string;
}

const Register = () => {
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, reset } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const res = await registerUser(data).unwrap();
      if (res?.success) {
        toast.success("Account created successfully!");
        reset();
        navigate("/login");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Registration failed!");
    }
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
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
