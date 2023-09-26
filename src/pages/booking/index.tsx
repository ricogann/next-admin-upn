import { useState, useEffect, MouseEventHandler } from "react";
import SideBar from "@/components/sidebar";
import { useRouter } from "next/router";
import Image from "next/image";

interface Booking {
    Fasilitas: Fasilitas;
    Account: Account;
    id_pemesanan: number;
    tanggal_pemesanan: number;
    jam_checkin: string;
    jam_checkout: string;
    durasi: number;
    total_harga: number;
    status: string;
    bukti_pembayaran: string;
}

interface Fasilitas {
    id_fasilitas: number;
    nama: string;
}

interface Mahasiswa {
    nama: string;
}

interface Dosen {
    nama: string;
}

interface Umum {
    nama: string;
}

interface Account {
    Mahasiswa: Mahasiswa[];
    Dosen: Dosen[];
    Umum: Umum[];
    id_account: number;
    nama: string;
}

export default function Booking() {
    const router = useRouter();

    const [activeTab, setActiveTab] = useState("Booking");
    const [dataBooking, setDataBooking] = useState<Booking[]>([]);

    const toggleTab = (tab: string) => {
        setActiveTab(tab);
    };

    async function getDataBooking() {
        try {
            const res = await fetch("https://api.ricogann.com/api/booking");
            const data = await res.json();

            return data;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const dataBooking = await getDataBooking();

                setDataBooking(dataBooking.data);
            } catch (error) {
                console.error("error fetching data Booking ", error);
            }
        }

        fetchData();
    }, []);

    console.log(dataBooking);

    return (
        <div className="flex bg-[#FFFFFF]">
            <div className="">
                <SideBar />
            </div>

            <div className="flex flex-1 bg-[#F7F8FA]">
                <div className="p-5">
                    <div className="flex flex-col items-start justify-center">
                        <div className="flex flex-row items-start">
                            <h1 className="text-[45px] font-bold mr-14">
                                Booking
                            </h1>
                        </div>
                        <h4 className="text-[12] font-regular mb-14 text-dark-whiteText">
                            Tabel Data Booking
                        </h4>
                    </div>

                    <div className="flex items-start mb-5 border-b border-[#E2E7EE]">
                        <a href="#" onClick={() => toggleTab("Booking")}>
                            <h2
                                className={`text-[18] font-regular mb-3 mr-14 ${
                                    activeTab === "Booking"
                                        ? "border-b-2 border-[#FFA101] font-bold"
                                        : ""
                                }`}
                            >
                                Booking
                            </h2>
                        </a>
                    </div>

                    {activeTab === "Booking" && (
                        <div className="flex flex-col overflow-hidden rounded-lg">
                            <div className="bg-[#000000]flex flex-row relative rounded-full overflow-hidden mb-5">
                                <input
                                    className="w-full md:w-auto h-[40px] md:h-[50px] pl-12 pr-4 py-2 md:py-3 bg-white border border-gray-300 rounded-full text-[16px] md:text-[20px] font-bold outline-none"
                                    type="text"
                                    placeholder="Cari Data Harga"
                                />
                            </div>
                            <div className="divide-y divide-gray-200 rounded-lg overflow-hidden ">
                                <div className="flex">
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider">
                                        NO
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[130px]">
                                        Nama Fasilitas
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[200px]">
                                        Nama Penyewa
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[130px]">
                                        Tanggal Pemesanan
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[100px]">
                                        Jam CheckIn
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[100px]">
                                        Jam CheckOut
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[137px]">
                                        Status
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[140px]">
                                        Total Harga
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#B9B9B9] text-center text-xs leading-4 font-medium text-black uppercase tracking-wider w-[200px]">
                                        Action
                                    </h1>
                                </div>

                                <div className="bg-white divide-y divide-gray-200">
                                    <div className="">
                                        {dataBooking.map((data, index) => (
                                            <div className="flex" key={index}>
                                                <div className="px-6 py-4 whitespace-no-wrap">
                                                    {index + 1}
                                                </div>
                                                <div className="px-6 py-4 whitespace-no-wrap w-[130px]">
                                                    {data.Fasilitas &&
                                                        data.Fasilitas.nama}
                                                </div>
                                                <div className="px-6 py-4 break-all w-[200px]">
                                                    {data.Account.Mahasiswa
                                                        .length > 0
                                                        ? data.Account
                                                              .Mahasiswa[0].nama
                                                        : data.Account.Dosen
                                                              .length > 0
                                                        ? data.Account.Dosen[0]
                                                              .nama
                                                        : data.Account.Umum[0]
                                                              .nama}
                                                </div>
                                                <div className="px-6 py-4 break-all text-center w-[130px]">
                                                    {
                                                        data.tanggal_pemesanan
                                                            .toString()
                                                            .split("T")[0]
                                                    }
                                                </div>
                                                <div className="px-6 py-4 break-all w-[100px]">
                                                    {data.jam_checkin}
                                                </div>
                                                <div className="px-6 py-4 break-all w-[100px]">
                                                    {data.jam_checkout}
                                                </div>
                                                <div className="px-6 py-4 break-all w-[137px]">
                                                    {data.status}
                                                </div>
                                                <div className="px-6 py-4 break-all w-[140px]">
                                                    Rp
                                                    {data.total_harga
                                                        .toString()
                                                        .replace(
                                                            /\B(?=(\d{3})+(?!\d))/g,
                                                            "."
                                                        )}
                                                </div>

                                                <div className="px-6 py-4 whitespace-no-wrap flex items-center justify-center w-[200px]">
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2 text-[10px]">
                                                        Bukti Pembayaran
                                                    </button>
                                                    <button
                                                        className={`${
                                                            data.status ===
                                                            "Dikonfirmasi"
                                                                ? "block"
                                                                : "hidden"
                                                        } bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full text-[13px]`}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        className={`${
                                                            data.status ===
                                                            "Dikonfirmasi"
                                                                ? "hidden"
                                                                : "block"
                                                        } bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full text-[13px]`}
                                                    >
                                                        Approve
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
