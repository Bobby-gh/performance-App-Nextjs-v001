"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../contex/context-context";
import {
  LOGIN_URL,
  REQUEST_RESET_PASSWORD,
  SIGNUP_URL,
  VERIFYEMAIL_URL,
} from "../api/routes";
import { TfiEmail } from "react-icons/tfi";
import Cookies from "js-cookie";
import axios from "../api/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const { auth, setAuth } = React.useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          email: userDetails.email,
          password: userDetails.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.request.status === 200) {
        console.log({ "oringal auth": response.data });
        setAuth({
          token: response.data.token,
          name: response.data.fullName,
          refNum: response.data.refNum,
        });

        Cookies.set("token", response.data.token, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
        });
        Cookies.set("name", response.data.fullName, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
        });
        Cookies.set("refNum", response.data.refNum, {
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
        });
      }
    } catch (err) {
      alert(err);
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-[430px]">
      <div>
        <div className="flex justify-center p-12">
          <img
            src="https://afriquetek.com/wp-content/uploads/2023/07/afriquetek-logo-1.png"
            alt="Paris"
            className="w-55 h-20"
          />
        </div>
        <form autoComplete="off">
          <div className="flex flex-col">
            <label>Email</label>
            <input
              placeholder="Type email here"
              autoComplete="off"
              type="email"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails((prevDetails) => ({
                  ...prevDetails,
                  email: e.target.value,
                }))
              }
              className="border border-blue-500 rounded-lg p-4 my-2"
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              placeholder="Enter password"
              autoComplete="off"
              type="password"
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails((prevDetails) => ({
                  ...prevDetails,
                  password: e.target.value,
                }))
              }
              className="border border-blue-500 rounded-lg p-4 my-2"
            />
          </div>

          <div className="flex justify-end">
            <Link href="/forget-password" prefetch={false}>
              <h4 className="text-blue italic text-sm text-[#08376B]">
                forgot password?
              </h4>
            </Link>
          </div>
          <div
            className="flex justify-center p-4 text-white rounded-lg mt-8 bg-slate-500"
            onClick={handleSubmit}>
            <button type="submit" disabled={isLoading} className="px-16">
              {isLoading ? (
                <div className="flex flex-row justify-center">
                  <p className="text-sm pr-2">Loading</p>
                  <CircularProgress size={27} thickness={6} color="primary" />
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
          {/* or line */}
          <div className="flex items-center justify-center my-6">
            <div className="flex-grow border-t border-slate-500"></div>
            <span className="px-2 text-sm text-gray-500">or</span>
            <div className="flex-grow border-t border-slate-500"></div>
          </div>

          {/* sign up */}
          <div className="flex justify-center items-center space-x-1">
            <span className="text-sm text-black">Dont have an account?</span>
            <span className="text-slate-500 text-sm">
              <Link href="/signup" prefetch={false}>
                Sign Up
              </Link>
            </span>
          </div>
        </form>
        {auth.token && router.push("/home", { scroll: false })}
      </div>
    </main>
  );
}

export function ForgetPassword() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
  });
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        REQUEST_RESET_PASSWORD,
        JSON.stringify({
          email: userDetails.email,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.request.status === 200) {
        Cookies.set("email", JSON.stringify(userDetails.email), {
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
        });
        setEmailSent(true);
        router.push("/reset-password", { scroll: false });
      }
    } catch (err) {
      alert(err);
      console.log(err)
    } finally {
      setLoading(false);
      setEmailSent(false);
    }
  };

  return (
    <main className="w-[430px]">
      <div>
        <div className="flex  mt-[17%] mb-[20%] text-xl font-bold">
          Enter email for Verification
        </div>
        <form autoComplete="off">
          <div className="flex flex-col">
            <label>Email</label>
            <input
              placeholder="Type email here"
              autoComplete="off"
              type="email"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails((prevDetails) => ({
                  ...prevDetails,
                  email: e.target.value,
                }))
              }
              className="border border-blue-500 rounded-lg p-4 my-2"
            />
          </div>
          <div
            className="flex justify-center p-4 text-white rounded-lg mt-8 bg-slate-500"
            onClick={handleSubmit}>
            <button type="submit" disabled={isLoading} className="px-16">
              {isLoading ? (
                <div className="flex flex-row justify-center">
                  <p className="text-sm pr-2">Loading</p>
                  <CircularProgress size={27} thickness={6} color="primary" />
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
          {/* or line */}
          <div className="flex items-center justify-center my-6">
            <div className="flex-grow border-t border-slate-500"></div>
            <span className="px-2 text-sm text-gray-500">or</span>
            <div className="flex-grow border-t border-slate-500"></div>
          </div>

          {/* sign up */}
          <div className="flex justify-center items-center space-x-1">
            <span className="text-sm text-black">Return?</span>
            <span className="text-slate-500 text-sm">
              <Link href="/" prefetch={false}>
                Home
              </Link>
            </span>
          </div>
        </form>
      </div>
    </main>
  );
}

