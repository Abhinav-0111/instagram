import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { authenticationLogin, authenticationSignup } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/userSlice";

const SignUp = () => {
    const [switchbtn, setswitchbtn] = useState(false);
    const [email, setemail] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [name, setname] = useState("");
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const signupUser = async () => {
        try {
            if (!name || !username || !password || !email) {
                toast.error("All field are required");
                setloading(false);
                return false;
            }
            setloading(true);
            const response = await authenticationSignup({
                name,
                email,
                password,
                username,
            });
            if (response.status === 200) {
                setname("");
                setemail("");
                setpassword("");
                setusername("");
                toast.success("Account create successfully");
                setswitchbtn(false);
            }
        } catch (error) {
            setloading(false);
            toast.error(error?.response?.data);
            console.log(error);
        } finally {
            setloading(false);
        }
    };
    const loginUser = async () => {
        try {
            if (!username || !password) {
                toast.error("All field are required");
                return false;
            }
            setloading(true);
            const response = await authenticationLogin({
                password,
                username,
            });
            if (response.status === 200) {
                setname("");
                setemail("");
                setpassword("");
                setusername("");
                toast.success(response?.data?.Message);
                dispatch(getUser(response?.data?.user));
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response.data);
            console.log(error);
        } finally {
            setloading(false);
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);
    return (
        <>
            <div className="flex w-screen h-screen items-center justify-center">
                <div
                    className={`flex items-center flex-col w-[345px] ${
                        switchbtn ? "h-[95%]" : "h-[70%]"
                    }  border-[2px] border-gray-200 py-5 px-10 justify-center`}
                >
                    <img
                        src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png"
                        alt="logo"
                        className="w-[200px]"
                    />
                    {switchbtn ? (
                        <p className="text-center font-semibold text-[#737373]">
                            Sign up to see photos and videos
                            <br /> from your friends.
                        </p>
                    ) : (
                        ""
                    )}
                    <div className="flex flex-col items-center w-full mt-10">
                        {switchbtn ? (
                            <>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => {
                                        setemail(e.target.value);
                                    }}
                                    className="border w-full placeholder:text-[14px] outline-none p-1 bg-[#FAFAFA] mb-2"
                                />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => {
                                        setname(e.target.value);
                                    }}
                                    placeholder="Full Name"
                                    className="border w-full placeholder:text-[14px] outline-none p-1 bg-[#FAFAFA] mb-2"
                                />
                            </>
                        ) : (
                            ""
                        )}

                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => {
                                setusername(e.target.value);
                            }}
                            className="border w-full placeholder:text-[14px] outline-none mb-2 p-1 bg-[#FAFAFA]"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setpassword(e.target.value);
                            }}
                            className="border w-full placeholder:text-[14px] outline-none p-1 bg-[#FAFAFA]"
                        />
                    </div>
                    {switchbtn ? (
                        <>
                            <p className="text-center text-[12px] text-[#737373] mt-4">
                                People who use our service may have uploaded
                                your contact information to Instagram.
                                <span className="text-[#0095F6] cursor-pointer">
                                    Learn
                                    <br />
                                    More
                                </span>
                            </p>
                            <p className="text-center text-[12px] text-[#737373] mt-4">
                                By signing up, you agree to our&nbsp;
                                <span className="text-[#0095F6] cursor-pointer">
                                    Terms , Privacy Policy and Cookies Policy .
                                </span>
                            </p>
                        </>
                    ) : (
                        ""
                    )}
                    {switchbtn ? (
                        <button
                            disabled={!password || !username || !name || !email}
                            onClick={signupUser}
                            className="btn w-full mt-10 bg-[#0095F6] hover:bg-[#1877F2] text-white"
                        >
                            {loading ? "Loading..." : "Sign up"}
                        </button>
                    ) : (
                        <button
                            disabled={!password || !username}
                            onClick={loginUser}
                            className="btn w-full mt-10 bg-[#0095F6] hover:bg-[#1877F2] text-white"
                        >
                            {loading ? "Loading..." : "Log in"}
                        </button>
                    )}
                    {switchbtn ? (
                        <span className="mt-2">
                            Have an account?&nbsp;
                            <span
                                onClick={() => {
                                    setswitchbtn(!switchbtn);
                                    setemail("");
                                    setname("");
                                    setpassword("");
                                    setusername("");
                                }}
                                className="text-[#0095F6] cursor-pointer"
                            >
                                Log in
                            </span>
                        </span>
                    ) : (
                        <span className="mt-2">
                            Don't have an account?&nbsp;
                            <span
                                onClick={() => {
                                    setswitchbtn(!switchbtn);
                                    setemail("");
                                    setname("");
                                    setpassword("");
                                    setusername("");
                                }}
                                className="text-[#0095F6] cursor-pointer"
                            >
                                Sign up
                            </span>
                        </span>
                    )}
                </div>
            </div>
        </>
    );
};

export default SignUp;
