import React, { useState } from "react";
import PrimaryButton from "../components/common/PrimaryButton";
import InputField from "../components/common/InputField";
import { toast } from "react-toastify";
import useUserStore from "../store/AuthStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useUserStore();
  const router = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in both fields");
      return;
    }
    try {
      await login(email, password, router);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      <div className="bg-primary text-white">
        <div className="lg:w-8/12 w-[95%] mx-auto h-screen flex items-center justify-center">
          <div className="">
            <div className="">
              <div className="">
                <h1 className="text-3xl font-bold pt-10">
                  Sign In as an Admin
                </h1>
              </div>
              <form
                onSubmit={handleLogin}
                className="mt-4 bg-white text-black p-3 md:p-5 rounded-2xl "
              >
                <div>
                  <h1 className="text-xl font-semibold">
                    Sign In Admin Panel at Ready How
                  </h1>
                  <div className="py-4 space-y-3">
                    <InputField
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder={"Enter Email"}
                    />
                    <InputField
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      required
                      placeholder={"Enter Password"}
                    />
                  </div>
                  <PrimaryButton
                    value={`${loading ? "Loading..." : "Login"}`}
                    type="submit"
                    disabled={loading}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