export function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { auth, setAuth } = React.useContext(AuthContext);
  const [userDetails, setUserDetails] = useState({
    password: "",
    token: "",
  });
  useEffect(() => {
    const emailFromCookie = Cookies.get("email");
    setEmail(emailFromCookie);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          newPassword: userDetails.password,
          token: userDetails.token,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.request.status === 200) {
      }
    } catch (err) {
      alert(err);
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-[430px]">
      <div>
        <div className=" mt-[10%] mb-[15%]">
          <p className="text-xl font-bold">Set your New Password</p>
          <p className="text-sm">Check your email for a verified token</p>
        </div>
        <div className="flex space-x-2 mb-8 items-center">
          <span>
            <TfiEmail size={20} color="#04B1C4" />
          </span>
          <span className=" text-lg">{email}</span>
        </div>
        <form autoComplete="off">
          <div className="flex flex-col">
            <label>token</label>
            <input
              placeholder="Type email here"
              autoComplete="off"
              type="email"
              value={userDetails.token}
              onChange={(e) =>
                setUserDetails((prevDetails) => ({
                  ...prevDetails,
                  token: e.target.value,
                }))
              }
              className="border border-blue-500 rounded-lg p-4 my-2"
            />
          </div>
          {userDetails.token && (
            <div className="flex flex-col">
              <label>Password</label>
              <input
                placeholder="Type email here"
                autoComplete="off"
                type="email"
                value={userDetails.password}
                onChange={(e) =>
                  setUserDetails((prevDetails) => ({
                    ...prevDetails,
                    password: e.target.value,
                  }))
                }
                className="border border-blue-500 rounded-lg p-4 my-2"
              />
            </div>
          )}
          <div
            className="flex justify-center p-4 text-white rounded-lg mt-8 bg-slate-500"
            onClick={handleSubmit}>
            <button type="submit" disabled={isLoading} className="px-16">
              {isLoading ? (
                <div className="flex flex-row justify-center">
                  <p className="text-sm pr-2">Loading</p>
                  <CircularProgress size={27} thickness={6} color="primary" />
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
          {/* or line */}
          <div className="flex items-center justify-center my-6">
            <div className="flex-grow border-t border-slate-500"></div>
            <span className="px-2 text-sm text-gray-500">or</span>
            <div className="flex-grow border-t border-slate-500"></div>
          </div>

          {/* sign up */}
          <div className="flex justify-center items-center space-x-1">
            <span className="text-sm text-black">Return?</span>
            <span className="text-slate-500 text-sm">
              <Link href="/" prefetch={false}>
                Home
              </Link>
            </span>
          </div>
        </form>
        {auth.token && router.push("/home", { scroll: false })}
      </div>
    </main>
  );
}

export function SignUpForm() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [activateAccount, setActivateAccount] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    country: "",
    companyName: "",
    addressLine: "",
    organizationContact: "",
    subscriptionType: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        SIGNUP_URL,
        JSON.stringify({
          organizationEmail: userDetails.email,
          password: userDetails.password,
          companyName: userDetails.companyName,
          country: userDetails.country,
          addressLine: userDetails.addressLine,
          organizationContact: userDetails.organizationContact,
          subscriptionType: userDetails.subscriptionType,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      Cookies.set("email", userDetails.email, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });
      if (response.request.status === 201) {
        setActivateAccount(true);
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-[430px]">
      <div>
        <div className="flex mb-4 text-2xl">Get Started</div>
        <form autoComplete="off">
          <div className="flex flex-col">
            <label className="italic text-xs">company name</label>
            <input
              autoComplete="off"
              type="text"
              value={userDetails.companyName}
              onChange={(e) =>
                setUserDetails((prevDetails) => ({
                  ...prevDetails,
                  companyName: e.target.value,
                }))
              }
              className="border border-blue-500 rounded-lg p-3 my-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <label className="italic text-xs">country</label>
              <input
                autoComplete="off"
                type="text"
                value={userDetails.country}
                onChange={(e) =>
                  setUserDetails((prevDetails) => ({
                    ...prevDetails,
                    country: e.target.value,
                  }))
                }
                className="border border-blue-500 rounded-lg p-3 my-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="italic text-xs">subscription</label>
              <select
                className="border border-blue-500 rounded-lg p-3 my-2"
                value={userDetails.subscriptionType}
                onChange={(e) =>
                  setUserDetails((prevDetails) => ({
                    ...prevDetails,
                    subscriptionType: e.target.value,
                  }))
                }>
                <option>Select ...</option>
                <option value="free">Free</option>
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Custom</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <label className="italic text-xs">address</label>
              <input
                autoComplete="off"
                type="text"
                value={userDetails.addressLine}
                onChange={(e) =>
                  setUserDetails((prevDetails) => ({
                    ...prevDetails,
                    addressLine: e.target.value,
                  }))
                }
                className="border border-blue-500 rounded-lg p-3 my-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="italic text-xs">contact</label>
              <input
                autoComplete="off"
                type="phone"
                value={userDetails.organizationContact}
                onChange={(e) =>
                  setUserDetails((prevDetails) => ({
                    ...prevDetails,
                    organizationContact: e.target.value,
                  }))
                }
                className="border border-blue-500 rounded-lg p-3 my-2"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="italic text-xs">email</label>
            <input
              autoComplete="off"
              type="email"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails((prevDetails) => ({
                  ...prevDetails,
                  email: e.target.value,
                }))
              }
              className="border border-blue-500 rounded-lg p-3 my-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="italic text-xs">Password</label>
            <input
              placeholder="Enter password"
              autoComplete="off"
              type="password"
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails((prevDetails) => ({
                  ...prevDetails,
                  password: e.target.value,
                }))
              }
              className="border border-blue-500 rounded-lg p-3 my-2"></input>
          </div>
          <div
            className="flex justify-center p-3 text-white rounded-lg mt-4 bg-slate-500"
            onClick={handleSubmit}>
            <button type="submit" disabled={isLoading} className="px-16">
              {isLoading ? (
                <div className="flex flex-row justify-center">
                  <p className="text-sm pr-2">Loading</p>
                  <CircularProgress size={27} thickness={6} color="primary" />
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
          {/* or line */}
          <div className="flex items-center justify-center my-6">
            <div className="flex-grow border-t border-slate-500"></div>
            <span className="px-2 text-sm text-gray-500">or</span>
            <div className="flex-grow border-t border-slate-500"></div>
          </div>

          {/* sign up */}
          <div className="flex justify-center items-center space-x-1">
            <span className="text-sm text-black">
              Already having an Account?
            </span>
            <span className="text-slate-500 text-sm">
              <Link href="/" prefetch={false}>
                Login In
              </Link>
            </span>
          </div>
        </form>
        {activateAccount && router.push("/verifyemail", { scroll: false })}
      </div>
    </main>
  );
}

export function VerifyEmailForm() {
  const router = useRouter();
  const [login, setLogin] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    token: "",
  });

  console.log({
    code: userDetails.token,
    email: Cookies.get("email"),
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        VERIFYEMAIL_URL,
        JSON.stringify({
          code: userDetails.token,
          email: Cookies.get("email"),
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.request.status === 200) {
        setLogin(true);
      }
    } catch (err) {
      alert(err.response.data);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-[430px]">
      <div>
        <div className="mb-4 text-xl">Activate your Account</div>
        <div className="mb-[30%] text-sm">
          Enter the verification token from your email
        </div>
        <form autoComplete="off ">
          <div className="flex flex-col">
            <label className="italic text-xs">token</label>
            <input
              autoComplete="off"
              type="text"
              value={userDetails.token}
              onChange={(e) =>
                setUserDetails((prevDetails) => ({
                  ...prevDetails,
                  token: e.target.value,
                }))
              }
              className="border border-blue-500 rounded-lg p-3 my-2"
            />
          </div>
          <div
            className="flex justify-center p-3 text-white rounded-lg mt-4 bg-slate-500"
            onClick={handleSubmit}>
            <button type="submit" disabled={isLoading} className="px-16">
              {isLoading ? (
                <div className="flex flex-row justify-center">
                  <p className="text-sm pr-2">Loading</p>
                  <CircularProgress size={27} thickness={6} color="primary" />
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
          {/* or line */}
          <div className="flex items-center justify-center my-6">
            <div className="flex-grow border-t border-slate-500"></div>
            <span className="px-2 text-sm text-gray-500">or</span>
            <div className="flex-grow border-t border-slate-500"></div>
          </div>

          {/* sign up */}
          <div className="flex justify-center items-center space-x-1">
            <span className="text-sm text-black">Do you want to return</span>
            <span className="text-slate-500 text-sm">
              <Link href="/" prefetch={false}>
                Home?
              </Link>
            </span>
          </div>
        </form>
        {login && router.push("/", { scroll: false })}
      </div>
    </main>
  );
}
