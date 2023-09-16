import { useState, useEffect } from "react";
import SideBar from "@/components/sidebar";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("bookings");
    const [totalSum, setTotalSum] = useState(0); // Initialize with 0 as an integer



    const toggleTab = (tab: string) => {
        setActiveTab(tab);
    };


    async function getUsers() {
        try {
            const res = await fetch("http://localhost:5000/api/users/account");
            const data = await res.json();
            return data.data;
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const dataUsers = await getUsers();
                setTotalSum(dataUsers.length);

            } catch (error) {
                console.error("error fetching data fasilitas ", error);
            }
        }

        fetchData();
    }, []);
    

    const isTabActive = (tab: string) => activeTab === tab;

    const renderContent = () => {
        switch (activeTab) {
            case "bookings":
                return (
                    <div className="bg-white rounded-lg shadow-lg p-5 mr-5 mb-5">
                        {/* Booking content */}
                        <p className="text-[14] font-bold mb-1">Asrama</p>
                        <p className="text-[12] font-regular text-[#7F8FA4]">
                            Nama Penyewa
                        </p>
                        <p className="text-[14] font-regular mb-5 ">
                            Alfian Dorif Murtadlo
                        </p>
                        <div className="flex flex-row ">
                            <div className="flex-col">
                                <p className="text-[14] font-regular mr-10 text-[#7F8FA4]">
                                    Bukti Pembayaran
                                </p>
                            </div>
                            <div className="flex-col">
                                <p className="text-[14] font-regular mr-10 text-[#7F8FA4]">
                                    Biaya
                                </p>
                                <p className="text-[14] font-regular mr-10 ">
                                    Rp3.000.000,00
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row border-t mt-2">
                            <a href="http://">
                                <p className="text-[14] font-Bold mr-14 text-[#69519E]">
                                    Accept Booking
                                </p>
                            </a>
                            <a href="http://">
                                <p className="text-[14] font-Bold mr-10 text-[#69519E]">
                                    Decline
                                </p>
                            </a>
                        </div>
                    </div>
                );
            case "mahasiswa":
                return (
                    <div className="bg-white rounded-lg shadow-lg p-5 mr-5 mb-5">
                        {/* Mahasiswa content */}
                        <p className="text-[14] font-bold mb-1">
                            Alfian Dorif Murtadlo
                        </p>
                        <p className="text-[12] font-regular text-[#7F8FA4]">
                            NPM
                        </p>
                        <p className="text-[14] font-regular mb-5 ">
                            20081010251
                        </p>
                        <div className="flex flex-row ">
                            <div className="flex-col">
                                <p className="text-[14] font-regular mr-10 text-[#7F8FA4]">
                                    Bukti Registrasi
                                </p>
                            </div>
                            <div className="flex-col">
                                <p className="text-[14] font-regular mr-10 text-[#7F8FA4]">
                                    Tahun Ajaran
                                </p>
                                <p className="text-[14] font-regular mr-10 ">
                                    2022/2023
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row border-t mt-2">
                            <a href="http://">
                                <p className="text-[14] font-Bold mr-14 text-[#69519E]">
                                    Approve
                                </p>
                            </a>
                            <a href="http://">
                                <p className="text-[14] font-Bold ml-8 text-[#69519E]">
                                    Decline
                                </p>
                            </a>
                        </div>
                    </div>
                );
            case "gedung":
                return (
                    <div className="bg-white rounded-lg shadow-lg w-[300px] p-5 mr-5 mb-5">
                        {/* Gedung content */}
                        <p className="text-[14] font-bold mb-1">Asrama</p>
                        <p className="text-[12] font-regular text-[#7F8FA4]">
                            Alamat
                        </p>
                        <p className="text-[14] font-regular mb-5 ">
                            Jl. Rungkut Madya No.1, Gn. Anyar, Kec. Gn. Anyar,
                            Surabaya, Jawa Timur 60294
                        </p>
                        <div className="flex flex-row ">
                            <div className="flex-col">
                                <p className="text-[14] font-regular mr-14 text-[#7F8FA4]">
                                    Foto
                                </p>
                            </div>
                            <div className="flex-col">
                                <p className="text-[14] font-regular mr-10 text-[#7F8FA4]">
                                    Biaya
                                </p>
                                <p className="text-[14] font-regular mr-10 ">
                                    Rp3.000.000,00
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row border-t mt-2">
                            <a href="http://">
                                <p className="text-[14] font-Bold mr-14 text-[#69519E]">
                                    Edit
                                </p>
                            </a>
                            <a href="http://">
                                <p className="text-[14] font-Bold ml-2 text-[#69519E]">
                                    Delete
                                </p>
                            </a>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex">
            <div className="">
                <SideBar />
            </div>
            <div className="w-full">
                <div className="flex-1 h-screen bg-[#F7F8FA]">
                    <div className="p-10">
                        <div className="flex flex-col items-start justify-center">
                            <h1 className="text-[45px] font-bold">Dashboard</h1>
                            <h4 className="text-[15px] font-regular mb-5 text-dark-whiteText">
                                Welcome Back!
                            </h4>
                            <h4 className="text-[20px] font-semibold mb-3">
                                Quick Stats
                            </h4>
                        </div>

                        <div className="flex flex-row items-start mb-10">
                            <div className="bg-white rounded-lg shadow-lg p-5 mr-5 w-[200px]">
                                <h1 className="font-regular mb-3">
                                    Total Bookings
                                </h1>
                                <h1 className="text-[28px] font-bold ">
                                    28,345
                                </h1>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg p-5 mr-5 w-[200px]">
                                <h1 className="font-regular mb-3">
                                    Pending Booking
                                </h1>
                                <h1 className="text-[28px] font-bold text-red-500">
                                    120
                                </h1>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg p-5 mr-5 w-[200px]">
                                <h1 className="font-regular mb-3">
                                    Total Users
                                </h1>
                                <h1 className="text-[28px] font-bold ">{totalSum}</h1>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg p-5 mr-5 w-[200px]">
                                <h1 className="font-regular mb-3">
                                    Pending Mahasiswa
                                </h1>
                                <h1 className="text-[28px] font-bold text-red-500">
                                    40
                                </h1>
                            </div>
                        </div>

                        <div className="flex flex-row items-start mb-5 border-b border-[#E2E7EE]">
                            <a
                                href="#"
                                onClick={() => toggleTab("bookings")}
                                className={`text-[18] ${
                                    isTabActive("bookings")
                                        ? "font-bold mb-3 mr-14 border-b-2 border-[#FFA101]"
                                        : "font-regular mb-3 mr-14"
                                }`}
                            >
                                Bookings
                            </a>
                            <a
                                href="#"
                                onClick={() => toggleTab("mahasiswa")}
                                className={`text-[18] ${
                                    isTabActive("mahasiswa")
                                        ? "font-bold mb-3 mr-14 border-b-2 border-[#FFA101]"
                                        : "font-regular mb-3 mr-14"
                                }`}
                            >
                                Mahasiswa
                            </a>
                            <a
                                href="#"
                                onClick={() => toggleTab("gedung")}
                                className={`text-[18] ${
                                    isTabActive("gedung")
                                        ? "font-bold mb-3 mr-14 border-b-2 border-[#FFA101]"
                                        : "font-regular mb-3 mr-14"
                                }`}
                            >
                                Gedung
                            </a>
                        </div>
                        <div className="flex flex-wrap items-start mb-5">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
