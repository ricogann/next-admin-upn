import { useState } from "react";
import Image from "next/image";
import logoUpn from "../../public/logo-upn.png";
import { useRouter } from "next/router";

//logo
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiSolidDashboard, BiCalendar, BiLogOut } from "react-icons/bi";
import { FaLandmark } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdMiscellaneousServices } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import _lib from "@/lib";

export default function SideBar() {
    const [open, setOpen] = useState(true);
    const router = useRouter();

    const lib = new _lib();

    const Menus = [
        {
            title: "Dashboard",
            src: BiSolidDashboard,
            gap: true,
            link: "/dashboard",
        },
        { title: "Booking", src: BiCalendar, link: "/booking" },
        { title: "Data Fasilitas", src: FaLandmark, link: "/fasilitas" },
        { title: "Data Users", src: BsFillPeopleFill, link: "/users" },
        {
            title: "Miscellaneous",
            src: MdMiscellaneousServices,
            link: "/miscellaneous",
        },
        {
            title: "Notification",
            src: IoMdNotifications,
            gap: true,
            link: "/notification",
        },
        { title: "Logout", src: BiLogOut, link: "/logout" },
    ];

    const handlePage = (link: string) => {
        if (link === "/logout") {
            lib.deleteCookie("CERT");
            router.push("/auth/login");
        }
        router.push(link);
    };

    return (
        <div className="flex">
            <div
                className={` ${
                    open ? "w-56" : "w-20 "
                } bg-dark-white h-screen p-5  pt-8 relative duration-300`}
            >
                <div
                    className={`absolute cursor-pointer -right-3 top-16 ${
                        !open && "rotate-180"
                    } border border-black p-1 rounded-full duration-200 bg-white`}
                    onClick={() => setOpen(!open)}
                >
                    <AiOutlineArrowLeft />
                </div>
                <div className="flex items-center justify-center mb-10">
                    <Image src={logoUpn} alt="logo" width={100} height={100} />
                </div>
                <div className="flex flex-col gap-5">
                    {Menus.map((menu, index) => (
                        <div
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${menu.gap ? "mt-9" : "mt-2"} ${
                                index === 0 && "bg-light-white"
                            } `}
                            key={index}
                            onClick={() => handlePage(menu.link)}
                        >
                            <menu.src className="text-[30px] text-black" />
                            <h1
                                className={`${
                                    !open && "hidden"
                                } origin-left duration-200 text-[15px] text-black`}
                            >
                                {menu.title}
                            </h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
