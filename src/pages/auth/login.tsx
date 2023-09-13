import { useState, useEffect, ChangeEvent } from "react";

import { useRouter } from "next/router";

import { AuthInput } from "../../components/auth-input";

export default function Login() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        try {
            const data = { username_admin: username, password_admin: password };
            const res = await fetch(
                "http://localhost:5000/api/auth/login/admin",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const resData = await res.json();
            if (resData.data.token) {
                const token = resData.data.token;
                setCookie("CERT", token, 1);
                router.push("/");
            } else {
                return {
                    status: false,
                    message: "Username atau password salah",
                };
            }
        } catch (error) {
            console.log(error);
        }
    };

    async function setCookie(name: string, value: string, days: number) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000); // Calculate the expiration time
        const cookieString = `${name}=${value};expires=${expires.toUTCString()};path=/`;
        document.cookie = cookieString;
    }

    return (
        <div className="h-screen flex items-center justify-center bg-[#F7F8FA] overflow-hidden text-black gap-24">
            <div className="h-full flex justify-between items-center py-12">
                <h1 className="font-medium text-[50px] w-[600px] ">
                    Selamat Datang di Website Admin Reservasi Fasilitas UPN
                    Veteran Jawa Timur !
                </h1>
            </div>
            <div className="border-[2px] p-8 rounded-xl border-black">
                <div className="flex flex-col items-start justify-center mb-7">
                    <h1 className=" font-medium  mb-2 text-[35px] ">Login</h1>
                    <div className="flex flex-col gap-3">
                        <div className="md:flex md:gap-3 md:flex-col">
                            <div className="">
                                <h1 className="text-[20px] mb-1 md:text-[30px] xl:text-[25px]">
                                    username
                                </h1>
                                <AuthInput
                                    name="username"
                                    type="text"
                                    onChange={handleChangeUsername}
                                />
                            </div>
                            <div className="">
                                <h1 className="text-[20px] mb-1 md:text-[30px] xl:text-[25px]">
                                    password
                                </h1>
                                <AuthInput
                                    name="password"
                                    type="password"
                                    onChange={handleChangePassword}
                                />
                            </div>
                        </div>

                        <div className="mt-5">
                            <button
                                className="border border-black w-full bg-[#322A7D] p-2 rounded-lg text-white font-bold uppercase"
                                onClick={handleLogin}
                            >
                                LOGIN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}