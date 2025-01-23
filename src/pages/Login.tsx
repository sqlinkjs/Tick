import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { loginUser } from "../apis/server";
import { Input } from "@chakra-ui/react";
import { IUserAuth } from "./Register";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { toastOptions } from "../components/ui/toastOptions";
import AppLogo from "./../assets/app_logo.svg"


const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();


  const [loginData, setLoginData] = useState<IUserAuth>({
    email: "",
    password: ""
  })

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    setLoginData((c) => ({
      ...c,
      [type]: e.target.value as string
    }))
  }, [loginData])



  const handleLogin = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (loginData.email.trim().length != 0 && loginData.password.trim().length != 0) {
      let res = await loginUser({
        data: { ...loginData },
      });
      if (res.status === 200) {
        let data = await res.json();
        setToken(data.token);
        localStorage.setItem("userInfo",loginData.email)
        navigate("/", { replace: true });
      } else {
        toast.error("Unable to login, please verify credentials", toastOptions)
      }
    }
  }, [loginData, navigate, setToken, loginUser])

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex justify-center m-12">
          <div className="flex flex-row gap-2 items-center">
            <img src={AppLogo} alt="App Logo" className="h-10 w-10" />
            <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
              Login to Tick
            </h2>
          </div>
        </div>
        <div className="mx-auto max-w-lg rounded-lg border">
          <form className="flex flex-col gap-4 p-4 md:p-8" onSubmit={handleLogin}>
            <div>
              <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                Email
              </label>
              <Input
                className="rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                placeholder="Enter your email"
                name="email"
                type="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange(e, "email")}
                required
              />
            </div>

            <div>
              <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                Password
              </label>
              <Input
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                placeholder="Enter your password"
                name="password"
                type="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange(e, "password")}
                required
              />
            </div>

            <button
              type="submit"
              className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
            >
              Log in
            </button>
          </form>

          <div className="flex items-center justify-center bg-gray-100 p-4">
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
