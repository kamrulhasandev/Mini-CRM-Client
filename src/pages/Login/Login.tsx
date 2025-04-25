/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { toast } from "sonner";

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const [login] = useLoginMutation();

  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const userInfo = { email: data.email, password: data.password };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user: user, token: res.data.accessToken }));

      navigate("/dashboard");
    } catch (error: unknown) {
      console.error("Login failed", error);

      const errMsg =
        (error as { data?: { message?: string } })?.data?.message ||
        "Login failed";

      toast.error(errMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl border border-white/20 bg-white/10 backdrop-blur-md">
        <h2 className="text-center text-2xl font-bold text-white mb-6">
          Welcome Back
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-white mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                  message: "Please enter a valid email address",
                },
              })}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#22d3ee]"
            />
          </div>

          <div className="relative">
            <label className="block text-white mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
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
            className="w-full py-2 mt-4 rounded-lg font-semibold text-white transition duration-200 bg-[#06b6d4] hover:bg-[#0891b2] cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-center text-white mt-4">
          Don’t have an account?
          <Link to="/register" className="text-[#22d3ee] hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
